/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:1337/api';

const initialState = {
  projects: [],
  // project: {},
  loading: false,
  error: null,
};

export const getProjectItems = createAsyncThunk('projects/getProjectItems', async (args, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/projects`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getSingleProject = createAsyncThunk('projects/getSingleProject', async (args, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/projects/${args}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // sortData: (state, action) => {
    //   const sort = action.payload;
    //   state.projects = state.projects.sort((a, b) => {
    //     if (sort === 'asc') {
    //       return a.name.localeCompare(b.name);
    //     }
    //     return b.name.localeCompare(a.name);
    //   });
    // },
  },

  extraReducers: {
    [getProjectItems.pending]: (state) => {
      state.loading = true;
    },

    [getProjectItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },

    [getProjectItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // [getSingleProject.pending]: (state) => {
    //   state.loading = true;
    // },

    // [getSingleProject.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.project = { ...action.payload };
    //   console.log(state.project);
    // },

    // [getSingleProject.rejected]: (state, action) => {
    //   state.loading = false;
    //   console.log(action.payload);
    // },
  },
});

export const { sortData } = projectSlice.actions;
export default projectSlice.reducer;
