import { useMemo, useState } from "react";
import clsx from "clsx";
import jsPDF from "jspdf";
import HodDashboardPage from "./HodDashboardPage";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalendarDays,
  Download,
  FileText,
  Plus,
  Send,
  UserPlus,
  Users,
} from "lucide-react";
import { Loader } from "../components/common/Loader";
import { ROLES } from "../constants/roles";
import { useAuthStore } from "../store/authStore";
import { useAttendanceOverview, useDashboardSummary } from "../hooks/useDashboardData";

const topStats = [
  { key: "students", label: "Total Students", value: "1,284", change: "+5.4%", tone: "from-sky-500 to-blue-600" },
  { key: "faculty", label: "Total Faculty", value: "118", change: "+2.1%", tone: "from-emerald-500 to-green-600" },
  { key: "departments", label: "Departments", value: "12", change: "Stable", tone: "from-amber-500 to-orange-600" },
  { key: "attendance", label: "Today's Attendance", value: "91.8%", change: "+1.8%", tone: "from-violet-500 to-indigo-600" },
];

const departmentAttendance = [
  { department: "CSE", attendance: 94 },
  { department: "ECE", attendance: 90 },
  { department: "ME", attendance: 86 },
  { department: "Civil", attendance: 88 },
  { department: "MBA", attendance: 92 },
  { department: "BBA", attendance: 89 },
];

const lowAttendanceAlerts = [
  { name: "Riya Sharma", department: "CSE", semester: "Sem 5", attendance: 61 },
  { name: "Aman Verma", department: "ECE", semester: "Sem 3", attendance: 58 },
  { name: "Sneha Patel", department: "MBA", semester: "Sem 1", attendance: 63 },
  { name: "Farhan Ali", department: "ME", semester: "Sem 7", attendance: 55 },
  { name: "Kavya Nair", department: "Civil", semester: "Sem 5", attendance: 60 },
];

