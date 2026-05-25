import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  BellRing,
  Copy,
  Eye,
  Link as LinkIcon,
  Mail,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";

const rulePresets = [
  { id: 1, title: "Low Attendance Warning", scope: "All departments", threshold: 75, active: true },
  { id: 2, title: "Critical Attendance Escalation", scope: "Final year batches", threshold: 65, active: true },
  { id: 3, title: "Parent Escalation Trigger", scope: "Below 60% attendance", threshold: 60, active: false },
];

const inboxSeed = [
  { id: 1, title: "Warning sent to 18 students", detail: "Attendance dropped below 75% in Computer Science.", unread: true, time: "09:10 AM" },
  { id: 2, title: "Parent links generated", detail: "5 new parent portal links created for Batch 2022 - A.", unread: true, time: "08:40 AM" },
  { id: 3, title: "Template updated", detail: "Attendance warning email template edited by Admin.", unread: false, time: "Yesterday" },
  { id: 4, title: "Escalation report ready", detail: "Printable alert summary is available for review.", unread: false, time: "Yesterday" },
];

const autoAlertSeed = [
  { name: "Rohan Malhotra", roll: "22CSE019", subject: "Operating Systems", attendance: 58, channel: "Email + Parent Link" },
  { name: "Sana Iqbal", roll: "22ECE011", subject: "Computer Networks", attendance: 63, channel: "Email" },
  { name: "Karan Mehta", roll: "22MEC017", subject: "Engineering Mathematics", attendance: 61, channel: "Email + Parent Link" },
  { name: "Zoya Khan", roll: "22CIV013", subject: "Structural Analysis", attendance: 59, channel: "Email" },
];

const parentLinkSeed = [
  { student: "Aarav Sharma", parent: "Mr. Sharma", link: "https://portal.college.edu/parent/aarav-001" },
  { student: "Diya Mehta", parent: "Mrs. Mehta", link: "https://portal.college.edu/parent/diya-002" },
  { student: "Kabir Singh", parent: "Mr. Singh", link: "https://portal.college.edu/parent/kabir-003" },
];

const historySeed = [
  { id: "ALR-1021", event: "Attendance warning emailed", recipients: "18 students", status: "Delivered", time: "Today, 09:10 AM" },
  { id: "ALR-1019", event: "Parent escalation batch", recipients: "5 parents", status: "Queued", time: "Today, 08:40 AM" },
  { id: "ALR-1016", event: "Reminder follow-up", recipients: "12 students", status: "Delivered", time: "Yesterday, 04:20 PM" },
  { id: "ALR-1012", event: "Template test send", recipients: "Admin mailbox", status: "Delivered", time: "Yesterday, 11:30 AM" },
];

const buildEmailTemplate = (student) => `Subject: Attendance Warning Notice

Dear ${student.name},

Your current attendance in ${student.subject} is ${student.attendance}%, which is below the configured threshold of 75%.

Please attend upcoming classes regularly to avoid escalation. If you need help, contact your class teacher or department office.

Regards,
College Attendance Office`;

