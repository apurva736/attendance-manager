export function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="rounded-full border-4 border-slate-200 border-t-brand-600 p-6 text-sm dark:border-slate-800">
        {label}
      </div>
    </div>
  );
}
