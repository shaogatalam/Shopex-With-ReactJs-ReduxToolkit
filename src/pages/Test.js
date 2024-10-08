import React, { useState, useEffect } from "react";
import SelectPaginated from 'select-paginated';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

function Test() {

  const firebaseConfig = {
    apiKey: "AIzaSyDLbWCTwxnIOMKZy9te1Db-GnC6PrOzgU0",
    authDomain: "push-noti-reactspringboot.firebaseapp.com",
    projectId: "push-noti-reactspringboot",
    storageBucket: "push-noti-reactspringboot.appspot.com",
    messagingSenderId: "97969431174",
    appId: "1:97969431174:web:ff85ea60a1e0054142a707",
    measurementId: "G-F1RF0E6M7R"
  };
  
  const app               = initializeApp(firebaseConfig);
  const messaging         = getMessaging(app);

  const [token, setToken] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const generateToken = async() => {

    const permission = await Notification.requestPermission();
    // console.log(permission);
    // if(permission === "granted"){
    //   const token = await getToken(messaging,{
    //       vapidKey:"BK-1AWv_FyDp6eUfNWL-PJAhRECrvkiPd2pKo434RUpy5oO674jBxPgx0wX-01irtu5_WhDS6QfhoTK4Bz4SCzE"
    //   })
    //   console.log(token);
    //   setToken(token);
    //   sendTokenToServer(token);
    // }

    // try {
    //   const permission = await Notification.requestPermission();
    //   console.log("Permission status: ", permission);
  
    //   if (permission === "granted") {
    //     try {
    //       const notification = new Notification("Example notification", {
    //         body: `Random number: ${Math.random()}`,
    //         tag: "Welcome Message",
    //       });
  
    //       notification.addEventListener("error", (e) => {
    //         console.error("Notification error: ", e);
    //         alert("Error: " + e.message);
    //       });
  
    //       notification.addEventListener("show", () => {
    //         console.log("Notification shown");
    //       });
  
    //       notification.addEventListener("click", () => {
    //         console.log("Notification clicked");
    //       });
  
    //       console.log("Notification created: ", notification);
    //     } catch (error) {
    //       console.error("Error creating notification: ", error);
    //       alert("Error creating notification: " + error.message);
    //     }
    //   } else {
    //     console.log("Notification permission denied");
    //     alert("Notification permission denied");
    //   }
    // } catch (error) {
    //   console.error("Error requesting permission: ", error);
    //   alert("Error requesting permission: " + error.message);
    // }

    try {
        // if (!("Notification" in window)) {
        //   alert("This browser does not support desktop notification");
        // } else if (permission === "granted") {
        //     alert("hi");
        //     //var noti = new Notification("Hi there!");
        //     //const notification = new Notification("Hi there!");
        //     const notification = new Notification("Simple notification", {
        //       body: "This is a test notification",
        //     });
        //     notification.onshow = () => {
        //         setNotificationVisible(true);
        //         console.log("Notification is shown");
        //     };

        //     notification.onclick = () => {
        //     setNotificationVisible(false);
        //     console.log("Notification was clicked");
        //     };

        //     notification.onclose = () => {
        //     setNotificationVisible(false);
        //     console.log("Notification was closed");
        //     };

        //     notification.onerror = (e) => {
        //     console.error("Notification error: ", e);
        //     alert("Notification error: " + e.message);
        //     };

        //     // Set a timeout to check if the notification is still visible
        //     setTimeout(() => {
        //     setNotificationVisible(false);
        //     console.log("Notification visibility check: ", notificationVisible);
        //     }, 5000); // Check after 5 seconds
                
        // } else if (Notification.permission !== "denied") {
        //   // Ask for permission
        //   const permission = await Notification.requestPermission();
        //   if (permission === "granted") {
        //     new Notification("Hi there!");
        //   }
        // }
        if (!("Notification" in window)) {
          // Check if the browser supports notifications
          alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          // Check whether notification permissions have already been granted;
          // if so, create a notification
          const notification = new Notification("Hi there!");
          // …
        } else if (Notification.permission !== "denied") {
          // We need to ask the user for permission
          Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              const notification = new Notification("Hi there!");
              // …
            }
          });
        }
      } catch (error) {
        console.error("Error requesting notification permission: ", error);
        alert("Error requesting notification permission: " + error.message);
      }

  }
  const sendTokenToServer = async (token) => {
    try {
      const response = await fetch('http://localhost:2020/NotificationPermission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(token),
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error('Failed to send token to server');
      }
        console.log('Token sent to server successfully');
    } catch (error) {
        console.error('Error sending token to server:', error);
    }
  };
  
  // let messaging_ = getMessaging();
  // onMessage(messaging_, (payload) => {
  //   console.log('Message received. ', payload);
  //   const notificationTitle = payload.notification.title;
  //   const notificationBody  = payload.notification.body;
  //   let permission = Notification.permission;
  //   if(permission === "granted"){
  //     alert("granted");
  //     new Notification(notificationBody);
  //   } else if(permission === "default"){
  //     alert("Use default alert");
  //   } else {
  //     alert("Use normal alert");
  //   }
  // });

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const notificationTitle = payload.notification.title;
      const notificationBody = payload.notification.body;
      let permission = Notification.permission;

      // if (permission === "granted") {
      //   new Notification(notificationTitle, {
      //     body: notificationBody,
      //   });
      //   alert("granted");
      //   new Notification(" new notification");
      // } else if (permission === "default") {
      //   alert("Use default alert");
      // } else {
      //   alert("Use normal alert");
      // }
      try {
        new Notification(" new notification");
      } catch (error) {
        console.error('Error showing notification:', error);
      }


    });
  }, []);


  return (
    <div>
        <SelectPaginated 
            pageSize      = {30}
            isLinearArray = {false}
            api = {{
                resourceUrl   : "https://server.shopex.io/products/product-get-list.php",
                pageParamKey  : "page", 
                limitParamKey : "limit",
            
            }}
            onSelect={(selectedItems) => {
                console.log('selected items :: ', JSON.stringify(selectedItems));
            }}
            onRemove={(removedItem) => {
                console.log('Removed items :: ', JSON.stringify(removedItem));
            }}
            multiSelect       = {true}
            searchPlaceholder = "Search..."
            displayKey        = "proname"
            localStorageKey   = "SelectFetchedData"
        />

        <div>
            <h1>My PWA with Push Notifications</h1>
            <button onClick={generateToken}>Subscribe</button>
            {token && <p>Your token: {token}</p>}
        </div>
    </div>
  )
}

export default Test