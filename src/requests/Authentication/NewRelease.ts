import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Newrelease from "../../api/Authentication/NewRelease";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import { INewRelease } from "src/interfaces/Authentication/NewRelease"

const NewReleaseslice = createSlice({
  name: 'NewRelease',
  initialState: {
    Release: null,

  },
  reducers: {
    getRelease(state, action) {
      state.Release = action.payload.GetNewAppVersionDetailsResult;
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
