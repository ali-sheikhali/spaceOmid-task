"use client";
import { Navbar } from "./components/Navbar";
import UsersTable from "./components/UsersTable";
import useUsers from "./hooks/useUsers";
import { Loading } from "./Loading";

export default function Home() {
  const { users, loading, error, reload } = useUsers();

  const handleEdit = (user) => {
    alert("ویرایش: " + user.first_name);
  };

  const handleDelete = (userId) => {
    alert("حذف کاربر با ID: " + userId);
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
