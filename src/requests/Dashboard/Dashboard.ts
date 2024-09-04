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
    PhotoAlbumList1: [],
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
    
    getPhotoAlbum1(state, action) {
      state.Loading = false;
      state.PhotoAlbumList1 = action.payload;
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
  
        const Data = [];
        const Data1 = [];
        const albumMap = new Map();
  
        response.data.forEach((item) => {
          item.ImageList.forEach((image, index) => {
           
            Data.push({
              id: index,
              Header: item.Name,
              AlbumID: item.Id,
              Text1: image.Description,
              Text2: localStorage.getItem('SiteURL') + 'RITeSchool/' + image.ImagePath
            });
  
          
            if (!albumMap.has(item.Id)) {
              albumMap.set(item.Id, true);
              Data1.push({
                id: index,
                Header: item.Name,
                AlbumID: item.Id,
                Text1: image.Description,
                Text2: localStorage.getItem('SiteURL') + 'RITeSchool/' + image.ImagePath
              });
            }
          });
        });
  
        dispatch(Dashboardlice.actions.getPhotoAlbum1(Data1));
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
