import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";

import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

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

function Orders() {


  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }

  var { chc } = useParams();

  var defaultMaterialTheme = createTheme();

  var current_customer_chc = chc;
  var [orderlist, setOrderlist] = useState([]);
  var [orderbyday, setOrderbyday] = useState([]);

  useEffect(() => {
    axios.post("https://server.shopex.io/customers/single-customer/SingleCustomer_orders.php",{customer_chc: current_customer_chc,},{ withCredentials: true })
      .then(function (response) {
        setOrderlist(response.data.orderlist);
        setOrderbyday(response.data.orderday);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [current_customer_chc]);

  var columns = [
      {title: "Date",field: "date",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.date} </div>),},
      {title: "Id",field: "orderid",render: (row) => 
      (<div style={{ background: "ghostwhite" }}><strong><a href={"/Orders/" + row.orderid}> {row.orderid} </a></strong></div>),},
      {title: "Status",field: "order_status",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.order_status} </div>),},
      {title: "Amotal",field: "order_total",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.order_total} </div>),},
      {title: "Total product",field: "total_product",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.total_product} </div>),},
      {title: "Total unit",field: "total_unit",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.total_unit} </div>),},
  ];

  var orderbyday_columns = [
    {title: "Day",field: "day",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.day} </div>),},
    {title: "Order",field: "order",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.order} </div>),},
  ];

  return (
    <>
      <Grid style={{ marginTop: "20px" }}>
    
        <ThemeProvider theme={defaultMaterialTheme}>
    
          <MaterialTable
            columns={columns}
            data={orderlist}
            title={"Previous Order"}
            icons={tableIcons}
            options={{
              pageSize: 10, // make initial page size
              emptyRowsWhenPaging: false, // To avoid of having empty rows
              pageSizeOptions: [],
              search: true,
              searchFieldAlignment: "right",
              exportButton: true,
              exportAllData: true,
              cellStyle: {
                padding: "4px",
                lineHeight: 2,
                fontFamily: "Circular-Loom",
                textAlign: "center",
                borderBottom: "2px solid rgb(246, 224, 224)",
              },
              headerStyle: {
                background: "rgb(52, 195, 255)",
                fontSize: "17px",
                color: "white",
                padding: "2px",
                height: "40px",
              },
              // rowStyle: {
              //     backgroundColor: '#EEE',
              // }
              //rowStyle: (data, index) => index % 2 === 0 ? { background: "ghostwhite" } : {background:'white'},
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
        </ThemeProvider>

      </Grid>

      <Grid style={{ marginTop: "20px" }}>
        
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            
            columns={orderbyday_columns}
            data={orderbyday}
            title={"Order placed on different weekday"}
            icons={tableIcons}
            options={{
              pageSize: 10, // make initial page size
              emptyRowsWhenPaging: false, // To avoid of having empty rows
              pageSizeOptions: [],
              search: true,
              searchFieldAlignment: "right",
              exportButton: true,
              exportAllData: true,
              cellStyle: {
                padding: "4px",
                lineHeight: 2,
                fontFamily: "Circular-Loom",
                textAlign: "center",
                borderBottom: "2px solid rgb(246, 224, 224)",
              },
              headerStyle: {
                background: "rgb(52, 195, 255)",
                fontSize: "17px",
                color: "white",
                padding: "2px",
                height: "40px",
              },
              // rowStyle: {
              //     backgroundColor: '#EEE',
              // }
              //rowStyle: (data, index) => index % 2 === 0 ? { background: "ghostwhite" } : {background:'white'},
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
        </ThemeProvider>

      </Grid>
    </>
  );
}

export default Orders;
