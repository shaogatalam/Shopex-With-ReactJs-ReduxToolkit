import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import { get_all_coupons } from "../features/Coupons/Get_coupon_list";
import { Card } from "react-bootstrap";

function Coupons() {
  
  var dispatch = useDispatch();
  var defaultMaterialTheme = createTheme();

  // var All_coupons = useSelector((state) => state.coupon.Allcoupon);
  // All_coupons = structuredClone(All_coupons);

  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);

  
  var All_coupons=[];

  var coupons = useSelector((state) => state.coupon);

  if(accountType === "paid"){
    
    All_coupons = coupons?.Allcoupon ?? [];
    if (All_coupons !== undefined) {
      All_coupons = structuredClone(All_coupons);
    } else {
      console.error('product_table is undefined');
    }

  } else {

    All_coupons = [
      { ID: 1, CODE: 'DUMMY10', AMOUNT: '10%', TYPE: 'Percentage', 'TOTAL-USER': 100 },
      { ID: 2, CODE: 'DUMMY20', AMOUNT: '20%', TYPE: 'Percentage', 'TOTAL-USER': 200 },
      { ID: 1, CODE: 'DUMMY30', AMOUNT: '10%', TYPE: 'Percentage', 'TOTAL-USER': 100 },
      { ID: 2, CODE: 'DUMMY40', AMOUNT: '20%', TYPE: 'Percentage', 'TOTAL-USER': 200 },
      { ID: 1, CODE: 'DUMMY50', AMOUNT: '10%', TYPE: 'Percentage', 'TOTAL-USER': 100 },
      { ID: 2, CODE: 'DUMMY60', AMOUNT: '20%', TYPE: 'Percentage', 'TOTAL-USER': 200 },
      { ID: 1, CODE: 'DUMMY70', AMOUNT: '10%', TYPE: 'Percentage', 'TOTAL-USER': 100 },
      { ID: 2, CODE: 'DUMMY80', AMOUNT: '20%', TYPE: 'Percentage', 'TOTAL-USER': 200 },
    ];
  }
  


  useEffect(() => {

    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_all_coupons")) {
    //       ReactSession.set("get_all_coupons", "1");
    //       dispatch(get_all_coupons({ajax_call:"get_all_coupons_list"}));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_all_coupons")) {
        sessionStorage.setItem("get_all_coupons", "1");
        dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
      }
    }

  }, []);


  return (

    <>
    
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Coupons : Available  </h6>
        </div>
      </Grid>

      <Grid className="campaign" container spacing={3}>
        <Grid item md={12}>
          {All_coupons && All_coupons.length > 0 && (
            <Card className="dash-card">
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  columns={[
                    { title: "ID", field: "ID" },
                    { title: "CODE", field: "CODE" },
                    { title: "AMOUNT", field: "AMOUNT" },
                    { title: "TYPE", field: "TYPE" },
                    { title: "TOTAL-USER", field: "TOTAL-USER" },
                  ]}
                  data={All_coupons}
                  title="Created coupons"
                />
              </ThemeProvider>
            </Card>
          )}
        </Grid>
      </Grid>

    </>

  );

}

export default Coupons;
