import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import moment from "moment";

import { addDays, subDays, getDate } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

import Grid from "@mui/material/Grid";


//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';

import { get_single_city_all_product_data } from "../../features/product/ProductSingleCity";

import { get_product_segments } from "../../features/product/ProductListAndSegment";
import { get_product_segments_data } from "../../features/product/ProductSegments";

import { get_cusret_getcity } from "../../features/cus/CusRetSelCity";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Card } from "react-bootstrap";

import Multiselect from "multiselect-react-dropdown";



import {ThemeProvider, createTheme, Modal, Paper, TextField } from '@mui/material';
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

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,  Filler);


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


function ProductOneCityPerform() {

  var dispatch                = useDispatch();
  var defaultMaterialTheme    = createTheme();
  var [daterange, setdrange]  = useState([  new Date(moment().startOf("month")), new Date(moment().endOf("month"))]);
  var [duration, setduration] = useState();
  var [segs, setSegs]         = useState('');
  var [shipcity, setShipcity] = useState('');
  var shoptype                = useSelector((state) => state.dashTops.shoptype);
  var accountType             = useSelector((state) => state.dashTops.accountType);


  useEffect(() => {

    // if(accountType === "paid") {

    //   if (!ReactSession.get("get_cusret_getcity")) {
    //     ReactSession.set("get_cusret_getcity", "1");
    //     dispatch(get_cusret_getcity({ ajax_call: 2 }));
    //   }
    //   if (!ReactSession.get("get_product_segments")) {
    //     ReactSession.set("get_product_segments", "1");
    //     dispatch(get_product_segments({ ajax_call: 2 }));
    //   }
      
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusret_getcity")) {
        sessionStorage.setItem("get_cusret_getcity", "1");
        dispatch(get_cusret_getcity({ ajax_call: 2 }));
      }
    
      if (!sessionStorage.getItem("get_product_segments")) {
        sessionStorage.setItem("get_product_segments", "1");
        dispatch(get_product_segments({ ajax_call: 2 }));
      }
    }

  }, [])

  var CusRetSC = useSelector((state) => state.CusRetSC);
  if (CusRetSC) {
    var shipcity_obj = CusRetSC?.scity ?? {}; // Default to an empty object if scity is undefined
  }

  var dateSubmit = (event) => {
    event.preventDefault();
    dispatch(get_product_segments_data({
        from: format(daterange[0], 'yyyy-MM-dd'),
        to: format(daterange[1], 'yyyy-MM-dd'),
        segs: segs,
        ajax_call: 1
    }));
  };


  var dateSubmit = (e) => {
    e.preventDefault();
    dispatch(
      get_single_city_all_product_data({
        from: format(daterange[0], "yyyy-MM-dd"),
        to: format(daterange[1], "yyyy-MM-dd"),
        unit: duration,
        s: shipcity,
        ajax_call: 1,
      })
    );
  };

  var all_product_single_city = useSelector((state) => state.Product_specific_city_all_product);
  var comparison_table = structuredClone(all_product_single_city?.single_city_comparison_table_object ?? []);


  //var label = structuredClone(all_product_single_city.single_city_comparison_chart_base_label.replace(/\"/g, "").split(","));
  if (all_product_single_city) {
    var label = structuredClone( all_product_single_city?.single_city_comparison_chart_base_label?.replace(/\"/g, "").split(",") ?? [] );
  } else {
    var label = []; 
  }
 
  ////////////////
  var single_city_rev_comparison = useSelector((state) => state.Product_specific_city_all_product?.single_city_rev_comparison ?? null);
  var rev_obj = {};
  if (single_city_rev_comparison) {
    rev_obj.labels = label;
    rev_obj.datasets = structuredClone(single_city_rev_comparison);
  }
  

  ////////////////
  var single_city_order_comparison = useSelector((state) => state.Product_specific_city_all_product?.single_city_order_comparison ?? null);
  var order_obj = {};
  if (single_city_order_comparison) {
    order_obj.labels = label;
    order_obj.datasets = structuredClone(single_city_order_comparison);
  }


  ////////////////
  var single_city_profit_comparison = useSelector((state) => state.Product_specific_city_all_product?.single_city_profit_comparison ?? null);
  var profit_obj = {};
  if (single_city_profit_comparison) {
    profit_obj.labels = label;
    profit_obj.datasets = structuredClone(single_city_profit_comparison);
  }


  ////////////////
  var single_city_cus_comparison = useSelector((state) => state.Product_specific_city_all_product?.single_city_cus_comparison ?? null);
  var customer_obj = {};
  if (single_city_cus_comparison) {
    customer_obj.labels = label;
    customer_obj.datasets = structuredClone(single_city_cus_comparison);
  }



  ////////////////
  var single_city_unit_comparison = useSelector((state) => state.Product_specific_city_all_product?.single_city_unit_comparison ?? null);
  var unit_obj = {};
  if (single_city_unit_comparison) {
    unit_obj.labels = label;
    unit_obj.datasets = structuredClone(single_city_unit_comparison);
  }


  if(accountType === "demo"){
    
    var comparison_table = [
      {
        product_name: "Widget A",
        total_rev: 1000,
        total_unit: 50,
        total_order: 30,
        total_cus: 25,
        total_profit: 500,
      },
      {
        product_name: "Gadget B",
        total_rev: 800,
        total_unit: 40,
        total_order: 25,
        total_cus: 20,
        total_profit: 350,
      },
      {
        product_name: "Thingamajig C",
        total_rev: 1200,
        total_unit: 60,
        total_order: 35,
        total_cus: 30,
        total_profit: 600,
      },
      {
        product_name: "Doodad D",
        total_rev: 600,
        total_unit: 30,
        total_order: 20,
        total_cus: 15,
        total_profit: 250,
      },
      {
        product_name: "Widget E",
        total_rev: 1500,
        total_unit: 75,
        total_order: 40,
        total_cus: 35,
        total_profit: 750,
      },
      {
        product_name: "Gizmo F",
        total_rev: 700,
        total_unit: 35,
        total_order: 22,
        total_cus: 18,
        total_profit: 320,
      },
      {
        product_name: "Thingamajig G",
        total_rev: 900,
        total_unit: 45,
        total_order: 28,
        total_cus: 24,
        total_profit: 450,
      },
      {
        product_name: "Doodad H",
        total_rev: 400,
        total_unit: 20,
        total_order: 15,
        total_cus: 12,
        total_profit: 180,
      },
      {
        product_name: "Widget I",
        total_rev: 1300,
        total_unit: 65,
        total_order: 38,
        total_cus: 32,
        total_profit: 650,
      },
      {
        product_name: "Gadget J",
        total_rev: 850,
        total_unit: 42,
        total_order: 26,
        total_cus: 22,
        total_profit: 375,
      }
    ]

    var unit_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Product A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
    var customer_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Product A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
    var profit_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Product A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };

    var rev_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Product A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };

    var order_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Product A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Product C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };

    var shipcity_obj = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
      "Austin",
      "Jacksonville",
      "Fort Worth",
      "Columbus",
      "Charlotte",
      "Detroit",
      "El Paso",
      "Memphis",
      "Denver",
      "Washington"
    ];
    
  }

  var option = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
      },
      x: {
        display: false,
      },
    },

    lineTension: 0.3,
    legend: {
      display: true,
      position: "right",
    },
  };

  
  const tooltipLinePlugIn = {
    id: 'tooltipLine',
    beforeDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        ctx.save();
        const activePoint = chart.tooltip._active[0];
  
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(activePoint.element.x, chart.chartArea.top);
        ctx.lineTo(activePoint.element.x, activePoint.element.y); // Use activePoint.element.y
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        ctx.restore();
  
        ctx.beginPath();
        ctx.moveTo(activePoint.element.x, activePoint.element.y);
        ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 99, 132, 1)'; // Remove spaces within rgba()
        ctx.stroke();
        ctx.restore();
      }
    },
  };


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
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
        <h6>Product : Performance by city </h6>
        </div>
      </Grid>
    
    <Grid container spacing={3}>
    
      <Grid item xl={12} lg={12} md={12}  sm={12} xs={12} style={{background: "whitesmoke", marginLeft: "25px", marginTop: "20px", height : "72px", "padding" : "10px", borderRadius: "10px"}} >

        <form className="date-period" style={{ marginBottom: "-15px", display : "inline-flex" }} onSubmit={dateSubmit} >
          
          <input name="segs" type="hidden" defaultValue={segs} />
          
          {shipcity_obj && 
            <div style={{width:"350px",border : "1px solid lightgray", borderRadius: "7px"}}>
              <Multiselect 
                isObject={false}
                singleSelect={true}
                placeholder="Shipping-City"
                onRemove={(selectedItem) => {
                  setShipcity(null);
                }}
                onSelect={(selectedItem) => {
                  setShipcity(selectedItem); 
                }}
                options={shipcity_obj}
                showCheckbox={false}
              />
            </div>
          }
         
          <input name="s" type="hidden" value={shipcity}/>


          <DateRangePicker style={{marginLeft:"20px",paddingTop: "8px"}}
            //placement='rightEnd'
            // label="Timeline"
            value={daterange}
            onChange={setdrange}
            oneTap={false}
            ranges={[
              {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
              { label: "Today", value: [new Date(), new Date()]},
              {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
              {label: "Last 7 days",value: [subDays(new Date(), 6), new Date()]},
              {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1), new Date(),]},
              {label: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
              {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
            ]}>

          </DateRangePicker>
       
          <RadioGroup style={{ display: "inline-block", fontSize: "13px", fontWeight: "bold",paddingTop: "3px"}} onChange={(e) => { setduration(e.target.value); }}>
            <Radio checked={duration === "daily"}    value="daily"   name="duration" /> Day
            <Radio checked={duration === "weekly"}   value="weekly"  name="duration" /> Week
            <Radio checked={duration === "monthly"}  value="monthly" name="duration" /> Month
          </RadioGroup>
          
          {/* <input className="period-btn" variant="contained" color="secondary" type="submit" value="Submit" /> */}
          <Button style={{height: "40px", marginLeft: "40px", marginTop: "6px"}} variant="contained" color="secondary" type="submit">Submit</Button>
        
        </form>

      </Grid>

      <Grid item xl={12} lg={12} md={12}  sm={12} xs={12}>
        
        {comparison_table && comparison_table.length > 0 && (
          <ThemeProvider theme={defaultMaterialTheme}>
            
              <MaterialTable
                sx={{ 
                [`& .MuiTableRow-root: hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                [`& .td`]:{padding:'20px!important'},
              }}
                style={{ borderRadius: "14px" }}
                columns={[
                  {
                    title: "Product",field: "product_name",
                    render: (row) => (<div style={{ background: "whitesmoke",minWidth:'15vw',"maxWidth":"20vw"  }}>{row.product_name}</div>),
                  },

                  {
                    title: "Revenue",type:"numeric",
                    field: "total_rev",
                    render: (row) => (<div style={{ background: "ghostwhite" }}>{row.total_rev}</div>),
                    customSort: (a, b) => a.total_rev - b.total_rev,
                  },

                  {
                    title: "Unit",type:"numeric",
                    field: "total_unit",
                    render: (row) => (<div style={{ background: "whitesmoke" }}>{row.total_unit}</div>),
                    customSort: (a, b) => a.total_unit - b.total_unit,
                  },

                  {
                    title: "Order",type:"numeric",
                    field: "total_order",
                    render: (row) => (<div style={{ background: "ghostwhite" }}>{row.total_order}</div>),
                    customSort: (a, b) => a.total_order - b.total_order,
                  },

                  {
                    title: "Customer",type:"numeric",
                    field: "total_cus",
                    render: (row) => (<div style={{ background: "whitesmoke" }}>{row.total_cus}</div>),
                    customSort: (a, b) => a.total_cus - b.total_cus,
                  },

                  {
                    title: "Profit",type:"numeric",
                    field: "total_profit",
                    render: (row) => (<div style={{ background: "ghostwhite" }}>{row.total_profit}</div>),
                    customSort: (a, b) => a.total_profit - b.total_profit,
                  },
                ]}
                data={comparison_table}
                title=""
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
      
      </Grid>

      <Grid item xl={12} lg={12} md={12}  sm={12} xs={12}>
        
          <Timeline className="timeline">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="tml-title-icon">
                  <span> Total order from each product </span>
                  <ShoppingBasketIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="tml-chart">
                {
                  //single_city_order_comparison && single_city_order_comparison.length > 0 &&
                  Array.isArray(order_obj.datasets) && order_obj && order_obj.labels && order_obj.datasets && 
                  <Line data={order_obj} options={option} plugins={[tooltipLinePlugIn]} />
                }
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="tml-title-icon">
                  <span>Total unit sold from each product</span>
                  <LayersRoundedIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="tml-chart">
                {
                  //single_city_unit_comparison && single_city_unit_comparison.length > 0 &&
                  Array.isArray(unit_obj.datasets) && unit_obj && unit_obj.labels && unit_obj.datasets &&  
                  <Line data={unit_obj} options={option} plugins={[tooltipLinePlugIn]} />
                }
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="tml-title-icon">
                  <span>Total revenue generated from each product</span>
                  <AttachMoneyIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="tml-chart">
                {
                  //single_city_rev_comparison && single_city_rev_comparison.length > 0 &&
                  Array.isArray(rev_obj.datasets) && rev_obj && rev_obj.labels && rev_obj.datasets &&  
                  <Line data={rev_obj} options={option} />
                }
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="tml-title-icon">
                  <span>Total Customer from each product</span>
                  <PeopleAltIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="tml-chart">
                {
                  //single_city_cus_comparison && single_city_cus_comparison.length > 0 &&
                  Array.isArray(customer_obj.datasets) && customer_obj && customer_obj.labels && customer_obj.datasets && 
                  <Line data={customer_obj} options={option} plugins={[tooltipLinePlugIn]} />
                }
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="tml-title-icon">
                  <span>Total profit from each product</span>
                  <MonetizationOnIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="tml-chart">
                {
                  //single_city_profit_comparison && single_city_profit_comparison.length > 0 &&
                  Array.isArray(profit_obj.datasets) && profit_obj && profit_obj.labels && profit_obj.datasets && 
                  <Line data={profit_obj} options={option} plugins={[tooltipLinePlugIn]} />
                }
              </TimelineContent>
            </TimelineItem>
          </Timeline>
       
      </Grid>
      
    </Grid>

    </>

  );

}

export default ProductOneCityPerform;