export default function NotificationsAlertsPage() {
  const [rules, setRules] = useState(rulePresets);
  const [inbox, setInbox] = useState(inboxSeed);
  const [selectedAlertStudent, setSelectedAlertStudent] = useState(autoAlertSeed[0]);
  const [template, setTemplate] = useState(buildEmailTemplate(autoAlertSeed[0]));
  const [selectedStudentLink, setSelectedStudentLink] = useState(parentLinkSeed[0]);
  const [copiedLink, setCopiedLink] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const unreadCount = useMemo(() => inbox.filter((item) => item.unread).length, [inbox]);

  const toggleRule = (id) => {
    setRules((current) =>
      current.map((rule) => (rule.id === id ? { ...rule, active: !rule.active } : rule))
    );
  };

  const markAsRead = (id) => {
    setInbox((current) =>
      current.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const handleCopyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(link);
    } catch (error) {
      setCopiedLink(link);
    }
  };

  const handleSelectAlertStudent = (student) => {
    setSelectedAlertStudent(student);
    setTemplate(buildEmailTemplate(student));
  };

  const handlePreviewEmail = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel overflow-hidden p-0">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_28%),linear-gradient(135deg,_rgba(37,99,235,0.05),_rgba(16,185,129,0.04))] px-5 py-6 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Notifications & Alerts</p>
              <h2 className="mt-3 text-3xl font-semibold">Attendance communication center</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Configure alert rules, preview today&apos;s notifications, manage parent access links, and review delivery history.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <TopBadge icon={BellRing} label="Unread Inbox" value={`${unreadCount}`} />
              <TopBadge icon={ShieldAlert} label="Rules Active" value={`${rules.filter((rule) => rule.active).length}`} />
              <TopBadge icon={Send} label="Alerts Today" value={`${autoAlertSeed.length}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="panel p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Alert Rules</p>
                <h3 className="mt-3 text-2xl font-semibold">Admin rule configuration</h3>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium dark:bg-slate-800">
                Clean & minimal controls
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {rules.map((rule) => (
                <div key={rule.id} className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{rule.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Scope: {rule.scope} • Trigger below {rule.threshold}%
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleRule(rule.id)}
                      className={clsx(
                        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
                        rule.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      )}
                    >
                      {rule.active ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Notification Inbox</p>
                <h3 className="mt-3 text-2xl font-semibold">Read and unread activity</h3>
              </div>
              <div className="rounded-full bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 dark:bg-sky-950/30 dark:text-sky-200">
                {unreadCount} unread
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {inbox.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markAsRead(item.id)}
                  className={clsx(
                    "flex w-full items-start justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition",
                    item.unread
                      ? "border-brand-200 bg-brand-50/60 dark:border-brand-900 dark:bg-brand-950/20"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {item.unread ? <span className="h-2.5 w-2.5 rounded-full bg-brand-600" /> : null}
                      <p className="font-medium">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Auto-Alert Preview</p>
            <h3 className="mt-3 text-2xl font-semibold">Students scheduled for notification today</h3>
            <div className="mt-5 space-y-3">
              {autoAlertSeed.map((student) => (
                <button
                  key={student.roll}
                  type="button"
                  onClick={() => handleSelectAlertStudent(student)}
                  className={clsx(
                    "w-full rounded-2xl border px-4 py-4 text-left transition",
                    selectedAlertStudent.roll === student.roll
                      ? "border-brand-400 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/20"
                      : "border-slate-200 dark:border-slate-800"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {student.roll} • {student.subject} • Attendance {student.attendance}%
                      </p>
                    </div>
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
                      {student.channel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Parent Portal Links</p>
            <h3 className="mt-3 text-2xl font-semibold">Secure access generator</h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {parentLinkSeed.map((entry) => (
                <button
                  key={entry.student}
                  type="button"
                  onClick={() => setSelectedStudentLink(entry)}
                  className={clsx(
                    "rounded-2xl border px-4 py-4 text-left transition",
                    selectedStudentLink.student === entry.student
                      ? "border-brand-400 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/20"
                      : "border-slate-200 dark:border-slate-800"
                  )}
                >
                  <p className="font-medium">{entry.student}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{entry.parent}</p>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <LinkIcon size={16} />
                Active link
              </div>
              <p className="mt-3 break-all text-sm font-medium">{selectedStudentLink.link}</p>
              <button
                type="button"
                onClick={() => handleCopyLink(selectedStudentLink.link)}
                className="mt-4 inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:border-brand-400 dark:border-slate-800"
              >
                <Copy size={16} />
                <span className="ml-2">
                  {copiedLink === selectedStudentLink.link ? "Copied" : "Copy Link"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="panel p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Email Template Editor</p>
              <h3 className="mt-3 text-2xl font-semibold">Attendance warning message</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium dark:bg-slate-800">
              {selectedAlertStudent.name}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            This draft is currently prepared for <strong>{selectedAlertStudent.name}</strong> in{" "}
            <strong>{selectedAlertStudent.subject}</strong> with attendance at{" "}
            <strong>{selectedAlertStudent.attendance}%</strong>.
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Template Body</label>
            <textarea
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
              rows={14}
              className="input min-h-[320px] resize-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-primary">
              <Mail size={18} />
              <span className="ml-2">Save Template</span>
            </button>
            <button
              type="button"
              onClick={handlePreviewEmail}
              className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2.5 font-medium transition hover:border-brand-400 dark:border-slate-800"
            >
              <Eye size={18} />
              <span className="ml-2">Preview Email</span>
            </button>
          </div>
        </div>

        <div className="panel p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Notification History</p>
          <h3 className="mt-3 text-2xl font-semibold">Delivery log</h3>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 font-medium">Log ID</th>
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">Recipients</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {historySeed.map((entry) => (
                  <tr key={entry.id} className="border-b border-slate-100 dark:border-slate-900">
                    <td className="py-4 pr-4 font-medium">{entry.id}</td>
                    <td className="py-4 pr-4">{entry.event}</td>
                    <td className="py-4 pr-4 text-slate-500 dark:text-slate-400">{entry.recipients}</td>
                    <td className="py-4 pr-4">
                      <span
                        className={clsx(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          entry.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200"
                        )}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-500 dark:text-slate-400">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {isPreviewOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-brand-600">Email Preview</p>
                <h3 className="mt-3 text-2xl font-semibold">Attendance warning email</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Previewing the message prepared for {selectedAlertStudent.name} about {selectedAlertStudent.subject}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white"
                aria-label="Close email preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-3 sm:grid-cols-3">
                <PreviewMeta label="To" value={selectedAlertStudent.name} />
                <PreviewMeta label="Roll No." value={selectedAlertStudent.roll} />
                <PreviewMeta label="Channel" value={selectedAlertStudent.channel} />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                <pre className="whitespace-pre-wrap font-inherit">{template}</pre>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-800 dark:text-slate-200"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => setTemplate(buildEmailTemplate(selectedAlertStudent))}
                className="btn-primary px-5 py-3"
              >
                Use This Draft
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TopBadge({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</p>
          <p className="mt-1 text-lg font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PreviewMeta({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}
