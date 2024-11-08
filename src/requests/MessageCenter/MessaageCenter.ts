import { createSlice } from '@reduxjs/toolkit';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import {
  IContactGRPUsersBody,
  IGetReadReceiptDetailsBody,
  IGetUserEmailSettingsBody,
  IUpdateUserEmailSettingBody
} from 'src/interfaces/MessageCenter/MessageCenter';
import { IUpdateMessageReadUnreadStatusBody } from 'src/interfaces/MessageCenter/ReadUnReadStatus';
import { AppThunk } from 'src/store';
import MessageCenterApi from '../../api/MessageCenter/MessageCenter';
import filterApi from '../../api/MessageCenter/Search';
import { IUserGroupList } from '../../interfaces/MessageCenter/MessageCenter';
import { IGetAllMonths, Iyears } from '../../interfaces/MessageCenter/Search';

const MessageCenterSlice = createSlice({
  name: 'Message Center',
  initialState: {
    RecipientsName: [],
    RecipientsId: [],
    TrashList: [],
    FilterData: false,
    TeacherList: [],
    AdminStaffList: [],
    YearsList: [],
    AllMonthList: [],
    PageIndex: 0,
    Loading: true,
    EmailSettings: null,
    UpdationMessage: '',
    PTAOption: {},
    ContactgrpUsers: {},
    ReadReceiptDetails: [],
    ReadUnReadStatus: null
  },
  reducers: {
    addRecipients(state, action) {
      state.RecipientsName.push(action.payload.Name);
      state.RecipientsId.push(action.payload.ID);
    },
    removeRecipients(state, action) {
      let indexOfElement1 = state.RecipientsName.indexOf(action.payload.Name);
      let SplicedArray1 = state.RecipientsName.splice(indexOfElement1, 1);
      let indexOfElement2 = state.RecipientsId.indexOf(action.payload.ID);
      let SplicedArray2 = state.RecipientsId.splice(indexOfElement2, 1);
    },
    removeAllRecipients(state, action) {
      state.RecipientsName.length = 0;
      state.RecipientsId.length = 0;
    },
    getTrashList(state, action) {
      state.Loading = false;
      state.TrashList = action.payload.GetTrashMessagesResult;
    },
    getFilterData(state, action) {
      state.FilterData = action.payload;
    },
    getTeacherList(state, action) {
      state.TeacherList = action.payload.GetUsersInGroupResult;
    },
    getAdminstaffList(state, action) {
      state.AdminStaffList = action.payload.GetUsersInGroupResult;
    },
    getYearsList(state, action) {
      state.YearsList = action.payload.GetAcademicYearsResult;
    },
    getAcademicYearList(state, action) {
      state.YearsList = action.payload;
    },
    getAllMonthList(state, action) {
      state.AllMonthList = action.payload.GetAllMonthDetailsResult;
    },
    getMonthYearList(state, action) {
      state.AllMonthList = action.payload;
    },
    sePageIndex(state, action) {
      state.PageIndex = action.payload;
    },

    GetEmailSettings(state, action) {
      state.EmailSettings = action.payload.EmailSetting;
      state.Loading = false;
    },
    UpdateUserEmailSetting(state, action) {
      state.UpdationMessage = action.payload.UpdationMessage;
      state.Loading = false;
    },
    ResetUpdateUserEmailSetting(state) {
      state.UpdationMessage = '';
    },
    getShowPTAOption(state, action) {
      state.PTAOption = action.payload.PTAOptionStatusResult;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.TrashList = [];
    },
    getContactgrpUsers(state, action) {
      state.ContactgrpUsers = action.payload;
    },
    getReadReceiptDetails(state, action) {
      state.ReadReceiptDetails = action.payload.ReadReceiptDetails;
    },
    getReadUnReadStatus(state, action) {
      state.ReadUnReadStatus = action.payload;
    },
    resetMessage(state) {
      state.ReadUnReadStatus = '';
    }
  }
});

export const getTrashList =
  (data?: IgetList): AppThunk =>
    async (dispatch) => {
      dispatch(MessageCenterSlice.actions.getLoading(true));
      dispatch(MessageCenterSlice.actions.getFilterData(false));
      const response = await MessageCenterApi.GetTrashList(data);
      dispatch(MessageCenterSlice.actions.getTrashList(response.data));
    };

