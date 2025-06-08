"use client";
import { useState } from "react";
import Image from "next/image";
import inTheNameOfGod from "../../public/in-the-name-of-god.6d318c96.svg";
import logo from "../../public/logo.png";
import { RiMenu3Line } from "react-icons/ri";
import MobileNavBar from "./MobileNavBar";
import { useIsMobile } from "../hooks/useIsMobile";
import { BottomSheet } from "./BottomSheet";
import { EditModal } from "./EditModal";
import { Login } from "./Login";

export const Navbar = () => {
  const isMobile = useIsMobile()
  const [openNavBar, setOpenNavBar] = useState(false);
  const [openLoginModal , setOpenLoginModal] = useState(false)
  const handleNavBarClick = () => {
    setOpenNavBar(true);
  };
  const handleLogin = ()=>{
    if(isMobile){
      setOpenLoginBottomSheet(true)
    }else{
      setOpenLoginModal(true)
    }
  }
  return (
    <div className="w-full bg-black/50 text-white">
      <div className="w-11/12 mx-auto p-4 flex justify-between items-center">
        <Image
          src={inTheNameOfGod}
          width={150}
          height={150}
          alt="in-the-name-of-god"
          className="object-contain"
          priority
        />
        <div className="md:hidden  cursor-pointer" onClick={handleNavBarClick}>
          <RiMenu3Line size={30} />
        </div>
        <ul className="gap-5 hidden md:flex">
          <li className="text-[#e7a42b] cursor-pointer">خانه</li>
          <li className="hover:text-[#e7a42b] cursor-pointer">محصولات</li>
          <li className="hover:text-[#e7a42b] cursor-pointer">خدمات</li>
          <li className="hover:text-[#e7a42b] cursor-pointer">
            اخبار و مقالات
          </li>
          <li className="hover:text-[#e7a42b] cursor-pointer">درباره ما</li>
          <li className="hover:text-[#e7a42b] cursor-pointer" onClick={handleLogin}>ورود/ثبت نام</li>
        </ul>
        <Image
          src={logo}
          width={100}
          height={100}
          alt="logo"
          className="object-contain"
          priority
        />
      </div>
      {openNavBar && <MobileNavBar setOpenNavBar={setOpenNavBar} />}

     

      <EditModal isOpen={openLoginModal} setIsOpen={setOpenLoginModal} title="ورود/ثبت نام">
        <Login setIsOpen={setOpenLoginModal} />
      </EditModal>
    </div>
  );
};
