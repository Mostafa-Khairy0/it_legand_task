import { RootState } from "@/store";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export interface UserSlice {
  id: number;
  name: string;
  photo: string;
  createdAt: string;
  email: string;
}

const userAdapter = createEntityAdapter<UserSlice>();

const userSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState(),
  reducers: {
    addUsers: userAdapter.addMany,
    updateUser: userAdapter.updateOne,
    setUsers: userAdapter.setAll,
  },
});

export const selectUserById = (id: number) => (state: RootState) =>
  state.users.entities[id];

export const { addUsers, updateUser, setUsers } = userSlice.actions;
export const userReducer = userSlice.reducer;