export const getNextPageTrashList =
  (data: IgetList): AppThunk =>
    async (dispatch) => {
      dispatch(MessageCenterSlice.actions.getLoading(true));
      dispatch(MessageCenterSlice.actions.getFilterData(true));
      const response = await MessageCenterApi.GetTrashList(data);
      dispatch(MessageCenterSlice.actions.getTrashList(response.data));
    };

export const getYearsList =
  (data: Iyears): AppThunk =>
    async (dispatch) => {
      const response = await filterApi.getyears(data);
      dispatch(MessageCenterSlice.actions.getYearsList(response.data));
    };
export const getAcademicYearList =
  (data: Iyears): AppThunk =>
    async (dispatch) => {
      const response = await filterApi.getyears(data);
      const data2 = response.data.GetAcademicYearsResult.map((item) => {
        return {
          Name: item.AcademicYearName,
          Value: item.AcademicYearId
        };
      });
      dispatch(MessageCenterSlice.actions.getAcademicYearList(data2));
    };

export const getAllMonthList =
  (data: IGetAllMonths): AppThunk =>
    async (dispatch) => {
      const response = await filterApi.getmonths(data);
      dispatch(MessageCenterSlice.actions.getAllMonthList(response.data));
    };

export const getMonthYearList =
  (data: IGetAllMonths): AppThunk =>
    async (dispatch) => {
      const response = await filterApi.getmonths(data);
      const data2 = response.data.GetAllMonthDetailsResult.map((item) => {
        return {
          Name: item.Name,
          Value: item.MonthId
        };
      });
      dispatch(MessageCenterSlice.actions.getMonthYearList(data2));
    };

export const getTeacherList =
  (data: IUserGroupList): AppThunk =>
    async (dispatch) => {
      const response = await MessageCenterApi.GetUsegroupList(data);
      dispatch(MessageCenterSlice.actions.getTeacherList(response.data));
    };

export const getAdminstaffList =
  (data: IUserGroupList): AppThunk =>
    async (dispatch) => {
      const response = await MessageCenterApi.GetUsegroupList(data);
      dispatch(MessageCenterSlice.actions.getAdminstaffList(response.data));
    };

export const GetEmailSettings =
  (data: IGetUserEmailSettingsBody): AppThunk =>
    async (dispatch) => {
      dispatch(MessageCenterSlice.actions.getLoading(true));
      const response = await MessageCenterApi.EmailSettingsapi(data);
      dispatch(MessageCenterSlice.actions.GetEmailSettings(response.data));
    };

export const UpdateUserEmailSetting =
  (data: IUpdateUserEmailSettingBody): AppThunk =>
    async (dispatch) => {
      dispatch(MessageCenterSlice.actions.getLoading(true));
      const response = await MessageCenterApi.UpdateUserEmailSettingapi(data);
      dispatch(MessageCenterSlice.actions.UpdateUserEmailSetting(response.data));
    };
export const ResetUpdateUserEmailSetting = (): AppThunk => async (dispatch) => {
  dispatch(MessageCenterSlice.actions.ResetUpdateUserEmailSetting());
};
export const ContactGroupUsers =
  (data: IContactGRPUsersBody): AppThunk =>
    async (dispatch) => {
      const response = await MessageCenterApi.ContactGRPUsers(data);
      dispatch(
        MessageCenterSlice.actions.getContactgrpUsers(
          response.data.ContactGroupUserIds
        )
      );
    };
export const ReadReceiptDetail =
  (data: IGetReadReceiptDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await MessageCenterApi.GetReadReceiptDetails(data);
      dispatch(MessageCenterSlice.actions.getReadReceiptDetails(response.data));
    };
export const ReadUnReadstatus =
  (data: IUpdateMessageReadUnreadStatusBody): AppThunk =>
    async (dispatch) => {
      const response = await MessageCenterApi.GetReadUnReadStatus(data);
      dispatch(MessageCenterSlice.actions.getReadUnReadStatus(response.data));
    };
export const resetMessageReadUnReadstatus =
  (): AppThunk => async (dispatch) => {
    dispatch(MessageCenterSlice.actions.resetMessage());
  };

export const { addRecipients, removeRecipients, removeAllRecipients } =
  MessageCenterSlice.actions;

export default MessageCenterSlice.reducer;
