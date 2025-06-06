'use client';

// store/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://reqres.in/api/users?page=2", {
    headers: { "x-api-key": "reqres-free-v1" },
  });
  return res.data.data;
});

// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: { "x-api-key": "reqres-free-v1" },
  });
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
