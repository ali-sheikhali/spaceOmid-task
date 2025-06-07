"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "./store/usersSlice";
import { Navbar } from "./components/Navbar";
import UsersTable from "./components/UsersTable";
import { Loading } from "./Loading";
import { useIsMobile } from "./hooks/useIsMobile";
import { BottomSheet } from "./components/BottomSheet";
import { EditUserModal } from "./components/EditUserModal";
import { EditModal } from "./components/EditModal";
import { IoIosAdd } from "react-icons/io";
import { AddUser } from "./components/AddUser";
import { IoReload } from "react-icons/io5";

export default function Home() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openAddUserBottomSheet, setOpenAddUserBottomSheet] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // delete user
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  // edit user
  const handleEdit = (user) => {
    console.log("edit");
    if (isMobile) {
      setIsOpen(true);
      setEditUserData(user);
    } else {
      setOpenModal(true);
      setEditUserData(user);
    }
  };

  // add user
  const handleAddUser = () => {
    if (isMobile) {
      setOpenAddUserBottomSheet(true);
    } else {
      setOpenAddUserModal(true);
    }
  };
  return (
    <div>
      <Navbar />
      {loading && <Loading />}
      {error && <p className="text-red-500">خطا در دریافت اطلاعات</p>}
      {!loading && !error && (
        <div className="w-11/12 mx-auto mt-10">
          <div className="flex justify-end gap-3 w-full">
            <button
              onClick={handleAddUser}
              className="bg-[#092748] cursor-pointer flex items-center gap-1 text-white text-sm px-3 py-1 rounded-md"
            >
              افزودن کاربر
              <IoIosAdd size={25} />
            </button>
            <button
              onClick={()=> window.location.reload()}
              className="bg-[#092748] cursor-pointer flex items-center gap-1 text-white text-sm px-3 py-1 rounded-md"
            >
              بارگزاری مجدد
              <IoReload size={25} />
            </button>
          </div>
          <UsersTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* mobile add user */}
      <BottomSheet
        isOpen={openAddUserBottomSheet}
        setIsOpen={setOpenAddUserBottomSheet}
        title="کاربر جدید"
      >
        <AddUser setIsOpen={setOpenAddUserBottomSheet} />
      </BottomSheet>

      {/* wide screen add user*/}
      <EditModal
        isOpen={openAddUserModal}
        setIsOpen={setOpenAddUserModal}
        title="کاربر جدید"
      >
        <AddUser setIsOpen={setOpenAddUserModal} />
      </EditModal>

      {/* mobile edit user */}
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} title="ویرایش کاربر">
        <EditUserModal setIsOpen={setIsOpen} editUserData={editUserData} />
      </BottomSheet>

      {/* wide screen edit user*/}
      <EditModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        title="ویرایش کاربر"
      >
        <EditUserModal editUserData={editUserData} setIsOpen={setOpenModal} />
      </EditModal>
    </div>
  );
}
