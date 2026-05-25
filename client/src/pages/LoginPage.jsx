import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Mail,
  ShieldCheck,
  UserPlus,
  UserSquare2,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser, registerUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

const roleOptions = [
  {
    label: "Admin",
    value: "ADMIN",
    email: "admin@college.edu",
    password: "password123",
    accent: "Manage users, departments, and college-wide controls.",
  },
  {
    label: "Teacher",
    value: "TEACHER",
    email: "teacher@college.edu",
    password: "password123",
    accent: "Track classes, mark attendance, and review student progress.",
  },
  {
    label: "Student",
    value: "STUDENT",
    email: "student@college.edu",
    password: "password123",
    accent: "View attendance, courses, and personal academic insights.",
  },
  {
    label: "HOD",
    value: "HOD",
    email: "hod@college.edu",
    password: "password123",
    accent: "Oversee department schedules, faculty, and attendance trends.",
  },
];

const loginSchema = z.object({
  role: z.enum(["ADMIN", "TEACHER", "STUDENT", "HOD"], {
    errorMap: () => ({ message: "Select a role to continue." }),
  }),
  email: z.string().min(1, "Email is required.").email("Enter a valid college email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters long."),
});

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    role: z.enum(["ADMIN", "TEACHER", "STUDENT", "HOD"], {
      errorMap: () => ({ message: "Select a role to continue." }),
    }),
    email: z.string().min(1, "Email is required.").email("Enter a valid college email address."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const otpSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Enter a valid email address."),
  otp: z
    .string()
    .min(1, "OTP is required.")
    .regex(/^\d{6}$/, "OTP must be a 6-digit code."),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, token, user, isBootstrapping } = useAuthStore((state) => ({
    setAuth: state.setAuth,
    token: state.token,
    user: state.user,
    isBootstrapping: state.isBootstrapping,
  }));
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const activeMode = location.pathname === "/signup" ? "signup" : "login";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      role: selectedRole.value,
      email: selectedRole.email,
      password: selectedRole.password,
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      role: selectedRole.value,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onTouched",
    defaultValues: {
      email: selectedRole.email,
      otp: "",
    },
  });

  useEffect(() => {
    if (!isBootstrapping && token && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [isBootstrapping, navigate, token, user]);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate("/dashboard", { replace: true });
    },
  });

  const signupMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate("/dashboard", { replace: true });
    },
  });

  const loginErrorMessage = loginMutation.isError
    ? loginMutation.error?.response?.data?.message ||
      "Cannot reach the server right now. Make sure the backend is running on import.meta.env.VITE_API_BASE_URL."
    : null;

  const signupErrorMessage = signupMutation.isError
    ? signupMutation.error?.response?.data?.message ||
      "Unable to create the account right now. Make sure the backend is running and try again."
    : null;

  const activeAccent = selectedRole.accent;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    form.setValue("role", role.value, { shouldValidate: true });
    form.setValue("email", role.email, { shouldValidate: activeMode === "login" });
    form.setValue("password", role.password, { shouldValidate: activeMode === "login" });
    form.clearErrors();

    signupForm.setValue("role", role.value, { shouldValidate: true });
    signupForm.clearErrors("role");
    otpForm.setValue("email", form.getValues("email"));
  };

  const handleModeChange = (mode) => {
    loginMutation.reset();
    signupMutation.reset();
    navigate(mode === "signup" ? "/signup" : "/login", { replace: true });
  };

  const submitLogin = form.handleSubmit((values) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  });

  const submitSignup = signupForm.handleSubmit((values) => {
    signupMutation.mutate({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role: values.role,
    });
  });

  const submitOtp = otpForm.handleSubmit(() => {
    setIsOtpModalOpen(false);
    otpForm.reset({
      email: form.getValues("email"),
      otp: "",
    });
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(8,145,178,0.18),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] px-4 py-4 sm:px-6 sm:py-6 dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="auth-entrance relative overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.34),_transparent_30%),radial-gradient(circle_at_80%_30%,_rgba(34,197,94,0.18),_transparent_22%),radial-gradient(circle_at_50%_80%,_rgba(14,165,233,0.18),_transparent_28%)]" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sky-200">College AMS</p>
                <p className="text-sm text-slate-200">Attendance Management Portal</p>
              </div>
            </div>

            <div className="mt-8 max-w-xl sm:mt-12">
              <p className="text-sm uppercase tracking-[0.4em] text-sky-200">Trusted campus operations</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Start with a secure account, then continue into your attendance workspace.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                The app now opens with authentication first, so users can create an account or sign in before entering
                any dashboard, attendance, or reporting module.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <BrandPill title="Role-Aware Access" description="Admin, HOD, Teacher, and Student each get focused modules." />
              <BrandPill title="Secure Login" description="JWT-based access keeps protected pages behind authentication." />
              <BrandPill title="Simple Onboarding" description="New users can register directly from the first screen." />
              <BrandPill title="Demo Ready" description="Demo credentials stay visible for quick project walkthroughs." />
            </div>

            <div className="relative mt-8 flex flex-1 items-end justify-center lg:mt-10">
              <CollegeIllustration />
            </div>
          </div>
        </section>

        <section className="auth-entrance-delayed flex items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.38em] text-brand-600">
                {activeMode === "signup" ? "Create Account" : "Secure Login"}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {activeMode === "signup" ? "Create your attendance account" : "Sign in to the attendance dashboard"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {activeMode === "signup"
                  ? "Choose a role, enter your details, and the app will create your account before opening your workspace."
                  : "Select your role, confirm your credentials, and continue to your personalized workspace."}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-3 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleModeChange("login")}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    activeMode === "login"
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("signup")}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    activeMode === "signup"
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-3 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {roleOptions.map((role) => {
                  const isActive = selectedRole.value === role.value;

                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className={`rounded-2xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                          : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/80 px-4 py-4 text-sm text-sky-900 dark:border-sky-950 dark:bg-sky-950/20 dark:text-sky-100">
              <p className="font-medium">{selectedRole.label} access</p>
              <p className="mt-1 text-sm opacity-80">{activeAccent}</p>
            </div>

            {activeMode === "login" ? (
              <>
                <form onSubmit={submitLogin} className="mt-8 space-y-5" noValidate>
                  <input type="hidden" {...form.register("role")} />

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      College Email
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="email"
                        type="email"
                        className="input pl-11"
                        placeholder="name@college.edu"
                        {...form.register("email")}
                      />
                    </div>
                    {form.formState.errors.email ? (
                      <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                        {form.formState.errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label htmlFor="password" className="block text-sm font-medium">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          otpForm.setValue("email", form.getValues("email"));
                          setIsOtpModalOpen(true);
                        }}
                        className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="password"
                        type={showLoginPassword ? "text" : "password"}
                        className="input pl-11 pr-12"
                        placeholder="Enter your password"
                        {...form.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((current) => !current)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {form.formState.errors.password ? (
                      <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                        {form.formState.errors.password.message}
                      </p>
                    ) : null}
                  </div>

                  {loginMutation.isError ? (
                    <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-950 dark:bg-rose-950/20 dark:text-rose-300">
                      {loginErrorMessage}
                    </p>
                  ) : null}

                  <button type="submit" className="btn-primary w-full py-3 text-base" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Signing in..." : `Continue as ${selectedRole.label}`}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
                  Need a new account?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeChange("signup")}
                    className="font-medium text-brand-600 transition hover:text-brand-700"
                  >
                    Open sign up
                  </button>
                </p>

                <div className="mt-6 grid gap-3 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2">
                  <CredentialCard icon={<ShieldCheck size={18} />} label="Demo Email" value={selectedRole.email} />
                  <CredentialCard icon={<UserSquare2 size={18} />} label="Demo Password" value={selectedRole.password} />
                </div>
              </>
            ) : (
              <>
                <form onSubmit={submitSignup} className="mt-8 space-y-5" noValidate>
                  <input type="hidden" {...signupForm.register("role")} />

                  <FormField
                    id="fullName"
                    label="Full Name"
                    icon={<UserSquare2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />}
                    error={signupForm.formState.errors.fullName?.message}
                  >
                    <input
                      id="fullName"
                      type="text"
                      className="input pl-11"
                      placeholder="Enter your full name"
                      {...signupForm.register("fullName")}
                    />
                  </FormField>

                  <FormField
                    id="signup-email"
                    label="College Email"
                    icon={<Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />}
                    error={signupForm.formState.errors.email?.message}
                  >
                    <input
                      id="signup-email"
                      type="email"
                      className="input pl-11"
                      placeholder="name@college.edu"
                      {...signupForm.register("email")}
                    />
                  </FormField>

                  <FormField
                    id="signup-password"
                    label="Create Password"
                    icon={<KeyRound size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />}
                    error={signupForm.formState.errors.password?.message}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword((current) => !current)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  >
                    <input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      className="input pl-11 pr-12"
                      placeholder="Create a password"
                      {...signupForm.register("password")}
                    />
                  </FormField>

                  <FormField
                    id="confirm-password"
                    label="Confirm Password"
                    icon={<KeyRound size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />}
                    error={signupForm.formState.errors.confirmPassword?.message}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowSignupConfirmPassword((current) => !current)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={showSignupConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  >
                    <input
                      id="confirm-password"
                      type={showSignupConfirmPassword ? "text" : "password"}
                      className="input pl-11 pr-12"
                      placeholder="Re-enter your password"
                      {...signupForm.register("confirmPassword")}
                    />
                  </FormField>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    New {selectedRole.label.toLowerCase()} accounts are created inside the system and signed in immediately after registration.
                  </div>

                  {signupMutation.isError ? (
                    <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-950 dark:bg-rose-950/20 dark:text-rose-300">
                      {signupErrorMessage}
                    </p>
                  ) : null}

                  <button type="submit" className="btn-primary w-full py-3 text-base" disabled={signupMutation.isPending}>
                    {signupMutation.isPending ? "Creating account..." : `Create ${selectedRole.label} Account`}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeChange("login")}
                    className="font-medium text-brand-600 transition hover:text-brand-700"
                  >
                    Go to login
                  </button>
                </p>

                <div className="mt-6">
                  <CredentialCard
                    icon={<UserPlus size={18} />}
                    label="Signup Flow"
                    value="Create account, auto sign in, then continue to the dashboard."
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {isOtpModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-brand-600">Password Recovery</p>
                <h3 className="mt-3 text-2xl font-semibold">Verify with OTP</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter your college email and the 6-digit OTP sent to your inbox to continue password recovery.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOtpModalOpen(false)}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white"
                aria-label="Close OTP modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitOtp} className="mt-6 space-y-5" noValidate>
              <div>
                <label htmlFor="otp-email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="otp-email"
                  type="email"
                  className="input"
                  placeholder="name@college.edu"
                  {...otpForm.register("email")}
                />
                {otpForm.formState.errors.email ? (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                    {otpForm.formState.errors.email.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="otp-code" className="mb-2 block text-sm font-medium">
                  OTP Code
                </label>
                <input
                  id="otp-code"
                  inputMode="numeric"
                  maxLength={6}
                  className="input tracking-[0.4em]"
                  placeholder="123456"
                  {...otpForm.register("otp")}
                />
                {otpForm.formState.errors.otp ? (
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                    {otpForm.formState.errors.otp.message}
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                Demo flow note: this modal is UI-ready and can be connected to an OTP API for request and verify steps.
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-5 py-3">
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FormField({ id, label, icon, trailing = null, error = null, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {icon}
        {children}
        {trailing}
      </div>
      {error ? <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p> : null}
    </div>
  );
}

function BrandPill({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
      <p className="font-medium text-white">{title}</p>
      <p className="mt-1 text-sm text-slate-300">{description}</p>
    </div>
  );
}

function CredentialCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-slate-800 dark:text-sky-300">
          {icon}
        </div>
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">{label}</p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{value}</p>
        </div>
      </div>
    </div>
  );
}

function CollegeIllustration() {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-sky-400/20 blur-2xl" />
      <div className="absolute right-10 top-20 h-24 w-24 rounded-full bg-emerald-400/15 blur-3xl" />
      <svg
        viewBox="0 0 560 360"
        className="relative z-10 h-auto w-full drop-shadow-[0_24px_60px_rgba(15,23,42,0.35)]"
        role="img"
        aria-label="College campus illustration"
      >
        <defs>
          <linearGradient id="campusA" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="campusB" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        <rect x="48" y="280" width="464" height="20" rx="10" fill="rgba(148,163,184,0.28)" />
        <rect x="82" y="130" width="396" height="154" rx="28" fill="url(#campusA)" />
        <rect x="150" y="72" width="260" height="72" rx="24" fill="#e0f2fe" />
        <rect x="240" y="42" width="82" height="50" rx="20" fill="#f8fafc" />
        <path d="M281 40 L324 60 L281 80 L238 60 Z" fill="#1d4ed8" />
        <rect x="256" y="82" width="50" height="40" rx="12" fill="#bfdbfe" />
        <rect x="122" y="164" width="68" height="54" rx="14" fill="#eff6ff" />
        <rect x="210" y="164" width="68" height="54" rx="14" fill="#eff6ff" />
        <rect x="298" y="164" width="68" height="54" rx="14" fill="#eff6ff" />
        <rect x="386" y="164" width="68" height="54" rx="14" fill="#eff6ff" />
        <rect x="244" y="206" width="72" height="78" rx="18" fill="url(#campusB)" />
        <path d="M0 318 C90 280 175 305 250 318 C330 332 400 348 560 306 V360 H0 Z" fill="#16a34a" opacity="0.82" />
        <circle cx="84" cy="78" r="26" fill="#fbbf24" />
        <path d="M90 228 C112 210 122 192 126 165" stroke="#14532d" strokeWidth="8" strokeLinecap="round" />
        <circle cx="120" cy="150" r="28" fill="#4ade80" opacity="0.95" />
        <circle cx="144" cy="165" r="24" fill="#22c55e" opacity="0.95" />
        <circle cx="96" cy="170" r="24" fill="#86efac" opacity="0.95" />
        <path d="M465 232 C444 215 434 192 428 162" stroke="#14532d" strokeWidth="8" strokeLinecap="round" />
        <circle cx="434" cy="150" r="28" fill="#4ade80" opacity="0.95" />
        <circle cx="408" cy="166" r="24" fill="#22c55e" opacity="0.95" />
        <circle cx="458" cy="172" r="24" fill="#86efac" opacity="0.95" />
      </svg>
    </div>
  );
}
