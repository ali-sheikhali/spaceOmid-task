"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Loading from "@/app/loading";

const UserDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const users = useSelector((state) => state.users.list);
  const isLoading = useSelector((state) => state.users.loading);

const user = users?.find((u) => String(u.id) === id);

  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!user) return notFound();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 animate-fade-in flex flex-col items-center gap-4 transition-all">
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserAlt /> جزئیات کاربر
          </h1>
          <button onClick={() => router.back()} className="text-gray-500 hover:text-blue-600 transition">
            <IoArrowBackCircleOutline size={30} />
          </button>
        </div>

        <img
          src={user.avatar}
          alt="avatar"
          className="w-full h-60 rounded-md object-cover shadow-sm"
        />

        <div className="w-full text-right space-y-2">
          <p className="flex items-center gap-2"><span className="font-semibold">نام:</span> {user.first_name}</p>
          <p className="flex items-center gap-2"><span className="font-semibold">نام خانوادگی:</span> {user.last_name}</p>
          <p className="flex items-center gap-2"><MdEmail /> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
