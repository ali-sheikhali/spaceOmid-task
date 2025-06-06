import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
export const EditUserModal = () => {
  const validationSchema = Yup.object({
    first_name: Yup.string().required("لطفا نام را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      first_name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values:", values);
    },
  });
  return (
    <div>
      <form action="" className="flex flex-col gap-4 pb-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">
            نام را وارد کنید: <span className="text-red-500">*</span>{" "}
          </label>
          <input
            type="text"
            name="first_name"
            id="firstName"
            placeholder="نام را وارد کنید"
            className="border border-[black] rounded-md focus:outline-none px-1 py-2"
          />
        </div>
        <div className="flex justify-end">

        <button className="w-4/12 bg-green-500 rounded-md text-white flex justify-center items-center px-4 py-1">ذخیره</button>
        </div>
      </form>
    </div>
  );
};
