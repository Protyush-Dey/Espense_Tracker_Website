import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isDisabled: boolean = !loginInfo.trim() || !password.trim() || loading;

  const handleSubmit = async (): Promise<void> => {
    if (isDisabled) return;
    setLoading(true);

    // TODO: replace with API call
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ loginInfo, password }),
    // });

    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-7">Sign in to your account</p>

        {/* Username or Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Username or Email
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon
                icon={loginInfo.includes("@") ? faEnvelope : faUser}
                className="text-xs"
              />
            </span>
            <input
              type="text"
              value={loginInfo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLoginInfo(e.target.value)
              }
              placeholder="username or email"
              className="w-full h-11 pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} className="text-xs" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleSubmit()
              }
              className="w-full h-11 pl-9 pr-10 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-xs"
              />
            </button>
          </div>
        </div>

        {/* Forgot */}
        <div className="text-right mb-6">
          
            <a href="#"
            className="text-xs text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 mb-6"
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Sign up */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          
            <a href="#"
            className="text-emerald-500 hover:text-emerald-600 font-semibold transition-colors"
          >
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;