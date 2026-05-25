import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="panel max-w-lg p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Access denied</p>
        <h1 className="mt-4 text-4xl font-semibold">You do not have access to this page</h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Your role permissions do not include this route.
        </p>
        <Link to="/dashboard" className="btn-primary mt-8 inline-flex">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
