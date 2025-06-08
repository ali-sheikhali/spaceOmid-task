import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { editUser } from "../store/usersSlice";
import { toast } from "sonner";

export const EditUserModal = ({ setIsOpen, editUserData }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("لطفا نام را وارد کنید"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: editUserData?.first_name || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(editUser({ id: editUserData.id, updatedUser: values }));
      setIsOpen(false);
      formik.resetForm();
      toast.success("کاربر با موفقیت اصلاح شد.")
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-10">
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName">
          نام را وارد کنید: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="first_name"
          id="firstName"
          placeholder="نام را وارد کنید"
          className="border border-[black] rounded-md focus:outline-none px-1 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="w-4/12 bg-green-500 rounded-md text-white flex justify-center items-center px-4 py-1"
        >
          ذخیره
        </button>
      </div>
    </form>
  );
};
