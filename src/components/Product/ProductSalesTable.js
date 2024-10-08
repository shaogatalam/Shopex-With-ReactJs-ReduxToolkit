import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { format } from "date-fns";
import startOfYear from "date-fns/startOfYear";

import { addDays, subDays, getDate } from "date-fns";
import moment from "moment";

import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

import Grid from "@mui/material/Grid";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
//import { ThemeProvider, createTheme } from "@mui/material";


import { get_product_and_catagory_sales_object } from "../../features/product/ProductSalesTable";
import { get_products_sales_from_selected_catagory } from "../../features/product/ProductSalesTable";
import { Card } from "react-bootstrap";

import { startOfMonth, endOfMonth, subMonths, isLastDayOfMonth, lastDayOfMonth } from 'date-fns';

// import store,{injectAsyncReducer} from "../../app/NewStore";
// import { Product_List_And_Seg_Slice } from "../../features/product/ProductListAndSegment";
// import { Product_and_catagory_sales_Slice } from "../../features/product/ProductSalesTable";
// import { Product_performance_single_and_mutiple_Slice } from "../../features/product/ProductPerformance";
// import { Product_Purchase_Based_Customer_List_and_Segment_Slice } from "../../features/product/ProductPurchaseBasedCusSeg";
// import { Product_specific_city_all_product_Slice } from "../../features/product/ProductSingleCity";
// import { Product_segments_Slice } from "../../features/product/ProductSegments";



//import { makeStyles } from '@material-ui/core/styles';


//import { Modal, Paper, TextField } from '@mui/material';
import {makeStyles, Modal, Paper, TextField,Button,ThemeProvider, createTheme } from '@mui/material';

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


