import { IPushNotificationFCM } from '../../interfaces/FCMDeviceRegistration/FCMDeviceRegistration';
import http from '../../requests/SchoolService/schoolServices';

const RegisterFCMToken = (data: IPushNotificationFCM) => {
  return http.post<IPushNotificationFCM>(
    'PushNotification/RegisterDevice',
    data
  );
};

const RegisterDeviceTokenApi = {
  RegisterFCMToken
};

export default RegisterDeviceTokenApi;
