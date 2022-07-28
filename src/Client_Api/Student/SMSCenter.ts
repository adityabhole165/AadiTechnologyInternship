import { createSlice } from "@reduxjs/toolkit";
import SmsCenterApi from "src/Api/Student/SMSCenter";
import { ISmsList, IMobileNumber, IViewSms } from "src/Interface/Student/SMSCenter";
import { AppThunk } from "src/store";

const SmsCenterSlice = createSlice({
  name: 'SMS Center',
  initialState: {
    SmsList: [],
    MobileNumber: "",
    ViewSms: {},
  },
  reducers: {
    getSmsList(state, action) {
      state.SmsList = action.payload.GetSMSListResult;
    },
    getMobileNumber(state, action) {
      state.MobileNumber = action.payload.GetUserMobileNumberResult;
    },
    getSmsDetails(state, action) {
      state.ViewSms = action.payload.GetSMSDetailsResult;
    }
  }
})

export const getSmsList =
  (data: ISmsList): AppThunk =>
    async (dispatch) => {
      const response = await SmsCenterApi.GetSmsCenterList(data)
      dispatch(SmsCenterSlice.actions.getSmsList(response.data));
    };

export const getMobileNumber =
  (data: IMobileNumber): AppThunk =>
    async (dispatch) => {
      const response = await SmsCenterApi.GetMobileNumber(data)
      dispatch(SmsCenterSlice.actions.getMobileNumber(response.data));
    };

export const getSmsDetails =
  (data: IViewSms): AppThunk =>
    async (dispatch) => {
      const response = await SmsCenterApi.GetSmsDetails(data)
      dispatch(SmsCenterSlice.actions.getSmsDetails(response.data));
    };

export default SmsCenterSlice.reducer