import React,{lazy,Suspense} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import loadable from '@loadable/component'
import Loader from "./pages/Loader";

//import { getMessaging, onMessage } from "firebase/messaging";


import Test from "./pages/Test";
const LoginPage = loadable(() => import('./pages/LoginPage'))
const Demo = loadable(() => import('./pages/Demo'))
const SignUpPage = loadable(() => import('./pages/SignUpPage'))
const Dashboard = loadable(() => import('./pages/Dashboard'));
const Baskets = loadable(() => import('./pages/Baskets'));
const SingleCustomer = loadable(() => import('./pages/SingleCustomer'));
const Coupons = loadable(() => import('./pages/Coupons'));
const RegVerify = loadable(() => import('./components/Home/RegVerify'));
const PickPlan = loadable(() => import('./components/Home/PickPlan'));
const InsertShopURL = loadable(() => import('./components/Home/InsertShopURL'));
const Profile = loadable(() => import('./pages/Profile'));
const TeamForm = loadable(() => import('./pages/TeamForm'));
const CusReport = loadable(() => import('./components/Customer/CusReport'));
const CusListAndSegment = loadable(() => import('./components/Customer/CusListAndSegment'));
const CusRetention = loadable(() => import('./components/Customer/CusRetention'));
const CusRFM = loadable(() => import('./components/Customer/CusRFM'));
const CusRetentionSC = loadable(() => import('./components/Customer/CusRetentionSC'));
const ProductListAndSegments = loadable(() => import('./components/Product/ProductListAndSegments'));
const ProductOneCityPerform = loadable(() => import('./components/Product/ProductOneCityPerform'));
const ProductPerformance = loadable(() => import('./components/Product/ProductPerformance'));
const ProductPurchaseCusSeg = loadable(() => import('./components/Product/ProductPurchaseCusSeg'));
const ProductSalesTable = loadable(() => import('./components/Product/ProductSalesTable'));
const ProductSegmentPerformance = loadable(() => import('./components/Product/ProductSegmentPerformance'));
const SingleProduct = loadable(() => import('./components/SinPro/SingleProduct'));
const OrderReport = loadable(() => import('./components/Order/OrderReport'));
const OrderListAndSegments = loadable(() => import('./components/Order/OrderListAndSegment'));
const AddNewCampaign = loadable(() => import('./components/Campaign/AddNewCampaign'));
const OrderListAll = loadable(() => import('./components/Campaign/OrderListAll'));
const OrderListGroupByCamSrc = loadable(() => import('./components/Campaign/OrderListGroupByCamSrc'));
const PricingCreate = loadable(() => import('./components/Pricing/PricingCreate'));
const PricingCreatedList = loadable(() => import('./components/Pricing/PricingCreatedList'));
const Available = loadable(() => import('./components/Engage/Available'));
const CreateNew = loadable(() => import('./components/Engage/CreateNew'));
const SideNav = loadable(() => import('./pages/SideNav'));
const SingleOrder = loadable(() => import('./components/SinOrder/SingleOrder'));
const CusSegmentTrack = loadable(() => import('./components/Customer/CusSegmentTrack'));
const Issues_ = loadable(() => import('./pages/Issues_'));
const SetNewPassword = loadable(() => import('./pages/SetNewPassword'));

// Lazy
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const SingleCustomer = lazy(() => import('./pages/SingleCustomer'));
// const Coupons = lazy(() => import('./pages/Coupons'));
// const RegVerify = lazy(() => import('./components/Home/RegVerify'));
// const StripeIndex = lazy(() => import('./components/Home/StripeIndex'));
// const InsertShopURL = lazy(() => import('./components/Home/InsertShopURL'));
// const Profile = lazy(() => import('./pages/Profile'));
// const TeamForm = lazy(() => import('./pages/TeamForm'));
// const CusReport = lazy(() => import('./components/Customer/CusReport'));
// const CusListAndSegment = lazy(() => import('./components/Customer/CusListAndSegment'));
// const CusRetention = lazy(() => import('./components/Customer/CusRetention'));
// const CusRetentionSC = lazy(() => import('./components/Customer/CusRetentionSC'));
// const ProductListAndSegments = lazy(() => import('./components/Product/ProductListAndSegments'));
// const ProductOneCityPerform = lazy(() => import('./components/Product/ProductOneCityPerform'));
// const ProductPerformance = lazy(() => import('./components/Product/ProductPerformance'));
// const ProductPurchaseCusSeg = lazy(() => import('./components/Product/ProductPurchaseCusSeg'));
// const ProductSalesTable = lazy(() => import('./components/Product/ProductSalesTable'));
// const ProductSegmentPerformance = lazy(() => import('./components/Product/ProductSegmentPerformance'));
// const SingleProduct = lazy(() => import('./components/SinPro/SingleProduct'));
// const OrderReport = lazy(() => import('./components/Order/OrderReport'));
// const OrderListAndSegments = lazy(() => import('./components/Order/OrderListAndSegment'));
// const AddNewCampaign = lazy(() => import('./components/Campaign/AddNewCampaign'));
// const OrderListAll = lazy(() => import('./components/Campaign/OrderListAll'));
// const OrderListGroupByCamSrc = lazy(() => import('./components/Campaign/OrderListGroupByCamSrc'));
//  const PricingCreate = lazy(() => import('./components/Pricing/PricingCreate'));
//  const PricingCreatedList = lazy(() => import('./components/Pricing/PricingCreatedList'));
//  const Available = lazy(() => import('./components/Engage/Available'));
//  const CreateNew = lazy(() => import('./components/Engage/CreateNew'));
//  const SideNav = lazy(() => import('./pages/SideNav'));
//  const SingleOrder = lazy(() => import('./components/SinOrder/SingleOrder'));
//  const CusSegmentTrack = lazy(() => import('./components/Customer/CusSegmentTrack'));
//  const Issues_ = lazy(() => import('./pages/Issues_'));
//  const LoginPage = lazy(() => import('./pages/LoginPage'));
//  const SignUpPage = lazy(() => import('./pages/SignUpPage'));

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.


