import { createSlice } from '@reduxjs/toolkit';
import SmsCenterApi from 'src/api/Student/SMSCenter';
import {
  IMobileNumber,
  INewSmsList,
  ISmsCountBody,
  ISmsList,
  IViewSms
} from 'src/interfaces/Student/SMSCenter';
import { AppThunk } from 'src/store';

const SmsCenterSlice = createSlice({
  name: 'SMS Center',
  initialState: {
    SmsList: [],
    NewSmsList: [],
    MobileNumber: '',
    ViewSms: {},
    SmsCountDetails: {},
    Loading: true
  },
  reducers: {
    getSmsList(state, action) {
      state.SmsList = action.payload.GetSMSListResult;
      state.Loading = false;
    },
    getNewSmsList(state, action) {
      state.NewSmsList = action.payload;
      state.Loading = false;
    },
    getMobileNumber(state, action) {
      state.MobileNumber = action.payload.GetUserMobileNumberResult;
    },
    getSmsDetails(state, action) {
      state.ViewSms = action.payload.GetSMSDetailsResult;
    },
    getSmsCount(state, action) {
      state.SmsCountDetails = action.payload;
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
      dispatch(SmsCenterSlice.actions.getSmsList(response.data));
    };

export const getNewSmsList =
  (data: INewSmsList): AppThunk =>
    async (dispatch) => {
      dispatch(SmsCenterSlice.actions.getLoading(true));
      const response = await SmsCenterApi.GetNewSmsCenterList(data);
      dispatch(SmsCenterSlice.actions.getNewSmsList(response.data));
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

export const getSmsCount =
  (data: ISmsCountBody): AppThunk =>
    async (dispatch) => {
      const response = await SmsCenterApi.GetSmsCountDetails(data);
      console.log(response.data, 'Data')
      dispatch(SmsCenterSlice.actions.getSmsCount(response.data));
    };


export default SmsCenterSlice.reducer;
