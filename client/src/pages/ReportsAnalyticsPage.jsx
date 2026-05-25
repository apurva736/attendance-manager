import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Download,
  FileSpreadsheet,
  Filter,
  Printer,
  Trophy,
} from "lucide-react";

const departments = ["All Departments", "Computer Science", "Electronics", "Mechanical", "Civil"];
const subjects = ["All Subjects", "Data Structures", "Database Systems", "Operating Systems", "Networks", "Mathematics"];
const batches = ["All Batches", "2022 - A", "2022 - B", "2023 - A", "2023 - B"];
const students = ["All Students", "Aarav Sharma", "Diya Mehta", "Kabir Singh", "Ishita Verma", "Myra Nair"];

const attendanceTrendData = [
  { date: "Apr 01", department: "Computer Science", subject: "Data Structures", batch: "2022 - A", student: "Aarav Sharma", attendance: 92 },
  { date: "Apr 04", department: "Computer Science", subject: "Data Structures", batch: "2022 - A", student: "Diya Mehta", attendance: 89 },
  { date: "Apr 07", department: "Computer Science", subject: "Database Systems", batch: "2022 - B", student: "Kabir Singh", attendance: 85 },
  { date: "Apr 10", department: "Electronics", subject: "Networks", batch: "2023 - A", student: "Ishita Verma", attendance: 88 },
  { date: "Apr 13", department: "Mechanical", subject: "Mathematics", batch: "2023 - B", student: "Myra Nair", attendance: 81 },
  { date: "Apr 16", department: "Computer Science", subject: "Operating Systems", batch: "2022 - A", student: "Aarav Sharma", attendance: 87 },
  { date: "Apr 19", department: "Civil", subject: "Mathematics", batch: "2022 - B", student: "Diya Mehta", attendance: 83 },
  { date: "Apr 22", department: "Electronics", subject: "Networks", batch: "2023 - A", student: "Kabir Singh", attendance: 90 },
  { date: "Apr 25", department: "Computer Science", subject: "Database Systems", batch: "2022 - A", student: "Ishita Verma", attendance: 93 },
  { date: "Apr 28", department: "Mechanical", subject: "Operating Systems", batch: "2023 - B", student: "Myra Nair", attendance: 79 },
];

const subjectComparisonData = [
  { subject: "Data Structures", average: 91, department: "Computer Science" },
  { subject: "Database Systems", average: 86, department: "Computer Science" },
  { subject: "Operating Systems", average: 82, department: "Computer Science" },
  { subject: "Networks", average: 88, department: "Electronics" },
  { subject: "Mathematics", average: 80, department: "Mechanical" },
];

const defaulterSeed = [
  { id: 1, name: "Rohan Malhotra", roll: "22CSE019", department: "Computer Science", subject: "Operating Systems", batch: "2022 - A", attendance: 58, threshold: 75 },
  { id: 2, name: "Sana Iqbal", roll: "22ECE011", department: "Electronics", subject: "Networks", batch: "2023 - A", attendance: 63, threshold: 75 },
  { id: 3, name: "Karan Mehta", roll: "22MEC017", department: "Mechanical", subject: "Mathematics", batch: "2023 - B", attendance: 61, threshold: 75 },
  { id: 4, name: "Anaya Kapoor", roll: "22CSE008", department: "Computer Science", subject: "Database Systems", batch: "2022 - B", attendance: 64, threshold: 75 },
  { id: 5, name: "Zoya Khan", roll: "22CIV013", department: "Civil", subject: "Mathematics", batch: "2022 - B", attendance: 59, threshold: 75 },
];

const leaderboardData = [
  { rank: 1, name: "Ishita Verma", department: "Computer Science", attendance: 97 },
  { rank: 2, name: "Aarav Sharma", department: "Computer Science", attendance: 95 },
  { rank: 3, name: "Diya Mehta", department: "Electronics", attendance: 94 },
  { rank: 4, name: "Kabir Singh", department: "Mechanical", attendance: 93 },
  { rank: 5, name: "Myra Nair", department: "Civil", attendance: 92 },
];

