import { useMemo, useState } from "react";
import clsx from "clsx";
import jsPDF from "jspdf";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Check, Download, Send, X } from "lucide-react";

const hodSubjectOverview = [
  { subject: "Data Structures", attendance: 91, batchA: 94, batchB: 88, batchC: 90 },
  { subject: "Database Systems", attendance: 86, batchA: 89, batchB: 85, batchC: 84 },
  { subject: "Operating Systems", attendance: 79, batchA: 82, batchB: 77, batchC: 78 },
  { subject: "Computer Networks", attendance: 88, batchA: 91, batchB: 86, batchC: 87 },
];

const facultyTrackerSeed = [
  { teacher: "Prof. Neha Kapoor", subject: "Data Structures", status: "Taken", time: "09:05 AM" },
  { teacher: "Prof. Arjun Rao", subject: "Database Systems", status: "Taken", time: "10:20 AM" },
  { teacher: "Prof. Sana Iyer", subject: "Operating Systems", status: "Pending", time: "Not marked" },
  { teacher: "Prof. Vikram Shah", subject: "Computer Networks", status: "Taken", time: "11:10 AM" },
  { teacher: "Prof. Reema Das", subject: "Mathematics", status: "Pending", time: "Not marked" },
];

const leaveApprovalSeed = [
  { id: "LV-021", student: "Aarav Sharma", batch: "CSE 2022 - A", from: "2026-04-17", to: "2026-04-18", reason: "Medical consultation", status: "Pending" },
  { id: "LV-022", student: "Diya Mehta", batch: "CSE 2022 - B", from: "2026-04-19", to: "2026-04-19", reason: "Family function", status: "Pending" },
  { id: "LV-023", student: "Kabir Singh", batch: "CSE 2023 - A", from: "2026-04-20", to: "2026-04-21", reason: "Competition travel", status: "Pending" },
];

const hodDefaulterSeed = [
  { id: "DF-101", name: "Rohan Malhotra", roll: "22CSE019", batch: "CSE 2022 - A", subject: "Operating Systems", attendance: 58 },
  { id: "DF-102", name: "Anaya Kapoor", roll: "22CSE008", batch: "CSE 2022 - B", subject: "Database Systems", attendance: 64 },
  { id: "DF-103", name: "Karan Mehta", roll: "22CSE017", batch: "CSE 2023 - A", subject: "Computer Networks", attendance: 61 },
  { id: "DF-104", name: "Myra Nair", roll: "22CSE026", batch: "CSE 2023 - B", subject: "Operating Systems", attendance: 59 },
];

