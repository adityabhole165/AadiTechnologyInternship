import http from "../../requests/SchoolService/schoolServices";
import {IPushNotificationFCM}  from "../../interfaces/FCMDeviceRegistration/FCMDeviceRegistration";

  const RegisterFCMToken = (data: IPushNotificationFCM) => {
    return http.post<IPushNotificationFCM>('PushNotification/RegisterDevice',data);
  };

const RegisterDeviceTokenApi ={
  RegisterFCMToken
}

export default RegisterDeviceTokenApi;