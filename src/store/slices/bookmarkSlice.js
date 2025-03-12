import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarkedJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    requestBookmarkedJobs(state) {
      state.loading = true;
      state.error = null;
    },
    successBookmarkedJobs(state, action) {
      state.loading = false;
      state.bookmarkedJobs = action.payload;
    },
    failureBookmarkedJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearBookmarkErrors(state) {
      state.error = null;
    },
  },
});

export const fetchBookmarkedJobs = () => async (dispatch) => {
  try {
    dispatch(bookmarkSlice.actions.requestBookmarkedJobs());
    const response = await axios.get("https://www.backend.vitaminjob.com/api/v1/job/bookmarked-jobs", {
      withCredentials: true,
    });
    dispatch(bookmarkSlice.actions.successBookmarkedJobs(response.data.bookmarkedJobs));
  } catch (error) {
    dispatch(bookmarkSlice.actions.failureBookmarkedJobs(error.response.data.message));
  }
};

export const clearBookmarkErrors = () => (dispatch) => {
  dispatch(bookmarkSlice.actions.clearBookmarkErrors());
};

export default bookmarkSlice.reducer;
