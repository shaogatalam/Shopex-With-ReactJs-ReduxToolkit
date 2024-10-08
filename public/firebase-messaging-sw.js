importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDLbWCTwxnIOMKZy9te1Db-GnC6PrOzgU0",
    authDomain: "push-noti-reactspringboot.firebaseapp.com",
    projectId: "push-noti-reactspringboot",
    storageBucket: "push-noti-reactspringboot.appspot.com",
    messagingSenderId: "97969431174",
    appId: "1:97969431174:web:ff85ea60a1e0054142a707",
    measurementId: "G-F1RF0E6M7R"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ',payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    //icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});



// importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');
// const firebaseConfig = {
//     apiKey: "AIzaSyDLbWCTwxnIOMKZy9te1Db-GnC6PrOzgU0",
//     authDomain: "push-noti-reactspringboot.firebaseapp.com",
//     projectId: "push-noti-reactspringboot",
//     storageBucket: "push-noti-reactspringboot.appspot.com",
//     messagingSenderId: "97969431174",
//     appId: "1:97969431174:web:ff85ea60a1e0054142a707",
//     measurementId: "G-F1RF0E6M7R"
// };
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
