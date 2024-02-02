import { Device } from '@capacitor/device';
import {
  ActionPerformed,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';

function PushNotification() {
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === 'granted') {
      PushNotifications.register();
    }
  });

  PushNotifications.addListener('registration', (token: Token) => {
    window.localStorage.setItem('FCMdeviceToken', token.value);
  });

  PushNotifications.addListener('registrationError', (error: any) => {
    alert('Registration Error. Re-install the App.');
  });

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      window.location.href = '/extended-sidebar/Student/Notification';
    }
  );

  const getDeviceInfo = async () => {
    const info = await Device.getInfo();
    window.localStorage.setItem('deviceType', info.platform.toString());
  };

  const getDeviceId = async () => {
    const Id = await Device.getId();
    window.localStorage.setItem('deviceId', Id.uuid.toString());
  };

  getDeviceInfo();
  getDeviceId();

  return <div />;
}

export default PushNotification;
