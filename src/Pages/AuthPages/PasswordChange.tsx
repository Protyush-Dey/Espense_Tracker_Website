import { useState } from "react";
import { useFormik } from "formik";
import authPageLogo from "../../assets/Images/icon/logo.png";
import hideEye from "../../assets/Images/icon/hide.png";
import showEye from "../../assets/Images/icon/show.png";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { otpVerify, sendEmail, setPassword } from "../../api/auth.api";
import type { HTTPError } from "ky";

const PasswordChange = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [otp, setOtp] = useState<number>();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const navigate = useNavigate();

  const emailMutation = useMutation({
    mutationFn: (Data: { email: string }) => sendEmail(Data),
    onSuccess: (data: any) => {
      setOtp(data.data.otp);
      console.log(otp);
      setStep(2);
    },
    onError: async (error: HTTPError) => {
      const status = await error.response.status;
      const errorData = await error.response.json();
      setStatusCode(status);
      console.log(errorData);
      console.log(statusCode);
    },
  });
  const otpMutation = useMutation({
    mutationFn: (value: { email: string; otp: number }) => otpVerify(value),
    onSuccess: (data) => {
      console.log(data);
      setStep(3);
    },
    onError: async (error: HTTPError) => {
      const status = await error.response.status;
      const errorData = await error.response.json();
      setStatusCode(status);
      console.log(errorData);
      console.log(statusCode);
    },
  });
  const PaaawordMutation = useMutation({
    mutationFn: (value: { password: string }) => setPassword(value),
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
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
      otp: 0,
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
        if (!values.otp) {
          errors.otp = "OTP is required";
        } else if (!/^\d{6}$/.test(String(values.otp))) {
          errors.otp = "OTP must be exactly 6 digits";
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
          errors.password =
            "Password must contain at least 1 special character";
        }
      }

      return errors;
    },

    onSubmit: (values, { resetForm }) => {
      if (step === 1) {
        emailMutation.mutate({ email: values.email });
      } else if (step === 2) {
        otpMutation.mutate({ email: values.email, otp: values.otp });
      } else {
        PaaawordMutation.mutate({ password: values.password });
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
          <h1 className="text-lg sm:text-2xl font-medium">
            Reset your password
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 sm:gap-4"
          >
            {step === 1 && (
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-medium text-sm sm:text-md"
                >
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
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
                {statusCode == 404 ? (
                  <p className="text-red-500 text-xs mt-1">User not Found</p>
                ) : null}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col">
                <label htmlFor="otp" className="font-medium text-sm sm:text-md">
                  Enter OTP
                </label>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  maxLength={6}
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 mt-4"
                />
                {formik.touched.otp && formik.errors.otp && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.otp}
                  </p>
                )}
                {statusCode == 400 ? (
                  <p className="text-red-500 text-xs mt-1">otp timeout</p>
                ) : null}
                <p className="text-red-500 text-xs mt-1">otp:{otp}</p>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="font-medium text-sm sm:text-md"
                >
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
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
                {statusCode == 404 ? (
                  <p className="text-red-500 text-xs mt-1">Password not set</p>
                ) : null}
              </div>
            )}

            {statusCode === 401 && (
              <p className="text-center text-red-500 font-semibold">
                Incorrect password
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-500 h-7 sm:h-10 w-full hover:bg-blue-600 rounded-md text-sm text-white cursor-pointer"
            >
              {step === 1
                ? "Send OTP"
                : step === 2
                  ? "Verify OTP"
                  : "Reset Password"}
            </button>
          </form>
          <span className="text-blue-600 cursor-pointer text-end font-semibold " onClick={()=>navigate("/")}>Back to login {"->"}</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
