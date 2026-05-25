import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Pin,
  Search,
  Sparkles,
  StickyNote,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { getModuleWorkspace } from "../constants/moduleWorkspaceData";
import { useAuthStore } from "../store/authStore";

export default function PlaceholderPage({ title, description }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const workspace = useMemo(
    () => getModuleWorkspace(location.pathname, user?.role),
    [location.pathname, user?.role]
  );
  const [records, setRecords] = useState(workspace?.records || []);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(workspace?.filters?.[0] || "All");
  const [selectedId, setSelectedId] = useState(workspace?.records?.[0]?.id || null);
  const [draftNotes, setDraftNotes] = useState(() =>
    Object.fromEntries((workspace?.records || []).map((record) => [record.id, record.latestNote || ""]))
  );
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setRecords(workspace?.records || []);
    setQuery("");
    setActiveFilter(workspace?.filters?.[0] || "All");
    setSelectedId(workspace?.records?.[0]?.id || null);
    setDraftNotes(
      Object.fromEntries((workspace?.records || []).map((record) => [record.id, record.latestNote || ""]))
    );
    setStatusMessage("");
  }, [workspace]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const haystack = [
        record.name,
        record.subtitle,
        record.summary,
        ...(record.tags || []),
        ...(record.facts || []).map((fact) => `${fact.label} ${fact.value}`),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesFilter = activeFilter === "All" || record.filterValue === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query, records]);

  const selectedRecord = filteredRecords.length
    ? filteredRecords.find((record) => record.id === selectedId) || filteredRecords[0]
    : null;

  useEffect(() => {
    if (!selectedRecord && filteredRecords.length > 0) {
      setSelectedId(filteredRecords[0].id);
      return;
    }

    if (!filteredRecords.length && selectedId !== null) {
      setSelectedId(null);
      return;
    }

    if (selectedRecord && selectedId !== selectedRecord.id) {
      setSelectedId(selectedRecord.id);
    }
  }, [filteredRecords, selectedId, selectedRecord]);

  if (!workspace) {
    return (
      <div className="panel p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Module</p>
        <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
        <p className="mt-4 max-w-3xl text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    );
  }

  const completedTasks = selectedRecord
    ? selectedRecord.checklist.filter((item) => item.done).length
    : 0;

  const toggleChecklist = (recordId, itemId) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId
          ? {
              ...record,
              checklist: record.checklist.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
          : record
      )
    );
    setStatusMessage("Checklist updated.");
  };

  const togglePrimaryAction = (recordId) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId ? { ...record, primaryActive: !record.primaryActive } : record
      )
    );
    setStatusMessage("Action state updated.");
  };

  const togglePinned = (recordId) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId ? { ...record, pinned: !record.pinned } : record
      )
    );
    setStatusMessage("Focus pin updated.");
  };

  const saveNote = (recordId) => {
    const nextNote = (draftNotes[recordId] || "").trim();
    if (!nextNote) {
      return;
    }

    setRecords((current) =>
      current.map((record) =>
        record.id === recordId ? { ...record, latestNote: nextNote } : record
      )
    );
    setStatusMessage("Note saved to this workspace item.");
  };

  const handleQuickAction = (action) => {
    if (action.filter) {
      setActiveFilter(action.filter);
    }
    if (action.query) {
      setQuery(action.query);
    }
    if (action.selectId) {
      setSelectedId(action.selectId);
    }
    setStatusMessage(`${action.label} ready.`);
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel overflow-hidden p-0">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_28%),linear-gradient(135deg,_rgba(37,99,235,0.08),_rgba(14,165,233,0.06))] px-5 py-6 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">{workspace.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold">{workspace.title}</h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
                {workspace.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {workspace.quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleQuickAction(action)}
                  className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  <Sparkles size={16} />
                  <span className="ml-2">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {workspace.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{stat.label}</p>
                <h3 className="mt-3 text-2xl font-semibold">{stat.value}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="panel p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
              <Search size={18} className="text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={workspace.searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {workspace.filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={clsx(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    activeFilter === filter
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {filteredRecords.length ? (
              filteredRecords.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => setSelectedId(record.id)}
                  className={clsx(
                    "soft-enter w-full rounded-[1.6rem] border p-4 text-left transition",
                    selectedRecord?.id === record.id
                      ? "border-brand-300 bg-brand-50/60 dark:border-brand-900 dark:bg-brand-950/20"
                      : "border-slate-200 bg-white/90 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-950/70"
                  )}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{record.name}</h3>
                        <StatusPill value={record.status} />
                        {record.pinned ? <StatusPill value="Pinned" accent="brand" /> : null}
                      </div>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{record.subtitle}</p>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{record.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {record.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sm:min-w-[124px] sm:text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{record.metricLabel}</p>
                      <p className="mt-2 text-2xl font-semibold">{record.metricValue}</p>
                      <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-2 rounded-full bg-brand-600 transition-all"
                          style={{ width: `${Math.min(record.progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-slate-300 px-6 py-10 text-center dark:border-slate-700">
                <p className="text-lg font-semibold">No items match this view</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Try a different filter or search phrase to explore this module.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="panel p-6">
            {selectedRecord ? (
              <>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Selected Record</p>
                    <h3 className="mt-3 text-2xl font-semibold">{selectedRecord.name}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {selectedRecord.subtitle}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-800">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{selectedRecord.metricLabel}</p>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">{selectedRecord.metricValue}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {selectedRecord.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{fact.label}</p>
                      <p className="mt-2 text-sm font-medium">{fact.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Checklist</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {completedTasks} / {selectedRecord.checklist.length} completed
                    </p>
                  </div>

                  <div className="mt-3 space-y-3">
                    {selectedRecord.checklist.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleChecklist(selectedRecord.id, item.id)}
                        className={clsx(
                          "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
                          item.done
                            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/20"
                            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                        )}
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.done ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Clock3 size={18} className="text-slate-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => togglePrimaryAction(selectedRecord.id)}
                    className={clsx(
                      "inline-flex items-center justify-center rounded-xl px-4 py-3 font-medium text-white transition",
                      selectedRecord.primaryActive
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-brand-600 hover:bg-brand-700"
                    )}
                  >
                    <Sparkles size={18} />
                    <span className="ml-2">
                      {selectedRecord.primaryActive
                        ? workspace.primaryAction.active
                        : workspace.primaryAction.inactive}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => togglePinned(selectedRecord.id)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 font-medium transition hover:border-brand-400 dark:border-slate-800"
                  >
                    <Pin size={18} />
                    <span className="ml-2">{selectedRecord.pinned ? "Pinned To Focus" : "Pin To Focus"}</span>
                  </button>
                </div>
              </>
            ) : null}
          </div>

          <div className="panel p-6">
            <div className="flex items-center gap-2">
              <StickyNote size={18} className="text-brand-600" />
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Working Notes</p>
            </div>

            {selectedRecord ? (
              <>
                <textarea
                  value={draftNotes[selectedRecord.id] || ""}
                  onChange={(event) =>
                    setDraftNotes((current) => ({
                      ...current,
                      [selectedRecord.id]: event.target.value,
                    }))
                  }
                  rows={5}
                  className="input mt-4 min-h-[132px] resize-none"
                  placeholder="Add a practical note, reminder, or follow-up summary for this item"
                />

                <button
                  type="button"
                  onClick={() => saveNote(selectedRecord.id)}
                  disabled={!(draftNotes[selectedRecord.id] || "").trim()}
                  className={clsx(
                    "mt-4 inline-flex items-center justify-center rounded-xl px-4 py-3 font-medium text-white transition",
                    (draftNotes[selectedRecord.id] || "").trim()
                      ? "bg-brand-600 hover:bg-brand-700"
                      : "cursor-not-allowed bg-brand-300"
                  )}
                >
                  <StickyNote size={18} />
                  <span className="ml-2">Save Note</span>
                </button>
              </>
            ) : null}

            {statusMessage ? (
              <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700 dark:border-sky-900 dark:bg-sky-950/20 dark:text-sky-200">
                {statusMessage}
              </div>
            ) : null}

            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Recent Activity</p>
              <div className="mt-4 space-y-3">
                {workspace.activity.map((item) => (
                  <div
                    key={`${item.title}-${item.time}`}
                    className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                      </div>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-100 px-4 py-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <CircleAlert size={18} className="mt-0.5 text-brand-600" />
                <p>
                  Signed in as <span className="font-medium">{user?.email}</span>. This workspace now supports
                  filtering, record selection, checklist updates, notes, and focus pinning directly inside the page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusPill({ value, accent }) {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        accent === "brand"
          ? "bg-brand-100 text-brand-700 dark:bg-brand-950/30 dark:text-brand-200"
          : getStatusTone(value)
      )}
    >
      {value}
    </span>
  );
}

function getStatusTone(value) {
  if (["Live", "Active", "Enabled", "Stable", "On Track", "Online", "Submitted"].includes(value)) {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200";
  }

  if (["Upcoming", "Pending", "Review", "Planned", "Rotation", "Mentoring", "Expansion"].includes(value)) {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-200";
  }

  if (["At Risk", "Needs Support", "Support", "Launch"].includes(value)) {
    return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-200";
  }

  return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";
}
