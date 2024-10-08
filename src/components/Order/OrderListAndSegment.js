import React, { useEffect, useState,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import Grid from "@mui/material/Grid";
import MaterialTable, { MTableToolbar } from '@material-table/core';
//import debounce from "@mui/material";
//import { debounce } from 'lodash';
import debounce from "lodash.debounce";

import CusMail from "./OrderSegFilters/CusMail";
import TransecID from "./OrderSegFilters/TransecID";
import OrderID from "./OrderSegFilters/OrderID";
import OrderFromNC from "./OrderSegFilters/OrderFromNC";
import OrderFromC from "./OrderSegFilters/OrderFromC";
import OrderStatus from "./OrderSegFilters/OrderStatus";
import Amount from "./OrderSegFilters/Amount";
import Billal1 from "./OrderSegFilters/Billal1";
import Billal2 from "./OrderSegFilters/Billal2";
import BillCity from "./OrderSegFilters/BillCity";
import BillCountry from "./OrderSegFilters/BillCountry";
import NthOrder from "./OrderSegFilters/NthOrder";
import OrderDiscount from "./OrderSegFilters/OrderDiscount";
import OrderSrc from "./OrderSegFilters/OrderSrc";
import Paymeth from "./OrderSegFilters/Paymeth";
import Products from "./OrderSegFilters/Products";
import ProductCount from "./OrderSegFilters/ProductCount";
import ProductUnit from "./OrderSegFilters/ProductUnit";
import RetAfter from "./OrderSegFilters/RetAfter";
import Shipal1 from "./OrderSegFilters/Shipal1";
import Shipal2 from "./OrderSegFilters/Shipal2";
import ShipCity from "./OrderSegFilters/ShipCity";
import ShipCost from "./OrderSegFilters/ShipCost";
import ShipCountry from "./OrderSegFilters/ShipCountry";
import Shipmeth from "./OrderSegFilters/Shipmeth";
import ShipPostCode from "./OrderSegFilters/ShipPostCode";
import Tax from "./OrderSegFilters/Tax";
import CouponCode from "./OrderSegFilters/CouponCode";

import { get_order_List } from "../../features/order/OrderListAndSegs";
import { get_order_segs } from "../../features/order/OrderListAndSegs";
import { get_order_filtered_List } from "../../features/order/OrderListAndSegs";
import { get_selseg_List } from "../../features/order/OrderListAndSegs";
import CusSegment from "./OrderSegFilters/CusSegment";
import { Card } from "react-bootstrap";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { DeleteOrderSegment } from "../../features/order/OrderListAndSegs";
import axios from "axios";
import { Modal, Paper, TextField,Button,ThemeProvider, createTheme } from '@mui/material';
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


function OrderList() {

  var dispatch    = useDispatch();
  var accountType = useSelector((state) => state.dashTops.accountType);
  var shoptype    = useSelector((state) => state.dashTops.shoptype);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(accountType==="paid") {
      dispatch(get_order_List({ ajax_call: 2 }));
      dispatch(get_order_segs({ ajax_call: 2 }));
    }
  }, [])

  var defaultMaterialTheme = createTheme();
  //var theme = useMantineTheme();

  var [opened, setOpened]         = useState(false);
  var [filterList, setfilterList] = useState([]);
  var [segname, setSegname]       = useState("Orders from last 6month/s");

  var Order_list_seg = useSelector((state) => state.order_List_And_Segs);

  var olist               = Order_list_seg?.olist ?? [];
  var osegs               = Order_list_seg?.osegs ?? [];
  var default_order_list  = Order_list_seg?.default_order_list ?? [];

  var [OListCloneData, setOListCloneData] = useState(null);
  useEffect(() => {
      if (olist.length > 0) {
        setOListCloneData(structuredClone(olist));
      }
  }, [olist]);


  if (osegs.length > 0) {
    var Seglist = structuredClone(osegs);
  }

  if(accountType === "demo") {

    var OListCloneData = [
      {
        orderid: 1,
        cusmail:"cusmail1@y.com",
        cusname: "John Smith",
        chc: "johnsmith123",
        paymeth: "Credit Card",
        foro: 1,
        ret_after: 5,
        created: "2023-01-15",
        status: "Pending",
        amount: "$100.00",
        scity: "New York",
        total_prod: 3,
        total_unit: 10,
        items: "item :: 1, item2 :: 3, item3 :: 1, item4 :: 3, item5 :: 1, item6 :: 3, item7 :: 1, item8 :: 3, item9 :: 1, item10 :: 3"
      },
      {
        orderid: 2,
        cusmail:"cusmail2@y.com",
        cusname: "Alice Johnson",
        chc: "alicejohnson456",
        paymeth: "PayPal",
        foro: 2,
        ret_after: 3,
        created: "2023-02-20",
        status: "Shipped",
        amount: "$75.50",
        scity: "Los Angeles",
        total_prod: 2,
        total_unit: 8,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 3,
        cusname: "David Wilson",
        cusmail:"cusmail3@y.com",
        chc: "davidwilson789",
        paymeth: "Credit Card",
        foro: 1,
        ret_after: 7,
        created: "2023-03-10",
        status: "Delivered",
        amount: "$120.75",
        scity: "Chicago",
        total_prod: 4,
        total_unit: 12,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3,item99::1"
      },
      {
        orderid: 4,
        cusname: "Emily Davis",
        cusmail:"cusmail4@y.com",
        chc: "emilydavis101",
        paymeth: "PayPal",
        foro: 3,
        ret_after: 4,
        created: "2023-04-05",
        status: "Shipped",
        amount: "$95.25",
        scity: "Houston",
        total_prod: 2,
        total_unit: 6,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 5,
        cusname: "Michael Lee",
        cusmail:"cusmail5@y.com",
        chc: "michaellee202",
        paymeth: "Credit Card",
        foro: 2,
        ret_after: 6,
        created: "2023-05-12",
        status: "Pending",
        amount: "$85.00",
        scity: "Phoenix",
        total_prod: 3,
        total_unit: 9,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 6,
        cusname: "Olivia Martinez",
        cusmail:"cusmail6@y.com",
        chc: "oliviamartinez303",
        paymeth: "PayPal",
        foro: 1,
        ret_after: 5,
        created: "2023-06-08",
        status: "Delivered",
        amount: "$110.50",
        scity: "Philadelphia",
        total_prod: 5,
        total_unit: 15,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 7,
        cusname: "James Anderson",
        cusmail:"cusmail7@y.com",
        chc: "jamesanderson404",
        paymeth: "Credit Card",
        foro: 4,
        ret_after: 3,
        created: "2023-07-20",
        status: "Shipped",
        amount: "$65.75",
        scity: "San Antonio",
        total_prod: 2,
        total_unit: 7,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 8,
        cusname: "Sophia Garcia",
        cusmail:"cusmail8@y.com",
        chc: "sophiagarcia505",
        paymeth: "PayPal",
        foro: 2,
        ret_after: 4,
        created: "2023-08-16",
        status: "Pending",
        amount: "$92.00",
        scity: "San Diego",
        total_prod: 4,
        total_unit: 10,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 9,
        cusname: "William Taylor",
        cusmail:"cusmail9@y.com",
        chc: "williamtaylor606",
        paymeth: "Credit Card",
        foro: 3,
        ret_after: 7,
        created: "2023-09-25",
        status: "Delivered",
        amount: "$130.25",
        scity: "Dallas",
        total_prod: 3,
        total_unit: 8,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 10,
        cusname: "Mia Hernandez",
        cusmail:"cusmail10@y.com",
        chc: "miahernandez707",
        paymeth: "PayPal",
        foro: 1,
        ret_after: 6,
        created: "2023-10-02",
        status: "Shipped",
        amount: "$75.00",
        scity: "San Jose",
        total_prod: 2,
        total_unit: 6,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 11,
        cusname: "Daniel Brown",
        cusmail:"cusmail11@y.com",
        chc: "danielbrown808",
        paymeth: "Credit Card",
        foro: 2,
        ret_after: 5,
        created: "2023-11-11",
        status: "Pending",
        amount: "$88.50",
        scity: "Austin",
        total_prod: 4,
        total_unit: 12,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 12,
        cusname: "Ava Evans",
        cusmail:"cusmail12@y.com",
        chc: "avaevans909",
        paymeth: "PayPal",
        foro: 3,
        ret_after: 4,
        created: "2023-12-20",
        status: "Delivered",
        amount: "$105.75",
        scity: "Jacksonville",
        total_prod: 3,
        total_unit: 9,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 13,
        cusname: "Joseph Rodriguez",
        cusmail:"cusmail13@y.com",
        chc: "josephrodriguez010",
        paymeth: "Credit Card",
        foro: 1,
        ret_after: 3,
        created: "2024-01-05",
        status: "Shipped",
        amount: "$70.25",
        scity: "Indianapolis",
        total_prod: 5,
        total_unit: 15,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 14,
        cusname: "Sofia Martinez",
        cusmail:"cusmail14@y.com",
        chc: "sofiamartinez111",
        paymeth: "PayPal",
        foro: 4,
        ret_after: 6,
        created: "2024-02-08",
        status: "Pending",
        amount: "$95.00",
        scity: "San Francisco",
        total_prod: 2,
        total_unit: 7,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 15,
        cusname: "Benjamin Clark",
        cusmail:"cusmail15@y.com",
        chc: "benjaminclark212",
        paymeth: "Credit Card",
        foro: 2,
        ret_after: 5,
        created: "2024-03-10",
        status: "Delivered",
        amount: "$120.50",
        scity: "Columbus",
        total_prod: 4,
        total_unit: 10,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 16,
        cusname: "Charlotte Davis",
        cusmail:"cusmail16@y.com",
        chc: "charlottedavis313",
        paymeth: "PayPal",
        foro: 3,
        ret_after: 4,
        created: "2024-04-15",
        status: "Shipped",
        amount: "$85.75",
        scity: "Fort Worth",
        total_prod: 3,
        total_unit: 8,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 17,
        cusname: "Ethan Hernandez",
        cusmail:"cusmail17@y.com",
        chc: "ethanhernandez414",
        paymeth: "Credit Card",
        foro: 2,
        ret_after: 7,
        created: "2024-05-20",
        status: "Pending",
        amount: "$110.00",
        scity: "Charlotte",
        total_prod: 2,
        total_unit: 6,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 18,
        cusname: "Ava White",
        cusmail:"cusmail18@y.com",
        chc: "avawhite515",
        paymeth: "PayPal",
        foro: 1,
        ret_after: 6,
        created: "2024-06-25",
        status: "Delivered",
        amount: "$76.25",
        scity: "Seattle",
        total_prod: 5,
        total_unit: 15,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 19, cusname: "James Taylor", cusmail:"cusmail19@y.com", chc: "jamestaylor616",
        paymeth: "Credit Card", foro: 4,  ret_after: 3,  created: "2024-07-30", status: "Shipped",
        amount: "$98.50",  scity: "Denver", total_prod: 2, total_unit: 7,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      },
      {
        orderid: 20, cusname: "Emma Clark", cusmail:"cusmail20@y.com", chc: "emmaclark717",
        paymeth: "PayPal", foro: 2,  ret_after: 4,  created: "2024-08-05",  status: "Pending",
        amount: "$115.00", scity: "Washington, D.C.", total_prod: 4, total_unit: 12,
        items: "item1::1,item2::3,item3::1,item4::3,item5::1,item6::3,item7::1,item8::3,item9::1,item10::3"
      }
    ];

    var OListCloneData = OListCloneData.sort((a, b) => a.foro - b.foro);
  }

  const debounceMethod = useCallback(
    debounce(() => {
      const form = document.getElementById('myForm');
      const fdata = new FormData(form);
      const data = Object.fromEntries(fdata.entries());
      data["ajax_call"] = 1;
      console.log(data);
      setSegname("");
      setOListCloneData(null);
      if (accountType === "paid") {
        dispatch(get_order_filtered_List(data));
      }
    }, 1200),
    []
  );
  

  var [filts, setfils] = useState([
    "Customer-Email",
    "Order-id",
    "Order-Status",
    "Order-from-a-timeline",
    "Order-from-a-daterange",
    "Amount",
    "Tax",
    "Shipping_Cost",
    "Shipping_country",
    //'Shipping_state',
    "Shipping_city",
    "Ship_address_line_1",
    "Ship_address_line_2",
    "Shipping_Method",
    "Shipping_Post_Code",
    "Billing_country",
    //'Billing_state',
    "Billing_city",
    "Bill_address_line_1",
    "Bill_address_line_2",
    //'Billing_post_code',
    "Nth_Order",
    "Customer_Return_After",
    "Products",
    "Product_Count",
    "Product_Unit",
    "Payment_method",
    //'Created_Via',
    "Transection-id",
    "Coupon-Used",
    "Customer_segment",
    "Order_Source",
    "Order_Discount",
  ]);

  var addfilter = (e, arg) => {
    // cus-Filter De-selested from Dropdown
    if (arg === 99) {
      // Get previous state
      var prev_state = JSON.parse(localStorage.getItem("shopex_Order_filts"));

      // Get Removed state
      var removed_filter = prev_state.filter((x) => !e.includes(x));
      var remfil = removed_filter[0];

      var newfils = filterList.filter((item) => item.key !== remfil);
      setfilterList(newfils);

      // Update The latest selected's as previous state in local-Storage
      localStorage.setItem("shopex_Order_filts", JSON.stringify(e));
    }

    // cus-Filter Selected from Dropdown
    if (arg !== 99) {
      localStorage.setItem("shopex_Order_filts", JSON.stringify(e));

      if (arg === "Customer-Email"){
        setfilterList(filterList.concat(<CusMail key={"Customer-Email"} onChange={debounceMethod}/>));
       
      }

      if (arg === "Order-id"){
        setfilterList(filterList.concat(<OrderID key={"Order-id"} onChange={debounceMethod}/>));
       
      }

      if (arg === "Order-from-a-timeline"){
        setfilterList(filterList.concat(<OrderFromNC key={"Order-from-a-timeline"} onChange={debounceMethod}/>));
        
      }

      if (arg === "Order-from-a-daterange")
        setfilterList(filterList.concat(<OrderFromC key={"Order-from-a-daterange"} onChange={debounceMethod}/>));

      if (arg === "Order-Status")
        setfilterList(filterList.concat(<OrderStatus key={"Order-Status"} onChange={debounceMethod}/>));

      if (arg === "Transection-id")
        setfilterList(filterList.concat(<TransecID key={"Transection-id"} onChange={debounceMethod}/>));

      if (arg === "Amount")
        setfilterList(filterList.concat(<Amount key={"Amount"} onChange={debounceMethod}/>));

      if (arg === "Tax") 
        setfilterList(filterList.concat(<Tax key={"Tax"} onChange={debounceMethod}/>));

      if (arg === "Bill_address_line_1")
        setfilterList(filterList.concat(<Billal1 key={"Bill_address_line_1"} onChange={debounceMethod}/>) );

      if (arg === "Bill_address_line_2")
        setfilterList(filterList.concat(<Billal2 key={"Bill_address_line_2"} onChange={debounceMethod}/>));

      if (arg === "Billing_city")
        setfilterList(filterList.concat(<BillCity key={"Billing_city"} onChange={debounceMethod}/>));

      if (arg === "Billing_country")
        setfilterList(filterList.concat(<BillCountry key={"Billing_country"} onChange={debounceMethod}/>));

      if (arg === "Ship_address_line_1")
        setfilterList(filterList.concat(<Shipal1 key={"Ship_address_line_1"} onChange={debounceMethod}/>));

      if (arg === "Ship_address_line_2")
        setfilterList(filterList.concat(<Shipal2 key={"Ship_address_line_2"} onChange={debounceMethod}/>));

      if (arg === "Shipping_city")
        setfilterList(filterList.concat(<ShipCity key={"Shipping_city"} onChange={debounceMethod}/>));

      if (arg === "Shipping_country")
        setfilterList(filterList.concat(<ShipCountry key={"Shipping_country"} onChange={debounceMethod}/>));

      if (arg === "Shipping_Cost")
        setfilterList(filterList.concat(<ShipCost key={"Shipping_Cost"} onChange={debounceMethod}/>));

      if (arg === "Shipping_Method")
        setfilterList(filterList.concat(<Shipmeth key={"Shipping_Method"} onChange={debounceMethod}/>));

      if (arg === "Shipping_Post_Code")
        setfilterList(filterList.concat(<ShipPostCode key={"Shipping_Post_Code"} onChange={debounceMethod}/>) );

      if (arg === "Customer_Return_After")
        setfilterList(filterList.concat(<RetAfter key={"Customer_Return_After"} onChange={debounceMethod}/>));

      if (arg === "Product_Unit")
        setfilterList(filterList.concat(<ProductUnit key={"Product_Unit"} onChange={debounceMethod}/>));

      if (arg === "Products")
        setfilterList(filterList.concat(<Products key={"Products"} onChange={debounceMethod}/>));

      if (arg === "Product_Count")
        setfilterList(filterList.concat(<ProductCount key={"Product_Count"} onChange={debounceMethod}/>));

      if (arg === "Payment_method")
        setfilterList(filterList.concat(<Paymeth key={"Payment_method"} onChange={debounceMethod}/>));

      if (arg === "Order_Source")
        setfilterList(filterList.concat(<OrderSrc key={"Order_Source"} onChange={debounceMethod}/>));

      if (arg === "Order_Discount")
        setfilterList(filterList.concat(<OrderDiscount key={"Order_Discount"} onChange={debounceMethod}/>));

      if (arg === "Nth_Order")
        setfilterList(filterList.concat(<NthOrder key={"Nth_Order"} onChange={debounceMethod}/>));

      if (arg === "Coupon-Used")
        setfilterList(filterList.concat(<CouponCode key={"Coupon-Used"} onChange={debounceMethod} />));

      if (arg === "Customer_segment")
        setfilterList(filterList.concat(<CusSegment key={"Customer_segment"} onChange={debounceMethod}/>));
    }

  };

  var [segname, setSegname] = useState("Orders from Past 1month");


  var handleDeleteClick = (row) => {
    var confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete ) {
      console.log(row.id);
      dispatch(DeleteOrderSegment({id: row.id}));
      
      if(accountType ==="paid"){
        axios.post("https://server.shopex.io/orders/order_segment_delete.php",{id: row.id},{ withCredentials: true })
        .then(function (response) {
          alert('Order segment deleted successfully');
        })
        .catch(function (error) {
          alert('Error deleting segment:', error);
        });
      }
    }
  }


  var filterSubmit = (event) => {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data  = Object.fromEntries(fdata.entries());
    console.log(data);
    data["ajax_call"] = 1;
    setSegname("");
    setOListCloneData(null);
    if(accountType==="paid"){
      dispatch(get_order_filtered_List(data));
    }
  };



  var defaultList = () => {
    if(default_order_list.length > 0)
      setOListCloneData(structuredClone(default_order_list));
  }
  

  return (

      <>

        {/* <Grid container className="top-wrap" style={{marginBottom:"2%"}}>
          <div className="notifications">
            <h6>Orders : List & Segments</h6>
          </div>
        </Grid> */}

        <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
          <div className="notifications">
            <h6>Orders : List & Segments</h6>
          </div>
        </Grid>

        <Grid container spacing={3}>
        
          <Grid item sm={12}>
            
            {/* Order filters Dropdown  */}
            
            <div style={{display:'inline-flex'}}>

              <div style={{width: "25vw"}}>

                {filts && (
                  <Multiselect
                    isObject={false}
                    placeholder=" +Find with filter"
                    onRemove = { 
                      (selectedList, selectedItem) => {
                          if (selectedList.length > 0) {
                            addfilter(selectedList, 99);
                          }else{
                            setfilterList([]);
                            defaultList();
                          }
                      }
                    } 
                    onSelect={(e) => {
                      addfilter(e, e[e.length - 1]);
                    }}
                    options={filts}
                    selectedValues={[]}
                    showCheckbox
                  />
                )}

              </div>

              
              {Seglist && (
                <div position="left" style={{ marginLeft: "1rem" }}>
                  <Button style={{ backgroundColor: "rgb(5, 175, 197)" }} onClick={() => setOpened(true)}> Order Segments </Button>
                </div>
              )}

            </div>

          

            {/* Order filters  */}
            
            <form id="myForm" className="dash-card" onSubmit={filterSubmit}>
            
              {/* <input style={{ display: 'none' }} defaultValue="1" type="number" name="ajax_call" /> */}
            
              {filterList.length > 0 && (
                <div className="input-filters">
                  <strong> Create Segment : </strong>
                  <input type="text" name="order_seg_name" style={{"fontSize":"18px","width": "30vw","height":"30px"}} placeholder="Insert segment name...Ex: Loyal Customer"  />
                </div>
              )}
              
              {filterList}
              
              {filterList.length > 0 &&
                // <input type="submit" value="Submit" />
                <Button type="submit" style={{ backgroundColor: "rgb(5, 175, 197)" }}> Submit </Button>
              }
            
            </form>

          </Grid>

          <Grid item md={12}>
          
            {/* Order Segment List Modal  */}
            
            {Seglist && 
            ( <Modal open={opened} overflow="inside" 
                    // overlayColor={theme.colorScheme === "dark"? theme.colors.dark[9]: theme.colors.gray[2]}  
                    // overlayOpacity={0.55} overlayBlur={3}  
                    // size="70%"
                    // title="Customer segments"
                    onClose={() => setOpened(false)}  
                  >

              {Seglist && (
                
                // <Card className="dash-card">
                
                  <ThemeProvider theme={defaultMaterialTheme}>
                
                    <MaterialTable
                    sx={{ 
                      [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                      [`& .td`]:{padding:'2px!important'},
                    }}
                      columns={[
                        {
                          title: "Segment",field: "name",
                          render: (row) => 
                            <div 
                                onClick = {() => {
                                  setSegname(row.name);
                                  setOListCloneData(null);
                                  dispatch(get_selseg_List({ segid: row.id }));
                                }}>
                              {row.name}
                            </div>
                        },
                        { title: "Filter", field: "filter" },
                        { title: "Created", field: "created" },
                        {
                          title: 'Delete',
                          field: '',
                          render: (row) => (
                            <div style={{cursor:'pointer',background:'ghostwhite'}} onClick={() => handleDeleteClick(row)}>Delete</div>
                          ),
                        },
                      ]}
                      data={Seglist}
                      title=""
                      icons={tableIcons}
                      options={{
                        showFirstLastPageButtons: false,
                        search: true,
                        searchFieldAlignment: "right",
                        selection: true,
                        exportButton: true,
                        exportAllData: true,
                      }}
                    />
              
                  </ThemeProvider>
              
                // </Card>

              )}

            </Modal>)}


            <Card className="dash-card" style={{boxShadow:'none',padding:"0px"}}>

              {OListCloneData == null && (
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
                </Stack>
              )}


              <ThemeProvider theme={defaultMaterialTheme}>
                
                { OListCloneData !== undefined && OListCloneData && OListCloneData.length > 0 && (
                
                // {OListCloneData && (
                  <div style={{boxShadow:'none'}}>

                    <MaterialTable style={{boxShadow:'none'}}

                      sx={{ 
                        [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                        [`& .td`]:{padding:'2px!important'},
                      }}

                      columns={[

                        {
                          title: "",
                          field: "cusmail",

                          filterComponent: (props) => (
                            <input
                              type="text"
                              placeholder="Search..."
                              onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                              style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                            />
                          ),
                        
                          customFilterAndSearch: (filterValue, rowData) => {
                            var lowerCaseFilter = filterValue.toLowerCase();
                            var { orderid, cusmail } = rowData;
                            return (orderid.toString().includes(lowerCaseFilter) || cusmail.toLowerCase().includes(lowerCaseFilter));
                          },
                          
                          render: (row) => 
                            <div style={{ minWidth:'10vw',maxWidth:'15vw',fontSize:'12px', backgroundColor: "rgba(76, 110, 245, 0.2)",color: "rgb(76, 110, 245)" }}>
                              <strong>id# <a href={"/Orders/" + row.orderid}>{row.orderid}</a></strong>
                              <p><a href={"/Customers/profile/" + row.chc}>{row.cusmail}</a></p>
                              <span>{row.paymeth}</span>
                            </div>
                        },

                        {title: "1st/Nth",field: "foro",filtering: false ,
                        render: (row) => <strong style={{display:'block',padding: "5px"}}> {row.foro} </strong>,
                        customSort: (a, b) => a.foro - b.foro},

                        {title: "RepeatGap(Day)",field: "ret_after",filtering: false ,
                        render: (row) => <strong style={{display:'block',padding: "5px"}}> {row.ret_after} </strong>,
                        customSort: (a, b) => a.ret_after - b.ret_after,},

                        {title: "Date",field: "created",filtering: false ,
                        render: (row) =>  <strong style={{display:'block',padding: "5px"}}> {row.created} </strong>,
                        customSort: (a, b) => a.total_order - b.total_order,},

                        {title: "Status",field: "status",
                        render: (row) => <strong style={{display:'block',padding: "5px"}}> {row.status} </strong>,
                        filterComponent: (props) => (
                          <input
                            type="text"
                            placeholder="Search..."
                            onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                            style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                          />
                        ),
                        customFilterAndSearch: (filterValue, rowData) => {
                          return rowData.status.toLowerCase().includes(filterValue.toLowerCase());
                        },
                        
                        customSort: (a, b) => a.total_order - b.total_order,},

                        {title: "Amount",field: "amount",filtering: false ,
                        render: (row) => <strong style={{display:'block',padding: "5px"}}> {row.amount} </strong>,
                        customSort: (a, b) => a.amount - b.amount,},

                        {title: "Ship.City",field: "scity",
                        render: (row) => <strong style={{display:'block',padding: "5px"}}> {row.scity} </strong>,
                        filterComponent: (props) => (
                          <input
                            type="text"
                            placeholder="Search..."
                            onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                            style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                          />
                        ),
                        customFilterAndSearch: (filterValue, rowData) => {
                          return rowData.scity.toLowerCase().includes(filterValue.toLowerCase());
                        },
                        customSort: (a, b) => a.total_order - b.total_order},

                        {title: "ItemCount",field: "total_prod",filtering: false ,
                        render: (row) => <strong style={{display:'block',padding: "5px"}}> {row.total_prod} </strong>,
                        customSort: (a, b) => a.total_prod - b.total_prod,},

                        {title: "Unit",field: "total_unit",filtering: false ,
                        render: (row) =>  <strong style={{display:'block',padding: "5px"}}> {row.total_unit} </strong>,
                        customSort: (a, b) => a.total_unit - b.total_unit,},

                        {
                          title: "Item",
                          field: "items",
                          render: (row) => (
                            <div style={{ "maxWidth":"10vw",maxHeight: "8vh",fontSize: "11px","overflow": "scroll","padding":"3px", "textAlign": "left"}}>
                              {/* {row.items.split(',').map((item, index) => (
                                <div key={index}>{item.trim()},</div>
                              ))} */}
                              {row.items?.split(',').map((item, index) => (
                                <div key={index}>{item.trim()},</div>
                              ))}
                            </div>
                          ),
                          filterComponent: (props) => (
                            <input
                              type="text"
                              placeholder="Search..."
                              onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                              style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                            />
                          ),
                          customFilterAndSearch: (filterValue, rowData) => {
                            return rowData.items.toLowerCase().includes(filterValue.toLowerCase());
                          },
                        },

                      ]}

                      data={OListCloneData}
                      title={segname}
                      
                      icons={tableIcons}
                      options={{
                        filtering: true ,
                        sortIcon: true,
                        draggable: true, 
                        sorting: true, 
                        showFirstLastPageButtons: false,
                        pageSize: 15, 
                        emptyRowsWhenPaging: false, 
                        pageSizeOptions: [10, 15, 25, 40, 50],
                        search: true,
                        exportButton: true,
                        exportAllData: true,
                        cellStyle: {
                          fontFamily: "Montserrat",
                          textAlign: "right",
                          padding:'7px',
                          borderTop:"0px",
                          borderBottom:"0px",
                          borderLeft:"1px dashed lightgray",
                          borderRight:"1px dashed lightgray",
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

                        rowStyle: (rowData, index) => ({
                          backgroundColor: index % 2 === 1 && rowData.tableData.id % 2 === 0 ? 'ghostwhite' : 'white',
                        }),

                      }}

                      localization={{
                        pagination: {
                          labelRowsPerPage: "",
                          showFirstLastPageButtons: false,
                        },
                      }}

                    />

                  </div> 
                
                )}

              </ThemeProvider>

            </Card>

          </Grid>

        </Grid>

      </>
  );

}

export default OrderList;