function ProductSalesTable() {
  
  var accountType           = useSelector((state) => state.dashTops.accountType);
  var defaultMaterialTheme  = createTheme();
  var dispatch              = useDispatch();
  
  useEffect(() => {

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_product_and_catagory_sales_object")) {
        sessionStorage.setItem("get_product_and_catagory_sales_object", "1");
        dispatch(get_product_and_catagory_sales_object({ ajax_call: 2 }));
      }
    }

  }, []);

  // var [daterange, setdrange] = useState([
  //   new Date(moment().startOf("month")),
  //   new Date(moment().endOf("month")),
  // ]);

  // var [daterange1, setdrange1] = useState([
  //   startOfMonth(subDays(new Date(), getDate(new Date()))),
  //   endOfMonth(subDays(new Date(), getDate(new Date()))),
  // ]);


  var today       = new Date();
  var from        = new Date(today.getFullYear(), today.getMonth(), 1);
  var to          = today;
  var from1       = subMonths(from, 1);
  var isLastDayTo = isLastDayOfMonth(to);
  var to1         = isLastDayTo ? lastDayOfMonth(subMonths(to, 1)) : subMonths(to, 1);
  var [daterange, setdrange]    = useState([from, to]);
  var [daterange1, setdrange1]  = useState([from1, to1]);


  var dateSubmit = (event) => {
    event.preventDefault();
    if(accountType === "paid") {
      dispatch(
        get_product_and_catagory_sales_object({
          from: format(daterange[0], "yyyy-MM-dd"),
          to: format(daterange[1], "yyyy-MM-dd"),
          from1: format(daterange1[0], "yyyy-MM-dd"),
          to1: format(daterange1[1], "yyyy-MM-dd"),
          ajax_call: 1,
        })
      );
    }
  };

  var Product_sales_table = useSelector((state) => state.Product_and_Catagory_sales);
  
  var cat_sales_table = Product_sales_table?.sales_table_product_catagory_object ?? [];
  var cat_table = null;
  if (cat_sales_table.length > 0) {
    var cat_table = structuredClone(cat_sales_table);
  }


  var prod_sales_table = Product_sales_table?.sales_table_product_object ?? [];
  var prod_table = null;
  if (prod_sales_table.length > 0) {
    prod_table = structuredClone(prod_sales_table);
  }


  // var cat_sales_table = Product_sales_table.sales_table_product_catagory_object;
  // var cat_table = [];
  // if (cat_sales_table && cat_sales_table.length > 0) {
  //     cat_table = structuredClone(cat_sales_table);
  // }


  // var prod_sales_table = Product_sales_table.sales_table_product_object;
  // var prod_table = [];
  // if (prod_sales_table && prod_sales_table.length > 0) {
  //     prod_table = structuredClone(prod_sales_table);
  // }



 

  // var Product_sales_table = useSelector((state) => state.Product_and_Catagory_sales);

  // var cat_table = structuredClone(Product_sales_table?.sales_table_product_catagory_object ?? undefined);

  // var prod_table = structuredClone(Product_sales_table?.sales_table_product_object ?? undefined);


  var handleCatClick = (id, event) => {
    event.preventDefault();
    dispatch(
      get_products_sales_from_selected_catagory({
        id: id,
        sales: 1,
        from: format(daterange[0], "yyyy-MM-dd"),
        to: format(daterange[1], "yyyy-MM-dd"),
        from1: format(daterange1[0], "yyyy-MM-dd"),
        to1: format(daterange1[1], "yyyy-MM-dd"),
      })
    );
  };


  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
  //     }
  //   },
  // }));
  // var classes = useStyles();


  if(accountType === "demo"){

    var prod_table = [
      {
        product: "Product 1",
        rev: 1000,
        rev_change: "5%",
        new_rev: 800,
        new_rev_change: "8%",
        ret_rev: 200,
        ret_rev_change: "2%",
        unit: 500,
        unit_change: "3%",
        order: 600,
        order_change: "6%",
        cus: 400,
        cus_change: "4%",
        new_cus: 300,
        new_cus_change: "7%",
        ret_cus: 100,
        ret_cus_change: "1%",
        profit: 300,
        profit_change: "3%",
      },
      {
        product: "Product 2",
        rev: 1200,
        rev_change: "6%",
        new_rev: 900,
        new_rev_change: "9%",
        ret_rev: 300,
        ret_rev_change: "3%",
        unit: 600,
        unit_change: "4%",
        order: 720,
        order_change: "7%",
        cus: 480,
        cus_change: "5%",
        new_cus: 360,
        new_cus_change: "6%",
        ret_cus: 120,
        ret_cus_change: "2%",
        profit: 360,
        profit_change: "4%",
      },
      {
        product: "Product 3",
        rev: 800,
        rev_change: "4%",
        new_rev: 640,
        new_rev_change: "8%",
        ret_rev: 160,
        ret_rev_change: "2%",
        unit: 400,
        unit_change: "2%",
        order: 480,
        order_change: "4%",
        cus: 320,
        cus_change: "3%",
        new_cus: 240,
        new_cus_change: "5%",
        ret_cus: 80,
        ret_cus_change: "1%",
        profit: 240,
        profit_change: "2%",
      },
      {
        product: "Product 4",
        rev: 1500,
        rev_change: "7%",
        new_rev: 1200,
        new_rev_change: "10%",
        ret_rev: 300,
        ret_rev_change: "3%",
        unit: 750,
        unit_change: "5%",
        order: 900,
        order_change: "9%",
        cus: 600,
        cus_change: "6%",
        new_cus: 450,
        new_cus_change: "7%",
        ret_cus: 150,
        ret_cus_change: "2%",
        profit: 450,
        profit_change: "5%",
      },
      {
        product: "Product 5",
        rev: 900,
        rev_change: "5%",
        new_rev: 720,
        new_rev_change: "9%",
        ret_rev: 180,
        ret_rev_change: "2%",
        unit: 450,
        unit_change: "3%",
        order: 540,
        order_change: "6%",
        cus: 360,
        cus_change: "4%",
        new_cus: 270,
        new_cus_change: "6%",
        ret_cus: 90,
        ret_cus_change: "1%",
        profit: 270,
        profit_change: "3%",
      },
      {
        product: "Product 6",
        rev: 1100,
        rev_change: "6%",
        new_rev: 880,
        new_rev_change: "8%",
        ret_rev: 220,
        ret_rev_change: "2%",
        unit: 550,
        unit_change: "4%",
        order: 660,
        order_change: "7%",
        cus: 440,
        cus_change: "4%",
        new_cus: 330,
        new_cus_change: "5%",
        ret_cus: 110,
        ret_cus_change: "1%",
        profit: 330,
        profit_change: "3%",
      },
      {
        product: "Product 7",
        rev: 1300,
        rev_change: "7%",
        new_rev: 1040,
        new_rev_change: "9%",
        ret_rev: 260,
        ret_rev_change: "3%",
        unit: 650,
        unit_change: "5%",
        order: 780,
        order_change: "8%",
        cus: 520,
        cus_change: "5%",
        new_cus: 390,
        new_cus_change: "6%",
        ret_cus: 130,
        ret_cus_change: "2%",
        profit: 390,
        profit_change: "4%",
      },
      {
        product: "Product 8",
        rev: 950,
        rev_change: "5%",
        new_rev: 760,
        new_rev_change: "8%",
        ret_rev: 190,
        ret_rev_change: "2%",
        unit: 475,
        unit_change: "3%",
        order: 570,
        order_change: "7%",
        cus: 380,
        cus_change: "4%",
        new_cus: 285,
        new_cus_change: "6%",
        ret_cus: 95,
        ret_cus_change: "1%",
        profit: 285,
        profit_change: "3%",
      },
      {
        product: "Product 9",
        rev: 850,
        rev_change: "4%",
        new_rev: 680,
        new_rev_change: "7%",
        ret_rev: 170,
        ret_rev_change: "2%",
        unit: 425,
        unit_change: "2%",
        order: 510,
        order_change: "6%",
        cus: 340,
        cus_change: "3%",
        new_cus: 255,
        new_cus_change: "5%",
        ret_cus: 85,
        ret_cus_change: "1%",
        profit: 255,
        profit_change: "2%",
      },
      {
        product: "Product 10",
        rev: 1050,
        rev_change: "6%",
        new_rev: 840,
        new_rev_change: "8%",
        ret_rev: 210,
        ret_rev_change: "3%",
        unit: 525,
        unit_change: "4%",
        order: 630,
        order_change: "7%",
        cus: 420,
        cus_change: "4%",
        new_cus: 315,
        new_cus_change: "6%",
        ret_cus: 105,
        ret_cus_change: "2%",
        profit: 315,
        profit_change: "4%",
      },
      {
        product: "Product 11",
        rev: 950,
        rev_change: "5%",
        new_rev: 760,
        new_rev_change: "8%",
        ret_rev: 190,
        ret_rev_change: "2%",
        unit: 475,
        unit_change: "3%",
        order: 570,
        order_change: "7%",
        cus: 380,
        cus_change: "4%",
        new_cus: 285,
        new_cus_change: "6%",
        ret_cus: 95,
        ret_cus_change: "1%",
        profit: 285,
        profit_change: "3%",
      },
      {
        product: "Product 12",
        rev: 1350,
        rev_change: "7%",
        new_rev: 1080,
        new_rev_change: "9%",
        ret_rev: 270,
        ret_rev_change: "3%",
        unit: 675,
        unit_change: "5%",
        order: 810,
        order_change: "8%",
        cus: 540,
        cus_change: "5%",
        new_cus: 405,
        new_cus_change: "6%",
        ret_cus: 135,
        ret_cus_change: "2%",
        profit: 405,
        profit_change: "4%",
      },
      {
        product: "Product 13",
        rev: 800,
        rev_change: "4%",
        new_rev: 640,
        new_rev_change: "8%",
        ret_rev: 160,
        ret_rev_change: "2%",
        unit: 400,
        unit_change: "2%",
        order: 480,
        order_change: "4%",
        cus: 320,
        cus_change: "3%",
        new_cus: 240,
        new_cus_change: "5%",
        ret_cus: 80,
        ret_cus_change: "1%",
        profit: 240,
        profit_change: "2%",
      },
      {
        product: "Product 14",
        rev: 1200,
        rev_change: "6%",
        new_rev: 960,
        new_rev_change: "8%",
        ret_rev: 240,
        ret_rev_change: "3%",
        unit: 600,
        unit_change: "4%",
        order: 720,
        order_change: "7%",
        cus: 480,
        cus_change: "5%",
        new_cus: 360,
        new_cus_change: "6%",
        ret_cus: 120,
        ret_cus_change: "2%",
        profit: 360,
        profit_change: "4%",
      },
      {
        product: "Product 15",
        rev: 1000,
        rev_change: "5%",
        new_rev: 800,
        new_rev_change: "8%",
        ret_rev: 200,
        ret_rev_change: "2%",
        unit: 500,
        unit_change: "3%",
        order: 600,
        order_change: "6%",
        cus: 400,
        cus_change: "4%",
        new_cus: 300,
        new_cus_change: "7%",
        ret_cus: 100,
        ret_cus_change: "1%",
        profit: 300,
        profit_change: "3%",
      },
      {
        product: "Product 16",
        rev: 950,
        rev_change: "5%",
        new_rev: 760,
        new_rev_change: "8%",
        ret_rev: 190,
        ret_rev_change: "2%",
        unit: 475,
        unit_change: "3%",
        order: 570,
        order_change: "7%",
        cus: 380,
        cus_change: "4%",
        new_cus: 285,
        new_cus_change: "6%",
        ret_cus: 95,
        ret_cus_change: "1%",
        profit: 285,
        profit_change: "3%",
      },
      {
        product: "Product 17",
        rev: 1100,
        rev_change: "6%",
        new_rev: 880,
        new_rev_change: "8%",
        ret_rev: 220,
        ret_rev_change: "2%",
        unit: 550,
        unit_change: "4%",
        order: 660,
        order_change: "7%",
        cus: 440,
        cus_change: "4%",
        new_cus: 330,
        new_cus_change: "5%",
        ret_cus: 110,
        ret_cus_change: "1%",
        profit: 330,
        profit_change: "3%",
      },
      {
        product: "Product 18",
        rev: 1400,
        rev_change: "7%",
        new_rev: 1120,
        new_rev_change: "9%",
        ret_rev: 280,
        ret_rev_change: "3%",
        unit: 700,
        unit_change: "5%",
        order: 840,
        order_change: "8%",
        cus: 560,
        cus_change: "5%",
        new_cus: 420,
        new_cus_change: "6%",
        ret_cus: 140,
        ret_cus_change: "2%",
        profit: 420,
        profit_change: "4%",
      },
      {
        product: "Product 19",
        rev: 900,
        rev_change: "5%",
        new_rev: 720,
        new_rev_change: "9%",
        ret_rev: 180,
        ret_rev_change: "2%",
        unit: 450,
        unit_change: "3%",
        order: 540,
        order_change: "6%",
        cus: 360,
        cus_change: "4%",
        new_cus: 270,
        new_cus_change: "6%",
        ret_cus: 90,
        ret_cus_change: "1%",
        profit: 270,
        profit_change: "3%",
      },
      {
        product: "Product 20",
        rev: 1300,
        rev_change: "7%",
        new_rev: 1040,
        new_rev_change: "9%",
        ret_rev: 260,
        ret_rev_change: "3%",
        unit: 650,
        unit_change: "5%",
        order: 780,
        order_change: "8%",
        cus: 520,
        cus_change: "5%",
        new_cus: 390,
        new_cus_change: "6%",
        ret_cus: 130,
        ret_cus_change: "2%",
        profit: 390,
        profit_change: "4%",
      },
    ];
    
    var prod_table = prod_table.sort((a, b) => a.rev - b.rev);
  }

  return (

    <>
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Product : Sales</h6>
        </div>
      </Grid>

      <Grid container spacing={3}>
       
        <Grid item xs={12}>
          
          <form onSubmit={dateSubmit} className="date-period" style={{ marginBottom: "-15px" }}>
          
            <DateRangePicker
              
              //placement='rightEnd'
              // label="Timeline"
              
              value={daterange}
              onChange={setdrange}
              oneTap={false}
              
              ranges={[
                {
                  label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)],
                },
                { label: "Today", value: [new Date(), new Date()] },
                {
                  label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)],
                },
                {
                  label: "Last 7 days",value: [subDays(new Date(), 6), new Date()],
                },
                {
                  label: "This month",
                  value: [subDays(new Date(), getDate(new Date()) - 1),new Date()],
                },
                
                {
                  label: "Last month",
                  value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))],
                },

                {
                  label: "Year To date",value: [startOfYear(new Date()), new Date()],
                },

              ]}>

            </DateRangePicker>

            <DateRangePicker
              //placement='rightEnd'
              // label="Timeline"
              value={daterange1}
              onChange={setdrange1}
              oneTap={false}
              ranges={[
                {
                  label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)],
                },
                {
                  label: "Today",value: [new Date(), new Date()],
                },
                {
                  label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)],
                },
                {
                  label: "Last 7 days",value: [subDays(new Date(), 6), new Date()],
                },

                {
                  label: "This month",
                  value: [subDays(new Date(), getDate(new Date()) - 1),new Date()],
                },

                //startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
                {
                  label: "Last month",
                  value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))],
                },
                {
                  label: "Year To date",value: [startOfYear(new Date()), new Date()],
                },
              ]}>

            </DateRangePicker>
            
            <input className="period-btn" variant="contained" color="secondary" style={{ marginLeft: "0" }} type="submit" value="Submit"/>

          </form>

        </Grid>


        <Grid item xs={12}>
          
          <Card className="dash-card">
          
            <ThemeProvider theme={defaultMaterialTheme}>
          
              { prod_table !== null && 

              <div>
                
                <MaterialTable
          
                  sx={{ 
                    [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                    [`& .td`]:{padding:'20px!important'},
                  }}
                  
                  columns={[
                    {
                      title: "Product",
                      field: "product",
                      render: (row) => (
                        <div style={{ fontFamily: "system-ui", textAlign: "right",minWidth:'15vw',"maxWidth":"20vw" }}>
                          <a href={"/Products/" + row.pro_id}> {row.product}</a>
                        </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "Rev",
                      field: "rev",type:"numeric",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.rev} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "rev_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>  {row.rev_change}  </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "NewRev",type:"numeric",
                      field: "new_rev",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>  {row.new_rev}  </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "new_rev_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>  {row.new_rev_change}  </div>
                      ),
                    },
                    {
                      title: "RepRev",type:"numeric",
                      field: "ret_rev",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>  {row.ret_rev}  </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "ret_rev_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>  {row.ret_rev_change} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "Unit",type:"numeric",
                      field: "unit",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.unit} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "unit_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}> {row.unit_change} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "Order",type:"numeric",
                      field: "order",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.order} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "order_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}> {row.order_change} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "Cus",type:"numeric",
                      field: "cus",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.cus} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "cus_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}> {row.cus_change} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "NewCus",type:"numeric",
                      field: "new_cus",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.new_cus}  </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "new_cus_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>  {row.new_cus_change} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "RepCus",type:"numeric",
                      field: "ret_cus",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.ret_cus} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "ret_cus_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}> {row.ret_cus_change}  </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "Profit",type:"numeric",
                      field: "profit",
                      type:"numeric",render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.profit} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                    {
                      title: "(+/-)%",
                      align: "right",
                      field: "profit_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}> {row.profit_change} </div>
                      ),
                      customSort: (a, b) => a.total_order - b.total_order,
                    },
                  ]}
                  data={prod_table}
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

              </div>
              
              }

            </ThemeProvider>
          
          </Card>

        </Grid>

        <Grid item xs={12}>
          
          <Card className="dash-card">
          
            <ThemeProvider theme={defaultMaterialTheme} style={{ borderRadius: "14px" }} >
              
            { cat_table !== null && 

              <div>

                <MaterialTable
                  style={{ borderRadius: "14px" }}
                  columns={[
                    {
                      title: "Catagory",
                      field: "catagory",
                      render: (row) => (
                        <div style={{ fontFamily: "system-ui", fontSize: "16px", textAlign: "center"}}>
                          <button onClick={(event) => handleCatClick(row.cat_id, event)} style={{ background: "none" }}>
                            {row.catagory}
                          </button>
                        </div>
                      )
                    },

                    {
                      title: "Rev",type:"numeric",
                      field: "rev",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.rev} </div>
                      ),
                      customSort: (a, b) => a.rev - b.rev,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "rev_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          {row.rev_change}
                        </div>
                      ),
                      customSort: (a, b) => a.rev_change - b.rev_change,
                    },
                    {
                      title: "NewRev",type:"numeric",
                      field: "new_rev",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>
                          
                          {row.new_rev}
                        </div>
                      ),
                      customSort: (a, b) => a.new_rev - b.new_rev,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "new_rev_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.new_rev_change}
                        </div>
                      ),
                      customSort: (a, b) => a.new_rev_change - b.new_rev_change,
                    },
                    {
                      title: "RetRev",type:"numeric",
                      field: "ret_rev",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>
                          
                          {row.ret_rev}
                        </div>
                      ),
                      customSort: (a, b) => a.ret_rev - b.ret_rev,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "ret_rev_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.ret_rev_change}
                        </div>
                      ),
                      customSort: (a, b) => a.ret_rev_change - b.ret_rev_change,
                    },
                    {
                      title: "Unit",type:"numeric",
                      field: "unit",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.unit} </div>
                      ),
                      customSort: (a, b) => a.unit - b.unit,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "unit_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.unit_change}
                        </div>
                      ),
                      customSort: (a, b) => a.unit_change - b.unit_change,
                    },
                    {
                      title: "Order",type:"numeric",
                      field: "order",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>
                          
                          {row.order}
                        </div>
                      ),
                      customSort: (a, b) => a.order - b.order,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "order_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.order_change}
                        </div>
                      ),
                      customSort: (a, b) => a.order_change - b.order_change,
                    },
                    {
                      title: "Cus",type:"numeric",
                      field: "cus",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}> {row.cus} </div>
                      ),
                      customSort: (a, b) => a.cus - b.cus,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "cus_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.cus_change}
                        </div>
                      ),
                      customSort: (a, b) => a.cus_change - b.cus_change,
                    },
                    {
                      title: "NewCus",type:"numeric",
                      field: "new_cus",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>
                          
                          {row.new_cus}
                        </div>
                      ),
                      customSort: (a, b) => a.new_cus - b.new_cus,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "new_cus_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.new_cus_change}
                        </div>
                      ),
                      customSort: (a, b) => a.new_cus_change - b.new_cus_change,
                    },
                    {
                      title: "RetCus",type:"numeric",
                      field: "ret_cus",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>
                          
                          {row.ret_cus}
                        </div>
                      ),
                      customSort: (a, b) => a.ret_cus - b.ret_cus,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "ret_cus_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.ret_cus_change}
                        </div>
                      ),
                      customSort: (a, b) => a.ret_cus_change - b.ret_cus_change,
                    },
                    {
                      title: "Profit",type:"numeric",
                      field: "profit",
                      render: (row) => (
                        <div style={{ background: "whitesmoke" }}>
                          
                          {row.profit}
                        </div>
                      ),
                      customSort: (a, b) => a.profit - b.profit,
                    },
                    {
                      title: "(+/-)%",align: "right",
                      field: "profit_change",
                      render: (row) => (
                        <div style={{ background: "ghostwhite" }}>
                          
                          {row.profit_change}
                        </div>
                      ),
                      customSort: (a, b) => a.profit_change - b.profit_change,
                    },
                  ]}
                  data={cat_table}
                  title="Sales data :: Catagory"
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
              
              }
            </ThemeProvider>

          </Card>

        </Grid>

      </Grid>

    </>

  );

}

export default ProductSalesTable;
