import { useMemo, useState } from "react";
import clsx from "clsx";
import { QRCodeSVG } from "qrcode.react";
import {
  CalendarDays,
  Check,
  Clock3,
  Lock,
  Pencil,
  QrCode,
  Search,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";

const initialStudents = [
  { id: 1, roll: "22CSE001", name: "Aarav Sharma", status: "PRESENT", photoSeed: "aarav", scannedAt: "09:01 AM", correctionReason: "" },
  { id: 2, roll: "22CSE002", name: "Diya Mehta", status: "ABSENT", photoSeed: "diya", scannedAt: null, correctionReason: "" },
  { id: 3, roll: "22CSE003", name: "Kabir Singh", status: "LATE", photoSeed: "kabir", scannedAt: "09:08 AM", correctionReason: "" },
  { id: 4, roll: "22CSE004", name: "Ishita Verma", status: "PRESENT", photoSeed: "ishita", scannedAt: "08:59 AM", correctionReason: "" },
  { id: 5, roll: "22CSE005", name: "Reyansh Patel", status: "PRESENT", photoSeed: "reyansh", scannedAt: "09:03 AM", correctionReason: "" },
  { id: 6, roll: "22CSE006", name: "Myra Nair", status: "ABSENT", photoSeed: "myra", scannedAt: null, correctionReason: "" },
  { id: 7, roll: "22CSE007", name: "Vivaan Rao", status: "PRESENT", photoSeed: "vivaan", scannedAt: "09:02 AM", correctionReason: "" },
  { id: 8, roll: "22CSE008", name: "Anaya Kapoor", status: "LATE", photoSeed: "anaya", scannedAt: "09:11 AM", correctionReason: "" },
];

const subjectOptions = ["Data Structures", "Database Systems", "Operating Systems", "Computer Networks"];
const batchOptions = ["CSE 2022 - Section A", "CSE 2022 - Section B", "CSE 2023 - Section A"];
const statusOptions = ["ALL", "PRESENT", "ABSENT", "LATE"];
const stateLabels = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
};

