import { createSlice } from '@reduxjs/toolkit';
import GetScheduledSMSListApi from 'src/api/AdminSMSCenter/AScheduledSMS';
import AScheduledSMSListBody from 'src/interfaces/AdminSMSCenter/AScheduledSMS';
import { AppThunk } from 'src/store';

const AScheduledSMSSlice = createSlice({
  name: 'AScheduledSMS',
  initialState: {
    AScheduledSMSList: []
  },
  reducers: {
    getScheduledSMSList(state, action) {
      state.AScheduledSMSList = action.payload;
    }
  }
});

export const getScheduledSMSList =
  (data: AScheduledSMSListBody): AppThunk =>
  async (dispatch) => {
    const response = await GetScheduledSMSListApi.GetAScheduledSMSList(data);
    dispatch(AScheduledSMSSlice.actions.getScheduledSMSList(response.data));
  };

export default AScheduledSMSSlice.reducer;
