// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { TUser } from "../features/storeTypes/user";


// export interface AuthState {
//   accessToken: string | null;
//   user: TUser | null;
//   role: "admin" | "doctor" | null; // role included
// }

// const initialState: AuthState = {
//   accessToken: null,
//   user: null,
//   role: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Set user & role
//     setUser: (state, action: PayloadAction<{ accessToken: string; user: TUser; role?: "admin" | "doctor" }>) => {
//       state.accessToken = action.payload.accessToken;
//       state.user = action.payload.user;
//       state.role = action.payload.role || null; // role assign
//     },

//     // Update user info
//     updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload };
//       }
//     },

//     // Update role separately (optional)
//     updateRole: (state, action: PayloadAction<"admin" | "doctor" | null>) => {
//       state.role = action.payload;
//     },

//     // Logout
//     logout: (state) => {
//       state.accessToken = null;
//       state.user = null;
//       state.role = null; // clear role
//     },
//   },
// });

// export const { setUser, updateUser, updateRole, logout } = authSlice.actions;
// export default authSlice.reducer;