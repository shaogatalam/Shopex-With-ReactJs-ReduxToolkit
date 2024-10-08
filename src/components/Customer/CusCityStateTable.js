import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import { get_cusLocCT_data } from "../../features/cus/CusLocCT";
import { Card } from "react-bootstrap";

//import { Modal, Paper, TextField } from '@mui/material';
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
//import { makeStyles } from '@mui/material';

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


function CusCityStateTable() {

  var dispatch5             = useDispatch();
  var defaultMaterialTheme  = createTheme();
  var accountType           = "demo";//useSelector((state) => state.dashTops.accountType);
  var get_cusLocCT_dataFlag = useSelector((state) => state.cusTRF.get_cusLocCT_dataFlag);
  var CusLocChartTable      = useSelector((state) => state.cusLocChartTable);

  var [billingCityData,setBillingCityTableData]      = useState();
  var [billingStateData,setBillingStateTableData]    = useState();
  var [shippingCityData,setShippingCityTableData]    = useState();
  var [shippingStateData,setShippingStateTableData]  = useState();

  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_cusLocCT_data")) {
    //     ReactSession.set("get_cusLocCT_data", "1");
    //     dispatch5(get_cusLocCT_data({ ajax_seg: 2 }));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusLocCT_data")) {
        sessionStorage.setItem("get_cusLocCT_data", "1");
        dispatch5(get_cusLocCT_data({ ajax_seg: 2 }));
      }
    }

    if(accountType === "demo") {

      var billcitycloneData = [
        { city: 'New York', customers: 5000, cus_change: 10, retcus: 3000, retcus_change: 5, rev: 75000, rev_change: 12, orders: 6000, or_change: 8, opc: 1.2, opc_change: 10, rpc: 15, rpc_change: 9 },
        { city: 'Los Angeles', customers: 4000, cus_change: 8, retcus: 2500, retcus_change: 6, rev: 60000, rev_change: 10, orders: 5000, or_change: 6, opc: 1.25, opc_change: 8, rpc: 14, rpc_change: 7 },
        { city: 'Chicago', customers: 3000, cus_change: 6, retcus: 1800, retcus_change: 4, rev: 45000, rev_change: 8, orders: 4000, or_change: 5, opc: 1.33, opc_change: 6, rpc: 15, rpc_change: 9 },
        { city: 'Houston', customers: 2500, cus_change: 5, retcus: 1500, retcus_change: 3, rev: 35000, rev_change: 7, orders: 3500, or_change: 4, opc: 1.4, opc_change: 5, rpc: 14, rpc_change: 7 },
        { city: 'Phoenix', customers: 2000, cus_change: 4, retcus: 1200, retcus_change: 2, rev: 30000, rev_change: 6, orders: 3000, or_change: 3, opc: 1.5, opc_change: 4, rpc: 15, rpc_change: 6 },
        { city: 'Philadelphia', customers: 3500, cus_change: 7, retcus: 2100, retcus_change: 5, rev: 50000, rev_change: 9, orders: 4500, or_change: 6, opc: 1.29, opc_change: 7, rpc: 14, rpc_change: 8 },
        { city: 'San Antonio', customers: 1800, cus_change: 3, retcus: 1080, retcus_change: 2, rev: 27000, rev_change: 5, orders: 2700, or_change: 3, opc: 1.5, opc_change: 4, rpc: 15, rpc_change: 6 },
        { city: 'San Diego', customers: 2200, cus_change: 4, retcus: 1320, retcus_change: 3, rev: 32000, rev_change: 6, orders: 3200, or_change: 4, opc: 1.45, opc_change: 5, rpc: 14, rpc_change: 7 },
        { city: 'Dallas', customers: 2800, cus_change: 5, retcus: 1680, retcus_change: 4, rev: 40000, rev_change: 7, orders: 4000, or_change: 5, opc: 1.43, opc_change: 6, rpc: 14, rpc_change: 7 },
        { city: 'San Jose', customers: 1500, cus_change: 3, retcus: 900, retcus_change: 2, rev: 25000, rev_change: 4, orders: 2500, or_change: 3, opc: 1.67, opc_change: 3, rpc: 16, rpc_change: 4 },
      ];
      var billcitycloneData = billcitycloneData.sort((a, b) => a.customers - b.customers);
      setBillingCityTableData(billcitycloneData);

      var shipcitycloneData = [
        { city: 'New York', customers: 5000, cus_change: 10, retcus: 3000, retcus_change: 5, rev: 75000, rev_change: 12, orders: 6000, or_change: 8, opc: 1.2, opc_change: 10, rpc: 15, rpc_change: 9 },
        { city: 'Los Angeles', customers: 4000, cus_change: 8, retcus: 2500, retcus_change: 6, rev: 60000, rev_change: 10, orders: 5000, or_change: 6, opc: 1.25, opc_change: 8, rpc: 14, rpc_change: 7 },
        { city: 'Chicago', customers: 3000, cus_change: 6, retcus: 1800, retcus_change: 4, rev: 45000, rev_change: 8, orders: 4000, or_change: 5, opc: 1.33, opc_change: 6, rpc: 15, rpc_change: 9 },
        { city: 'Houston', customers: 2500, cus_change: 5, retcus: 1500, retcus_change: 3, rev: 35000, rev_change: 7, orders: 3500, or_change: 4, opc: 1.4, opc_change: 5, rpc: 14, rpc_change: 7 },
        { city: 'Phoenix', customers: 2000, cus_change: 4, retcus: 1200, retcus_change: 2, rev: 30000, rev_change: 6, orders: 3000, or_change: 3, opc: 1.5, opc_change: 4, rpc: 15, rpc_change: 6 },
        { city: 'Philadelphia', customers: 3500, cus_change: 7, retcus: 2100, retcus_change: 5, rev: 50000, rev_change: 9, orders: 4500, or_change: 6, opc: 1.29, opc_change: 7, rpc: 14, rpc_change: 8 },
        { city: 'San Antonio', customers: 1800, cus_change: 3, retcus: 1080, retcus_change: 2, rev: 27000, rev_change: 5, orders: 2700, or_change: 3, opc: 1.5, opc_change: 4, rpc: 15, rpc_change: 6 },
        { city: 'San Diego', customers: 2200, cus_change: 4, retcus: 1320, retcus_change: 3, rev: 32000, rev_change: 6, orders: 3200, or_change: 4, opc: 1.45, opc_change: 5, rpc: 14, rpc_change: 7 },
        { city: 'Dallas', customers: 2800, cus_change: 5, retcus: 1680, retcus_change: 4, rev: 40000, rev_change: 7, orders: 4000, or_change: 5, opc: 1.43, opc_change: 6, rpc: 14, rpc_change: 7 },
        { city: 'San Jose', customers: 1500, cus_change: 3, retcus: 900, retcus_change: 2, rev: 25000, rev_change: 4, orders: 2500, or_change: 3, opc: 1.67, opc_change: 3, rpc: 16, rpc_change: 4 },
      ];
      var shipcitycloneData = shipcitycloneData.sort((a, b) => a.customers - b.customers);
      setShippingCityTableData(shipcitycloneData);
     
      var billstatecloneData = [
        { state: 'New York', customers: 15000, cus_change: 12, retcus: 9000, retcus_change: 8, rev: 150000, rev_change: 15, orders: 18000, or_change: 10, opc: 1.2, opc_change: 12, rpc: 10, rpc_change: 6 },
        { state: 'California', customers: 12000, cus_change: 10, retcus: 7200, retcus_change: 7, rev: 130000, rev_change: 13, orders: 15000, or_change: 8, opc: 1.25, opc_change: 10, rpc: 11, rpc_change: 7 },
        { state: 'Texas', customers: 9000, cus_change: 8, retcus: 5400, retcus_change: 6, rev: 100000, rev_change: 10, orders: 12000, or_change: 6, opc: 1.33, opc_change: 8, rpc: 12, rpc_change: 6 },
        { state: 'Florida', customers: 7500, cus_change: 6, retcus: 4500, retcus_change: 5, rev: 80000, rev_change: 8, orders: 9000, or_change: 4, opc: 1.4, opc_change: 5, rpc: 11, rpc_change: 5 },
        { state: 'Illinois', customers: 6000, cus_change: 5, retcus: 3600, retcus_change: 4, rev: 70000, rev_change: 7, orders: 7500, or_change: 3, opc: 1.5, opc_change: 4, rpc: 12, rpc_change: 4 },
        { state: 'Pennsylvania', customers: 8000, cus_change: 7, retcus: 4800, retcus_change: 6, rev: 90000, rev_change: 9, orders: 10500, or_change: 5, opc: 1.29, opc_change: 7, rpc: 11, rpc_change: 6 },
        { state: 'Arizona', customers: 4500, cus_change: 4, retcus: 2700, retcus_change: 3, rev: 65000, rev_change: 6, orders: 6000, or_change: 4, opc: 1.5, opc_change: 4, rpc: 14, rpc_change: 5 },
        { state: 'Michigan', customers: 5500, cus_change: 5, retcus: 3300, retcus_change: 4, rev: 75000, rev_change: 7, orders: 9000, or_change: 5, opc: 1.43, opc_change: 6, rpc: 13, rpc_change: 6 },
        { state: 'North Carolina', customers: 4800, cus_change: 4, retcus: 2880, retcus_change: 3, rev: 68000, rev_change: 6, orders: 7200, or_change: 4, opc: 1.5, opc_change: 4, rpc: 14, rpc_change: 5 },
        { state: 'Georgia', customers: 6200, cus_change: 6, retcus: 3720, retcus_change: 5, rev: 82000, rev_change: 8, orders: 9600, or_change: 6, opc: 1.29, opc_change: 7, rpc: 12, rpc_change: 7 },
      ];
      var billstatecloneData = billstatecloneData.sort((a, b) => a.customers - b.customers);
      setBillingStateTableData(billstatecloneData);

      var shipstatecloneData = [
        { state: 'New York', customers: 15000, cus_change: 12, retcus: 9000, retcus_change: 8, rev: 150000, rev_change: 15, orders: 18000, or_change: 10, opc: 1.2, opc_change: 12, rpc: 10, rpc_change: 6 },
        { state: 'California', customers: 12000, cus_change: 10, retcus: 7200, retcus_change: 7, rev: 130000, rev_change: 13, orders: 15000, or_change: 8, opc: 1.25, opc_change: 10, rpc: 11, rpc_change: 7 },
        { state: 'Texas', customers: 9000, cus_change: 8, retcus: 5400, retcus_change: 6, rev: 100000, rev_change: 10, orders: 12000, or_change: 6, opc: 1.33, opc_change: 8, rpc: 12, rpc_change: 6 },
        { state: 'Florida', customers: 7500, cus_change: 6, retcus: 4500, retcus_change: 5, rev: 80000, rev_change: 8, orders: 9000, or_change: 4, opc: 1.4, opc_change: 5, rpc: 11, rpc_change: 5 },
        { state: 'Illinois', customers: 6000, cus_change: 5, retcus: 3600, retcus_change: 4, rev: 70000, rev_change: 7, orders: 7500, or_change: 3, opc: 1.5, opc_change: 4, rpc: 12, rpc_change: 4 },
        { state: 'Pennsylvania', customers: 8000, cus_change: 7, retcus: 4800, retcus_change: 6, rev: 90000, rev_change: 9, orders: 10500, or_change: 5, opc: 1.29, opc_change: 7, rpc: 11, rpc_change: 6 },
        { state: 'Arizona', customers: 4500, cus_change: 4, retcus: 2700, retcus_change: 3, rev: 65000, rev_change: 6, orders: 6000, or_change: 4, opc: 1.5, opc_change: 4, rpc: 14, rpc_change: 5 },
        { state: 'Michigan', customers: 5500, cus_change: 5, retcus: 3300, retcus_change: 4, rev: 75000, rev_change: 7, orders: 9000, or_change: 5, opc: 1.43, opc_change: 6, rpc: 13, rpc_change: 6 },
        { state: 'North Carolina', customers: 4800, cus_change: 4, retcus: 2880, retcus_change: 3, rev: 68000, rev_change: 6, orders: 7200, or_change: 4, opc: 1.5, opc_change: 4, rpc: 14, rpc_change: 5 },
        { state: 'Georgia', customers: 6200, cus_change: 6, retcus: 3720, retcus_change: 5, rev: 82000, rev_change: 8, orders: 9600, or_change: 6, opc: 1.29, opc_change: 7, rpc: 12, rpc_change: 7 },
      ];
      var shipstatecloneData = shipstatecloneData.sort((a, b) => a.customers - b.customers);
      setShippingStateTableData(shipstatecloneData);
    }
  
  }, [])


  var billcityData   = CusLocChartTable?.billcity_table ?? [];
  var shipcityTable  = CusLocChartTable?.shipcity_table ?? [];
  var billstateTable = CusLocChartTable?.billstate_table ?? [];
  var shipstateTable = CusLocChartTable?.shipstate_table ?? [];


  
  useEffect(() => {

    if (CusLocChartTable !== undefined) {

      if (billcityData.length > 0) {
        var billcitycloneData = structuredClone(billcityData);
        var billcitycloneData = billcitycloneData.sort((a, b) => a.customers - b.customers);
        setBillingCityTableData(billcitycloneData);
      }

      if (shipcityTable.length > 0) {
        var shipcitycloneData = structuredClone(shipcityTable);
        var shipcitycloneData = shipcitycloneData.sort((a, b) => a.customers - b.customers);
        setShippingCityTableData(shipcitycloneData);
      }
    
      if (billstateTable.length > 0) {
        var billstatecloneData = structuredClone(billstateTable);
        var billstatecloneData = billstatecloneData.sort((a, b) => a.customers - b.customers);
        setBillingStateTableData(billstatecloneData);
      }
    
      if (shipstateTable.length > 0) {
        var shipstatecloneData = structuredClone(shipstateTable);
        var shipstatecloneData = shipstatecloneData.sort((a, b) => a.customers - b.customers);
        setShippingStateTableData(shipstatecloneData);
      }
    
    } else {
      console.log("CusLocChartTable reducer :: undefined");
    }

  },[get_cusLocCT_dataFlag])


  var city_columns = [
    { title: 'City', field: 'city', render: row => <h5 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.city} </h5>  },
    { title: 'Customer', type:"numeric",field: 'customers', 
      render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.customers} </strong>,
      customSort: (a, b) => a.customers - b.customers  },
    { title: '%', field: 'cus_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.cus_change} </strong>  },
    { title: 'Repeat',type:"numeric", field: 'retcus', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.retcus} </strong>,
    customSort: (a, b) => a.retcus - b.retcus  },
    { title: '%', field: 'retcus_change' , render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.retcus_change} </strong> },
    { title: 'Revenue',type:"numeric", field: 'rev', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rev} </strong> ,
    customSort: (a, b) => a.rev - b.rev },
    { title: '%', field: 'rev_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rev_change} </strong>  },
    { title: 'Order',type:"numeric", field: 'orders', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.orders} </strong>,
    customSort: (a, b) => a.orders - b.orders  },
    { title: '%', field: 'or_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}> {row.or_change} </strong>  },
    { title: 'Order/Cus',type:"numeric", field: 'opc', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.opc} </strong> ,
    customSort: (a, b) => a.opc - b.opc },
    { title: '%', field: 'opc_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.opc_change} </strong>  },
    { title: 'Rev/Cus',type:"numeric", field: 'rpc', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rpc} </strong>,
    customSort: (a, b) => a.rpc - b.rpc  },
    { title: '%', field: 'rpc_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rpc_change} </strong>  }
  ];

  var state_columns = [
      { title: 'State', field: 'state', render: row => <strong style={{background:'mintcream'}}>  {row.state} </strong> },
      { title: 'Customer',type:"numeric", field: 'customers', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.customers} </strong> ,
      customSort: (a, b) => a.customers - b.customers },
      { title: '%', field: 'cus_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.cus_change} </strong>  },
      { title: 'Repeat', type:"numeric",field: 'retcus', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.retcus} </strong>,
      customSort: (a, b) => a.retcus - b.retcus  },
      { title: '%', field: 'retcus_change' , render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.retcus_change} </strong> },
      { title: 'Revenue',type:"numeric", field: 'rev', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rev} </strong> ,
      customSort: (a, b) => a.rev - b.rev },
      { title: '%', field: 'rev_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rev_change} </strong>  },
      { title: 'Order',type:"numeric", field: 'orders', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.orders} </strong>,
      customSort: (a, b) => a.orders - b.orders  },
      { title: '%', field: 'or_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}> {row.or_change} </strong>  },
      { title: 'Order/Cus',type:"numeric", field: 'opc', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.opc} </strong> ,
      customSort: (a, b) => a.opc - b.opc },
      { title: '%', field: 'opc_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.opc_change} </strong> ,
      customSort: (a, b) => a.opc_change - b.opc_change },
      { title: 'Rev/Cus',type:"numeric", field: 'rpc', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rpc} </strong>,
      customSort: (a, b) => a.rpc - b.rpc  },
      { title: '%', field: 'rpc_change', render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.rpc_change} </strong>  }

  ];

  


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
      {/* Billing And Shipping City,State Customer Table */}
      <Grid item xs={12}>

        <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
          Summary and Comparison of Key Metrics Over Time, [%] column shows the change compared to second daterange
        </h5>

        <Card className="dash-card">
          <ThemeProvider theme={defaultMaterialTheme}>
            {
              billingCityData && 
              <MaterialTable
                style={{ borderRadius: "14px" }}
                columns={city_columns}
                data={billingCityData}
                title="Billing-city"
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
                  },
                }}
              />
            }
          </ThemeProvider>
        </Card>
      
      </Grid>

      <Grid item xs={12}>
        <Card className="dash-card">
          <ThemeProvider theme={defaultMaterialTheme}>
            {
              shippingCityData &&
              <MaterialTable
                style={{ borderRadius: "14px" }}
                columns={city_columns}
                data={shippingCityData}
                title="Shipping-city"
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
                },
                }}
              />
            }
          </ThemeProvider>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className="dash-card">
          <ThemeProvider theme={defaultMaterialTheme}>
            {
              billingStateData &&
                <MaterialTable
                style={{ borderRadius: "14px" }}
                columns={state_columns}
                data={billingStateData}
                title="Billing-state"
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
                  },
                }}
                />
            }
          </ThemeProvider>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className="dash-card">
          <ThemeProvider theme={defaultMaterialTheme}>
            {
              shippingStateData &&
              
                <MaterialTable
                  style={{ borderRadius: "14px" }}
                columns={state_columns}
                data={shippingStateData}
                title="Shipping-state"
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
                  },
                }}
              />
            }
          </ThemeProvider>
        </Card>
      </Grid>
      
    </>

  );

}

export default CusCityStateTable;
