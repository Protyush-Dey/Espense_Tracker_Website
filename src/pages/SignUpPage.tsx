import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faSpinner,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

interface SignUpForm {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [form, setForm] = useState<SignUpForm>({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isDisabled: boolean =
    !form.fullName.trim() ||
    !form.userName.trim() ||
    !form.email.trim() ||
    !form.password.trim() ||
    loading;

  const handleSubmit = async (): Promise<void> => {
    if (isDisabled) return;
    setLoading(true);

    const payload = {
      userName: form.userName.toLowerCase(),
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    };

    // TODO: replace with API call
    // const res = await fetch("/api/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    console.log(payload);
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Create account</h2>
        <p className="text-sm text-gray-400 mb-7">Sign up to get started</p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faIdCard} className="text-xs" />
            </span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full h-11 pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faUser} className="text-xs" />
            </span>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="johndoe"
              className="w-full h-11 pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
          {form.userName && (
            <p className="text-xs text-gray-400 mt-1.5">
              Saved as{" "}
              <span className="text-emerald-500 font-medium">
                @{form.userName.toLowerCase()}
              </span>
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full h-11 pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} className="text-xs" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>

        {/* Sign in */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          
            <a href="#"
            className="text-emerald-500 hover:text-emerald-600 font-semibold transition-colors"
          >
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;