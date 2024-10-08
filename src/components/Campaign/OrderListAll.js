import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";

import { get_all_orders_from_campaign } from "../../features/campaign/OrderListAndGroupByCam";
import { Card } from "react-bootstrap";

import { campaign_Slice } from "../../features/campaign/OrderListAndGroupByCam";
//import store,{injectAsyncReducer} from "../../app/NewStore";

function OrderListAll() {

  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);



  // var dynamic_campaign_Reducer = () => {
  //   if (ReactSession.get("dynamic_campaign_Reducer")) {
  //     return true;
  //   } else {
  //     ReactSession.set("dynamic_campaign_Reducer", "1");
  //     return false;
  //   }
  // }

  // if(!(dynamic_campaign_Reducer())) {

  //   injectAsyncReducer('campaign', campaign_Slice.reducer);       
  //   console.log(store.getState());

  //   store.subscribe(() => {
  //     const newState = store.getState();
  //     if ( newState.campaign ){
  //       console.log('Dynamic reducers injected successfully!');
  //     }
  //   });
  // }

  const dispatch = useDispatch();
  const defaultMaterialTheme = createTheme();

  var Allorder = useSelector((state) => state.campaign);
  var Allorder = Allorder?.Allorder ?? [];
  if (Allorder !== undefined) {
    Allorder = structuredClone(Allorder);
  } else {
    console.error('undefined');
  } 

  useEffect(() => {

    // if(accountType ==="paid") {
    //   if (!ReactSession.get("get_all_orders_from_campaign")) {
    //     ReactSession.set("get_all_orders_from_campaign", "1");
    //     dispatch(get_all_orders_from_campaign({ ajax_call: "order_list" }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_all_orders_from_campaign")) {
        sessionStorage.setItem("get_all_orders_from_campaign", "1");
        dispatch(get_all_orders_from_campaign({ ajax_call: "order_list" }));
      }
    }

    if(accountType ==="demo") {
      Allorder = [
        {
          "Campaign": "Summer Sale",
          "Medium": "Social",
          "Source": "Facebook",
          "OrderId": "ORD-001",
          "Amount": 99.99,
          "Date": "2023-06-15"
        },
        {
          "Campaign": "Holiday Promotion",
          "Medium": "Email",
          "Source": "Newsletter",
          "OrderId": "ORD-002",
          "Amount": 149.99,
          "Date": "2023-12-01"
        },
        {
          "Campaign": "Black Friday",
          "Medium": "Organic",
          "Source": "Google",
          "OrderId": "ORD-003",
          "Amount": 79.99,
          "Date": "2023-11-25"
        },
        {
          "Campaign": "Spring Clearance",
          "Medium": "Paid Search",
          "Source": "Google Ads",
          "OrderId": "ORD-004",
          "Amount": 59.99,
          "Date": "2023-04-01"
        },
        {
          "Campaign": "Influencer Collab",
          "Medium": "Referral",
          "Source": "Instagram",
          "OrderId": "ORD-005",
          "Amount": 119.99,
          "Date": "2023-07-10"
        }
      ];
    }

  }, []);


  // var Allorder = useSelector((state) => state.campaign.Allorder);
  // Allorder = structuredClone(Allorder);
  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }

  return (
  
    <>
    
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Campaign : Orders  </h6>
        </div>
      </Grid>
      
      <Grid className="campaign" container spacing={3}>
      
        <Grid item md={12}>
      
          {Allorder && Allorder.length > 0 && (
      
            <Card className="dash-card">
      
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  columns={[
                    { title: "Camapign", field: "Camapign" },
                    { title: "Medium", field: "Medium" },
                    { title: "Source", field: "Source" },
                    { title: "OrderId", field: "OrderId" },
                    { title: "Amount", field: "Amount" },
                    { title: "Date", field: "Date" },
                  ]}
                  data={Allorder}
                  title="Orders from Campaign"
                />
              </ThemeProvider>

            </Card>

          )}

        </Grid>

      </Grid>
    
    </>
  
  );

}

export default OrderListAll;
