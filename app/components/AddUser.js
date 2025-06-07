import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";
import { IoIosAdd } from "react-icons/io";

export const AddUser = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = React.useState(null);

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
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("avatar: " , values.avatar);
      
      const newUser = {
        id: Date.now(),
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        avatar: values.avatar,
      };
      dispatch(addUser(newUser));
      setIsOpen(false);
      formik.resetForm();
    },
  });

  const handleChoiceImage = (e) => {
    console.log("event: " , e);
    
    const file = e.target.files[0];
    console.log("log:" , file);
    
    if (file) {
    formik.setFieldValue("avatar", file); // فایل واقعی
    setImagePreview(URL.createObjectURL(file)); // برای نمایش
  }
  };
 
  
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 pb-5">
      <div>
        {formik.values.avatar ? (
          <img
            src={formik.values.avatar}
            alt="Uploaded"
            className="h-[14rem] md:h-[17rem] w-full object-cover rounded-lg"
          />
        ) : (
          <label
            htmlFor="upload-file"
            className="h-[14rem] md:h-[13rem] px-4 py-2 border-2 border-dashed border-black flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
          >
            <IoIosAdd size={50} className="font-bold" />
            <p>{"بارگزاری عکس"}</p>
          </label>
        )}

        <input
          type="file"
          accept="image/*"
          id="upload-file"
          className="hidden"
          onChange={handleChoiceImage}
          onBlur={formik.handleBlur}
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
          className="border border-[black] rounded-md focus:outline-none px-1 py-2"
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
          className="border border-[black] rounded-md focus:outline-none px-1 py-2"
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
          type="text"
          name="email"
          id="email"
          placeholder="ایمیل را وارد کنید"
          className="border border-[black] rounded-md focus:outline-none px-1 py-2"
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
