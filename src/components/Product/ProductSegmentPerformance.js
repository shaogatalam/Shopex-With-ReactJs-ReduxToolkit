import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import moment from "moment";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import { addDays, subDays, getDate } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

import Grid from "@mui/material/Grid";



//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import Multiselect from "multiselect-react-dropdown";

import { ThemeProvider, createTheme } from "@mui/material";

import { get_product_segments } from "../../features/product/ProductListAndSegment";
import { get_product_segments_data } from "../../features/product/ProductSegments";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import RepeatIcon from "@mui/icons-material/Repeat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Card } from "react-bootstrap";

// import store,{injectAsyncReducer} from "../../app/NewStore";
// import { Product_List_And_Seg_Slice } from "../../features/product/ProductListAndSegment";
// import { Product_and_catagory_sales_Slice } from "../../features/product/ProductSalesTable";
// import { Product_performance_single_and_mutiple_Slice } from "../../features/product/ProductPerformance";
// import { Product_Purchase_Based_Customer_List_and_Segment_Slice } from "../../features/product/ProductPurchaseBasedCusSeg";
// import { Product_specific_city_all_product_Slice } from "../../features/product/ProductSingleCity";
// import { Product_segments_Slice } from "../../features/product/ProductSegments";


import { Modal, Paper, TextField } from '@mui/material';
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

//import { makeStyles } from '@material-ui/core/styles';



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

