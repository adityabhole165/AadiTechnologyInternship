import http from "../../requests/SchoolService/schoolServices";
import {INotification} from "../../interfaces/Notification/Notification"

  const GetNotificationList = (data: INotification) => {
    return http.post<INotification>('PushNotification/GetUserPushNotifications',data);
  };
  
const NotificationApi ={
    GetNotificationList
}

export default NotificationApi;