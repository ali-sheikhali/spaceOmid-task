import React, { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { BottomSheet } from "./BottomSheet";
import { Login } from "./Login";

export default function MobileNavBar({ setOpenNavBar }) {
  const [openLoginBottomSheet, setOpenLoginBottomSheet] = useState(false);

  const handleClick = () => {
    setOpenLoginBottomSheet(true);
    // setOpenNavBar(false);
  };
  return (
    <div className="absolute inset-0 w-full bg-[#0a1323]">
      <div className="mr-5 mt-5 flex flex-col gap-10">
        <RiMenu3Line
          size={30}
          className=" cursor-pointer"
          onClick={() => setOpenNavBar(false)}
        />
        <ul className="gap-5 flex flex-col">
          <li className="text-[#e7a42b] cursor-pointer">خانه</li>
          <li className="hover:text-[#e7a42b] cursor-pointer">محصولات</li>
          <li className="hover:text-[#e7a42b] cursor-pointer">خدمات</li>
          <li className="hover:text-[#e7a42b] cursor-pointer">
            اخبار و مقالات
          </li>
          <li className="hover:text-[#e7a42b] cursor-pointer">درباره ما</li>
          <li
            className="hover:text-[#e7a42b] cursor-pointer"
            onClick={handleClick}
          >
            ورود/ثبت نام
          </li>
        </ul>
      </div>
      <BottomSheet
        isOpen={openLoginBottomSheet}
        setIsOpen={setOpenLoginBottomSheet}
        title="ورود/ثبت نام"
      >
        <Login setIsOpen={setOpenLoginBottomSheet} />
      </BottomSheet>
    </div>
  );
}
