"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://reqres.in/api/users?page=2", {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.log("خطا در دریافت اطلاعات", err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, reload: fetchUsers };
};

export default useUsers;
