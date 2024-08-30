import { createSlice } from '@reduxjs/toolkit';
import DashboardApi from '../../api/dashboard/dashboard';

import {
  IBirthdays,
  IFeedbackList,
  IMsgfrom,
  INewMessageCount,
  IPhotoAlbumBody,
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
    UnreadMessageCount: '',
    SenderPhoto: [],
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
      state.Loading = false;
      state.UnreadMessage = action.payload;
    },
    getUnreadMessageCount(state, action) {
      state.Loading = false;
      state.UnreadMessageCount = action.payload;
    },
    getSenderPhoto(state, action) {
      state.Loading = false;
      state.SenderPhoto = action.payload;
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
      dispatch(Dashboardlice.actions.getUnreadMessages(response.data.UnreadMessages));
      dispatch(Dashboardlice.actions.getUnreadMessageCount(response.data.UnreadMessageCount.toString()));
      dispatch(Dashboardlice.actions.getSenderPhoto(response.data.SenderPhoto));
    };

export const getEventsList =
  (data: IUpcomingEventsList): AppThunk =>
    async (dispatch) => {
      const response = await DashboardApi.GetUpcomingEventSList(data);
      dispatch(Dashboardlice.actions.getEventsList(response.data));
    };

export const getPhotoAlbum =
  (data: IPhotoAlbumBody): AppThunk =>
    async (dispatch) => {
      dispatch(Dashboardlice.actions.getLoading(true));

      const response = await DashboardApi.PhotoAlbumData(data);

      const Data = response.data.map((item) => {
        const imageList = item.ImageList || [];

        return {
          id: item.Id,
          header: item.Name || '',
          images: imageList.map(image => ({
            id: image.ImageId,
            src: image.ImagePath,
            description: image.Description || ''
          })),
          month: item.Month,
          year: item.Year,
          userId: item.UserId
        };
      });
      console.log(Data, 'Data')
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