function App() {
  


  //onMessage(messaging, (payload) => {
  //  console.log('Message received. ', payload);
    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //   body: payload.notification.body,
    // };
    // if(Notification.permission === 'granted'){
    //   new Notification(notificationTitle, notificationOptions);
    // }
  //});


  var status      = useSelector((state) => state.dashTops.status);
  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);
  

  return (
  
    <BrowserRouter>
  
      <div className="wrapper">
        
        <button style={{display:'none'}}className="sidenavToggleButton">|=|</button>
        {
          status !== null && status !== "failed" && 
          <aside className="aside"> 
            <SideNav /> 
          </aside>
        }

        {(status == null || status === "failed") && 
          <>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route exact path="/test" element = {<Test />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route exact path="/demo/:type" element = {<Demo/>} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Suspense>
          </>
        }

        <main className={status !== "success" ? "dashboard pl-0" : "dashboard"}>
          
          <Suspense fallback={<div>Loading...</div>}>

            <Routes>
              
              <Route exact path="/test" element = {<Test />} />
              
              {status !== null && status !== "failed" && <Route exact path="/campaign" element={<AddNewCampaign />} /> }
              {status !== null && status !== "failed" && <Route exact path="/campaign/orders" element={<OrderListAll />} />}
              {status !== null && status !== "failed" && <Route exact path="/campaign/compare" element={<OrderListGroupByCamSrc />}/>}

              <Route exact path="/dashboard" element={<Dashboard />} />
              {status !== null && status !== "failed" && <Route exact path="/baskets" element={<Baskets />} />}
             

              {status !== null && status !== "failed" && <Route exact path="/customers/reports" element={<CusReport />} />}
              {status !== null && status !== "failed" && <Route exact path="/customers/customer-and-segemnt" element={<CusListAndSegment />} />}
              {status !== null && status !== "failed" && <Route exact path="/customers/retention" element={<CusRetention />}/>}
              {/* {status !== null && status !== "failed" && <Route exact path="/customers/retention/selected-city" element={<CusRetentionSC />} />} */}
              {status !== null && status !== "failed" && <Route exact path="/customers/segment-tracker" element={<CusSegmentTrack />} />}
              {status !== null && status !== "failed" && <Route exact path="/customers/profile/:chc" element={<SingleCustomer />}/>}
              {status !== null && status !== "failed" && <Route exact path="/customers/rfm" element={<CusRFM />}/>}
              

              {status !== null && status !== "failed" && <Route exact path="/products" element={<ProductListAndSegments />}/>}
              {status !== null && status !== "failed" && <Route exact path="/products/sales"element={<ProductSalesTable />}/>}
              {status !== null && status !== "failed" && <Route exact path="/products/performance"element={<ProductPerformance />}/>}
              {status !== null && status !== "failed" && <Route exact path="/products/specific-city" element={<ProductOneCityPerform />}/>}
              {status !== null && status !== "failed" && <Route exact path="/products/customer-segment-based-on-product-purchase" element={<ProductPurchaseCusSeg />}/>}
              {status !== null && status !== "failed" && <Route exact path="/products/product-segment-performance" element={<ProductSegmentPerformance />}/>}
              {status !== null && status !== "failed" && <Route exact path="/products/:chc" element={<SingleProduct />} />}

              {status !== null && status !== "failed" && <Route exact path="/orders/report" element={<OrderReport />} />}
              {status !== null && status !== "failed" && <Route exact path="/orders" element={<OrderListAndSegments />} />}
              {status !== null && status !== "failed" && <Route exact path="/orders/:chc" element={<SingleOrder />} />}

              {shoptype ==="woo" && status !== null && status !== "failed" && <Route exact path="/pricing" element={<PricingCreate />} />}
              {shoptype ==="woo" && status !== null && status !== "failed" && <Route exact path="/pricing/created" element={<PricingCreatedList />}/>}

              {status !== null && status !== "failed" && <Route exact path="/coupons" element={<Coupons />} />}

              {status !== null && status !== "failed" && <Route exact path="/engage/available" element={<Available />} />}
              {status !== null && status !== "failed" && <Route exact path="/engage/createnew" element={<CreateNew />} />}

              <Route exact path="/RegVerify/:email/:code" element={<RegVerify />} />
              <Route exact path="/pick-plan" element={<PickPlan />} />
              <Route exact path="/InsertShopURL/:cus/:ownerId" element={<InsertShopURL />} />

              {status !== null && status !== "failed" && <Route exact path="/profile" element={<Profile />} />}

              <Route exact path="/TeamForm" element={<TeamForm />} />

              <Route exact path="/issues" element = {<Issues_ />} />

              

              <Route exact path="/setnewpassword/:id" element = {<SetNewPassword/>} />
              
              {status !== null && status !== "failed" && <Route  path="*" element={<Navigate to="/dashboard" />}/>}
              
             

            </Routes>

          </Suspense>

        </main>

      </div>

    </BrowserRouter>

  );

}

export default App;
