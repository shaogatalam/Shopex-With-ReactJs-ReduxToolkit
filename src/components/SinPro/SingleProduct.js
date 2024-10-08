import React, { useEffect, useState } from "react";
import axios from "axios";


import { useParams } from "react-router-dom";

//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";

import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

import ViewInArIcon from "@mui/icons-material/ViewInAr";

import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import { useSelector } from "react-redux";

import "./CustomCss.css";

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
import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

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


function SingleProduct() {


  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }


  var retentionTitleStyle={
                          "border-top": "0.1px solid darkgray",
                          "marginTop": "20px",
                          "background": "white",
                          "boxShadow":"rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px",
                          "borderRadius": "3px",
                          "padding": "10px"
                        };

  var retentionTableStyle = { background: "whitesmoke", boxShadow: "rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px"};

  const defaultMaterialTheme = createTheme();
  const { chc } = useParams();

  var [name, setName] = useState("");
  var [type, setType] = useState("");
  var [curr_price, setCurr_price] = useState("");
  var [reg_price, setReg_price] = useState("");
  var [manage_stock, setManage_stock] = useState("");
  var [stock, setStock] = useState("");
  var [cost, setCost] = useState("");
  var [os, setOS] = useState("");

  var [customers, setCustomers] = useState([]);
  var [boughtwith, setBoughtwith] = useState([]);
  var [month, setAvgSalesM] = useState([]);
  var [quarter, setAvgSalesQ] = useState([]);

  var [unit, setUnitR] = useState();
  var [cus, setCusR] = useState();
  var [rev, setRevR] = useState();

  var timelinecontentstyle = {
    background: "ghostwhite",
    margin: "0px",
    fontWeight: "400",
    lineHeight: "1",
    letterSpacing: "0.00938em",
    flex: "1 1 0%",
    padding: "3px 6px 5px 9px",
    textAlign: "left",
    fontSize: "12px",
    boxShadow:
      "rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px",
    height: "35px",
    fontFamily: "system-ui",
  };

  useEffect(() => {
    const sinpro_card = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/products/single-product/sinpro_card.php",
          { product_chc: chc },
          { withCredentials: true }
        );
        setCustomers(res.data.customers);
        setName(res.data.name);
        setType(res.data.type);
        setCurr_price(res.data.curr_price);
        setReg_price(res.data.reg_price);
        setManage_stock(res.data.manage_stock);
        setStock(res.data.stock);
        setCost(res.data.cost);
        setOS(res.data.os);
      } catch { }
    };
    sinpro_card();

    const sinpro_cuslist = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/products/single-product/sinpro_cuslist.php",
          { product_chc: chc },
          { withCredentials: true }
        );
        setCustomers(res.data.customers);
      } catch { }
    };
    sinpro_cuslist();

    const sinpro_bought_with = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/products/single-product/sinpro_bought_with.php",
          { product_chc: chc },
          { withCredentials: true }
        );
        setBoughtwith(res.data.boughtWith);
      } catch { }
    };
    sinpro_bought_with();

    const avg_sales = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/products/single-product/single-product-month-quarter-avg-sales.php",
          { product_chc: chc },
          { withCredentials: true }
        );
        setAvgSalesM(res.data.month);
        setAvgSalesQ(res.data.quarter);
      } catch { }
    };
    avg_sales();

    const retention = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/products/single-product/sinpro_retention.php",
          { product_chc: chc },
          { withCredentials: true }
        );
        setUnitR(res.data.unit_retable);
        setRevR(res.data.rev_retable);
        setCusR(res.data.cus_retable);
      } catch { }
    };
    retention();
  }, [chc]);

  var customer_columns = [
    {
      title: "Customer",
      render: (row) => (
        <div style={{background: "mintcream",fontFamily: "system-ui",fontSize: "16px",textAlign: "left"}}>
          <a href={"/Customers/profile/" + row.customer_chc}>
            {row.customer_name}
          </a>
        </div>
      ),
    },
    {title: "Order",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.order} </div>)},
    {title: "Unit",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.unit} </div>)},
    {title: "Amount",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.amount} </div>)},
    {title: "Amount/order",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.amount_per_order} </div>)},
    {title: "Unit/order",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.unit_per_order} </div>)},
    {title: "FirstOrder",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.firstOrder} </div>)},
    {title: "LastOrder",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.lastOrder} </div>)},
    {title: "Avg-day-gap",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.avg_day_gap} </div>)},
    {title: "On-sale-buy",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.on_sale_buy} </div>)},
  ];

  var fbw_columns = [
    {
      title: "Product",
      render: (row) => (<div style={{ background: "mintcream", fontFamily: "system-ui", fontSize: "16px", textAlign: "left", }}>{row.name}</div>)
    },
    {
      title: "Freq",
      render: (row) => (<div style={{ background: "whitesmoke" }}> {row.buy} </div>)
    },
  ];

  var month_columns = [
    {
      title: "Month", fiend: "month",
      render: (row) => (<div style={{ background: "mintcream", fontFamily: "system-ui", fontSize: "16px", textAlign: "left", }}>{row.month}</div>),
    },
    {
      title: "Avg rev", fiend: "rev",
      render: (row) => (<div style={{ background: "whitesmoke" }}> {row.rev} </div>),
    },
    {
      title: "Avg unit", fiend: "unit",
      render: (row) => (<div style={{ background: "whitesmoke" }}> {row.unit} </div>),
    },
  ];

  var quarter_columns = [
    {
      title: "Quarter", fiend: "quarter",
      render: (row) => (<div style={{ background: "mintcream", fontFamily: "system-ui", fontSize: "16px", textAlign: "left", }}>{row.quarter}</div>),
    },
    { title: "Avg rev", render: (row) => (<div style={{ background: "whitesmoke" }}> {row.rev} </div>), },
    { title: "Avg unit", render: (row) => (<div style={{ background: "whitesmoke" }}> {row.unit} </div>), },
  ];

  return (

    <Grid container>
      
      <Grid container style={{ margin: "1%", borderRadius: "11px", boxShadow: "rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px", }}>
      
        <Grid style={{ display: "inline-flex" }}>
          <ViewInArIcon style={{ fontSize: "60px", color: "white", padding: "6px", marginTop: "3px", marginLeft: "10%", }} />
          <div style={{}}>
            <h5 style={{ color: "white", padding: "10px", marginTop: "12px" }}>
              {name}
            </h5>
          </div>
        </Grid>
      
      </Grid>

      <Grid container>

        <Grid item sm={2} style={{marginRight:'10px'}}>

          <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, }, }}>

            <TimelineItem style={{ minHeight: "57px" }}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={timelinecontentstyle}>
                <Typography variant="p" component="span">
                  Current Price
                </Typography>
                <Typography>{curr_price}</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem style={{ minHeight: "57px" }}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent style={timelinecontentstyle}>
                <Typography variant="p" component="span">
                  Reguler Price
                </Typography>
                <Typography>{reg_price}</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem style={{ minHeight: "57px" }}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={timelinecontentstyle}>
                <Typography variant="p" component="span">
                  Manage Stock
                </Typography>
                <Typography>{manage_stock}</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem style={{ minHeight: "57px" }}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={timelinecontentstyle}>
                <Typography variant="p" component="span">
                  Stock
                </Typography>
                <Typography>{stock}</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem style={{ minHeight: "57px" }}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={timelinecontentstyle}>
                <Typography variant="p" component="span">
                  Cost
                </Typography>
                <Typography>{cost}</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem style={{ minHeight: "57px" }}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="secondary" />
              </TimelineSeparator>
              <TimelineContent style={timelinecontentstyle}>
                <Typography variant="p" component="span">
                  On-sale
                </Typography>
                <Typography>{os}</Typography>
              </TimelineContent>
            </TimelineItem>

          </Timeline>

        </Grid>

        <Grid item sm={9}>

          <Grid container style={{padding:'0px'}}>
          
            <Grid item sm={3} style={{ marginRight: "5%" }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  columns={fbw_columns}
                  data={boughtwith}
                  title={"Bought-with"}
                  icons={tableIcons}
                  options={{
                    pagination: false,
                    pageSize: 10, // make initial page size
                    pageSizeOptions: [],
                    emptyRowsWhenPaging: false, // To avoid of having empty rows
                    exportButton: true,
                    search: false,
                    exportAllData: true,
                    labelRowsPerPage: "",
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

            <Grid item sm={3} style={{ marginRight: "5%" }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  columns={quarter_columns}
                  pageSize={10}
                  data={quarter}
                  title={"Quarter-Avg"}
                  icons={tableIcons}
                  options={{
                    pagination: false,
                    pageSize: 4, // make initial page size
                    pageSizeOptions: [],
                    pagination: false,
                    emptyRowsWhenPaging: false, // To avoid of having empty rows
                    exportButton: true,
                    exportAllData: true,
                    search: false,
                    labelRowsPerPage: "",
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

            <Grid item sm={3} style={{ marginRight: "0px" }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  columns={month_columns}
                  pageSize={10}
                  data={month}
                  title={"Month-Avg"}
                  icons={tableIcons}
                  options={{
                    pagination: false,
                    pageSize: 12, // make initial page size
                    pageSizeOptions: [],
                    pagination: false,
                    emptyRowsWhenPaging: false, // To avoid of having empty rows
                    exportButton: true,
                    exportAllData: true,
                    search: false,
                    labelRowsPerPage: "",
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

            <Grid item sm={11} style={{ marginTop: "2%" }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  columns={customer_columns}
                  pageSize={10}
                  data={customers}
                  // title={segname}
                  title={"Customers"}
                  icons={tableIcons}
                  options={{
                    pageSize: 10, // make initial page size
                    emptyRowsWhenPaging: false, // To avoid of having empty rows
                    pageSizeOptions: [],
                    search: false,
                    exportButton: true,
                    exportAllData: true,
                    labelRowsPerPage: "",
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

            <Grid item sm={11} style={{ marginTop: "2%" }}>
              
              <h5 style={{marginTop: "7%",marginBottom: "2%",width: "97%",background: "ghostwhite",padding: "2%"}}>
                Retention Data
              </h5>

              <h5 style={retentionTitleStyle}>Customer retention</h5>
              <Grid container style={retentionTableStyle}>
                <div style={{ width: "-webkit-fill-available" }} dangerouslySetInnerHTML={{ __html: cus }}></div>
              </Grid>

              <h5 style={retentionTitleStyle}>Revenue generated</h5>
              <Grid container style={retentionTableStyle}>
                <div style={{ width: "-webkit-fill-available" }} dangerouslySetInnerHTML={{ __html: rev }}></div>
              </Grid>


              <h5 style={retentionTitleStyle}>Unit sold</h5>
              <Grid container style={retentionTableStyle}>
                <div style={{ width: "-webkit-fill-available" }} dangerouslySetInnerHTML={{ __html: unit }}></div>
              </Grid>

            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Grid>

  );
}

export default SingleProduct;
