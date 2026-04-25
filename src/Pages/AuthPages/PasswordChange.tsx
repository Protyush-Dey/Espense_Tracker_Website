import { useState } from "react";
import { useFormik } from "formik";
import authPageLogo from "../../assets/Images/icon/logo.png";
import hideEye from "../../assets/Images/icon/hide.png";
import showEye from "../../assets/Images/icon/show.png";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../../types/authType";
import { login } from "../../api/auth.api";
import type { HTTPError } from "ky";

const PasswordChange = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (value: LoginPayload) => login(value),
    onSuccess: (data) => {
      console.log(data);
      // do remain job
    },
    onError: async (error: HTTPError) => {
      const status = await error.response.status;
      const errorData = await error.response.json();
      setStatusCode(status);
      console.log("Login failed:", errorData);
      console.log(statusCode);
    },
  });

  const formik = useFormik({
    initialValues: {
  email: "",
  otp: "",
  password: "",
    },
    validate: (values) => {
  const errors: { email?: string; otp?: string; password?: string } = {};

  if (step === 1) {
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email";
    }
  }

  if (step === 2) {
    if (!values.otp.trim()) {
      errors.otp = "OTP is required";
    } else if (values.otp.length !== 6) {
      errors.otp = "OTP must be 6 digits";
    }
  }

  if (step === 3) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least 1 uppercase letter";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Password must contain at least 1 number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
      errors.password = "Password must contain at least 1 special character";
    }
  }

  return errors;
},

    onSubmit: (values, { resetForm }) => {
  if (step === 1) {
    // call your send-OTP API here
    console.log("Send OTP to:", values.email);
    setStep(2);
  } else if (step === 2) {
    // call your verify-OTP API here
    console.log("Verify OTP:", values.otp);
    setStep(3);
  } else {
    // call your reset-password API here
    //loginMutation.mutate(values);
    console.log("new password:", values.password);
    resetForm();
  }
},
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="flex flex-col gap-8 max-w-120 min-w-75 w-75 md:w-120 rounded-xl overflow-hidden shadow-authCard bg-gray-100 h-full sm:h-fit p-6">

          <div className="flex gap-4 items-center w-full ">
            <img
              src={authPageLogo}
              alt="logo"
              className="max-w-10 min-w-5 w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="font-bold text-lg sm:text-2xl">Spendly</h1>
          </div>

          <div className="w-full flex flex-col gap-3 sm:gap-6">
            <h1 className="text-lg sm:text-2xl font-medium">Reset your password</h1>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 sm:gap-4">

  {/* STEP 1 — Email */}
  {step === 1 && (
    <div className="flex flex-col">
      <label htmlFor="email" className="font-medium text-sm sm:text-md">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 mt-4"
      />
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
      )}
    </div>
  )}

  {/* STEP 2 — OTP */}
  {step === 2 && (
    <div className="flex flex-col">
      <label htmlFor="otp" className="font-medium text-sm sm:text-md">
        Enter OTP
      </label>
      <input
        type="text"
        name="otp"
        id="otp"
        maxLength={6}
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 mt-4"
      />
      {formik.touched.otp && formik.errors.otp && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.otp}</p>
      )}
    </div>
  )}

  {/* STEP 3 — New Password */}
  {step === 3 && (
    <div className="flex flex-col">
      <label htmlFor="password" className="font-medium text-sm sm:text-md">
        New Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={isPassword ? "password" : "text"}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 w-full pr-10 mt-4"
        />
        <button
          type="button"
          onClick={() => setIsPassword((prev) => !prev)}
          className="absolute right-3 top-8.75 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {isPassword ? (
            <img src={hideEye} alt="show" />
          ) : (
            <img src={showEye} alt="hide" />
          )}
        </button>
      </div>
      {formik.touched.password && formik.errors.password && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
      )}
    </div>
  )}

  {statusCode === 401 && (
    <p className="text-center text-red-500 font-semibold">Incorrect password</p>
  )}

  <button
    type="submit"
    className="bg-blue-500 h-7 sm:h-10 w-full hover:bg-blue-600 rounded-md text-sm text-white cursor-pointer"
  >
    {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
  </button>

</form>
          </div>
        </div>
      </div>
  );
}

export default PasswordChange