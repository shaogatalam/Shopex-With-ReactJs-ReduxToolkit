import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import { get_all_orders_group_by_campaign } from "../../features/campaign/OrderListAndGroupByCam";
import { Card } from "react-bootstrap";
import Button from '@mui/material/Button';

function OrderListGroupbyCamSrc() {
  
  const dispatch              = useDispatch();
  const defaultMaterialTheme  = createTheme();
  var accountType             = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {
    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_all_orders_group_by_campaign")) {
    //     ReactSession.set("get_all_orders_group_by_campaign", "1");
    //     dispatch(get_all_orders_group_by_campaign({ ajax_call: "groupbysrc" }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_all_orders_group_by_campaign")) {
        sessionStorage.setItem("get_all_orders_group_by_campaign", "1");
        dispatch(get_all_orders_group_by_campaign({ ajax_call: "groupbysrc" }));
      }
    }
  }, []);

  // var group_by_campaign_source = useSelector((state) => state.campaign.orderGroupByCamSrc);
  // group_by_campaign_source = structuredClone(group_by_campaign_source);

  var group_by_campaign_source = useSelector((state) => state.campaign);
  var gbcs = group_by_campaign_source?.orderGroupByCamSrc ?? [];
  if (gbcs !== undefined) {
    gbcs = structuredClone(gbcs);
  } else {
    console.error('undefined');
  }


  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }

  
  return (

    <>
    
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Campaign : comparison  </h6>
        </div>
      </Grid>

      <Grid className="campaign" container spacing={3}>
      
      
        <Grid item md={12}>
      
          {group_by_campaign_source && group_by_campaign_source.length > 0 ? (
      
          <Card className="dash-card">
          
              <ThemeProvider theme={defaultMaterialTheme}>
          
                <MaterialTable
          
                  columns={[
                    { title: "Source", field: "Source" },
                    { title: "Traffic", field: "Traffic" ,type:"numeric",
                    customSort: (a, b) => a.Traffic - b.Traffic},
                    { title: "Orders", field: "Orders" ,type:"numeric",
                    customSort: (a, b) => a.Orders - b.Orders},
                    { title: "Revenue", field: "Revenue" ,type:"numeric",
                    customSort: (a, b) => a.Revenue - b.Revenue},
                    { title: "Average_order_Rev", field: "Average_order_Rev",type:"numeric",
                    customSort: (a, b) => a.Average_order_Rev - b.Average_order_Rev },
                  ]}
                  
                  data={group_by_campaign_source}
                  title="Group By Campaign Source"
                
                />
              
              </ThemeProvider>
            
            </Card>
    
          ) : 

              <div style={{ textAlign: 'left', marginTop: '20px' }}>
                <h4> There's No order from campaign </h4>
                <br/>
                <Button variant="contained" color="primary" href="/engage/createnew">
                  :: Create Email Campaign 
                </Button>
              </div>

          }
    
        </Grid>
    
      </Grid>

    </> 

  );

}

export default OrderListGroupbyCamSrc;
