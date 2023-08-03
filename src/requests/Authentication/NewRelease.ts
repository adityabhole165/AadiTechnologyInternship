import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Newrelease from "../../api/Authentication/NewRelease";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import { INewRelease } from "src/interfaces/Authentication/NewRelease"
import LoginApi from 'src/api/Authentication/Login';
import { IStaffDetailsForloginBody } from 'src/interfaces/Authentication/Login';

const NewReleaseslice = createSlice({
  name: 'NewRelease',
  initialState: {
    Release: null

  },
  reducers: {
    getRelease(state, action) {
      state.Release = action.payload;
    },

  }
});

export const getNewRelease =
  (data: INewRelease): AppThunk =>
    async (dispatch) => {
      const response = await Newrelease.NewRelease (data);
      dispatch(NewReleaseslice.actions.getRelease(response.data));
    };

export default NewReleaseslice.reducer
