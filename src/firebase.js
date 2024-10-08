import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyDLbWCTwxnIOMKZy9te1Db-GnC6PrOzgU0",
    authDomain: "push-noti-reactspringboot.firebaseapp.com",
    projectId: "push-noti-reactspringboot",
    storageBucket: "push-noti-reactspringboot.appspot.com",
    messagingSenderId: "97969431174",
    appId: "1:97969431174:web:ff85ea60a1e0054142a707",
    measurementId: "G-F1RF0E6M7R"
};
const app       = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async() => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
        const token = await getToken(messaging,{
            vapidKey:"BK-1AWv_FyDp6eUfNWL-PJAhRECrvkiPd2pKo434RUpy5oO674jBxPgx0wX-01irtu5_WhDS6QfhoTK4Bz4SCzE"
        })
        console.log(token);
    }
}


export { messaging };
