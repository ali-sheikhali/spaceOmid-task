'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "./store/usersSlice";
import { Navbar } from "./components/Navbar";
import UsersTable from "./components/UsersTable";
import { Loading } from "./Loading";
import { useIsMobile } from "./hooks/useIsMobile";
import { BottomSheet } from "./components/BottomSheet";
import { EditUserModal } from "./components/EditUserModal";

export default function Home() {
  const isMobile = useIsMobile();
 
  const [editUser , setEditUser] = useState([])
  const [isOpen , setIsOpen] = useState(false)
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
      setIsOpen(true)
      setEditUser(user)
    } else {
      // جایگزین کن با مودال دسکتاپ
      alert("Open desktop modal");
    }
  };

  return (
    <div>
      <Navbar />
      {loading && <Loading />}
      {error && <p className="text-red-500">خطا در دریافت اطلاعات</p>}
      {!loading && !error && (
        <div className="w-11/12 mx-auto">
          <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}

      <BottomSheet  isOpen={isOpen} setIsOpen={setIsOpen} title="ویرایش کاربر">
        <EditUserModal />
      </BottomSheet>
      
    </div>
  );
}
