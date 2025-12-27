import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
  user: null, // { id, name, email, role }
   
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    userData: (state, action) => {
      state.user = action.payload.user;
      
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
