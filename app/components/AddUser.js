import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";
import { IoIosAdd } from "react-icons/io";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";

export const AddUser = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null); // برای پیش‌نمایش
  const [base64Image, setBase64Image] = useState(null); // برای ذخیره base64

  const validationSchema = Yup.object({
    first_name: Yup.string().required("لطفا نام را وارد کنید"),
    last_name: Yup.string().required("لطفا نام خانوادگی را وارد کنید"),
    email: Yup.string().required("لطفا ایمیل را وارد کنید"),
    avatar: Yup.mixed().required("لطفا عکس را وارد کنید"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      avatar: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!base64Image) {
        toast.error("لطفاً یک تصویر انتخاب کنید");
        return;
      }
      const newUser = {
        ...values,
        avatar: base64Image,
      };

      dispatch(addUser(newUser));
      toast.success("کاربر با موفقیت افزوده شد");
      setIsOpen(false);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setImage(base64);
      setBase64Image(base64);
      formik.setFieldValue("avatar", base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 pb-4">
      {image ? (
        <div className="mt-2">
          <img
            src={image}
            alt="Preview"
            className="w-full h-[10rem] border rounded"
          />
        </div>
      ) : (
        <div>
          <label
            htmlFor="image"
            className="h-[11rem] px-4 py-2 border border-black border-dashed  flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
          >
            تصویر پروفایل
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="firstName">
          نام: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="first_name"
          id="firstName"
          placeholder="نام را وارد کنید"
          className="border border-black rounded-md px-2 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="text-red-500 text-[10px]">{formik.errors.first_name}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName">
          نام خانوادگی: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="last_name"
          id="lastName"
          placeholder="نام خانوادگی را وارد کنید"
          className="border border-black rounded-md px-2 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <div className="text-red-500 text-[10px]">{formik.errors.last_name}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          ایمیل: <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="ایمیل را وارد کنید"
          className="border border-black rounded-md px-2 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-[10px]">{formik.errors.email}</div>
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
