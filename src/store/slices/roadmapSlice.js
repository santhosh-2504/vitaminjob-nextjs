import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    roadmaps: [],
    loading: false,
    error: null,
    message: null,
    currentPage: 1,
    totalPages: 1,
    totalRoadmaps: 0,
  },
  reducers: {
    // Get all roadmaps
    getAllRoadmapsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllRoadmapsSuccess(state, action) {
      state.loading = false;
      state.roadmaps = action.payload.roadmaps;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalRoadmaps = action.payload.totalRoadmaps;
    },
    getAllRoadmapsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear errors
    clearErrors(state) {
      state.error = null;
    }
  }
});

export const fetchRoadmaps = (niche, searchKeyword = "", page = 1) => async (dispatch) => {
  dispatch(roadmapSlice.actions.getAllRoadmapsRequest());
  try {
    let url = `/api/roadmaps/all?page=${page}`;
    
    if (searchKeyword) {
      url += `&keyword=${searchKeyword}`;
    }
    if (niche && niche !== "All") {
      url += `&niche=${niche}`;
    }

    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch roadmaps');
    }

    dispatch(roadmapSlice.actions.getAllRoadmapsSuccess(response.data));
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Failed to fetch roadmaps";
    dispatch(roadmapSlice.actions.getAllRoadmapsFailed(errorMessage));
  }
};

export const clearRoadmapErrors = () => (dispatch) => {
  dispatch(roadmapSlice.actions.clearErrors());
};

export default roadmapSlice.reducer;