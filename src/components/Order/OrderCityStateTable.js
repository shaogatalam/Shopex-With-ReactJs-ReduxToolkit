import React from "react";
import Grid from "@mui/material/Grid";

// import Search from "@material-ui/icons/Search";
// import SaveAlt from "@material-ui/icons/SaveAlt";
// import ChevronLeft from "@material-ui/icons/ChevronLeft";
// import ChevronRight from "@material-ui/icons/ChevronRight";
// import FirstPage from "@material-ui/icons/FirstPage";
// import LastPage from "@material-ui/icons/LastPage";
// import Check from "@material-ui/icons/Check";
// import FilterList from "@material-ui/icons/FilterList";
// import Remove from "@material-ui/icons/Remove";

//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
//import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

import {makeStyles, Modal, Paper, TextField,Button,ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
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




function OrderCityStateTable() {

      
  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }

  var accountType = useSelector((state) => state.dashTops.accountType);

  var defaultMaterialTheme = createTheme();

  
  var Order_numrev_shiploc_data = useSelector((state) => state.order_numrev_shipLoc_ChartTable);

  var billcityData   = Order_numrev_shiploc_data?.billcity_table ?? [];
  var shipcityTable  = Order_numrev_shiploc_data?.shipcity_table ?? [];
  var billstateTable = Order_numrev_shiploc_data?.billstate_table ?? [];
  var shipstateTable = Order_numrev_shiploc_data?.shipstate_table ?? [];

  if (billcityData.length > 0) {
    var billcitycloneData = structuredClone(billcityData);
    var billcitycloneData = billcitycloneData.sort((a, b) => a.total_order - b.total_order);
  }

  if (shipcityTable.length > 0) {
    var shipcitycloneData = structuredClone(shipcityTable);
    var shipcitycloneData = shipcitycloneData.sort((a, b) => a.total_order - b.total_order);
  }

  if (billstateTable.length > 0) {
    var billstatecloneData = structuredClone(billstateTable);
    var billstatecloneData = billstatecloneData.sort((a, b) => a.total_order - b.total_order);
  }

  if (shipstateTable.length > 0) {
    var shipstatecloneData = structuredClone(shipstateTable);
    var shipstatecloneData = shipstatecloneData.sort((a, b) => a.total_order - b.total_order);
  }
  ///

  var city_columns = [

    { title: "City", field: "city", render: (row) => ( <div style={{  backgroundColor: "rgba(76, 110, 245, 0.2)",color: "rgb(76, 110, 245)",fontWeight:600  }}> {row.city} </div> ), },

    { title: "Order", type:"numeric",field: "",render: (row) => ( <div style={{ background: "ghostwhite" }}> {row.total_order} </div> ), customSort: (a, b) => a.total_order - b.total_order},
    { title: "[%]",align:'right',field: "total_order_change",render: (row) => ( <div style={{ background: "whitesmoke" }}> {row.total_order_change} </div> ), customSort: (a, b) => a.total_order_change - b.total_order_change},
    { title: "Revenue",type:"numeric",field: "total_order_rev",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.total_order_rev} </div>),customSort: (a, b) => a.total_order_rev - b.total_order_rev},
    { title: "[%]",align:'right',field:"total_order_amount_change",render:(row)=>( <div style={{ background: "whitesmoke" }}>{row.total_order_amount_change}</div>),customSort: (a, b) =>a.total_order_amount_change - b.total_order_amount_change},

    {
      title: "NewOrder",type:"numeric",
      field: "new_order",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.new_order} </div>
      ),
      customSort: (a, b) => a.new_order - b.new_order,
    },
    {
      title: "[%]",
      field: "new_order_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.new_order_change} </div>
      ),
      customSort: (a, b) => a.new_order_change - b.new_order_change,
    },

    {
      title: "NewRev",type:"numeric",
      field: "new_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.new_order_rev} </div>
      ),
      customSort: (a, b) => a.new_order_rev - b.new_order_rev,
    },
    {
      title: "[%]",
      field: "new_order_rev_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}>
         
          {row.new_order_rev_change}{" "}
        </div>
      ),
      customSort: (a, b) => a.new_order_rev_change - b.new_order_rev_change,
    },

    {
      title: "RetOrder",type:"numeric",
      field: "ret_order",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.ret_order} </div>
      ),
      customSort: (a, b) => a.ret_order - b.ret_order,
    },
    {
      title: "[%]",
      field: "ret_order_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.ret_order_change} </div>
      ),
      customSort: (a, b) => a.ret_order_change - b.ret_order_change,
    },

    {
      title: "RetRev",type:"numeric",
      field: "ret_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.ret_order_rev} </div>
      ),
      customSort: (a, b) => a.ret_order_rev - b.ret_order_rev,
    },
    {
      title: "[%]",
      field: "ret_order_rev_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}>
         
          {row.ret_order_rev_change}{" "}
        </div>
      ),
      customSort: (a, b) => a.ret_order_rev_change - b.ret_order_rev_change,
    },

    {
      title: "AOV",type:"numeric",
      field: "avg_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.avg_order_rev} </div>
      ),
      customSort: (a, b) => a.avg_order_rev - b.avg_order_rev,
    },
    {
      title: "[%]",
      field: "avg_order_rev_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}>
         
          {row.avg_order_rev_change}{" "}
        </div>
      ),
      customSort: (a, b) => a.avg_order_rev_change - b.avg_order_rev_change,
    },

    {
      title: "Profit",type:"numeric",
      field: "order_profit",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.order_profit} </div>
      ),
      customSort: (a, b) => a.order_profit - b.order_profit,
    },
    {
      title: "[%]",
      field: "order_profit_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}>
         
          {row.order_profit_change}{" "}
        </div>
      ),
      customSort: (a, b) => a.order_profit_change - b.order_profit_change,
    },
  ];

  var state_columns = [
    {
      title: "State",
      field: "state",
      render: (row) => (
        <div style={{  backgroundColor: "rgba(76, 110, 245, 0.2)",color: "rgb(76, 110, 245)",fontWeight:600 }}> {row.state} </div>
      ),
    },

    {
      title: "Order",type:"numeric",
      field: "",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.total_order} </div>
      ),
      customSort: (a, b) => a.total_order - b.total_order,
    },
    {
      title: "[%]",
      field: "total_order_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}>{row.total_order_change}</div>
      ),
      customSort: (a, b) => a.total_order_change - b.total_order_change,
    },

    {
      title: "Revenue",type:"numeric",
      field: "total_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.total_order_rev} </div>
      ),
      customSort: (a, b) => a.total_order_rev - b.total_order_rev,
    },
    {
      title: "[%]",
      field: "total_order_amount_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.total_order_amount_change}</div>
      ),
      customSort: (a, b) =>
        a.total_order_amount_change - b.total_order_amount_change,
    },

    {
      title: "NewOrder",type:"numeric",
      field: "new_order",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.new_order} </div>
      ),
      customSort: (a, b) => a.new_order - b.new_order,
    },
    {
      title: "[%]",
      field: "new_order_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.new_order_change} </div>
      ),
      customSort: (a, b) => a.new_order_change - b.new_order_change,
    },

    {
      title: "NewRev",type:"numeric",
      field: "new_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.new_order_rev} </div>
      ),
      customSort: (a, b) => a.new_order_rev - b.new_order_rev,
    },
    {
      title: "[%]",
      field: "new_order_rev_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.new_order_rev_change}</div>
      ),
      customSort: (a, b) => a.new_order_rev_change - b.new_order_rev_change,
    },

    {
      title: "RetOrder",type:"numeric",
      field: "ret_order",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.ret_order} </div>
      ),
      customSort: (a, b) => a.ret_order - b.ret_order,
    },
    {
      title: "[%]",
      field: "ret_order_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.ret_order_change} </div>
      ),
      customSort: (a, b) => a.ret_order_change - b.ret_order_change,
    },

    {
      title: "RetRev",type:"numeric",
      field: "ret_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.ret_order_rev} </div>
      ),
      customSort: (a, b) => a.ret_order_rev - b.ret_order_rev,
    },
    {
      title: "[%]",
      field: "ret_order_rev_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.ret_order_rev_change} </div>
      ),
      customSort: (a, b) => a.ret_order_rev_change - b.ret_order_rev_change,
    },

    {
      title: "AOV",type:"numeric",
      field: "avg_order_rev",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.avg_order_rev} </div>
      ),
      customSort: (a, b) => a.avg_order_rev - b.avg_order_rev,
    },
    {
      title: "[%]",
      field: "avg_order_rev_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.avg_order_rev_change}  </div>
      ),
      customSort: (a, b) => a.avg_order_rev_change - b.avg_order_rev_change,
    },

    {
      title: "Profit",type:"numeric",
      field: "order_profit",
      render: (row) => (
        <div style={{ background: "ghostwhite" }}> {row.order_profit} </div>
      ),
      customSort: (a, b) => a.order_profit - b.order_profit,
    },
    {
      title: "[%]",
      field: "order_profit_change",
      render: (row) => (
        <div style={{ background: "whitesmoke" }}> {row.order_profit_change}  </div>
      ),
      customSort: (a, b) => a.order_profit_change - b.order_profit_change,
    },
  ];


  if(accountType === "demo"){

    var billcitycloneData = [
     
        {
          city: "New York",
          total_order: 1500,
          total_order_change: "+10%",
          total_order_rev: 35000,
          total_order_amount_change: "-5%",
          new_order: 600,
          new_order_change: "+15%",
          new_order_rev: 18000,
          new_order_rev_change: "+8%",
          ret_order: 900,
          ret_order_change: "-5%",
          ret_order_rev: 17000,
          ret_order_rev_change: "-4%",
          avg_order_rev: 350,
          avg_order_rev_change: "+2%",
          order_profit: 12000,
          order_profit_change: "-3%",
        },

        {
          city: "Los Angeles",
          total_order: 1200,
          total_order_change: "-5%",
          total_order_rev: 28000,
          total_order_amount_change: "+8%",
          new_order: 500,
          new_order_change: "+10%",
          new_order_rev: 15000,
          new_order_rev_change: "+6%",
          ret_order: 700,
          ret_order_change: "-8%",
          ret_order_rev: 13000,
          ret_order_rev_change: "-5%",
          avg_order_rev: 350,
          avg_order_rev_change: "+1%",
          order_profit: 9000,
          order_profit_change: "+2%",
        },

        {
          city: "Chicago",
          total_order: 1000,
          total_order_change: "+2%",
          total_order_rev: 24000,
          total_order_amount_change: "-3%",
          new_order: 450,
          new_order_change: "+7%",
          new_order_rev: 13000,
          new_order_rev_change: "+5%",
          ret_order: 550,
          ret_order_change: "-1%",
          ret_order_rev: 11000,
          ret_order_rev_change: "-2%",
          avg_order_rev: 350,
          avg_order_rev_change: "+3%",
          order_profit: 8000,
          order_profit_change: "-6%",
        },

        {
          city: "Houston",
          total_order: 900,
          total_order_change: "-3%",
          total_order_rev: 21000,
          total_order_amount_change: "+5%",
          new_order: 400,
          new_order_change: "+8%",
          new_order_rev: 12000,
          new_order_rev_change: "+4%",
          ret_order: 500,
          ret_order_change: "-5%",
          ret_order_rev: 9000,
          ret_order_rev_change: "-3%",
          avg_order_rev: 350,
          avg_order_rev_change: "-2%",
          order_profit: 7000,
          order_profit_change: "+1%",
        },

        {
          city: "Miami",
          total_order: 750,
          total_order_change: "+1%",
          total_order_rev: 18000,
          total_order_amount_change: "-2%",
          new_order: 350,
          new_order_change: "+6%",
          new_order_rev: 11000,
          new_order_rev_change: "+3%",
          ret_order: 400,
          ret_order_change: "-3%",
          ret_order_rev: 7000,
          ret_order_rev_change: "-1%",
          avg_order_rev: 350,
          avg_order_rev_change: "+4%",
          order_profit: 6000,
          order_profit_change: "-4%",
        },

        {
          city: "Dallas",
          total_order: 850,
          total_order_change: "-2%",
          total_order_rev: 20000,
          total_order_amount_change: "+4%",
          new_order: 380,
          new_order_change: "+4%",
          new_order_rev: 11500,
          new_order_rev_change: "+2%",
          ret_order: 470,
          ret_order_change: "-2%",
          ret_order_rev: 8500,
          ret_order_rev_change: "-2%",
          avg_order_rev: 350,
          avg_order_rev_change: "+5%",
          order_profit: 6500,
          order_profit_change: "-5%",
        },

        {
          city: "San Francisco",
          total_order: 1300,
          total_order_change: "+7%",
          total_order_rev: 31000,
          total_order_amount_change: "-8%",
          new_order: 580,
          new_order_change: "+12%",
          new_order_rev: 17500,
          new_order_rev_change: "+10%",
          ret_order: 720,
          ret_order_change: "+5%",
          ret_order_rev: 13500,
          ret_order_rev_change: "+6%",
          avg_order_rev: 350,
          avg_order_rev_change: "-1%",
          order_profit: 10000,
          order_profit_change: "+7%",
        },

        {
          city: "Seattle",
          total_order: 1100,
          total_order_change: "+4%",
          total_order_rev: 26000,
          total_order_amount_change: "-7%",
          new_order: 520,
          new_order_change: "+9%",
          new_order_rev: 16000,
          new_order_rev_change: "+7%",
          ret_order: 580,
          ret_order_change: "+2%",
          ret_order_rev: 10000,
          ret_order_rev_change: "+3%",
          avg_order_rev: 350,
          avg_order_rev_change: "-3%",
          order_profit: 8500,
          order_profit_change: "+4%",
        },

        {
          city: "Boston",
          total_order: 950,
          total_order_change: "-1%",
          total_order_rev: 22000,
          total_order_amount_change: "+2%",
          new_order: 430,
          new_order_change: "+5%",
          new_order_rev: 12500,
          new_order_rev_change: "+3%",
          ret_order: 520,
          ret_order_change: "-4%",
          ret_order_rev: 9500,
          ret_order_rev_change: "-5%",
          avg_order_rev: 350,
          avg_order_rev_change: "+6%",
          order_profit: 7500,
          order_profit_change: "-2%",
        },

        {
          city: "Atlanta",
          total_order: 800,
          total_order_change: "-4%",
          total_order_rev: 19000,
          total_order_amount_change: "+3%",
          new_order: 380,
          new_order_change: "+3%",
          new_order_rev: 11500,
          new_order_rev_change: "+1%",
          ret_order: 420,
          ret_order_change: "-6%",
          ret_order_rev: 7500,
          ret_order_rev_change: "-4%",
          avg_order_rev: 350,
          avg_order_rev_change: "+7%",
          order_profit: 7000,
          order_profit_change: "-1%",
        },
    ];
    var billcitycloneData = billcitycloneData.sort((a, b) => a.total_order - b.total_order);

    var shipcitycloneData = [
     {
          city: "New York",
          total_order: 1500,
          total_order_change: "+10%",
          total_order_rev: 35000,
          total_order_amount_change: "-5%",
          new_order: 600,
          new_order_change: "+15%",
          new_order_rev: 18000,
          new_order_rev_change: "+8%",
          ret_order: 900,
          ret_order_change: "-5%",
          ret_order_rev: 17000,
          ret_order_rev_change: "-4%",
          avg_order_rev: 350,
          avg_order_rev_change: "+2%",
          order_profit: 12000,
          order_profit_change: "-3%",
        },

        {
          city: "Los Angeles",
          total_order: 1200,
          total_order_change: "-5%",
          total_order_rev: 28000,
          total_order_amount_change: "+8%",
          new_order: 500,
          new_order_change: "+10%",
          new_order_rev: 15000,
          new_order_rev_change: "+6%",
          ret_order: 700,
          ret_order_change: "-8%",
          ret_order_rev: 13000,
          ret_order_rev_change: "-5%",
          avg_order_rev: 350,
          avg_order_rev_change: "+1%",
          order_profit: 9000,
          order_profit_change: "+2%",
        },

        {
          city: "Chicago",
          total_order: 1000,
          total_order_change: "+2%",
          total_order_rev: 24000,
          total_order_amount_change: "-3%",
          new_order: 450,
          new_order_change: "+7%",
          new_order_rev: 13000,
          new_order_rev_change: "+5%",
          ret_order: 550,
          ret_order_change: "-1%",
          ret_order_rev: 11000,
          ret_order_rev_change: "-2%",
          avg_order_rev: 350,
          avg_order_rev_change: "+3%",
          order_profit: 8000,
          order_profit_change: "-6%",
        },

        {
          city: "Houston",
          total_order: 900,
          total_order_change: "-3%",
          total_order_rev: 21000,
          total_order_amount_change: "+5%",
          new_order: 400,
          new_order_change: "+8%",
          new_order_rev: 12000,
          new_order_rev_change: "+4%",
          ret_order: 500,
          ret_order_change: "-5%",
          ret_order_rev: 9000,
          ret_order_rev_change: "-3%",
          avg_order_rev: 350,
          avg_order_rev_change: "-2%",
          order_profit: 7000,
          order_profit_change: "+1%",
        },

        {
          city: "Miami",
          total_order: 750,
          total_order_change: "+1%",
          total_order_rev: 18000,
          total_order_amount_change: "-2%",
          new_order: 350,
          new_order_change: "+6%",
          new_order_rev: 11000,
          new_order_rev_change: "+3%",
          ret_order: 400,
          ret_order_change: "-3%",
          ret_order_rev: 7000,
          ret_order_rev_change: "-1%",
          avg_order_rev: 350,
          avg_order_rev_change: "+4%",
          order_profit: 6000,
          order_profit_change: "-4%",
        },

        {
          city: "Dallas",
          total_order: 850,
          total_order_change: "-2%",
          total_order_rev: 20000,
          total_order_amount_change: "+4%",
          new_order: 380,
          new_order_change: "+4%",
          new_order_rev: 11500,
          new_order_rev_change: "+2%",
          ret_order: 470,
          ret_order_change: "-2%",
          ret_order_rev: 8500,
          ret_order_rev_change: "-2%",
          avg_order_rev: 350,
          avg_order_rev_change: "+5%",
          order_profit: 6500,
          order_profit_change: "-5%",
        },

        {
          city: "San Francisco",
          total_order: 1300,
          total_order_change: "+7%",
          total_order_rev: 31000,
          total_order_amount_change: "-8%",
          new_order: 580,
          new_order_change: "+12%",
          new_order_rev: 17500,
          new_order_rev_change: "+10%",
          ret_order: 720,
          ret_order_change: "+5%",
          ret_order_rev: 13500,
          ret_order_rev_change: "+6%",
          avg_order_rev: 350,
          avg_order_rev_change: "-1%",
          order_profit: 10000,
          order_profit_change: "+7%",
        },

        {
          city: "Seattle",
          total_order: 1100,
          total_order_change: "+4%",
          total_order_rev: 26000,
          total_order_amount_change: "-7%",
          new_order: 520,
          new_order_change: "+9%",
          new_order_rev: 16000,
          new_order_rev_change: "+7%",
          ret_order: 580,
          ret_order_change: "+2%",
          ret_order_rev: 10000,
          ret_order_rev_change: "+3%",
          avg_order_rev: 350,
          avg_order_rev_change: "-3%",
          order_profit: 8500,
          order_profit_change: "+4%",
        },

        {
          city: "Boston",
          total_order: 950,
          total_order_change: "-1%",
          total_order_rev: 22000,
          total_order_amount_change: "+2%",
          new_order: 430,
          new_order_change: "+5%",
          new_order_rev: 12500,
          new_order_rev_change: "+3%",
          ret_order: 520,
          ret_order_change: "-4%",
          ret_order_rev: 9500,
          ret_order_rev_change: "-5%",
          avg_order_rev: 350,
          avg_order_rev_change: "+6%",
          order_profit: 7500,
          order_profit_change: "-2%",
        },
        
        {
          city: "Atlanta",
          total_order: 800,
          total_order_change: "-4%",
          total_order_rev: 19000,
          total_order_amount_change: "+3%",
          new_order: 380,
          new_order_change: "+3%",
          new_order_rev: 11500,
          new_order_rev_change: "+1%",
          ret_order: 420,
          ret_order_change: "-6%",
          ret_order_rev: 7500,
          ret_order_rev_change: "-4%",
          avg_order_rev: 350,
          avg_order_rev_change: "+7%",
          order_profit: 7000,
          order_profit_change: "-1%",
        },
    ];
    var shipcitycloneData = shipcitycloneData.sort((a, b) => a.total_order - b.total_order);
    
    var billstatecloneData = [
      {
        state: "New York",
        total_order: 1500,
        total_order_change: "+10%",
        total_order_rev: 35000,
        total_order_amount_change: "-5%",
        new_order: 600,
        new_order_change: "+15%",
        new_order_rev: 18000,
        new_order_rev_change: "+8%",
        ret_order: 900,
        ret_order_change: "-5%",
        ret_order_rev: 17000,
        ret_order_rev_change: "-4%",
        avg_order_rev: 350,
        avg_order_rev_change: "+2%",
        order_profit: 12000,
        order_profit_change: "-3%",
      },

      {
        state: "Los Angeles",
        total_order: 1200,
        total_order_change: "-5%",
        total_order_rev: 28000,
        total_order_amount_change: "+8%",
        new_order: 500,
        new_order_change: "+10%",
        new_order_rev: 15000,
        new_order_rev_change: "+6%",
        ret_order: 700,
        ret_order_change: "-8%",
        ret_order_rev: 13000,
        ret_order_rev_change: "-5%",
        avg_order_rev: 350,
        avg_order_rev_change: "+1%",
        order_profit: 9000,
        order_profit_change: "+2%",
      },

      {
        state: "Chicago",
        total_order: 1000,
        total_order_change: "+2%",
        total_order_rev: 24000,
        total_order_amount_change: "-3%",
        new_order: 450,
        new_order_change: "+7%",
        new_order_rev: 13000,
        new_order_rev_change: "+5%",
        ret_order: 550,
        ret_order_change: "-1%",
        ret_order_rev: 11000,
        ret_order_rev_change: "-2%",
        avg_order_rev: 350,
        avg_order_rev_change: "+3%",
        order_profit: 8000,
        order_profit_change: "-6%",
      },

      {
        state: "Houston",
        total_order: 900,
        total_order_change: "-3%",
        total_order_rev: 21000,
        total_order_amount_change: "+5%",
        new_order: 400,
        new_order_change: "+8%",
        new_order_rev: 12000,
        new_order_rev_change: "+4%",
        ret_order: 500,
        ret_order_change: "-5%",
        ret_order_rev: 9000,
        ret_order_rev_change: "-3%",
        avg_order_rev: 350,
        avg_order_rev_change: "-2%",
        order_profit: 7000,
        order_profit_change: "+1%",
      },

      {
        state: "Miami",
        total_order: 750,
        total_order_change: "+1%",
        total_order_rev: 18000,
        total_order_amount_change: "-2%",
        new_order: 350,
        new_order_change: "+6%",
        new_order_rev: 11000,
        new_order_rev_change: "+3%",
        ret_order: 400,
        ret_order_change: "-3%",
        ret_order_rev: 7000,
        ret_order_rev_change: "-1%",
        avg_order_rev: 350,
        avg_order_rev_change: "+4%",
        order_profit: 6000,
        order_profit_change: "-4%",
      },

      {
        state: "Dallas",
        total_order: 850,
        total_order_change: "-2%",
        total_order_rev: 20000,
        total_order_amount_change: "+4%",
        new_order: 380,
        new_order_change: "+4%",
        new_order_rev: 11500,
        new_order_rev_change: "+2%",
        ret_order: 470,
        ret_order_change: "-2%",
        ret_order_rev: 8500,
        ret_order_rev_change: "-2%",
        avg_order_rev: 350,
        avg_order_rev_change: "+5%",
        order_profit: 6500,
        order_profit_change: "-5%",
      },

      {
        state: "San Francisco",
        total_order: 1300,
        total_order_change: "+7%",
        total_order_rev: 31000,
        total_order_amount_change: "-8%",
        new_order: 580,
        new_order_change: "+12%",
        new_order_rev: 17500,
        new_order_rev_change: "+10%",
        ret_order: 720,
        ret_order_change: "+5%",
        ret_order_rev: 13500,
        ret_order_rev_change: "+6%",
        avg_order_rev: 350,
        avg_order_rev_change: "-1%",
        order_profit: 10000,
        order_profit_change: "+7%",
      },

      {
        state: "Seattle",
        total_order: 1100,
        total_order_change: "+4%",
        total_order_rev: 26000,
        total_order_amount_change: "-7%",
        new_order: 520,
        new_order_change: "+9%",
        new_order_rev: 16000,
        new_order_rev_change: "+7%",
        ret_order: 580,
        ret_order_change: "+2%",
        ret_order_rev: 10000,
        ret_order_rev_change: "+3%",
        avg_order_rev: 350,
        avg_order_rev_change: "-3%",
        order_profit: 8500,
        order_profit_change: "+4%",
      },

      {
        state: "Boston",
        total_order: 950,
        total_order_change: "-1%",
        total_order_rev: 22000,
        total_order_amount_change: "+2%",
        new_order: 430,
        new_order_change: "+5%",
        new_order_rev: 12500,
        new_order_rev_change: "+3%",
        ret_order: 520,
        ret_order_change: "-4%",
        ret_order_rev: 9500,
        ret_order_rev_change: "-5%",
        avg_order_rev: 350,
        avg_order_rev_change: "+6%",
        order_profit: 7500,
        order_profit_change: "-2%",
      },
      
      {
        state: "Atlanta",
        total_order: 800,
        total_order_change: "-4%",
        total_order_rev: 19000,
        total_order_amount_change: "+3%",
        new_order: 380,
        new_order_change: "+3%",
        new_order_rev: 11500,
        new_order_rev_change: "+1%",
        ret_order: 420,
        ret_order_change: "-6%",
        ret_order_rev: 7500,
        ret_order_rev_change: "-4%",
        avg_order_rev: 350,
        avg_order_rev_change: "+7%",
        order_profit: 7000,
        order_profit_change: "-1%",
      },
    ];
    var billstatecloneData = billstatecloneData.sort((a, b) => a.total_order - b.total_order);

    var shipstatecloneData = [
     {
          state: "New York",
          total_order: 1500,
          total_order_change: "+10%",
          total_order_rev: 35000,
          total_order_amount_change: "-5%",
          new_order: 600,
          new_order_change: "+15%",
          new_order_rev: 18000,
          new_order_rev_change: "+8%",
          ret_order: 900,
          ret_order_change: "-5%",
          ret_order_rev: 17000,
          ret_order_rev_change: "-4%",
          avg_order_rev: 350,
          avg_order_rev_change: "+2%",
          order_profit: 12000,
          order_profit_change: "-3%",
        },

        {
          state: "Los Angeles",
          total_order: 1200,
          total_order_change: "-5%",
          total_order_rev: 28000,
          total_order_amount_change: "+8%",
          new_order: 500,
          new_order_change: "+10%",
          new_order_rev: 15000,
          new_order_rev_change: "+6%",
          ret_order: 700,
          ret_order_change: "-8%",
          ret_order_rev: 13000,
          ret_order_rev_change: "-5%",
          avg_order_rev: 350,
          avg_order_rev_change: "+1%",
          order_profit: 9000,
          order_profit_change: "+2%",
        },

        {
          state: "Chicago",
          total_order: 1000,
          total_order_change: "+2%",
          total_order_rev: 24000,
          total_order_amount_change: "-3%",
          new_order: 450,
          new_order_change: "+7%",
          new_order_rev: 13000,
          new_order_rev_change: "+5%",
          ret_order: 550,
          ret_order_change: "-1%",
          ret_order_rev: 11000,
          ret_order_rev_change: "-2%",
          avg_order_rev: 350,
          avg_order_rev_change: "+3%",
          order_profit: 8000,
          order_profit_change: "-6%",
        },

        {
          state: "Houston",
          total_order: 900,
          total_order_change: "-3%",
          total_order_rev: 21000,
          total_order_amount_change: "+5%",
          new_order: 400,
          new_order_change: "+8%",
          new_order_rev: 12000,
          new_order_rev_change: "+4%",
          ret_order: 500,
          ret_order_change: "-5%",
          ret_order_rev: 9000,
          ret_order_rev_change: "-3%",
          avg_order_rev: 350,
          avg_order_rev_change: "-2%",
          order_profit: 7000,
          order_profit_change: "+1%",
        },

        {
          state: "Miami",
          total_order: 750,
          total_order_change: "+1%",
          total_order_rev: 18000,
          total_order_amount_change: "-2%",
          new_order: 350,
          new_order_change: "+6%",
          new_order_rev: 11000,
          new_order_rev_change: "+3%",
          ret_order: 400,
          ret_order_change: "-3%",
          ret_order_rev: 7000,
          ret_order_rev_change: "-1%",
          avg_order_rev: 350,
          avg_order_rev_change: "+4%",
          order_profit: 6000,
          order_profit_change: "-4%",
        },

        {
          state: "Dallas",
          total_order: 850,
          total_order_change: "-2%",
          total_order_rev: 20000,
          total_order_amount_change: "+4%",
          new_order: 380,
          new_order_change: "+4%",
          new_order_rev: 11500,
          new_order_rev_change: "+2%",
          ret_order: 470,
          ret_order_change: "-2%",
          ret_order_rev: 8500,
          ret_order_rev_change: "-2%",
          avg_order_rev: 350,
          avg_order_rev_change: "+5%",
          order_profit: 6500,
          order_profit_change: "-5%",
        },

        {
          state: "San Francisco",
          total_order: 1300,
          total_order_change: "+7%",
          total_order_rev: 31000,
          total_order_amount_change: "-8%",
          new_order: 580,
          new_order_change: "+12%",
          new_order_rev: 17500,
          new_order_rev_change: "+10%",
          ret_order: 720,
          ret_order_change: "+5%",
          ret_order_rev: 13500,
          ret_order_rev_change: "+6%",
          avg_order_rev: 350,
          avg_order_rev_change: "-1%",
          order_profit: 10000,
          order_profit_change: "+7%",
        },

        {
          state: "Seattle",
          total_order: 1100,
          total_order_change: "+4%",
          total_order_rev: 26000,
          total_order_amount_change: "-7%",
          new_order: 520,
          new_order_change: "+9%",
          new_order_rev: 16000,
          new_order_rev_change: "+7%",
          ret_order: 580,
          ret_order_change: "+2%",
          ret_order_rev: 10000,
          ret_order_rev_change: "+3%",
          avg_order_rev: 350,
          avg_order_rev_change: "-3%",
          order_profit: 8500,
          order_profit_change: "+4%",
        },

        {
          state: "Boston",
          total_order: 950,
          total_order_change: "-1%",
          total_order_rev: 22000,
          total_order_amount_change: "+2%",
          new_order: 430,
          new_order_change: "+5%",
          new_order_rev: 12500,
          new_order_rev_change: "+3%",
          ret_order: 520,
          ret_order_change: "-4%",
          ret_order_rev: 9500,
          ret_order_rev_change: "-5%",
          avg_order_rev: 350,
          avg_order_rev_change: "+6%",
          order_profit: 7500,
          order_profit_change: "-2%",
        },
        
        {
          state: "Atlanta",
          total_order: 800,
          total_order_change: "-4%",
          total_order_rev: 19000,
          total_order_amount_change: "+3%",
          new_order: 380,
          new_order_change: "+3%",
          new_order_rev: 11500,
          new_order_rev_change: "+1%",
          ret_order: 420,
          ret_order_change: "-6%",
          ret_order_rev: 7500,
          ret_order_rev_change: "-4%",
          avg_order_rev: 350,
          avg_order_rev_change: "+7%",
          order_profit: 7000,
          order_profit_change: "-1%",
        },
    ];
    var shipstatecloneData = shipstatecloneData.sort((a, b) => a.total_order - b.total_order);
    
  }


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
     
      <Grid item md={12}>
        
        <Card className="dash-card" style={{background:'none',padding:"0px",marginTop:"15px"}}>
        
          {billcitycloneData && (
        
            <ThemeProvider theme={defaultMaterialTheme}>
           
                <MaterialTable
                sx={{ 
                  [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                  [`& .td`]:{padding:'2px!important'},
                }}

                  style={{ borderRadius: "14px" }}
                  columns={city_columns}
                  data={billcitycloneData}
                  title="Order & Rev from Billing-city"
                  // icons={{
                  //   Check: Check,
                  //   DetailPanel: ChevronRight,
                  //   Export: SaveAlt,
                  //   Filter: FilterList,
                  //   FirstPage: FirstPage,
                  //   LastPage: LastPage,
                  //   NextPage: ChevronRight,
                  //   PreviousPage: ChevronLeft,
                  //   Search: Search,
                  //   ThirdStateCheck: Remove,
                  //   Clear: Remove,
                  // }}
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

             

            </ThemeProvider>

          )}

        </Card>

      </Grid>

      <Grid item md={12}>
        <Card className="dash-card" style={{background:'none',padding:"0px",marginTop:"15px"}}>
          {billstatecloneData && (
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
              sx={{ 
                [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                [`& .td`]:{padding:'2px!important'},
              }}
                style={{ borderRadius: "14px" }}
                columns={state_columns}
                data={billstatecloneData}
                title="Order & Rev from Billing-State"
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
            </ThemeProvider>
          )}
        </Card>
      </Grid>

      <Grid item md={12}>
        <Card className="dash-card" style={{background:'none',padding:"0px",marginTop:"15px"}}>
          {shipcitycloneData && (
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
              sx={{ 
                [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                [`& .td`]:{padding:'2px!important'},
              }}
                style={{ borderRadius: "14px" }}
                columns={city_columns}
                data={shipcitycloneData}
                title="Order & Rev from Shipping-city"
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
            </ThemeProvider>
          )}
        </Card>
      </Grid>

      <Grid item md={12}>
        <Card className="dash-card" style={{background:'none',padding:"0px",marginTop:"15px"}}>
          {shipstatecloneData && (
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
              sx={{ 
                [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                [`& .td`]:{padding:'2px!important'},
              }}
                style={{ borderRadius: "14px" }}
                columns={state_columns}
                data={shipstatecloneData}
                title="Order & Rev from Shipping-State"
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
            </ThemeProvider>
          )}
        </Card>
      </Grid>
      
    </>
  );
}

export default OrderCityStateTable;
