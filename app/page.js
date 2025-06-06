'use client';

import { Navbar } from "./components/Navbar";
import UsersTable from "./components/UsersTable";
import useUsers from "./store/usersSlice";
import { Loading } from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, deleteUser } from "./store/usersSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (user) => {
    alert("ویرایش: " + user.first_name);
  };

  return (
    <div>
      <Navbar />
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {error && <p className="text-red-500">خطا در دریافت اطلاعات</p>}
      {!loading && !error && (
        <div className="w-11/12 mx-auto">
          <UsersTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