export default function HodDashboardPage({ user }) {
  const [leaveRequests, setLeaveRequests] = useState(leaveApprovalSeed);
  const [defaulters] = useState(hodDefaulterSeed);
  const [bulkAlertSent, setBulkAlertSent] = useState(false);
  const [isBulkAlertOpen, setIsBulkAlertOpen] = useState(false);

  const leaveColumns = useMemo(
    () => [
      { accessorKey: "student", header: "Student" },
      { accessorKey: "batch", header: "Batch" },
      { accessorKey: "from", header: "From" },
      { accessorKey: "to", header: "To" },
      { accessorKey: "reason", header: "Reason" },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => updateLeaveStatus(row.original.id, "Approved")}
              className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200"
            >
              <Check size={14} className="inline-block" /> Approve
            </button>
            <button
              type="button"
              onClick={() => updateLeaveStatus(row.original.id, "Rejected")}
              className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-200"
            >
              <X size={14} className="inline-block" /> Reject
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const defaulterColumns = useMemo(
    () => [
      { accessorKey: "name", header: "Student" },
      { accessorKey: "roll", header: "Roll No." },
      { accessorKey: "batch", header: "Batch" },
      { accessorKey: "subject", header: "Subject" },
      {
        accessorKey: "attendance",
        header: "Attendance %",
        cell: ({ getValue }) => (
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
            {getValue()}%
          </span>
        ),
      },
    ],
    []
  );

  const leaveTable = useReactTable({
    data: leaveRequests.filter((item) => item.status === "Pending"),
    columns: leaveColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const defaulterTable = useReactTable({
    data: defaulters,
    columns: defaulterColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const facultyTaken = facultyTrackerSeed.filter((teacher) => teacher.status === "Taken").length;
  const facultyPending = facultyTrackerSeed.length - facultyTaken;

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const handleBulkAlert = () => setIsBulkAlertOpen(true);

  const handleConfirmBulkAlert = () => {
    setBulkAlertSent(true);
    setIsBulkAlertOpen(false);
  };

  const handleMonthlySummaryDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("HOD Monthly Attendance Summary", 14, 18);
    doc.setFontSize(11);
    doc.text(`Department Review Lead: ${user?.fullName || "HOD Office"}`, 14, 28);
    doc.text("Subject-wise overview:", 14, 40);
    let y = 50;
    hodSubjectOverview.forEach((subject) => {
      doc.text(`${subject.subject} - ${subject.attendance}% overall`, 14, y);
      y += 8;
    });
    doc.text(`Faculty taken attendance today: ${facultyTaken}`, 14, y + 8);
    doc.text(`Pending faculty entries: ${facultyPending}`, 14, y + 16);
    doc.save("hod-monthly-summary.pdf");
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel overflow-hidden p-0">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_26%),linear-gradient(135deg,_rgba(37,99,235,0.08),_rgba(16,185,129,0.05))] px-5 py-6 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">HOD Dashboard</p>
              <h2 className="mt-3 text-3xl font-semibold">Department attendance command center</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Review subject performance, faculty compliance, leave approvals, and defaulters for the department in one place.
              </p>
            </div>

            <button type="button" onClick={handleMonthlySummaryDownload} className="btn-primary w-full sm:w-auto">
              <Download size={18} />
              <span className="ml-2">Download Monthly Summary</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {hodSubjectOverview.map((subject) => (
          <div key={subject.subject} className="panel p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Subject</p>
            <h3 className="mt-3 text-xl font-semibold">{subject.subject}</h3>
            <p className="mt-3 text-3xl font-semibold">{subject.attendance}%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Department average attendance</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-2 rounded-full bg-brand-600" style={{ width: `${subject.attendance}%` }} />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="panel p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Department Overview</p>
              <h3 className="mt-3 text-2xl font-semibold">Subject-wise attendance breakdown</h3>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-800">
              <p className="font-medium text-slate-800 dark:text-slate-100">Current role</p>
              <p className="mt-1 text-slate-500 dark:text-slate-400">{user?.role?.replace("_", " ")}</p>
            </div>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hodSubjectOverview}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                <XAxis dataKey="subject" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }} />
                <Bar dataKey="attendance" radius={[14, 14, 0, 0]}>
                  {hodSubjectOverview.map((entry) => (
                    <Cell key={entry.subject} fill={entry.attendance >= 85 ? "#2563eb" : entry.attendance >= 75 ? "#38bdf8" : "#f59e0b"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Faculty Activity Tracker</p>
              <h3 className="mt-3 text-2xl font-semibold">Attendance taken today</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium dark:bg-slate-800">
              {facultyTaken} of {facultyTrackerSeed.length} submitted
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MiniMetric label="Taken" value={facultyTaken} />
            <MiniMetric label="Pending" value={facultyPending} />
          </div>

          <div className="mt-5 space-y-3">
            {facultyTrackerSeed.map((teacher) => (
              <div key={teacher.teacher} className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{teacher.teacher}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{teacher.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold", teacher.status === "Taken" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200")}>
                      {teacher.status}
                    </span>
                    <p className="mt-2 text-xs text-slate-400">{teacher.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="panel p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leave Approvals</p>
              <h3 className="mt-3 text-2xl font-semibold">Pending student leave requests</h3>
            </div>
            <div className="rounded-full bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 dark:bg-sky-950/30 dark:text-sky-200">
              {leaveTable.getRowModel().rows.length} pending
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                {leaveTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="pb-3 pr-4 font-medium">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {leaveTable.getRowModel().rows.map((row) => (
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

        <div className="panel p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Student Defaulters</p>
              <h3 className="mt-3 text-2xl font-semibold">Bulk follow-up list</h3>
            </div>
            <button type="button" onClick={handleBulkAlert} className="inline-flex items-center rounded-xl bg-rose-600 px-4 py-2.5 font-medium text-white transition hover:bg-rose-700">
              <Send size={18} />
              <span className="ml-2">Send Bulk Alerts</span>
            </button>
          </div>

          {bulkAlertSent ? (
            <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
              Bulk alert draft prepared for {defaulters.length} defaulters.
            </p>
          ) : null}

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                {defaulterTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="pb-3 pr-4 font-medium">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {defaulterTable.getRowModel().rows.map((row) => (
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

      <section className="panel p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Batch Comparison</p>
            <h3 className="mt-3 text-2xl font-semibold">Attendance comparison by batch</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Compare the same subject across batches to identify sections needing intervention.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-800">
            Comparing all batches for core department subjects
          </div>
        </div>

        <div className="mt-6 h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hodSubjectOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="subject" tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }} />
              <Bar dataKey="batchA" fill="#2563eb" radius={[10, 10, 0, 0]} />
              <Bar dataKey="batchB" fill="#38bdf8" radius={[10, 10, 0, 0]} />
              <Bar dataKey="batchC" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {isBulkAlertOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-rose-500">Bulk Alert Preview</p>
                <h3 className="mt-3 text-2xl font-semibold">Send defaulter notifications</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  This will prepare attendance warning alerts for all students currently below the attendance threshold.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBulkAlertOpen(false)}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white"
                aria-label="Close bulk alert preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <BulkAlertMetric label="Students" value={`${defaulters.length}`} />
              <BulkAlertMetric label="Channel" value="Email + Parent Follow-up" />
              <BulkAlertMetric label="Threshold" value="Below 75%" />
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">Recipients</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Attendance risk group</p>
              </div>

              <div className="mt-4 space-y-3">
                {defaulters.map((student) => (
                  <div
                    key={student.id}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {student.roll} • {student.subject} • {student.batch}
                        </p>
                      </div>
                      <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
                        {student.attendance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsBulkAlertOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-800 dark:text-slate-200"
              >
                Cancel
              </button>
              <button type="button" onClick={handleConfirmBulkAlert} className="btn-primary bg-rose-600 px-5 py-3 hover:bg-rose-700">
                <Send size={18} />
                <span className="ml-2">Confirm and Send</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function BulkAlertMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}
