import { INotification } from '../../interfaces/Notification/Notification';
import http from '../../requests/SchoolService/schoolServices';

const GetNotificationList = (data: INotification) => {
  return http.post<INotification>(
    'PushNotification/GetUserPushNotifications',
    data
  );
};

const NotificationApi = {
  GetNotificationList
};

export default NotificationApi;