function ProductSegmentPerformance() {
  
  var accountType = useSelector((state) => state.dashTops.accountType);

  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
  //     }
  //   },
  // }));
  // var classes = useStyles();

  var [segs, setSegs]         = useState("");
  //var classes                 = useStyles();
  var dispatch                = useDispatch();
  var defaultMaterialTheme    = createTheme();
  var [daterange, setdrange]  = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);


  useEffect(() => {

    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_product_segments")) {
    //     ReactSession.set("get_product_segments", "1");
    //     dispatch(get_product_segments({ ajax_call: 2 }));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_product_segments")) {
        sessionStorage.setItem("get_product_segments", "1");
        dispatch(get_product_segments({ ajax_call: 2 }));
      }
    }
    
  },[]);


  var Product_segs  = useSelector((state) => state.product_List_And_Segments?.product_segments ?? []);
  var ops           = [];

  var ops = [];
  if (Product_segs && Object.keys(Product_segs).length > 0) {
    for (var i of Product_segs) {
      var label = i.name;
      var value = i.id;
      if(label && value){
        ops.push({ value: value, label: label });
      }
    }
  }

  var dateSubmit = (event) => {

    event.preventDefault();
    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());
    if(accountType==="paid"){
      dispatch(
        get_product_segments_data({
          from: format(daterange[0], "yyyy-MM-dd"),
          to: format(daterange[1], "yyyy-MM-dd"),
          segs: segs,
          ajax_call: 1,
        })
      );
      dispatch(get_product_segments_data(data));
    }
  };

  
  var rev_obj           = {};
  var order_obj         = {};
  var profit_obj        = {};
  var customer_obj      = {};
  var rcustomer_obj     = {};
  var unit_obj          = {};
  var comparison_table  = {};

  var selected_segments  = useSelector((state) => state.Product_segments);
  var selected_segments_ = selected_segments?.segment_comparison_table_object ?? {};
  if (selected_segments_) {
    comparison_table = structuredClone(selected_segments_);
  }


  var label  = useSelector((state) => state.Product_segments);
  var label_ = label?.segment_comparison_chart_base_label ?? undefined;
  if (label_) {
    label = structuredClone(label_);
  }

  // var label = useSelector((state) => state.Product_segments.segment_comparison_chart_base_label);
  // var label = structuredClone(label);

  ////////////////
  // var rev_comparison = useSelector((state) => state.Product_segments.segment_rev_comparison);
  // var rev_obj = {};
  // if (rev_comparison) {
  //   rev_obj.labels = label;
  //   rev_obj.datasets = structuredClone(rev_comparison);
  // }

  var rev_comparison = useSelector((state) => state.Product_segments?.segment_rev_comparison ?? null);
  var rev_obj = {};
  if (rev_comparison) {
    rev_obj.labels = label;
    rev_obj.datasets = structuredClone(rev_comparison);
  }



  ////////////////
  // var order_comparison = useSelector((state) => state.Product_segments.segment_order_comparison);
  // var order_obj = {};
  // if (order_comparison) {
  //   order_obj.labels = label;
  //   order_obj.datasets = structuredClone(order_comparison);
  // }
  var order_comparison = useSelector((state) => state.Product_segments?.segment_order_comparison ?? null);
  var order_obj = {};
  if (order_comparison) {
    order_obj.labels = label;
    order_obj.datasets = structuredClone(order_comparison);
  }


  ////////////////
  // var profit_comparison = useSelector((state) => state.Product_segments.segment_profit_comparison);
  // var profit_obj = {};
  // if (profit_comparison) {
  //   profit_obj.labels = label;
  //   profit_obj.datasets = structuredClone(profit_comparison);
  // }

  var profit_comparison = useSelector((state) => state.Product_segments?.segment_profit_comparison ?? null);
  var profit_obj = {};
  if (profit_comparison) {
    profit_obj.labels = label;
    profit_obj.datasets = structuredClone(profit_comparison);
  }


  ////////////////
  // var cus_comparison = useSelector((state) => state.Product_segments.segment_cus_comparison);
  // var cus_obj = {};
  // if (cus_comparison) {
  //   cus_obj.labels = label;
  //   cus_obj.datasets = structuredClone(cus_comparison);
  // }
  var cus_comparison = useSelector((state) => state.Product_segments?.segment_cus_comparison ?? null);
  var cus_obj = {};
  if (cus_comparison) {
    cus_obj.labels = label;
    cus_obj.datasets = structuredClone(cus_comparison);
  }



  ////////////////
  // var rcus_comparison = useSelector((state) => state.Product_segments.segment_rcus_comparison);
  // var rcus_obj = {};
  // if (rcus_comparison) {
  //   rcus_obj.labels = label;
  //   rcus_obj.datasets = structuredClone(rcus_comparison);
  // }
  var rcus_comparison = useSelector((state) => state.Product_segments?.segment_rcus_comparison ?? null);
  var rcus_obj = {};
  if (rcus_comparison) {
    rcus_obj.labels = label;
    rcus_obj.datasets = structuredClone(rcus_comparison);
  }

  ////////////////
  // var unit_comparison = useSelector((state) => state.Product_segments.segment_unit_comparison);
  // var unit_obj = {};
  // if (unit_comparison) {
  //   unit_obj.labels = label;
  //   unit_obj.datasets = structuredClone(unit_comparison);
  // }
  var unit_comparison = useSelector((state) => state.Product_segments?.segment_unit_comparison ?? null);
  var unit_obj = {};
  if (unit_comparison) {
    unit_obj.labels = label;
    unit_obj.datasets = structuredClone(unit_comparison);
  }


     
  var tooltipLinePlugIn = {
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
  

  if(accountType === "demo"){
    
    var comparison_table = [
      {
        segment: "Segment A",
        total_cus: 1000,
        total_order: 2000,
        ondisbuy: 500,
        total_unit: 10000,
        unit_per_order: 5,
        total_rev: 100000,
        rev_per_order: 50,
        rev_per_cus: 100,
        total_profit: 20000
      },
      {
        segment: "Segment B",
        total_cus: 800,
        total_order: 1500,
        ondisbuy: 300,
        total_unit: 7500,
        unit_per_order: 5,
        total_rev: 80000,
        rev_per_order: 53.33,
        rev_per_cus: 100,
        total_profit: 16000
      },
      {
        segment: "Segment C",
        total_cus: 1200,
        total_order: 2500,
        ondisbuy: 800,
        total_unit: 12500,
        unit_per_order: 5,
        total_rev: 125000,
        rev_per_order: 50,
        rev_per_cus: 104.17,
        total_profit: 25000
      },
      {
        segment: "Segment D",
        total_cus: 900,
        total_order: 1800,
        ondisbuy: 450,
        total_unit: 9000,
        unit_per_order: 5,
        total_rev: 90000,
        rev_per_order: 50,
        rev_per_cus: 100,
        total_profit: 18000
      },
      {
        segment: "Segment E",
        total_cus: 1100,
        total_order: 2200,
        ondisbuy: 600,
        total_unit: 11000,
        unit_per_order: 5,
        total_rev: 110000,
        rev_per_order: 50,
        rev_per_cus: 100,
        total_profit: 22000
      }
    ];

    var unit_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Segment A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
    
    var cus_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Segment A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };

    var rcus_obj = {

      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Segment A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment C',
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
          label: 'Segment A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment C',
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
          label: 'Segment A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment C',
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
          label: 'Segment A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment B',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Segment C',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
    
  }


  return (
    
    <>

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Product : Segment performance </h6>
        </div>
      </Grid>

      <Grid container spacing={3}>
      
        <Grid item xs={12}>
          
          <form onSubmit={dateSubmit} style={{display:'flex'}}>
          
            <input type="hidden" name="ajax_call" value="1" />
            <input name="segs" style={{ display: "none" }} defaultValue={segs} />
            
            <div style={{width:"40%",marginRight:"15px"}}>
              {ops && ops.length > 0 && 
                <Multiselect
                  displayValue="label"
                  placeholder="Select segment "
                  onRemove={(e) => { var arr = []; var data = ""; for (var i of e) { var data = i.value; arr.push(data);}setSegs(JSON.stringify(arr));}}
                  onSelect={(e) => { var arr = []; var data = ""; for (var i of e) { var data = i.value; arr.push(data);}setSegs(JSON.stringify(arr));}}
                  options={ops}  
                  selectedValues={[]}  
                  showCheckbox
                />
              }
            </div>
            
            <div className="date-period" style={{margin:"9px"}}>
              
              <DateRangePicker
                label="Timeline"
                value={daterange}
                onChange={setdrange}
                oneTap={false}
                ranges={[
                  {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                  {label: "Today",value: [new Date(), new Date()]},
                  {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                  {label: "Last 7 days",value: [subDays(new Date(), 6), new Date()]},
                  {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date()]},
                  {label: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                  {label: "Year To date",value: [startOfYear(new Date()), new Date()]}
                ]}>

              </DateRangePicker>

            </div>

            <Button style={{marginTop:"8px",height:"35px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
              Submit 
            </Button>
            
          </form>

        </Grid>

        <Grid item xs={12}>
          
          {comparison_table && comparison_table.length > 0 && (
          
            // <Card className="dash-card">
              
              <ThemeProvider theme={defaultMaterialTheme}>

                <div>
                  
                  <MaterialTable
              
                    sx={{ 
                      [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                      [`& .td`]:{padding:'20px!important'},
                    }}
                    
                    columns={[
                      {
                        title: "Segment",
                        field: "segment",
                        render: (row) => <div style={{background: "mintcream",fontFamily: "system-ui",minWidth:'15vw',"maxWidth":"20vw" ,textAlign: "left"}}>{row.segment}</div>
                      },
                      {
                        title: "Cus",field: "total_cus",
                        render: (row) => <div style={{ background: "whitesmoke" }}>{row.total_cus}</div>,
                        customSort: (a, b) => a.total_cus - b.total_cus,},
                        
                      {
                        title: "Order",field: "total_order",
                        render: (row) => <div style={{ background: "ghostwhite" }}>{row.total_order}</div>,
                        customSort: (a, b) => a.total_order - b.total_order,
                      },
                      {
                        title: "OrderOnOffer",field: "ondisbuy",
                        render: (row) => <div style={{ background: "whitesmoke" }}>{row.ondisbuy}</div>,
                        customSort: (a, b) => a.ondisbuy - b.ondisbuy,
                      },
                      {
                        title: "Unit",field: "total_unit",
                        render: (row) => <div style={{ background: "ghostwhite" }}>{row.total_unit}</div>,
                        customSort: (a, b) => a.total_unit - b.total_unit,
                      },
                      {
                        title: "Unit/Order",field: "unit_per_order",
                        render: (row) => <div style={{ background: "whitesmoke" }}>{row.unit_per_order}</div>,
                        customSort: (a, b) => a.unit_per_order - b.unit_per_order,
                      },
                      {
                        title: "Rev",field: "total_rev",
                        render: (row) => <div style={{ background: "ghostwhite" }}>{row.total_rev}</div>,
                        customSort: (a, b) => a.total_rev - b.total_rev,
                      },
                      {
                        title: "Rev/Order",field: "rev_per_order",
                        render: (row) => <div style={{ background: "whitesmoke" }}>{row.rev_per_order}</div>,
                        customSort: (a, b) => a.rev_per_order - b.rev_per_order,
                      },
                      
                      {
                        title: "Rev/Cus",field: "rev_per_cus",
                        render: (row) => <div style={{ background: "ghostwhite" }}>{row.rev_per_cus} </div>,
                        customSort: (a, b) => a.rev_per_cus - b.rev_per_cus,
                      },
                      
                      {
                        title: "Profit",field: "total_profit",
                        render: (row) => <div style={{ background: "whitesmoke" }}>{row.total_profit}</div>,
                        customSort: (a, b) => a.total_profit - b.total_profit,
                      },
                    ]}
                    data={comparison_table}
                    title="Product Segment :: Comparison"

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

                </div>
                
              

              </ThemeProvider>
            
            // </Card>
          
          )}

        </Grid>

        <Grid item xs={12}>

          {/* <Card className="dash-card"> */}
            <Timeline className="timeline">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total orders placed :: including products from each segment</span>
                    <ShoppingBasketIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  { order_obj &&
                    order_obj.labels &&
                    Array.isArray(order_obj.labels) &&
                    order_obj.datasets &&
                    Array.isArray(order_obj.datasets) &&
                    order_obj.datasets.length > 0
                    && 
                    <Line width={700} height={350} data={order_obj} options={option} plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total unit sold :: including products from each segment </span>
                    <LayersRoundedIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  { unit_obj &&
                    unit_obj.labels &&
                    Array.isArray(unit_obj.labels) &&
                    unit_obj.datasets &&
                    Array.isArray(unit_obj.datasets) &&
                    unit_obj.datasets.length > 0
                    &&  
                    <Line width={700} height={350} data={unit_obj} options={option} plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total revenue :: including products from each segment </span>
                    <AttachMoneyIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  { rev_obj &&
                    rev_obj.labels &&
                    Array.isArray(rev_obj.labels) &&
                    rev_obj.datasets &&
                    Array.isArray(rev_obj.datasets) &&
                    rev_obj.datasets.length > 0
                    &&  
                    <Line width={700} height={350} data={rev_obj} options={option} plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total customer :: including products from each segment </span>
                    <PeopleAltIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    cus_obj &&
                    cus_obj.labels &&
                    Array.isArray(cus_obj.labels) &&
                    cus_obj.datasets &&
                    Array.isArray(cus_obj.datasets) &&
                    cus_obj.datasets.length > 0
                    &&  
                    <Line width={700} height={350} data={cus_obj} options={option} plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total repeat-customer :: including products from each segment </span>
                    <RepeatIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    rcus_obj &&
                    rcus_obj.labels &&
                    Array.isArray(rcus_obj.labels) &&
                    rcus_obj.datasets &&
                    Array.isArray(rcus_obj.datasets) &&
                    rcus_obj.datasets.length > 0
                    &&  
                    <Line width={700} height={350} data={rcus_obj} options={option} plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span> Total profit :: including products from each segment </span>
                    <MonetizationOnIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  { profit_obj &&
                    profit_obj.labels &&
                    Array.isArray(profit_obj.labels) &&
                    profit_obj.datasets &&
                    Array.isArray(profit_obj.datasets) &&
                    profit_obj.datasets.length > 0
                    &&  
                    <Line width={700} height={350} data={profit_obj} options={option} plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          {/* </Card> */}

        </Grid>

      </Grid>

    </>
  
  );

}

export default ProductSegmentPerformance;
