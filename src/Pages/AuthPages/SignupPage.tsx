import { useState } from "react";
import { useFormik } from "formik";
import authPageImage from "../../assets/Images/authPageImage.png";
import authPageLogo from "../../assets/Images/icon/logo.png";
import hideEye from "../../assets/Images/icon/hide.png";
import showEye from "../../assets/Images/icon/show.png";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { SignUpPayload } from "../../types/authType";
import { signup } from "../../api/auth.api";
import type { HTTPError } from "ky";

const SignupPage = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const navigate = useNavigate();
  const [statusCode, setStatusCode] = useState<number>(200);

  const signUpMutation = useMutation({
    mutationFn: (value: SignUpPayload) => signup(value),
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
      fullName: "",
      userName: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: {
        fullName?: string;
        userName?: string;
        email?: string;
        password?: string;
      } = {};

      // Empty check
      if (!values.fullName.trim()) {
        errors.fullName = "Fullname is required";
      }
      if (!values.email.trim()) {
        errors.email = "email is required";
      }
      if (!values.userName.trim()) {
        errors.userName = "UserName is required";
      }
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

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      signUpMutation.mutate(values);
      resetForm();
    },
  });
  return (
    <div className="sm:flex justify-center items-center min-h-screen bg-white sm:bg-gray-200">
      <div className="flex flex-col sm:flex-row card max-w-4xl min-w-[320px] w-full sm:w-2xl lg:w-3xl sm:rounded-xl overflow-hidden sm:dow-authCard sm:bg-gray-100 h-full sm:h-fit">
        <img
          src={authPageImage}
          alt="image"
          className="w-full sm:w-1/2 object-cover max-h-48 sm:max-h-full"
        />

        <div className="form flex flex-col items-center justify-center gap-4 sm:gap-6 w-full sm:w-1/2 px-8 py-8 bg-white sm:bg-transparent h-full sm:h-fit">
          <div className="flex gap-4 items-center w-full ">
            <img
              src={authPageLogo}
              alt="logo"
              className="max-w-10 min-w-5 w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="font-bold text-lg sm:text-2xl">Spendly</h1>
          </div>

          <div className="w-full flex flex-col gap-3 sm:gap-4">
            <h1 className="text-lg sm:text-2xl font-medium">
              Create your account
            </h1>

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3 sm:gap-2"
            >
              <div className="flex flex-col ">
                <label
                  htmlFor="fullName"
                  className="font-medium text-sm sm:text-md"
                >
                  Fullname
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 mt-2"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="userName"
                  className="font-medium text-sm sm:text-md"
                >
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 mt-2"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.userName}
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="font-medium text-sm sm:text-md"
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 mt-4"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="font-medium text-sm sm:text-md"
                  >
                    Password
                  </label>


                <div className="relative ">
                  <input
                    id="password"
                    autoComplete="email"
                    type={isPassword ? "password" : "text"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="outline-0 border border-gray-300 h-7 sm:h-10 text-sm rounded-lg p-4 w-full pr-10 mt-4"
                    onBlur={formik.handleBlur}
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
              </div>

              <button
                type="submit"
                className="bg-blue-500 h-7 sm:h-10 w-full hover:bg-blue-600 rounded-md text-sm text-white"
              >
                Sign up
              </button>

              <p className="text-lg font-semibold text-center">
                Already have an account?{" "}
                <span
                  className={`${statusCode == 409 ? "text-red-600" : "text-blue-600"} cursor-pointer hover:${statusCode == 404 ? "text-red-700" : "text-blue-700"}`}
                  onClick={() => navigate("/")}
                >
                  Log in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
