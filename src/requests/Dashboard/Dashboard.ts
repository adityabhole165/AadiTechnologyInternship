import { createSlice } from '@reduxjs/toolkit';
import DashboardApi from '../../api/dashboard/dashboard';

import {
  IBirthdays,
  IFeedbackList,
  IMsgfrom,
  INewMessageCount,
  IPhotoAlbum,
  ISaveUserLoginDetailsBody,
  IUnreadMessages,
  IUpcomingEventsList
} from 'src/interfaces/Student/dashboard';
import { AppThunk } from 'src/store';

const Dashboardlice = createSlice({
  name: 'Dashboard',
  initialState: {
    BirthdayList: [],
    UnreadMessage: [],
    UpcomingEventsList: [],
    PhotoAlbumList: [],
    FeedbackList: [],
    Msgfrom: [],
    MessageCount: {},
    Loading: true,
    UserLoginDetails: null
  },
  reducers: {
    getBirthdayList(state, action) {
      state.BirthdayList = action.payload.BirthdayDetailsData;
    },

    getUnreadMessages(state, action) {
      state.UnreadMessage = action.payload;
    },

    getEventsList(state, action) {
      state.UpcomingEventsList = action.payload.UpcomingEventsData;
    },

    getPhotoAlbum(state, action) {
      state.Loading = false;
      state.PhotoAlbumList = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.PhotoAlbumList = [];
    },

    getFeedback(state, action) {
      state.FeedbackList = action.payload.GetUserFeedbackDetails;
    },
    getmsgfrom(state, action) {
      state.Msgfrom = action.payload.GetSchoolNoticeData;
    },
    getMessageCount(state, action) {
      state.MessageCount = action.payload.GetNewMessageCountResult;
    },
    getUserLoginDetails(state, action) {
      state.UserLoginDetails = action.payload;
    }
  }
});

export const getBirthdayList =
  (data: IBirthdays): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.BirthdayDetailsData(data);
    dispatch(Dashboardlice.actions.getBirthdayList(response.data));
  };

export const getUnreadMessages =
  (data: IUnreadMessages): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.GetUnreadMessageList(data);
    dispatch(Dashboardlice.actions.getUnreadMessages(response.data));
  };

export const getEventsList =
  (data: IUpcomingEventsList): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.GetUpcomingEventSList(data);
    dispatch(Dashboardlice.actions.getEventsList(response.data));
  };

export const getPhotoAlbum =
  (data: IPhotoAlbum): AppThunk =>
  async (dispatch) => {
    dispatch(Dashboardlice.actions.getLoading(true));

    const response = await DashboardApi.PhotoAlbumData(data);

    const Data =
      response.data[0].Name === null
        ? []
        : response.data.map((item, index) => {
            return {
              id: index,
              header: item.Name === null ? '' : item.Name,
              text1: '',
              text2: '',
              linkPath: `/Common/Photos/` + item.Name + '/PhotoGallery',
              FileName: ''
            };
          });
    dispatch(Dashboardlice.actions.getPhotoAlbum(Data));
  };

export const getFeedback =
  (data: IFeedbackList): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.Feedback(data);
    dispatch(Dashboardlice.actions.getFeedback(response.data));
  };

export const getmsgfrom =
  (data: IMsgfrom): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.GetMessageFromList(data);
    dispatch(Dashboardlice.actions.getmsgfrom(response.data));
  };
export const getMessageCount =
  (data: INewMessageCount): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.GetMessagesCount(data);
    dispatch(Dashboardlice.actions.getMessageCount(response.data));
  };
export const getSaveUserLoginDetail =
  (data: ISaveUserLoginDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await DashboardApi.GetSaveUserLoginDetailsResult(data);
    dispatch(Dashboardlice.actions.getUserLoginDetails(response.data));
  };

export default Dashboardlice.reducer;
