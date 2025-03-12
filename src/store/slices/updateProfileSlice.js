import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.loading = false;
    },
  },
});
export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    // Convert FormData to plain object if it's a FormData instance
    const payload = data instanceof FormData 
      ? Object.fromEntries(data.entries()) 
      : data;

    console.log("Profile Update Payload:", payload);

    const response = await axios.put(
      '/api/auth/update-profile',
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }, // Change to JSON
      }
    );

    console.log("Profile Update Response:", response.data);

    dispatch(updateProfileSlice.actions.updateProfileSuccess());
  } catch (error) {
    console.error("Profile Update Error:", error.response?.data);
    dispatch(
      updateProfileSlice.actions.updateProfileFailed(
        error.response?.data?.message || "Failed to update profile."
      )
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest());
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.put(
      "/api/auth/update-password",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updateProfileSlice.actions.updatePasswordSuccess());
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updatePasswordFailed(
        error.response.data.message || "Failed to update password."
      )
    );
  }
};

export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;