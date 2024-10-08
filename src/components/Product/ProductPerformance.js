import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { format } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import moment from "moment";
import { addDays, subDays, getDate } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import Grid from "@mui/material/Grid";
import Products from "./ProductSegmentFilters/Products";
import { get_performance_data } from "../../features/product/ProductPerformance";
import { get_product_and_catagory_and_sku_data } from "../../features/product/ProductListAndSegment";
import { get_shopify_product_and_sku_and_type } from "../../features/product/ProductListAndSegment";
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
import { Card } from "react-bootstrap";
import Select from "react-select";

// import store,{injectAsyncReducer} from "../../app/NewStore";
// import { Product_List_And_Seg_Slice } from "../../features/product/ProductListAndSegment";
// import { Product_and_catagory_sales_Slice } from "../../features/product/ProductSalesTable";
// import { Product_performance_single_and_mutiple_Slice } from "../../features/product/ProductPerformance";
// import { Product_Purchase_Based_Customer_List_and_Segment_Slice } from "../../features/product/ProductPurchaseBasedCusSeg";
// import { Product_specific_city_all_product_Slice } from "../../features/product/ProductSingleCity";
// import { Product_segments_Slice } from "../../features/product/ProductSegments";


import {ThemeProvider, createTheme} from '@mui/material';
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



