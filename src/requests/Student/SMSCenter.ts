import { createSlice } from '@reduxjs/toolkit';
import SmsCenterApi from 'src/api/Student/SMSCenter';
import {
  IMobileNumber,
  ISmsList,
  IViewSms
} from 'src/interfaces/Student/SMSCenter';
import { AppThunk } from 'src/store';

const SmsCenterSlice = createSlice({
  name: 'SMS Center',
  initialState: {
    SmsList: [],
    MobileNumber: '',
    ViewSms: {},
    Loading: true
  },
  reducers: {
    getSmsList(state, action) {
      state.SmsList = action.payload.GetSMSListResult;
      state.Loading = false;
    },
    getMobileNumber(state, action) {
      state.MobileNumber = action.payload.GetUserMobileNumberResult;
    },
    getSmsDetails(state, action) {
      state.ViewSms = action.payload.GetSMSDetailsResult;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.SmsList = [];
    }
  }
});

export const getSmsList =
  (data: ISmsList): AppThunk =>
    async (dispatch) => {
      dispatch(SmsCenterSlice.actions.getLoading(true));
      const response = await SmsCenterApi.GetSmsCenterList(data);
      console.log(response.data, 'response')
      dispatch(SmsCenterSlice.actions.getSmsList(response.data));
    };

export const getMobileNumber =
  (data: IMobileNumber): AppThunk =>
    async (dispatch) => {
      const response = await SmsCenterApi.GetMobileNumber(data);
      dispatch(SmsCenterSlice.actions.getMobileNumber(response.data));
    };

export const getSmsDetails =
  (data: IViewSms): AppThunk =>
    async (dispatch) => {
      const response = await SmsCenterApi.GetSmsDetails(data);
      dispatch(SmsCenterSlice.actions.getSmsDetails(response.data));
    };

export default SmsCenterSlice.reducer;
