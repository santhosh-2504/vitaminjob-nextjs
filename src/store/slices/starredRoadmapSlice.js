import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const starredRoadmapSlice = createSlice({
  name: "roadmaps",
  initialState: {
    starredRoadmaps: [],
    loading: false,
    error: null,
  },
  reducers: {
    requestStarredRoadmaps(state) {
      state.loading = true;
      state.error = null;
    },
    successStarredRoadmaps(state, action) {
      state.loading = false;
      state.starredRoadmaps = action.payload;
    },
    failureStarredRoadmaps(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearStarredRoadmapErrors(state) {
      state.error = null;
    },
  },
});

export const fetchStarredRoadmaps = () => async (dispatch) => {
  try {
    dispatch(starredRoadmapSlice.actions.requestStarredRoadmaps());
    const response = await axios.get("https://www.backend.vitaminjob.com/api/v1/roadmap/starred-roadmaps", {
      withCredentials: true,
    });
    dispatch(starredRoadmapSlice.actions.successStarredRoadmaps(response.data.starredRoadmaps));
  } catch (error) {
    dispatch(starredRoadmapSlice.actions.failureStarredRoadmaps(error.response.data.message));
  }
};

export const clearStarredRoadmapErrors = () => (dispatch) => {
  dispatch(starredRoadmapSlice.actions.clearBookmarkErrors());
};

export default starredRoadmapSlice.reducer;
