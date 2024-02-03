import { createSlice } from '@reduxjs/toolkit';
import { INewRelease } from 'src/interfaces/Authentication/NewRelease';
import { AppThunk } from 'src/store';
import Newrelease from '../../api/Authentication/NewRelease';

const NewReleaseslice = createSlice({
  name: 'NewRelease',
  initialState: {
    Release: null
  },
  reducers: {
    getRelease(state, action) {
      state.Release = action.payload;
    }
  }
});

export const getNewRelease =
  (data: INewRelease): AppThunk =>
  async (dispatch) => {
    const response = await Newrelease.NewRelease(data);
    dispatch(NewReleaseslice.actions.getRelease(response.data));
  };

export default NewReleaseslice.reducer;
