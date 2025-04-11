// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Request permission for notifications
// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Notification permission granted.');
//     getToken();
//   }
// }

// // Get FCM Token
// async function getToken() {
//   try {
//     const token = await messaging().getToken();
//     console.log('FCM Token:', token);
//     await AsyncStorage.setItem('fcmToken', token);
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//   }
// }

// // Handle foreground notifications
// export function foregroundNotificationListener() {
//   messaging().onMessage(async (remoteMessage: { notification: { title: any; body: any; }; }) => {
//     console.log('New FCM message:', remoteMessage);

//     PushNotification.localNotification({
//       title: remoteMessage.notification?.title || 'New Notification',
//       message: remoteMessage.notification?.body || 'You have a new notification',
//     });
//   });
// }
