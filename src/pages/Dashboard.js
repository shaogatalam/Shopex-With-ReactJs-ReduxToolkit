import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import DashTops from "../components/Dash/DashTops";
import { Card } from "react-bootstrap";
import axios from "axios";


import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


//When the user scrolls down 20px from the top of the document Add/Remove class
onscroll = () => {
  const selector = document.querySelector(".notifications");
  (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
  ? selector.classList.add("topper")
  : selector.classList.remove("topper");
};


onscroll = () => {
  const notificationElement = document.querySelector(".notifications");
  if (notificationElement) {
    notificationElement.classList.toggle("topper", window.scrollY > 20);
  }
};



//export { messaging };
function Dashboard() {

  var dispatch = useDispatch();
  var demo_value  = useSelector((state) => state.Profile_personal_data.demo);
  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);

  console.log(useSelector((state) => state.dashTops.status));
  console.log(shoptype);


  var [sales, setSales]         = useState();
  var [orders, setOrders]       = useState();
  var [customers, setCustomers] = useState();
  var [profits, setProfits]     = useState();

  var [sales_change, setSales_change]         = useState();
  var [orders_change, setOrders_change]       = useState();
  var [customers_change, setCustomers_change] = useState();
  var [profits_change, setProfits_change]     = useState();


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

  const generateToken = async() => {

    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
      const token = await getToken(messaging,{
          vapidKey:"BK-1AWv_FyDp6eUfNWL-PJAhRECrvkiPd2pKo434RUpy5oO674jBxPgx0wX-01irtu5_WhDS6QfhoTK4Bz4SCzE"
      })
      console.log(token);
      setToken(token);
      sendTokenToServer(token);
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

    if(accountType == "paid") {
      
      axios.post("https://server.shopex.io/dashboard/dash_PageTopCards.php",{},{withCredentials: true})
        .then(
            (response) => {
              setSales(response.data.revenue);
              setCustomers(response.data.customer);
              setOrders(response.data.order);
              setProfits(response.data.profit);
              setSales_change(response.data.revenue_change);
              setCustomers_change(response.data.customer_change);
              setOrders_change(response.data.order_change);
              setProfits_change(response.data.profit_change);
            },
            (error) => {}
        );
    }
  
  }, []); 


  if( accountType == "demo" ){
   
    sales = 100000;
    orders = 500; 
    customers= 200;
    profits = 30000;
    sales_change =15;
    orders_change = -10; 
    customers_change = 20; 
    profits_change = 5; 

  }
  
  return (
    
    <>

    <div>
      <button onClick={generateToken}>Subscribe</button>
      {token && <p>Your token: {token}</p>}
    </div>
    
      <Grid container spacing={2}>
    
        <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
          <Card className="dash-card key-note" style={{"height":"fit-content"}}>
            <div>
              <h6> Sale's </h6>
              {sales ? (
                  <>
                    {/* <h4>{sales}</h4>
                    <p>
                      <span>{sales_change}</span> Month over month
                    </p> */}
                    <h4 style={{ color: sales_change >= 0 ? 'green' : 'red' }}>{sales}</h4>
                    <p>
                      <span style={{ color: sales_change >= 0 ? 'green' : 'red' }}>
                        {sales_change >= 0 ? '+' : ''}{sales_change}%
                      </span> 
                      Month over month
                    </p>
                  </>
                ) : (
                  <p>No sales </p>
                )}
            </div>
            <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="1em" width="1em" style={{"fontSize": "30px"}}>
              <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"></path>
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"></path>
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"></path>
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"></path>
            </svg>
          </Card>
        </Grid>

        <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
          <Card className="dash-card key-note" style={{"height":"fit-content"}}>
            <div>
              <h6> Customer's </h6>
          
              {customers ? (
                <>
                  {/* <h4>{customers}</h4>
                  <p>
                    <span>{customers_change}</span> Month over month
                  </p> */}
                  <h4 style={{ color: customers_change >= 0 ? 'green' : 'red' }}>{customers}</h4>
                  <p>
                    <span style={{ color: customers_change >= 0 ? 'green' : 'red' }}>
                      {customers_change >= 0 ? '+' : ''}{customers_change}%
                    </span> 
                    Month over month
                  </p>
                </>
              ) : (
                <p>No customers </p>
              )}
            </div>
            <svg fill="none" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style={{"fontSize": "30px"}}>
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0M8 21v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M15 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0M17 10h2a2 2 0 0 1 2 2v1M5 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0M3 13v-1a2 2 0 0 1 2-2h2"></path>
            </svg>
          </Card>
        </Grid>

        <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
          <Card className="dash-card key-note" style={{"height":"fit-content"}}>
            <div>
              <h6> Orders </h6>
              {orders ? (
                <>
                  <h4 style={{ color: orders_change >= 0 ? 'green' : 'red' }}>{orders}</h4>
                  <p>
                    <span style={{ color: orders_change >= 0 ? 'green' : 'red' }}>
                      {orders_change >= 0 ? '+' : ''}{orders_change}%
                    </span> 
                    Month over month
                  </p>
                </>
              ) : (
                <p> No orders </p>
              )}
            </div>
            <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="1em" width="1em" style={{"fontSize": "30px"}}>
              <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"></path>
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"></path>
            </svg>
          </Card>
        </Grid>

        <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
          <Card className="dash-card key-note" style={{"height":"fit-content"}}>
            <div>
              <h6> Profit's </h6>
              {profits ? (
                <>
                  <h4 style={{ color: profits_change >= 0 ? 'green' : 'red' }}>{profits}</h4>
                  <p>
                    <span style={{ color: profits_change >= 0 ? 'green' : 'red' }}>
                      {profits_change >= 0 ? '+' : ''}{profits_change}%
                    </span> 
                    Month over month
                  </p>
                </>
              ) : (
                <p>No profits </p>
              )}
            </div>
            <svg fill="none" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style={{"fontSize": "30px"}}>
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3-2.686-3-6-3-6 1.343-6 3z"></path>
              <path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598 0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6z"></path>
              <path d="M3 6v10c0 .888.772 1.45 2 2"></path>
              <path d="M3 11c0 .888.772 1.45 2 2"></path>
            </svg>
          </Card>
        </Grid>
    
      </Grid>
                  
      <DashTops />
      
      {/* <DashEmail/> */}
    
    </>
  
  );

}

export default Dashboard;
