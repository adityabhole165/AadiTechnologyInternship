import { createSlice } from '@reduxjs/toolkit';
import GetMissingAttandenceApi from 'src/api/Student/MissingAttandence';
import MissingAttandenceInterface from 'src/interfaces/Student/MissingAttandenceInterface';
import { AppThunk } from 'src/store';

const MissingAttandenceSlice = createSlice({
  name: 'MissingAttandence',
  initialState: {
    MissingAttandenceList: []
  },
  reducers: {
    getMissingAttandenceList(state, action) {
      state.MissingAttandenceList = action.payload;
    }
  }
});

export const getMissingAttandenceList =
  (data: MissingAttandenceInterface): AppThunk =>
  async (dispatch) => {
    const response = await GetMissingAttandenceApi.GetMissingAttandence(data);
    dispatch(
      MissingAttandenceSlice.actions.getMissingAttandenceList(response.data)
    );
  };

export default MissingAttandenceSlice.reducer;
