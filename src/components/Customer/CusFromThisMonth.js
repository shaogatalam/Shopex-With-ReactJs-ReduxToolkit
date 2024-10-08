import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { get_custm_data } from "../../features/cus/CustomersFromThisMonth";
import { Card } from "react-bootstrap";

//import { Modal, Paper, TextField } from '@mui/material';
//import { makeStyles } from '@mui/material';

import { forwardRef } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
//import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
//import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

var tableIcons = {
    Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <CheckBoxIcon {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutlineIcon {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <InfoIcon {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeftIcon {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <ManageSearchIcon {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <FilterListIcon style={{color:'red'}} {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <RemoveCircleOutlineIcon {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumnIcon {...props} ref={ref} />)
};

// import store from "../../app/NewStore";
function CusFromThisMonth() {
      
  var defaultMaterialTheme  = createTheme();
  var dispatch4             = useDispatch();

  var accountType           = useSelector((state) => state.dashTops.accountType);
  var get_custm_dataFlag    = useSelector((state) => state.cusTM.get_custm_dataFlag);
  var CusThisMonth          = useSelector((state) => state.cusTM);
  
  var[thisMonthNewCustomer,setThisMonthNewCustomer]       = useState();
  var[thisMonthRepeatCustomer,setThisMonthRepeatCustomer] = useState();
  
  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_custm_data")) {
    //     ReactSession.set("get_custm_data", "1");
    //     dispatch4(get_custm_data({ajax_seg:2}));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_custm_data")) {
        sessionStorage.setItem("get_custm_data", "1");
        dispatch4(get_custm_data({ ajax_seg: 2 }));
      }
    }

    if(accountType === "demo") {

      var tmnew = [
        { "customer": "John Smith", "spend": 1500 },
        { "customer": "Emily Johnson", "spend": 2000 },
        { "customer": "Michael Davis", "spend": 1200 },
        { "customer": "Sophia Wilson", "spend": 1800 },
        { "customer": "William Taylor", "spend": 2200 },
        { "customer": "Olivia Miller", "spend": 1700 },
        { "customer": "Daniel Anderson", "spend": 1300 },
        { "customer": "Isabella Moore", "spend": 1900 },
        { "customer": "Liam Jackson", "spend": 2100 },
        { "customer": "Ava White", "spend": 1400 },
        { "customer": "Elijah Harris", "spend": 1600 },
        { "customer": "Mia Martin", "spend": 2300 },
        { "customer": "Henry Brown", "spend": 1100 },
        { "customer": "Sofia Davis", "spend": 2500 },
        { "customer": "Jackson Clark", "spend": 2700 },
        { "customer": "Chloe Lewis", "spend": 2600 },
        { "customer": "Alexander Young", "spend": 2000 },
        { "customer": "Amelia Walker", "spend": 2200 },
        { "customer": "Benjamin Hall", "spend": 2400 },
        { "customer": "Ella Turner", "spend": 2100 }
      ];
      setThisMonthNewCustomer(tmnew);
      
      var tmret = [
        { "customer": "John Smith", "spend": 1500, "ret_after": 2, "placed_Nth_order": 3 },
        { "customer": "Emily Johnson", "spend": 2000, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Michael Davis", "spend": 1200, "ret_after": 3, "placed_Nth_order": 5 },
        { "customer": "Sophia Wilson", "spend": 1800, "ret_after": 2, "placed_Nth_order": 4 },
        { "customer": "William Taylor", "spend": 2200, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Olivia Miller", "spend": 1700, "ret_after": 2, "placed_Nth_order": 3 },
        { "customer": "Daniel Anderson", "spend": 1300, "ret_after": 3, "placed_Nth_order": 5 },
        { "customer": "Isabella Moore", "spend": 1900, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Liam Jackson", "spend": 2100, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Ava White", "spend": 1400, "ret_after": 3, "placed_Nth_order": 4 },
        { "customer": "Elijah Harris", "spend": 1600, "ret_after": 2, "placed_Nth_order": 3 },
        { "customer": "Mia Martin", "spend": 2300, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Henry Brown", "spend": 1100, "ret_after": 3, "placed_Nth_order": 4 },
        { "customer": "Sofia Davis", "spend": 2500, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Jackson Clark", "spend": 2700, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Chloe Lewis", "spend": 2600, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Alexander Young", "spend": 2000, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Amelia Walker", "spend": 2200, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Benjamin Hall", "spend": 2400, "ret_after": 1, "placed_Nth_order": 2 },
        { "customer": "Ella Turner", "spend": 2100, "ret_after": 1, "placed_Nth_order": 2 }
      ];
      setThisMonthRepeatCustomer(tmret)
    }

  }, [])

  
  useEffect(() => {

    if (CusThisMonth !== undefined) {

      var new_customer_this_month = (CusThisMonth?.newcus_obj ?? []) ?? [];
      var ret_customer_this_month = (CusThisMonth?.retcus_obj ?? []) ?? [];
  
      if (new_customer_this_month.length > 0) {
        var tmnew = structuredClone(new_customer_this_month);
        setThisMonthNewCustomer(tmnew);
      }
  
      if (ret_customer_this_month.length > 0) {
        var tmret = structuredClone(ret_customer_this_month);
        setThisMonthRepeatCustomer(tmret)
      }
    
    } else {
      console.log("CusLocChartTable reducer :: undefined");
    }

  },[get_custm_dataFlag])
 

  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
  //     }
  //   },
  // }));
  // var classes = useStyles();


  return (
    
    <>
    
      {/* New and Returning Customers From this Month */}
    
      <Grid item xl={6} lg={6} xs={12}>
    
        <Card className="dash-card">
          
          <ThemeProvider theme={defaultMaterialTheme}>
            {thisMonthNewCustomer && (

              <div>
              <MaterialTable
                style={{ borderRadius: "14px" }}
                columns={[
                  { title: "Customer", field: "customer", render: row => <h6 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.customer} </h6> },
                  { title: "Spend",type:"numeric", field: "spend", render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.spend} </strong>,
                  customSort: (a, b) => a.total_order - b.total_order, },
                ]}
                data={thisMonthNewCustomer}
                title="New Customer from this month"
                icons={tableIcons}
                options={{
                  sortIcon: true,
                  draggable: true, 
                  sorting: true, 
                  showFirstLastPageButtons: false,
                  pageSize: 10, 
                  emptyRowsWhenPaging: false, 
                  pageSizeOptions: [10, 15, 25, 40, 50],
                  search: false,
                  cellStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    padding:'7px',
                    borderTop:"0px",
                    borderBottom:"0px",
                    borderLeft:"1px solid lightgray",
                    borderRight:"1px solid lightgray",
                  },
                  headerStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    fontWeight:700,
                    padding: "0px",
                    backgroundColor: "rgba(76, 110, 245, 0.1)",
                    color: "rgb(76, 110, 245)",
                    border: "0px",
                  },
                  rowStyle :  {}
                }}
                localization={{
                  pagination: {
                    labelRowsPerPage: "",
                    showFirstLastPageButtons: false,
                    showPageSizeOptions: false,
                    showPageJump: false,
                  },
                }}
              />
              </div>
            )}
          </ThemeProvider>

        </Card>
      
      </Grid>


      <Grid item xl={6} lg={6} xs={12}>
        
        <Card className="dash-card" style={{boxShadow:'none'}}>
        
          <ThemeProvider theme={defaultMaterialTheme}>
            {thisMonthRepeatCustomer && (
              <div>
                <MaterialTable
                columns={[
                  { title: "Customer", field: "customer",  width: "30%",
                    render : row => 
                    <h6 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> 
                      {row.customer} 
                    </h6> 
                  },
                  { title: "Spend", field: "spend" ,type:"numeric",  
                    render: row => <strong style={{backgroundColor: "whitesmoke",display: "block"}}> {row.spend} </strong>,
                    customSort: (a, b) => a.spend - b.spend
                  },
                  { title: "BuyGap", field: "ret_after" ,type:"numeric", 
                    render: row => <strong style={{backgroundColor: "whitesmoke",display: "block"}}> {row.ret_after} </strong>,
                    customSort: (a, b) => a.ret_after - b.ret_after
                  },
                  { title: "Nth-Order", field: "placed_Nth_order" ,type:"numeric", 
                    render: row => <strong style={{backgroundColor: "whitesmoke",display: "block"}}> {row.placed_Nth_order} </strong>,
                    customSort: (a, b) => a.placed_Nth_order - b.placed_Nth_order
                  },
                ]}
                data={thisMonthRepeatCustomer}
                title="Repeat customer From this month"
                icons={tableIcons}
                options={{
                  sortIcon: true,
                  draggable: true, 
                  sorting: true, 
                  showFirstLastPageButtons: false,
                  pageSize: 10, 
                  emptyRowsWhenPaging: false, 
                  pageSizeOptions: [10, 15, 25, 40, 50],
                  search: false,
                  cellStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    padding:'7px',
                    borderTop:"0px",
                    borderBottom:"0px",
                    borderLeft:"1px solid lightgray",
                    borderRight:"1px solid lightgray",
                  },
                  headerStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    fontWeight:700,
                    padding: "0px",
                    backgroundColor: "rgba(76, 110, 245, 0.1)",
                    color: "rgb(76, 110, 245)",
                    border: "0px",
                  },
                  rowStyle :  {}
                }}
                localization={{
                  pagination: {
                    labelRowsPerPage: "",
                    showFirstLastPageButtons: false,
                    showPageSizeOptions: false,
                    showPageJump: false,
                  },
                }}
              />
              </div>
              
            )}
          </ThemeProvider>

        </Card>

      </Grid>

    </>

  );

}

export default CusFromThisMonth;
