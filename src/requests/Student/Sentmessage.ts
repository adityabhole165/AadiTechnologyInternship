import { createSlice } from '@reduxjs/toolkit';
import SentMessageApi from 'src/api/Student/SentMessage';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { AppThunk } from 'src/store';

const SentMessageSlice = createSlice({
  name: 'Sent Message',
  initialState: {
    SentList: [],
    ViewSent: [],
    FilterData: false,
    Loading: false
  },
  reducers: {
    getSentList(state, action) {
      state.Loading = false;
      state.SentList = action.payload.GetScheduledSMSResult;
    },
    getFilterData(state, action) {
      state.FilterData = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.SentList = [];
    }
  }
});

export const getSentList =
  (data: IgetList): AppThunk =>
  async (dispatch) => {
    dispatch(SentMessageSlice.actions.getLoading(true));
    dispatch(SentMessageSlice.actions.getFilterData(false));
    const response = await SentMessageApi.GetSentMessageList(data);
    dispatch(SentMessageSlice.actions.getSentList(response.data));
  };

export const getNextPageSentList =
  (data: IgetList): AppThunk =>
  async (dispatch) => {
    dispatch(SentMessageSlice.actions.getLoading(true));
    dispatch(SentMessageSlice.actions.getFilterData(true));
    const response = await SentMessageApi.GetSentMessageList(data);
    dispatch(SentMessageSlice.actions.getSentList(response.data));
  };

export default SentMessageSlice.reducer;