function ProductPerformance() {

  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);

  var dispatch              = useDispatch();
  var defaultMaterialTheme  = createTheme();

  useEffect(() => {

    if (accountType === "paid") {
      if (shoptype === "woo") {
        if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
          sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
          dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
        }
      }
    
      if (shoptype === "shopify") {
        if (!sessionStorage.getItem("get_shopify_product_and_sku_and_type")) {
          sessionStorage.setItem("get_shopify_product_and_sku_and_type", "1");
          dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
        }
      }
    }
    
  }, []);


  //--
  var cat_obj        = useSelector((state) => state.product_List_And_Segments?.product_cat_table_object ?? {});
  var collection_obj = useSelector((state) => state.product_List_And_Segments?.shopify_collection ?? {});

  var dropdown_categories_or_collection = [];
  var cat_coll = null;
  if(shoptype == "woo"){
    cat_coll = cat_obj;
  }else if(shoptype == "shopify"){
    cat_coll = collection_obj;
  }

  if (cat_coll && Object.keys(cat_coll).length > 0) {
    for (var i of cat_coll) {
      var label = i.category_name;
      var value = i.category_id;
      if(label && value){
        dropdown_categories_or_collection.push({ value: value, label: label });
      }
    }
  }
  //--



  var [duration, setDuration] = useState();

  var dateSubmit = (event) => {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data = Object.fromEntries(fdata.entries());
    //setSegname('');
    dispatch(get_performance_data(data));
  };

  // var selected_products = useSelector((state) => state.Product_performance);
  // if (selected_products && selected_products.comparison_table_object.length)
  //     var comparison_table = structuredClone(selected_products.comparison_table_object);
  
  var selected_products = useSelector((state) => state.Product_performance);
  var comparison_table  = selected_products?.comparison_table_object ?? null;

  // If you want to use structuredClone, you can do it here
  if (comparison_table !== null) {
    comparison_table = structuredClone(comparison_table);
  }

 
  // var label = useSelector((state) => state.Product_performance.comparison_chart_base_label);
  // var label = structuredClone(label);
  var label = useSelector((state) => state.Product_performance?.comparison_chart_base_label ?? {});
  var label = structuredClone(label);



  ////////////////
  // var rev_comparison = useSelector((state) => state.Product_performance.rev_comparison);
  // var rev_obj = {};
  // if (rev_comparison) {
  //     rev_obj.labels = label;
  //     rev_obj.datasets = structuredClone(rev_comparison);
  // }
  var rev_comparison = useSelector((state) => state.Product_performance?.rev_comparison ?? null);
  var rev_obj = {};
  if (rev_comparison) {
    rev_obj.labels = label;
    rev_obj.datasets = structuredClone(rev_comparison);
  }
  


  ////////////////
  // var order_comparison = useSelector((state) => state.Product_performance.order_comparison);
  // var order_obj = {};
  // if (order_comparison) {
  //     order_obj.labels = label;
  //     order_obj.datasets = structuredClone(order_comparison);
  // }
  var order_comparison = useSelector((state) => state.Product_performance?.order_comparison ?? null);
  var order_obj = {};
  if (order_comparison) {
    order_obj.labels = label;
    order_obj.datasets = structuredClone(order_comparison);
  }

  ////////////////
  // var profit_comparison = useSelector((state) => state.Product_performance.profit_comparison);
  // var profit_obj = {};
  // if (profit_comparison) {
  //     profit_obj.labels = label;
  //     profit_obj.datasets = structuredClone(profit_comparison);
  // }
  var profit_comparison = useSelector((state) => state.Product_performance?.profit_comparison ?? null);
  var profit_obj = {};
  if (profit_comparison) {
    profit_obj.labels = label;
    profit_obj.datasets = structuredClone(profit_comparison);
  }

  ////////////////
  // var cus_comparison = useSelector((state) => state.Product_performance.cus_comparison);
  // var cus_obj = {};
  // if (cus_comparison) {
  //     cus_obj.labels = label;
  //     cus_obj.datasets = structuredClone(cus_comparison);
  // }
  var cus_comparison = useSelector((state) => state.Product_performance?.cus_comparison ?? null);
  var cus_obj = {};
  if (cus_comparison) {
    cus_obj.labels = label;
    cus_obj.datasets = structuredClone(cus_comparison);
  }

  ////////////////
  // var rcus_comparison = useSelector((state) => state.Product_performance.rcus_comparison);
  // var rcus_obj = {};
  // if (rcus_comparison) {
  //     rcus_obj.labels = label;
  //     rcus_obj.datasets = structuredClone(rcus_comparison);
  // }
  var rcus_comparison = useSelector((state) => state.Product_performance?.rcus_comparison ?? null);
  var rcus_obj = {};
  if (rcus_comparison) {
    rcus_obj.labels = label;
    rcus_obj.datasets = structuredClone(rcus_comparison);
  }


  ////////////////
  // var unit_comparison = useSelector((state) => state.Product_performance.unit_comparison);
  // var unit_obj = {};
  // if (unit_comparison) {
  //     unit_obj.labels = label;
  //     unit_obj.datasets = structuredClone(unit_comparison);
  // }
  var unit_comparison = useSelector((state) => state.Product_performance?.unit_comparison ?? null);
  var unit_obj = {};
  if (unit_comparison) {
    unit_obj.labels = label;
    unit_obj.datasets = structuredClone(unit_comparison);
  }


  var [dr, setdr] = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);


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

 
  

  var [catagory_id, setCatagory_id] = useState("");

  var [selectedOption, setSelectedOption] = useState('specific_product');

  var handleProductFrom = (ProductFrom) => {
    setSelectedOption(ProductFrom);
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
  

  if(accountType === "demo"){

    var comparison_table = [
                          {product_name: "Product A", total_cus: 100,  total_order: 150, On_discount_buy: 50, total_unit: 200,unit_per_order: 1.33, total_rev: 5000, rev_per_order: 33.33, rev_per_cus: 50, total_profit: 2000},
                          {product_name: "Product B", total_cus: 80, total_order: 120, On_discount_buy: 30, total_unit: 150, unit_per_order: 1.25, total_rev: 4000, rev_per_order: 33.33, rev_per_cus: 50, total_profit: 1600},
                          {product_name: "Product C", total_cus: 120, total_order: 180, On_discount_buy: 60, total_unit: 220, unit_per_order: 1.22, total_rev: 5500, rev_per_order: 30.56, rev_per_cus: 45.83, total_profit: 2200},
                          {product_name: "Product D", total_cus: 90, total_order: 135, On_discount_buy: 45, total_unit: 180, unit_per_order: 1.33, total_rev: 4500, rev_per_order: 33.33, rev_per_cus: 50, total_profit: 1800},
                          {product_name: "Product E", total_cus: 70, total_order: 105, On_discount_buy: 35, total_unit: 140, unit_per_order: 1.33, total_rev: 3500, rev_per_order: 33.33, rev_per_cus: 50, total_profit: 1400,},
                          {product_name: "Product F", total_cus: 110, total_order: 165, On_discount_buy: 55, total_unit: 200, unit_per_order: 1.21, total_rev: 4800, rev_per_order: 29.09, rev_per_cus: 43.64, total_profit: 1920},
                          {product_name: "Product G", total_cus: 95, total_order: 142, On_discount_buy: 47, total_unit: 188, unit_per_order: 1.32, total_rev: 4700, rev_per_order: 33.10, rev_per_cus: 49.47, total_profit: 1880,},
                          {product_name: "Product H", total_cus: 85, total_order: 127, On_discount_buy: 42, total_unit: 170, unit_per_order: 1.34, total_rev: 4250, rev_per_order: 33.46, rev_per_cus: 49.71, total_profit: 1700,},
                          {product_name: "Product I", total_cus: 130, total_order: 195, On_discount_buy: 65, total_unit: 260, unit_per_order: 1.33, total_rev: 6500, rev_per_order: 33.33, rev_per_cus: 50, total_profit: 2600,},
                          {product_name: "Product J", total_cus: 75, total_order: 112, On_discount_buy: 37, total_unit: 150, unit_per_order: 1.34, total_rev: 3750, rev_per_order: 33.48, rev_per_cus: 49.98, total_profit: 1500,}
                        ]
    var comparison_table = comparison_table.sort((a, b) => a.total_cus - b.total_cus);
  
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
    var cus_obj = {

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

  }


  return (
    
    <>
      
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Product : Performance</h6>
        </div>
      </Grid>

      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          
          <form className="date-period" style={{ marginBottom: "-15px" }} onSubmit={dateSubmit}>
            
            <DateRangePicker
              value={dr}
              onChange={setdr}
              oneTap={false}
              ranges={[
                {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                {label: "Today", value: [new Date(), new Date()] },
                {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                {label: "Last 7 days",value: [subDays(new Date(), 6), new Date()]},
                {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date()]},
                {label: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
              ]}>
            </DateRangePicker>

            <RadioGroup style={{ display: "inline-block", color: "#fff" }} onChange={(e) => { setDuration(e.target.value);}}>
              <Radio value="daily" name="onsale" /> Day
              <Radio value="weekly" name="onsale" /> Week
              <Radio value="monthly" name="onsale" /> Month
            </RadioGroup>
          
            <div>

              <RadioGroup style={{ display: "inline-block", color: "#fff" }} onChange={(e) => { handleProductFrom(e.target.value);}}>
                <Radio  checked={selectedOption === 'specific_product'} value="specific_product" name="ProductFrom" /> Specific products
                <Radio  checked={selectedOption === 'products_from_a_category'} value="products_from_a_category" name="ProductFrom" />  
                {shoptype === "woo" && <>Products from a category</>}{shoptype === "shopify" && <>Products from a collection</>} 
              </RadioGroup>

              {selectedOption === 'specific_product' && <Products style={{ marginBottom: '7px' }} /> }
              
              {selectedOption === 'products_from_a_category' && dropdown_categories_or_collection && 
                <Select 
                  className="multi" 
                  placeholder={shoptype === "woo"  ? "Specific category"  : shoptype === "shopify" ? "Specific collection" : "" }
                  onChange={(e) => {setCatagory_id(e.value);}}
                  //options={ops1}
                  options={dropdown_categories_or_collection}
                />
              }
              <input name="Catagory_id" type="hidden" value={catagory_id}/>

            </div>

            <input name="dateRange" type={"hidden"} value={format(dr[0], "yyyy-MM-dd") + "To" + format(dr[1], "yyyy-MM-dd")}/>

            <input name="unit" type={"hidden"} value={duration} />
            <input name="ajax_call" type={"hidden"} value="1" />
            {/* <input style={{marginLeft:"0px",marginTop:"10px"}} className="period-btn" variant="contained" color="secondary" type="submit" value="Submit"/> */}
            <button style={{marginLeft:"0px",marginTop:"10px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
              Submit 
            </button>
          </form>

        </Grid>

      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>

          <Card className="dash-card">
            {
              comparison_table !== null && comparison_table !== undefined && comparison_table.length > 0 &&
              
              <ThemeProvider theme={defaultMaterialTheme}>

                  <MaterialTable
                  sx={{ 
                    [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                    [`& .td`]:{padding:'20px!important'},
                  }}

                    columns={[

                      {title: "Product",field: "product_name", render: (row) => (<div style={{ background: "whitesmoke",minWidth:'15vw',"maxWidth":"20vw" }}>{row.product_name}</div>)},
                      
                      {title: "Cus",type:"numeric",field: "total_cus",render: (row) => (<div style={{ background: "ghostwhite" }}>{row.total_cus}</div>),
                      customSort: (a, b) => a.total_cus - b.total_cus,},

                      {title: "Order",type:"numeric",field: "total_order",render: (row) => (<div style={{ background: "whitesmoke" }}>{row.total_order}</div>),
                      customSort: (a, b) => a.total_order - b.total_order},

                      {title: "offer-Order",type:"numeric",field: "On_discount_buy",render: (row) => (<div style={{ background: "ghostwhite" }}>{row.On_discount_buy}</div>),
                      customSort: (a, b) => a.On_discount_buy - b.On_discount_buy},

                      {title: "Unit",type:"numeric",field: "total_unit", render: (row) => ( <div style={{ background: "whitesmoke" }}>{row.total_unit}</div>),
                      customSort: (a, b) => a.total_unit - b.total_unit},

                      {title: "Unit/Order",type:"numeric",field: "unit_per_order", render: (row) => ( <div style={{ background: "ghostwhite" }}>{row.unit_per_order} </div>),
                      customSort: (a, b) => a.unit_per_order - b.unit_per_order},
                      
                      {title: "Rev",type:"numeric",field: "total_rev", render: (row) => (<div style={{ background: "whitesmoke" }}>{row.total_rev}</div>),
                      customSort: (a, b) => a.total_rev - b.total_rev},

                      {title: "Rev/Order",type:"numeric",field: "rev_per_order", render: (row) => (<div style={{ background: "ghostwhite" }}>{row.rev_per_order}</div>),
                      customSort: (a, b) => a.rev_per_order - b.rev_per_order},

                      {title: "Rev/Cus",type:"numeric",field: "rev_per_cus",render: (row) => (<div style={{ background: "whitesmoke" }}>{row.rev_per_cus}</div>),
                      customSort: (a, b) => a.rev_per_cus - b.rev_per_cus},

                      {title: "Profit",type:"numeric",field: "total_profit", render: (row) => (<div style={{ background: "ghostwhite" }}>{row.total_profit}</div>),
                      customSort: (a, b) => a.total_profit - b.total_profit},

                    ]}

                    data={comparison_table}
                    title="Sales Data :: Products"
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
            }
          </Card>

        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          
          {/* <Card className="dash-card"> */}
          
            <Timeline className="timeline">
          
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total order including each product  </span>
                    <ShoppingBasketIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    Array.isArray(order_obj.datasets) && order_obj && order_obj.labels && order_obj.datasets && 
                    <Line width={700} height={350} data={order_obj} options={option}  plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total unit sold from each product  </span>
                    <LayersRoundedIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    Array.isArray(unit_obj.datasets) && unit_obj && unit_obj.labels && unit_obj.datasets && 
                    <Line width={700} height={350} data={unit_obj} options={option} plugins={[tooltipLinePlugIn]} />
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total revenue generated from each product  </span>
                    <AttachMoneyIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    Array.isArray(rev_obj.datasets) && rev_obj && rev_obj.labels && rev_obj.datasets &&  
                    <Line width={700} height={350} data={rev_obj} options={option} plugins={[tooltipLinePlugIn]} />
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total Customer from each product  </span>
                    <PeopleAltIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    Array.isArray(cus_obj.datasets) && cus_obj && cus_obj.labels && cus_obj.datasets && 
                    <Line width={700} height={350} data={cus_obj} options={option}  plugins={[tooltipLinePlugIn]}/>
                  }
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Total Repeat Customer from each product  </span>
                    <RepeatIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {
                    Array.isArray(rcus_obj.datasets) && rcus_obj && rcus_obj.labels && rcus_obj.datasets && 
                    <Line width={700} height={350} data={rcus_obj} options={option} plugins={[tooltipLinePlugIn]} />
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

export default ProductPerformance;
