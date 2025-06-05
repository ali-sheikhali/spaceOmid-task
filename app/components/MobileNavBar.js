import React from 'react'
import { RiMenu3Line } from "react-icons/ri";

export default function MobileNavBar({setOpenNavBar}) {
  return (
     <div className="absolute inset-0 w-full bg-[#0a1323]">
              <div className="mr-5 mt-5 flex flex-col gap-10">
                <RiMenu3Line size={30} className=' cursor-pointer' onClick={()=> setOpenNavBar(false)} />
                <ul className="gap-5 flex flex-col">
                  <li className="text-[#e7a42b] cursor-pointer">خانه</li>
                  <li className="hover:text-[#e7a42b] cursor-pointer">محصولات</li>
                  <li className="hover:text-[#e7a42b] cursor-pointer">خدمات</li>
                  <li className="hover:text-[#e7a42b] cursor-pointer">اخبار و مقالات</li>
                  <li className="hover:text-[#e7a42b] cursor-pointer">درباره ما</li>
                </ul>
              </div>
            </div>
  )
}
