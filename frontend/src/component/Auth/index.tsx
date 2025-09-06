import { useState } from "react";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { loginUser, registerUser } from "../../service/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let resp;
      if (mode === "login") {
        // Call login API
        resp = await loginUser(formData.email, formData.password);
      } else {
        // Call register API
        resp = await registerUser(formData.email, formData.password);
      }
      // Save token (adjust according to backend response shape)
      console.log(resp, "dfghj");
      localStorage.setItem("token", resp.tokens.access);
      navigate("/jobs");
    } catch (error: any) {
      console.error(`${mode} failed`, error.response?.data || error.message);
      alert(error.response?.data?.message || `${mode} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-slate-900/90 flex items-center justify-center p-2 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg shadow-blue-500/25">
                <FiLock size={32} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back
              </h1>
              <p className="text-slate-400">Please sign in to your account</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-xl text-white font-medium transition-all duration-200 hover:border-slate-600 group"
              >
                <FaGoogle size={18} />
                <span className="hidden sm:inline">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin("GitHub")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-xl text-white font-medium transition-all duration-200 hover:border-slate-600 group"
              >
                <FaGithub size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-slate-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <FiMail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <FiLock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-12 py-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors p-1"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500/50 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-300">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/25 mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {mode === "login" ? "Signing in..." : "Signing up..."}
                  </div>
                ) : mode === "login" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={() =>
                    setMode(mode === "login" ? "register" : "login")
                  }
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {mode == "login" ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