export default function TakeAttendancePage() {
  const [subject, setSubject] = useState(subjectOptions[0]);
  const [batch, setBatch] = useState(batchOptions[0]);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [mode, setMode] = useState("MANUAL");
  const [sessionLocked, setSessionLocked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [lockedSnapshot, setLockedSnapshot] = useState(initialStudents);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.roll.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, students]);

  const summary = useMemo(() => {
    return students.reduce(
      (accumulator, student) => {
        accumulator[student.status] += 1;
        return accumulator;
      },
      { PRESENT: 0, ABSENT: 0, LATE: 0 }
    );
  }, [students]);

  const correctionsCount = useMemo(() => {
    return students.filter((student) => {
      const lockedStudent = lockedSnapshot.find((item) => item.id === student.id);
      return lockedStudent && lockedStudent.status !== student.status;
    }).length;
  }, [lockedSnapshot, students]);

  const setStudentStatus = (id, status) => {
    if (sessionLocked && !editMode) {
      return;
    }

    setStudents((current) =>
      current.map((student) =>
        student.id === id
          ? {
              ...student,
              status,
              scannedAt: mode === "QR" && status !== "ABSENT" ? student.scannedAt || "Live scan" : student.scannedAt,
            }
          : student
      )
    );
  };

  const updateCorrectionReason = (id, value) => {
    setStudents((current) =>
      current.map((student) => (student.id === id ? { ...student, correctionReason: value } : student))
    );
  };

  const handleSubmitSession = () => {
    setSessionLocked(true);
    setEditMode(false);
    setLockedSnapshot(students.map((student) => ({ ...student })));
    setEditReason("");
  };

  const handleSaveCorrections = () => {
    setSessionLocked(true);
    setEditMode(false);
    setLockedSnapshot(students.map((student) => ({ ...student })));
    setEditReason("");
  };

  const handleEnableEditMode = () => {
    setEditMode(true);
    setSessionLocked(true);
  };

  const qrPayload = JSON.stringify({
    subject,
    batch,
    date: sessionDate,
    room: "Lab 3",
    session: "Morning Lecture",
  });

  return (
    <div className="space-y-4 pb-6">
      <section className="soft-enter panel overflow-hidden p-0">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_26%),linear-gradient(135deg,_rgba(37,99,235,0.08),_rgba(16,185,129,0.08))] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Teacher Console</p>
              <h2 className="mt-3 text-3xl font-semibold">Take Attendance</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Mark attendance manually or switch to QR mode for faster check-in. Once submitted, the session locks
                until you enter edit mode for corrections.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ModeButton active={mode === "MANUAL"} onClick={() => setMode("MANUAL")} icon={Users} label="Manual Mode" />
              <ModeButton active={mode === "QR"} onClick={() => setMode("QR")} icon={QrCode} label="QR Mode" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <SelectCard
              icon={CalendarDays}
              label="Subject"
              value={subject}
              onChange={setSubject}
              options={subjectOptions}
            />
            <SelectCard
              icon={Users}
              label="Batch"
              value={batch}
              onChange={setBatch}
              options={batchOptions}
            />
            <DateCard value={sessionDate} onChange={setSessionDate} />
            <SummaryHighlight sessionLocked={sessionLocked} editMode={editMode} />
          </div>
        </div>
      </section>

      <section className="soft-enter grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or roll number"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatusFilter(option)}
                  className={clsx(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    statusFilter === option
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  {option === "ALL" ? "All" : stateLabels[option]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryCard label="Present" value={summary.PRESENT} icon={UserCheck} tone="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-200" />
            <SummaryCard label="Absent" value={summary.ABSENT} icon={UserMinus} tone="text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-200" />
            <SummaryCard label="Late" value={summary.LATE} icon={Clock3} tone="text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-200" />
          </div>

          <div className="mt-5 space-y-3">
            {filteredStudents.map((student, index) => {
              const hasCorrection = lockedSnapshot.find((item) => item.id === student.id)?.status !== student.status;

              return (
                <div
                  key={student.id}
                  className="soft-enter rounded-[1.6rem] border border-slate-200 bg-white/90 p-4 transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-950/70"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <StudentAvatar name={student.name} />
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{student.roll}</p>
                        <h3 className="mt-1 text-lg font-semibold">{student.name}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{stateLabels[student.status]}</span>
                          {mode === "QR" && student.scannedAt ? (
                            <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700 dark:bg-sky-950/30 dark:text-sky-200">
                              Scanned {student.scannedAt}
                            </span>
                          ) : null}
                          {hasCorrection ? (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200">
                              Corrected
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:w-auto">
                      {["PRESENT", "ABSENT", "LATE"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStudentStatus(student.id, status)}
                          disabled={sessionLocked && !editMode}
                          className={clsx(
                            "rounded-2xl px-4 py-3 text-sm font-medium transition",
                            student.status === status
                              ? getStatusClass(status)
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                            sessionLocked && !editMode && "cursor-not-allowed opacity-60"
                          )}
                        >
                          {stateLabels[status]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {editMode && hasCorrection ? (
                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                      <label className="mb-2 block text-sm font-medium">Correction Reason</label>
                      <input
                        value={student.correctionReason}
                        onChange={(event) => updateCorrectionReason(student.id, event.target.value)}
                        placeholder="Reason for this attendance correction"
                        className="input"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="soft-enter panel p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">QR Attendance</p>
                <h3 className="mt-3 text-2xl font-semibold">Student self check-in</h3>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium dark:bg-slate-800">
                {mode === "QR" ? "Live" : "Inactive"}
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-dashed border-slate-300 bg-[linear-gradient(135deg,_rgba(37,99,235,0.06),_rgba(16,185,129,0.05))] p-5 text-center dark:border-slate-700">
              <div className="mx-auto inline-flex rounded-[1.5rem] bg-white p-4 shadow-lg dark:bg-slate-950">
                <QRCodeSVG value={qrPayload} size={180} level="H" includeMargin />
              </div>
              <p className="mt-4 text-sm font-medium">Scan to mark today&apos;s attendance</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Students can scan this code for {subject} in {batch}.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <MetaCard label="Room" value="Lab 3" />
              <MetaCard label="Window" value="08:55 AM - 09:15 AM" />
            </div>
          </div>

          <div className="soft-enter panel p-5 sm:p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Session Controls</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-slate-100 px-4 py-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {summary.PRESENT} present, {summary.ABSENT} absent, {summary.LATE} late
                </p>
                <p className="mt-1">
                  {sessionLocked
                    ? "This session is locked. Enable edit mode to correct records."
                    : "Review the roster and submit when the attendance session is complete."}
                </p>
              </div>

              {editMode ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                  <label className="mb-2 block text-sm font-medium text-amber-900 dark:text-amber-100">
                    Edit Reason
                  </label>
                  <textarea
                    value={editReason}
                    onChange={(event) => setEditReason(event.target.value)}
                    rows={3}
                    className="input min-h-[96px] resize-none"
                    placeholder="Explain why attendance records are being corrected"
                  />
                  <p className="mt-2 text-xs text-amber-700 dark:text-amber-200">
                    {correctionsCount} corrected {correctionsCount === 1 ? "entry" : "entries"} pending save.
                  </p>
                </div>
              ) : null}

              <div className="grid gap-3">
                {!sessionLocked ? (
                  <button type="button" onClick={handleSubmitSession} className="btn-primary w-full py-3 text-base">
                    <Lock size={18} />
                    <span className="ml-2">Submit and Lock Session</span>
                  </button>
                ) : null}

                {sessionLocked && !editMode ? (
                  <button
                    type="button"
                    onClick={handleEnableEditMode}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 font-medium transition hover:border-brand-400 dark:border-slate-800"
                  >
                    <Pencil size={18} />
                    <span className="ml-2">Enable Edit Mode</span>
                  </button>
                ) : null}

                {editMode ? (
                  <button
                    type="button"
                    onClick={handleSaveCorrections}
                    disabled={!editReason.trim()}
                    className={clsx(
                      "inline-flex items-center justify-center rounded-xl px-4 py-3 font-medium text-white transition",
                      editReason.trim()
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "cursor-not-allowed bg-emerald-300"
                    )}
                  >
                    <Check size={18} />
                    <span className="ml-2">Save Corrections</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ModeButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition",
        active
          ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
          : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      )}
    >
      <Icon size={18} />
      <span className="ml-2">{label}</span>
    </button>
  );
}

function SelectCard({ icon: Icon, label, value, onChange, options }) {
  return (
    <label className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50">
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
        <Icon size={15} />
        {label}
      </span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full bg-transparent text-sm font-medium outline-none">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateCard({ value, onChange }) {
  return (
    <label className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50">
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
        <CalendarDays size={15} />
        Date
      </span>
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full bg-transparent text-sm font-medium outline-none" />
    </label>
  );
}

function SummaryHighlight({ sessionLocked, editMode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 text-white dark:border-slate-700">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Status</p>
      <h3 className="mt-3 text-lg font-semibold">
        {editMode ? "Editing Corrections" : sessionLocked ? "Session Locked" : "Session Open"}
      </h3>
      <p className="mt-2 text-sm text-slate-300">
        {editMode
          ? "Corrections require a reason before saving."
          : sessionLocked
            ? "Attendance is frozen until edit mode is enabled."
            : "Students can still be marked manually or via QR."}
      </p>
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
        <div className={clsx("rounded-2xl p-3", tone)}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

function StudentAvatar({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 via-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-lg">
      {initials}
    </div>
  );
}

function MetaCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}

function getStatusClass(status) {
  if (status === "PRESENT") {
    return "bg-emerald-600 text-white";
  }

  if (status === "ABSENT") {
    return "bg-rose-600 text-white";
  }

  return "bg-amber-500 text-white";
}
