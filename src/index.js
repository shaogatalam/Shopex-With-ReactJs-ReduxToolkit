import React from "react";
import "./shopex.css";
import ReactDOM from "react-dom/client";  // Note the change here
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";

//console.log(store.getState());


import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";



const container = document.getElementById("root");
const root      = ReactDOM.createRoot(container);


//--  register ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}
//--  register ServiceWorker


const firebaseConfig = {
  apiKey: "AIzaSyDLbWCTwxnIOMKZy9te1Db-GnC6PrOzgU0",
  authDomain: "push-noti-reactspringboot.firebaseapp.com",
  projectId: "push-noti-reactspringboot",
  storageBucket: "push-noti-reactspringboot.appspot.com",
  messagingSenderId: "97969431174",
  appId: "1:97969431174:web:ff85ea60a1e0054142a707",
  measurementId: "G-F1RF0E6M7R"
};
initializeApp(firebaseConfig);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);



// import { ReactSession } from "react-client-session";
// import React from "react";
// import "./shopex.css";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./app/store";

// ReactSession.setStoreType("sessionStorage");
// console.log(store.getState());


// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>,
//   document.getElementById("root")
// );
