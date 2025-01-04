import { createSlice } from '@reduxjs/toolkit';
import SmsCenterApi from 'src/api/Student/SMSCenter';
import { getDateFormattedNew } from 'src/components/Common/Util';
import {
  DeleteScheduleSMSBody,
  IGetScheduleSMSBody,
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
    SmsCountDetails: [],
    GetScheduleSMSBodyIS: [],
    DeleteScheduleSMSIS: '',
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
    RGetScheduleSMSBody(state, action) {
      state.GetScheduleSMSBodyIS = action.payload;
    },
    RDeleteScheduleSMS(state, action) {
      state.DeleteScheduleSMSIS = action.payload;
    },

     ResetDelete(state,) {
      state.DeleteScheduleSMSIS = '';
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
      //console.log(response.data, 'Data')
      dispatch(SmsCenterSlice.actions.getSmsCount(response.data));
    };



    export const CDAGetScheduleSMS =
    (data: IGetScheduleSMSBody): AppThunk =>
      async (dispatch) => {
        dispatch(SmsCenterSlice.actions.getLoading(true));
        const response = await SmsCenterApi.GetScheduleSMS(data);
        let SentItems = response.data.map((item, i) => {
          return {
            RowID: item.RowID,
            TotalRows: item.TotalRows,
            Read_Message_Flag: item.Read_Message_Flag,
            UserName: item.UserName,
            Subject: item.Subject,
            Insert_Date: item.Insert_Date, 
            Id: item.SMS_Id,
            SMS_Receiver_Details_Id: item.SMS_Receiver_Details_Id,
            SenderName: item.SenderName,
            SMSShootId: item.SMSShootId,
            IsActive: false,


          };
        });
       
        dispatch(SmsCenterSlice.actions.RGetScheduleSMSBody(SentItems));
      };

      export const CDADeleteScheduleSMS =
      (data: DeleteScheduleSMSBody): AppThunk =>
        async (dispatch) => {
          dispatch(SmsCenterSlice.actions.getLoading(true));
          const response = await SmsCenterApi.DeleteScheduleSMS(data);
          //console.log(response.data, 'Data')
          dispatch(SmsCenterSlice.actions.RDeleteScheduleSMS(response.data));
        };

        export const CDAResetDeleteScheduleSMS =
          (): AppThunk =>
            async (dispatch) => {
              dispatch(SmsCenterSlice.actions.ResetDelete());
            }
      

export default SmsCenterSlice.reducer;
