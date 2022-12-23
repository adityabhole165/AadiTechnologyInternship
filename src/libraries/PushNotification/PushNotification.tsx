import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

function PushNotification() {
  console.log('! Push Notification !');
  // Request permission to use push notifications
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      console.log('Register with FCM');
      PushNotifications.register();
    } else {
      console.log('Dont register');
    }
  });

  PushNotifications.addListener('registration', (token: Token) => {
    //alert('Push registration success, token: ' + token.value);
    console.log('Push registration success, token: ' + token.value);
  });

  PushNotifications.addListener('registrationError', (error: any) => {
    //alert('Error on registration: ' + JSON.stringify(error));
    console.log('Error on registration: ' + JSON.stringify(error));
  });

  PushNotifications.addListener(
    'pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      //alert('Push received: ' + JSON.stringify(notification));
      console.log('Push received: ' + JSON.stringify(notification));
    },
  );

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      window.addEventListener('load', function () {
        window.location.href = '/extended-sidebar/Student/Notification';
      })

    },
  );

  return (<div />);
}

export default PushNotification;