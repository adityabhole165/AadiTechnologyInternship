import { createSlice } from '@reduxjs/toolkit';
import NotificationApi from 'src/api/Notification/Notification';
import { INotification } from 'src/interfaces/Notification/Notification';
import { AppThunk } from 'src/store';

const Notificationslice = createSlice({
  name: 'Notification',
  initialState: {
    Notification: []
  },
  reducers: {
    getNotification(state, action) {
      state.Notification = action.payload.GetUserPushNotificationsResult;
    }
  }
});

export const getNotification =
  (data: INotification): AppThunk =>
  async (dispatch) => {
    const response = await NotificationApi.GetNotificationList(data);
    dispatch(Notificationslice.actions.getNotification(response.data));
  };

export default Notificationslice.reducer;
