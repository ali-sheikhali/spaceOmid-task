"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "./store/usersSlice";
import UsersTable from "./components/UsersTable";
import { TableLoading } from "./TableLoading";
import { useIsMobile } from "./hooks/useIsMobile";
import { BottomSheet } from "./components/BottomSheet";
import { EditUserModal } from "./components/EditUserModal";
import { EditModal } from "./components/EditModal";
import { IoIosAdd } from "react-icons/io";
import { AddUser } from "./components/AddUser";
import { IoReload } from "react-icons/io5";
import Loading from "./loading";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { PaginationControls } from "./components/PaginationControls";

export default function Home() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openAddUserBottomSheet, setOpenAddUserBottomSheet] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, currentPage]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // implement resize screen
  useEffect(() => {
    if (editUserData) {
      if (isMobile) {
        setOpenModal(false);
        setIsOpen(false);
      } else {
        setIsOpen(false);
        setOpenModal(false);
      }
    }

    if (openAddUserModal || openAddUserBottomSheet) {
      if (isMobile) {
        setOpenAddUserModal(false);
        setOpenAddUserBottomSheet(false);
      } else {
        setOpenAddUserBottomSheet(false);
        setOpenAddUserModal(false);
      }
    }
  }, [isMobile]);

  if (isMobile === null || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  // delete user
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    toast.success("کاربر با موفقیت حذف شد.");
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
      {loading && <TableLoading />}
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
              onClick={() => dispatch(fetchUsers())}
              className="bg-[#092748] cursor-pointer flex items-center gap-1 text-white text-sm px-3 py-1 rounded-md"
            >
              بارگزاری مجدد
              <IoReload size={25} />
            </button>
          </div>
          <UsersTable
            users={paginatedUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {/* Pagination */}
          <PaginationControls
            currentPage={currentPage}
            totalCount={users.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* mobile add user */}
      <BottomSheet
        isOpen={openAddUserBottomSheet}
        setIsOpen={setOpenAddUserBottomSheet}
        title="کاربر جدید"
      >
        <AddUser key={openAddUserBottomSheet} setIsOpen={setOpenAddUserBottomSheet} />
      </BottomSheet>

      {/* wide screen add user*/}
      <EditModal
        isOpen={openAddUserModal}
        setIsOpen={setOpenAddUserModal}
        title="کاربر جدید"
      >
        <AddUser key={openAddUserModal} setIsOpen={setOpenAddUserModal} />
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