export default function ReportsAnalyticsPage() {
  const [filters, setFilters] = useState({
    fromDate: "2026-04-01",
    toDate: "2026-04-30",
    department: departments[0],
    subject: subjects[0],
    batch: batches[0],
    student: students[0],
  });

  const filteredTrendData = useMemo(() => {
    return attendanceTrendData.filter((entry) => {
      return (
        (filters.department === departments[0] || entry.department === filters.department) &&
        (filters.subject === subjects[0] || entry.subject === filters.subject) &&
        (filters.batch === batches[0] || entry.batch === filters.batch) &&
        (filters.student === students[0] || entry.student === filters.student)
      );
    });
  }, [filters]);

  const filteredSubjectComparison = useMemo(() => {
    return subjectComparisonData.filter((entry) => {
      return filters.department === departments[0] || entry.department === filters.department;
    });
  }, [filters.department]);

  const defaulters = useMemo(() => {
    return defaulterSeed.filter((entry) => {
      return (
        (filters.department === departments[0] || entry.department === filters.department) &&
        (filters.subject === subjects[0] || entry.subject === filters.subject) &&
        (filters.batch === batches[0] || entry.batch === filters.batch) &&
        (filters.student === students[0] || entry.name === filters.student)
      );
    });
  }, [filters]);

  const reportSummary = useMemo(() => {
    const averageTrend = filteredTrendData.length
      ? Math.round(filteredTrendData.reduce((sum, item) => sum + item.attendance, 0) / filteredTrendData.length)
      : 0;

    return {
      averageTrend,
      defaulters: defaulters.length,
      highestSubject: filteredSubjectComparison.reduce(
        (best, current) => (current.average > best.average ? current : best),
        filteredSubjectComparison[0] || { subject: "N/A", average: 0 }
      ),
    };
  }, [defaulters.length, filteredSubjectComparison, filteredTrendData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student" },
      { accessorKey: "roll", header: "Roll No." },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "batch", header: "Batch" },
      {
        accessorKey: "attendance",
        header: "Attendance %",
        cell: ({ getValue }) => `${getValue()}%`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: defaulters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleExportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(
      defaulters.map((entry) => ({
        Student: entry.name,
        Roll: entry.roll,
        Department: entry.department,
        Subject: entry.subject,
        Batch: entry.batch,
        Attendance: `${entry.attendance}%`,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Defaulters");
    XLSX.writeFile(workbook, "attendance-defaulters.xlsx");
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Attendance Defaulter Report", 14, 18);
    doc.setFontSize(11);
    doc.text(`Date Range: ${filters.fromDate} to ${filters.toDate}`, 14, 28);
    doc.text(`Department: ${filters.department}`, 14, 36);
    let y = 48;
    defaulters.forEach((entry) => {
      doc.text(
        `${entry.name} | ${entry.roll} | ${entry.subject} | ${entry.attendance}%`,
        14,
        y
      );
      y += 8;
    });
    doc.save("attendance-defaulters.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel overflow-hidden p-0 print:shadow-none">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.20),_transparent_28%),linear-gradient(135deg,_rgba(37,99,235,0.08),_rgba(14,165,233,0.06))] px-5 py-6 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Reports & Analytics</p>
              <h2 className="mt-3 text-3xl font-semibold">Attendance intelligence center</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Analyze trends, compare subjects, review defaulters, and export printable attendance reports.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 print:hidden">
              <ActionButton icon={FileSpreadsheet} label="Export Excel" onClick={handleExportExcel} />
              <ActionButton icon={Download} label="Export PDF" onClick={handleExportPdf} />
              <ActionButton icon={Printer} label="Printable View" onClick={handlePrint} />
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <FilterCard label="From Date" type="date" value={filters.fromDate} onChange={(value) => updateFilter("fromDate", value)} />
            <FilterCard label="To Date" type="date" value={filters.toDate} onChange={(value) => updateFilter("toDate", value)} />
            <SummaryCard title="Average Trend" value={`${reportSummary.averageTrend}%`} subtitle="Across filtered timeline" />
            <SelectFilter label="Department" value={filters.department} options={departments} onChange={(value) => updateFilter("department", value)} />
            <SelectFilter label="Subject" value={filters.subject} options={subjects} onChange={(value) => updateFilter("subject", value)} />
            <SelectFilter label="Batch" value={filters.batch} options={batches} onChange={(value) => updateFilter("batch", value)} />
            <SelectFilter label="Student" value={filters.student} options={students} onChange={(value) => updateFilter("student", value)} />
            <SummaryCard title="Defaulters" value={`${reportSummary.defaulters}`} subtitle="Below threshold" />
            <SummaryCard
              title="Best Subject"
              value={reportSummary.highestSubject.subject}
              subtitle={`${reportSummary.highestSubject.average || 0}% average`}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] print:grid-cols-1">
        <div className="panel p-6 print:border print:shadow-none">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Trend Analysis</p>
          <h3 className="mt-3 text-2xl font-semibold">Attendance trend over time</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Visualize how attendance moves across the selected reporting period.
          </p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis domain={[50, 100]} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: "#2563eb", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Attendance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6 print:border print:shadow-none">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leaderboard</p>
              <h3 className="mt-1 text-2xl font-semibold">Top attendance performers</h3>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {leaderboardData.map((entry) => (
              <div key={entry.rank} className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">Rank #{entry.rank}</p>
                    <p className="mt-1 font-medium">{entry.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{entry.department}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
                    {entry.attendance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr] print:grid-cols-1">
        <div className="panel p-6 print:border print:shadow-none">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Subject Comparison</p>
          <h3 className="mt-3 text-2xl font-semibold">Subject-wise attendance comparison</h3>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredSubjectComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                <XAxis dataKey="subject" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}
                />
                <Bar dataKey="average" radius={[14, 14, 0, 0]}>
                  {filteredSubjectComparison.map((entry) => (
                    <Cell
                      key={entry.subject}
                      fill={entry.average >= 88 ? "#2563eb" : entry.average >= 80 ? "#38bdf8" : "#f59e0b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6 print:border print:shadow-none">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Defaulter List</p>
              <h3 className="mt-3 text-2xl font-semibold">Students below threshold</h3>
            </div>
            <div className="rounded-full bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
              {defaulters.length} students
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="pb-3 font-medium">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 dark:border-slate-900">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 pr-4">
                        {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="panel p-6 print:border print:shadow-none">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
            <Filter size={20} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Printable Report View</p>
            <h3 className="mt-1 text-2xl font-semibold">Executive attendance snapshot</h3>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <PrintableMetric title="Date Range" value={`${filters.fromDate} to ${filters.toDate}`} />
          <PrintableMetric title="Department" value={filters.department} />
          <PrintableMetric title="Filtered Student" value={filters.student} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-sm font-medium">Key Observations</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>Average filtered attendance is {reportSummary.averageTrend}%.</li>
              <li>{reportSummary.defaulters} students are below the configured threshold.</li>
              <li>{reportSummary.highestSubject.subject} leads subject averages with {reportSummary.highestSubject.average || 0}%.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-sm font-medium">Prepared For</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Attendance audit and departmental review. Use the export controls above for Excel, PDF, or printer-ready copies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
    >
      <Icon size={18} />
      <span className="ml-2">{label}</span>
    </button>
  );
}

function FilterCard({ label, type, value, onChange }) {
  return (
    <label className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50">
      <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full bg-transparent text-sm font-medium outline-none"
      />
    </label>
  );
}

function SelectFilter({ label, value, options, onChange }) {
  return (
    <label className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50">
      <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full bg-transparent text-sm font-medium outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 text-white dark:border-slate-700">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{title}</p>
      <h3 className="mt-3 text-lg font-semibold">{value}</h3>
      <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
    </div>
  );
}

function PrintableMetric({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}
