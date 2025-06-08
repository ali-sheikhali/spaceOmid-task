import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";
import { IoIosAdd } from "react-icons/io";
import { toast } from "sonner";
import sun from "../../public/sun.jpg";
import { IoMdClose } from "react-icons/io";

export const AddUser = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  // console.log("image prev: " , imagePreview);

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
      console.log("values: ", values);

      const newUser = {
        id: Date.now(),
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        avatar: values.avatar,
      };

      dispatch(addUser(newUser));
      toast.success("کاربر جدید اضافه شد.");

      formik.resetForm();
      setSelectedFile(null);
      setImagePreview(sun);
      // setTimeout(() => setIsOpen(false), 500);
    },
  });

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      console.log("img: ", image);
      const imageURL = URL.createObjectURL(image);
      console.log("imageURL: ", imageURL);
      setImagePreview(imageURL);
      formik.setFieldValue("avatar", image);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-5">
      {formik.values.avatar ? "عکس داره" : "عکس هنوز آپلود نشده"}
      <div>{formik.values.first_name ? "نام داره" : "نام نداره"}</div>
      <div>
        {formik.values.last_name ? "نام خانوادگی داره" : "نام خانوادگی نداره"}
      </div>
      <div>{formik.values.email ? "ایمیل داره" : "ایمیل نداره"}</div>
      <div>
        <label
          className="h-[14rem] md:h-[13rem] px-4 py-2 border-2 border-dashed border-black flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
          htmlFor="upload-image"
        >
          بارگزاری عکس
        </label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          id="upload-image"
          className="hidden"
          onChange={handleImage}
        />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="پیش‌نمایش عکس"
            className="w-40 h-40 object-cover rounded-md mt-2"
          />
        ) : (
          <div className="text-gray-500 mt-2">عکس هنوز آپلود نشده</div>
        )}
        {formik.touched.avatar && formik.errors.avatar && (
          <div className="text-red-500 text-sm">{formik.errors.avatar}</div>
        )}
      </div>

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
          <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
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
          <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
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
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
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
