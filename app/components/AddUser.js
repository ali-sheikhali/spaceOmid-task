import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";
import { IoIosAdd } from "react-icons/io";
import { toast } from "sonner";

export const AddUser = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

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
      avatar: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const newUser = {
        id: Date.now(),
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        avatar: values.avatar,
      };
      dispatch(addUser(newUser));
      setIsOpen(false);
      toast.success("کاربر جدید اضافه شد.");
    },
  });

  const handleChoiceImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("avatar", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-5">
      <div>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="preview"
            className="h-[14rem] md:h-[17rem] w-full object-cover rounded-lg"
          />
        ) : (
          <label
            htmlFor="upload-file"
            className="h-[14rem] md:h-[13rem] px-4 py-2 border-2 border-dashed border-black flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
          >
            <IoIosAdd size={50} className="font-bold" />
            <p>بارگزاری عکس</p>
          </label>
        )}

        <input
          type="file"
          name="avatar"
          accept="image/*"
          id="upload-file"
          className="hidden"
          onChange={handleChoiceImage}
        />

        {formik.touched.avatar && formik.errors.avatar && (
          <div className="text-red-500 text-sm">{formik.errors.avatar}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="firstName">
          نام را وارد کنید: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="first_name"
          id="firstName"
          placeholder="نام را وارد کنید"
          className="border border-black rounded-md px-1 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName">
          نام خانوادگی را وارد کنید: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="last_name"
          id="lastName"
          placeholder="نام خانوادگی را وارد کنید"
          className="border border-black rounded-md px-1 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          ایمیل را وارد کنید: <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="ایمیل را وارد کنید"
          className="border border-black rounded-md px-1 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
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
