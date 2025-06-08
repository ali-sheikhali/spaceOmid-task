import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login } from "../services/auth";
import { toast } from "sonner";

export const Login = ({ setIsOpen }) => {
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().required("لطفا ایمیل را وارد کنید"),
    password: Yup.string().required("رمز عبور را وارد کنید."),
  });
  const formik = useFormik({
    initialValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError("");
        const result = await login(values);

        console.log("Login Successful, Token:", result.token);
        setIsOpen(false);
        toast.success("ورود با موفقیت انجام شد.");
      } catch (err) {
        const message =
          err.response?.data?.error || "خطای ناشناخته‌ای رخ داده است.";
        setError(message);
        toast.error("کاربر شناخته نشد");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          ایمیل: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="ایمیل را وارد کنید"
          className="border border-black rounded-md px-2 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">
          رمز عبور: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="رمز عبور را وارد کنید"
          className="border border-black rounded-md px-2 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-4/12 cursor-pointer bg-green-500 rounded-md text-white flex justify-center items-center px-4 py-2"
        >
          ذخیره
        </button>
      </div>
    </form>
  );
};
