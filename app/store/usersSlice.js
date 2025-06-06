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

// edit user 
export const editUser = createAsyncThunk("users/editUser", async ({ id, updatedUser }) => {
  const res = await axios.put(`https://reqres.in/api/users/${id}`, updatedUser, {
    headers: { "x-api-key": "reqres-free-v1" },
  });
  return { id, updatedUser: res.data };
});

// add user
// export const addUser = createAsyncThunk("users/addUser" , async (newUser)=>{
//   const res = axios.post("https://reqres.in/api/users", newUser , {
//     headers:{"x-api-key": "reqres-free-v1"}
//   })
//   return res.data
// })

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
  addUser: (state, action) => {
    state.list.push(action.payload);
  },
},
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
      })
      // edit user
      .addCase(editUser.fulfilled, (state, action) => {
        const { id, updatedUser } = action.payload;
        const index = state.list.findIndex(user => user.id === id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...updatedUser };
        }
      })
      // // add user
      // .addCase(addUser.fulfilled , (state , action)=>{
      //     state.list.push(action.payload);
      // })
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