const quickActions = [
  { label: "Add Student", icon: Users, tone: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-200" },
  { label: "Add Teacher", icon: UserPlus, tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200" },
  { label: "Generate Report", icon: FileText, tone: "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-200" },
];

const heatmapDays = [
  72, 86, 94, 91, 88, 65, 0,
  78, 84, 93, 96, 92, 71, 0,
  74, 89, 97, 95, 90, 69, 0,
  76, 83, 91, 87, 85, 62, 0,
  81, 90, 94, 92, 88, 70, 0,
];

const studentSubjects = [
  { subject: "Data Structures", held: 42, attended: 35, accent: "#10b981" },
  { subject: "Database Systems", held: 38, attended: 27, accent: "#f59e0b" },
  { subject: "Operating Systems", held: 36, attended: 22, accent: "#ef4444" },
  { subject: "Computer Networks", held: 40, attended: 31, accent: "#2563eb" },
  { subject: "Software Engineering", held: 34, attended: 26, accent: "#8b5cf6" },
];

const monthlyCalendar = [
  { day: 1, status: "present" }, { day: 2, status: "present" }, { day: 3, status: "present" }, { day: 4, status: "holiday" }, { day: 5, status: "holiday" }, { day: 6, status: "present" }, { day: 7, status: "absent" },
  { day: 8, status: "present" }, { day: 9, status: "present" }, { day: 10, status: "present" }, { day: 11, status: "present" }, { day: 12, status: "holiday" }, { day: 13, status: "holiday" }, { day: 14, status: "present" },
  { day: 15, status: "present" }, { day: 16, status: "absent" }, { day: 17, status: "present" }, { day: 18, status: "present" }, { day: 19, status: "holiday" }, { day: 20, status: "holiday" }, { day: 21, status: "present" },
  { day: 22, status: "present" }, { day: 23, status: "present" }, { day: 24, status: "present" }, { day: 25, status: "present" }, { day: 26, status: "holiday" }, { day: 27, status: "holiday" }, { day: 28, status: "present" },
  { day: 29, status: "present" }, { day: 30, status: "absent" },
];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const summaryQuery = useDashboardSummary();
  const attendanceQuery = useAttendanceOverview();

  if (summaryQuery.isLoading || attendanceQuery.isLoading) {
    return <Loader label="Loading dashboard..." />;
  }

  const backendSummary = summaryQuery.data?.summary || {};
  const backendAttendance = attendanceQuery.data || {};

  if (user?.role === ROLES.STUDENT) {
    return <StudentDashboard user={user} />;
  }

  if (user?.role === ROLES.HOD) {
    return <HodDashboardPage user={user} />;
  }

  return <AdminDashboard user={user} backendSummary={backendSummary} backendAttendance={backendAttendance} />;
}

function AdminDashboard({ user, backendSummary, backendAttendance }) {
  return (
    <div className="space-y-4 pb-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((stat) => (
          <div key={stat.key} className="panel overflow-hidden p-0">
            <div className={`bg-gradient-to-r ${stat.tone} px-5 py-4 text-white`}>
              <p className="text-sm uppercase tracking-[0.25em] text-white/80">{stat.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <h3 className="text-3xl font-semibold">{stat.value}</h3>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
              {stat.key === "departments"
                ? `${backendSummary.total_departments || 0} active academic units in the system`
                : stat.key === "attendance"
                  ? `${backendAttendance.attendanceRate || 0}% backend attendance overview`
                  : "Updated from the latest admin snapshot"}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Attendance Heatmap</p>
              <h3 className="mt-3 text-2xl font-semibold">30-day attendance pattern</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Monitor daily campus-wide attendance intensity and spot weak periods quickly.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-800">
              <p className="font-medium text-slate-800 dark:text-slate-100">Current admin view</p>
              <p className="mt-1 text-slate-500 dark:text-slate-400">{user?.role?.replace("_", " ") || "Admin"}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
            {heatmapDays.map((value, index) => (
              <div key={`${index}-${value}`} className="space-y-2">
                <div
                  className="flex aspect-square items-center justify-center rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-100"
                  style={{ backgroundColor: getHeatmapColor(value), opacity: value === 0 ? 0.45 : 1 }}
                >
                  {value === 0 ? "-" : `${value}%`}
                </div>
                <p className="text-center text-[11px] text-slate-400">{index + 1}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
            <LegendPill label="Low" color="#fee2e2" />
            <LegendPill label="Moderate" color="#bfdbfe" />
            <LegendPill label="Strong" color="#34d399" />
            <LegendPill label="Holiday / No classes" color="#e2e8f0" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Quick Actions</p>
            <div className="mt-5 grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    type="button"
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 text-left transition hover:scale-[1.01] ${action.tone}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white/80 p-3 text-current dark:bg-slate-900/60">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-medium">{action.label}</p>
                        <p className="mt-1 text-xs opacity-80">Fast admin workflow shortcut</p>
                      </div>
                    </div>
                    <Plus size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Snapshot</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <MiniMetric label="Classes Today" value={backendAttendance.todaysClasses || 0} />
              <MiniMetric label="Students Marked" value={backendAttendance.markedStudents || 0} />
              <MiniMetric label="Pending Entries" value={backendAttendance.pendingEntries || 0} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="panel p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Department Attendance</p>
          <h3 className="mt-3 text-2xl font-semibold">Department-wise performance</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Compare attendance across departments to identify operational outliers.
          </p>

          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentAttendance} margin={{ top: 12, right: 12, left: -16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                <XAxis dataKey="department" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(37, 99, 235, 0.08)" }}
                  contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}
                />
                <Bar dataKey="attendance" radius={[14, 14, 0, 0]}>
                  {departmentAttendance.map((entry) => (
                    <Cell
                      key={entry.department}
                      fill={entry.attendance >= 92 ? "#2563eb" : entry.attendance >= 88 ? "#38bdf8" : "#f59e0b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Low Attendance Alerts</p>
              <h3 className="mt-3 text-2xl font-semibold">Students needing follow-up</h3>
            </div>
            <div className="rounded-full bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
              {lowAttendanceAlerts.length} active alerts
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Semester</th>
                  <th className="pb-3 font-medium text-right">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {lowAttendanceAlerts.map((student) => (
                  <tr key={student.name} className="border-b border-slate-100 dark:border-slate-900">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{student.name}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Attendance below threshold</p>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-300">{student.department}</td>
                    <td className="py-4 text-slate-600 dark:text-slate-300">{student.semester}</td>
                    <td className="py-4 text-right">
                      <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
                        {student.attendance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentDashboard({ user }) {
  const [leaveDate, setLeaveDate] = useState(new Date().toISOString().slice(0, 10));
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const subjectSummaries = useMemo(
    () =>
      studentSubjects.map((subject) => {
        const percentage = Math.round((subject.attended / subject.held) * 100);
        const classesNeeded = Math.max(0, Math.ceil((0.75 * subject.held - subject.attended) / 0.25));
        return { ...subject, percentage, classesNeeded };
      }),
    []
  );

  const overall = useMemo(() => {
    const held = subjectSummaries.reduce((sum, subject) => sum + subject.held, 0);
    const attended = subjectSummaries.reduce((sum, subject) => sum + subject.attended, 0);
    return Math.round((attended / held) * 100);
  }, [subjectSummaries]);

  const donutData = [
    { name: "Attended", value: overall, fill: "#2563eb" },
    { name: "Gap", value: 100 - overall, fill: "#dbeafe" },
  ];

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 18);
    doc.setFontSize(11);
    doc.text(`Student: ${user?.fullName || "Student"}`, 14, 28);
    doc.text(`Overall Attendance: ${overall}%`, 14, 36);
    doc.text("Subject-wise Summary", 14, 48);

    let y = 58;
    subjectSummaries.forEach((subject) => {
      doc.text(
        `${subject.subject}: ${subject.attended}/${subject.held} classes (${subject.percentage}%)`,
        14,
        y
      );
      y += 10;
    });

    doc.save("student-attendance-report.pdf");
  };

  const handleLeaveSubmit = (event) => {
    event.preventDefault();
    if (!leaveReason.trim()) {
      return;
    }
    setLeaveSubmitted(true);
    setLeaveReason("");
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel overflow-hidden p-0">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.20),_transparent_28%),linear-gradient(135deg,_rgba(37,99,235,0.08),_rgba(14,165,233,0.06))] px-5 py-6 sm:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <StudentPhoto name={user?.fullName || "Student"} />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Student Dashboard</p>
                <h2 className="mt-2 text-3xl font-semibold">Hello, {user?.fullName || "Student"}</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                  Track subject attendance, plan recovery classes, and manage leave requests from one place.
                </p>
              </div>
            </div>

            <button type="button" onClick={handleDownloadReport} className="btn-primary w-full sm:w-auto">
              <Download size={18} />
              <span className="ml-2">Download Report</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {subjectSummaries.map((subject) => (
              <div key={subject.subject} className="panel p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Subject</p>
                    <h3 className="mt-2 text-xl font-semibold">{subject.subject}</h3>
                  </div>
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      getAttendanceBadge(subject.percentage)
                    )}
                  >
                    {subject.percentage}%
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(subject.percentage, 100)}%`, backgroundColor: subject.accent }}
                  />
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  {subject.attended} of {subject.held} classes attended
                </p>
              </div>
            ))}
          </div>

          <div className="panel p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Monthly Attendance</p>
                <h3 className="mt-3 text-2xl font-semibold">April 2026</h3>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                <LegendPill label="Present" color="#86efac" />
                <LegendPill label="Absent" color="#fecaca" />
                <LegendPill label="Holiday" color="#e2e8f0" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <p key={day} className="text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  {day}
                </p>
              ))}
              {monthlyCalendar.map((entry) => (
                <div
                  key={entry.day}
                  className="flex aspect-square flex-col items-center justify-center rounded-2xl text-xs font-semibold"
                  style={{ backgroundColor: getCalendarColor(entry.status) }}
                >
                  <span className="text-slate-800">{entry.day}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Overall Attendance</p>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    innerRadius={72}
                    outerRadius={100}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {donutData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="-mt-36 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current</p>
              <h3 className="mt-2 text-4xl font-semibold">{overall}%</h3>
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Classes Needed To Reach 75%</p>
            <div className="mt-5 space-y-3">
              {subjectSummaries.map((subject) => (
                <div key={subject.subject} className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{subject.subject}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Current attendance {subject.percentage}%
                      </p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-slate-800">
                      {subject.classesNeeded === 0 ? "On Track" : `${subject.classesNeeded} classes`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leave Application</p>
            <form onSubmit={handleLeaveSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Leave Date</label>
                <div className="relative">
                  <CalendarDays size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={leaveDate}
                    onChange={(event) => setLeaveDate(event.target.value)}
                    className="input pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Reason</label>
                <textarea
                  value={leaveReason}
                  onChange={(event) => setLeaveReason(event.target.value)}
                  rows={4}
                  className="input min-h-[120px] resize-none"
                  placeholder="Explain the reason for your leave request"
                />
              </div>

              {leaveSubmitted ? (
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
                  Leave application drafted successfully for {leaveDate}.
                </p>
              ) : null}

              <button type="submit" className="btn-primary w-full" disabled={!leaveReason.trim()}>
                <Send size={18} />
                <span className="ml-2">Submit Leave Application</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentPhoto({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-600 via-blue-500 to-cyan-500 text-2xl font-semibold text-white shadow-lg">
      {initials}
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

function LegendPill({ label, color }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

function getHeatmapColor(value) {
  if (value === 0) {
    return "#e2e8f0";
  }
  if (value < 70) {
    return "#fecaca";
  }
  if (value < 85) {
    return "#bfdbfe";
  }
  return "#6ee7b7";
}

function getAttendanceBadge(percentage) {
  if (percentage >= 75) {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200";
  }
  if (percentage >= 65) {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200";
  }
  return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-200";
}

function getCalendarColor(status) {
  if (status === "present") {
    return "#bbf7d0";
  }
  if (status === "absent") {
    return "#fecaca";
  }
  return "#e2e8f0";
}
