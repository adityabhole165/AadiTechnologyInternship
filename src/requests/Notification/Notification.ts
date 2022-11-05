import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import {INotification} from "src/interfaces/Notification/Notification"
import NotificationApi from 'src/api/Notification/Notification';

const Notificationslice = createSlice({
  name: 'Notification',
  initialState:{
    Notification:[]
  },
  reducers: {
    getNotification(state,action){
      state.Notification=action.payload.GetUserPushNotificationsResult;
    }
  }   
});


export const getNotification =
  (data:INotification): AppThunk =>
  async (dispatch) => {
    const response = await NotificationApi.GetNotificationList(data);
    dispatch(Notificationslice.actions.getNotification(response.data));
  };


export default Notificationslice.reducer