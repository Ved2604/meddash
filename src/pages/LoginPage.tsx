import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { login, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [email, password, clearError]);

  const emailError =
    touched.email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ? "Enter a valid email address"
      : "";
  const passwordError =
    touched.password && password.length < 6
      ? "Password must be at least 6 characters"
      : "";
  const isValid = email && password.length >= 6 && !emailError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-200" />

          <div className="p-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 bg-brand-400 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2v16M2 10h16"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 tracking-tight">
                  MedDash
                </h1>
                <p className="text-[11px] text-gray-400">
                  Healthcare management platform
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your account to continue
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-center gap-2.5 p-3 mb-5 bg-red-50 border border-red-100 rounded-lg">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="you@hospital.com"
                  className={`input-field ${emailError ? "border-red-300 focus:border-red-400 focus:ring-red-50" : ""}`}
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-xs text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    placeholder="Enter your password"
                    className={`input-field pr-10 ${passwordError ? "border-red-300 focus:border-red-400 focus:ring-red-50" : ""}`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <Spinner size={16} />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-xs font-medium text-amber-700 mb-1">
                Demo application
              </p>
              <p className="text-[11px] text-amber-600 leading-relaxed">
                For ease of evaluation, please use the following credentials:
              </p>
              <div className="mt-2 space-y-1 text-[11px] text-amber-800 font-mono bg-amber-100/50 rounded-md px-2.5 py-1.5">
                <p>
                  Email: <span className="font-medium">admin1@meddash.com</span>
                </p>
                <p>
                  Password: <span className="font-medium">admin123</span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[11px] text-gray-400 mt-4">
              Secured by Firebase Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
