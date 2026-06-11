import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "@/types/user.types";

interface IUserState {
  userData: IUserData | null;
}

const initialState: IUserState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<IUserData | null>
    ) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;