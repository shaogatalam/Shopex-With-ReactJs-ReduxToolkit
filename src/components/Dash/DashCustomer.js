import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import { get_init_data } from "../../features/dash/dashboard";
import { get_segment_today } from "../../features/dash/DashTopsSlice";

import Select from "react-select";
import "rsuite/dist/rsuite.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Card } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Multiselect from "multiselect-react-dropdown";
//import { Modal, Paper, TextField } from '@material-ui/core';
//import Button from "@mui/material/Button";
import { Button } from "rsuite";

import axios from "axios";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { get_all_coupons } from "../../features/Coupons/Get_coupon_list";
import { get_product_and_catagory_and_sku_data } from "../../features/product/ProductListAndSegment";
import { personaldata_ } from "../../features/profile/PersonalData";



import './SegmentLogStyle.css'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler} from "chart.js";

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



//import { Line } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement,BarElement, Title, Tooltip, Legend,  Filler);


var segments = {"padding": "20px","border": "0.5px dashed olivedrab","background": "white"}


function DashCustomer() {

    var dispatch      = useDispatch();
    var shoptype      = useSelector((state) => state.dashTops.shoptype);
    var accountType   = useSelector((state) => state.dashTops.accountType);
    var rolePower     = useSelector((state) => state.dashTops.rolePower);
    var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);

    var defaultMaterialTheme = createTheme();
    
    var [Current_shop,setShop]    = useState();
    var dash_tm                   = useSelector((state) => state.dashTops.ThisMonth);
    var dash_tops                 = useSelector((state) => state.dashTops);
    var shopifyDiscountCodes_obj  = useSelector((state) => state.coupon?.shopifyDiscountCodes ?? {});

    var[segment_join,setsegment_join] = useState([]);
    var[segment_drop,setsegment_drop] = useState([]);

    var[thisMonthRepCustomerTableData,setthisMonthRepCustomerTableData] = useState();
    var[thisMonthNewCustomerTableData,setthisMonthNewCustomerTableData] = useState();

    var[thisMonthRepCustomerTableNote,setthisMonthRepCustomerTableNote] = useState();
    var[thisMonthNewCustomerTableNote,setthisMonthNewCustomerTableNote] = useState();


    useEffect(() => {

      // if(accountType==="paid") {

      //   if (!ReactSession.get("get_init_data")) {
      //     ReactSession.set("get_init_data", "1");
      //     dispatch(get_init_data({ ajax_call: 2 }));
      //   }
      //   if (!ReactSession.get("get_segment_today")) {
      //     ReactSession.set("get_segment_today", "1");
      //     dispatch(get_segment_today({ ajax_call: 2 }));
      //   }
      //   if (!ReactSession.get("get_all_coupons")) {
      //     ReactSession.set("get_all_coupons", "1");
      //     dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
      //   }
      //   if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
      //     ReactSession.set("get_product_and_catagory_and_sku_data", "1");
      //     dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
      //   }
      //   if (!ReactSession.get("personaldata_")) {
      //     ReactSession.set("personaldata_", "1");
      //     dispatch(personaldata_({type:1}));
      //   }

      //   axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
      //   .then(
      //     (response) => {
      //       setShop(response.data.shopurl);
      //     },
      //     (error) => {}
      //   );

      //   setApiState();

      // }

      if (accountType === "paid") {
        if (!sessionStorage.getItem("get_init_data")) {
          sessionStorage.setItem("get_init_data", "1");
          dispatch(get_init_data({ ajax_call: 2 }));
        }
        if (!sessionStorage.getItem("get_segment_today")) {
          sessionStorage.setItem("get_segment_today", "1");
          dispatch(get_segment_today({ ajax_call: 2 }));
        }
        if (!sessionStorage.getItem("get_all_coupons")) {
          sessionStorage.setItem("get_all_coupons", "1");
          dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
        }
        if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
          sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
          dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
        }
        if (!sessionStorage.getItem("personaldata_")) {
          sessionStorage.setItem("personaldata_", "1");
          dispatch(personaldata_({ type: 1 }));
        }

        axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
        .then(
          (response) => {
            setShop(response.data.shopurl);
          },
          (error) => {}
        );

        setApiState();

      }

      if(accountType==="demo"){

        var segment_join_ = [
          
          {
            customer_chc: "1",
            customer_email: "customer1@example.com",
            segment_name: "Segment A"
          },
          {
            customer_chc: "2",
            customer_email: "customer2@example.com",
            segment_name: "Segment B"
          },
          {
            customer_chc: "3",
            customer_email: "customer3@example.com",
            segment_name: "Segment C"
          },
          {
            customer_chc: "4",
            customer_email: "customer4@example.com",
            segment_name: "Segment D"
          },
          {
            customer_chc: "5",
            customer_email: "customer5@example.com",
            segment_name: "Segment E"
          },
          {
            customer_chc: "6",
            customer_email: "customer6@example.com",
            segment_name: "Segment F"
          },
          {
            customer_chc: "7",
            customer_email: "customer7@example.com",
            segment_name: "Segment G"
          },
          {
            customer_chc: "8",
            customer_email: "customer8@example.com",
            segment_name: "Segment H"
          },
          {
            customer_chc: "9",
            customer_email: "customer9@example.com",
            segment_name: "Segment I"
          },
          {
            customer_chc: "10",
            customer_email: "customer10@example.com",
            segment_name: "Segment J"
          }
        ];
        setsegment_join(segment_join_);
  
        var segment_drop_ = [
          {
            customer_email: "john@example.com",
            segment_name: "VIP Customers",
            tspan: 30,
          },
          {
            customer_email: "susan@example.com",
            segment_name: "New Subscribers",
            tspan: 15,
          },
          {
            customer_email: "mike@example.com",
            segment_name: "Frequent Shoppers",
            tspan: 45,
          },
          {
            customer_email: "lisa@example.com",
            segment_name: "Premium Members",
            tspan: 60,
          },
          {
            customer_email: "david@example.com",
            segment_name: "Inactive Users",
            tspan: 90,
          },
          {
            customer_email: "sarah@example.com",
            segment_name: "Preferred Customers",
            tspan: 75,
          },
          {
            customer_email: "chris@example.com",
            segment_name: "New Subscribers",
            tspan: 20,
          },
          {
            customer_email: "emily@example.com",
            segment_name: "VIP Customers",
            tspan: 35,
          },
          {
            customer_email: "james@example.com",
            segment_name: "Frequent Shoppers",
            tspan: 50,
          },
          {
            customer_email: "amy@example.com",
            segment_name: "Preferred Customers",
            tspan: 70,
          },
        ];
        setsegment_drop(segment_drop_);

        var thisMonthNewCustomerTableData = [
          { "customer": "John Smith","email":"JohnSmith@mail.com", "spend": 1500 },
          { "customer": "Emily Johnson","email":"Emily@mail.com", "spend": 2000 },
          { "customer": "Michael Davis","email":"Michael@mail.com", "spend": 1200 },
          { "customer": "Sophia Wilson","email":"Sophia@mail.com", "spend": 1800 },
          { "customer": "William Taylor","email":"William@mail.com", "spend": 2200 },
          { "customer": "Olivia Miller","email":"Olivia@mail.com", "spend": 1700 },
          { "customer": "Daniel Anderson","email":"Daniel@mail.com", "spend": 1300 },
          { "customer": "Isabella Moore","email":"Isabella@mail.com", "spend": 1900 },
          { "customer": "Liam Jackson","email":"Liam@mail.com", "spend": 2100 },
          { "customer": "Ava White","email":"Ava@mail.com", "spend": 1400 },
          { "customer": "Elijah Harris","email":"Elijah@mail.com", "spend": 1600 },
          { "customer": "Mia Martin","email":"Mia@mail.com", "spend": 2300 },
          { "customer": "Henry Brown","email":"Henry@mail.com", "spend": 1100 },
          { "customer": "Sofia Davis","email":"Sofia@mail.com", "spend": 2500 },
          { "customer": "Jackson Clark","email":"Jackson@mail.com", "spend": 2700 },
          { "customer": "Chloe Lewis","email":"Chloe@mail.com", "spend": 2600 },
          { "customer": "Alexander Young","email":"Alexander@mail.com", "spend": 2000 },
          { "customer": "Amelia Walker","email":"Amelia@mail.com", "spend": 2200 },
          { "customer": "Benjamin Hall","email":"Benjamin@mail.com", "spend": 2400 },
          { "customer": "Ella Turner","email":"Ella@mail.com", "spend": 2100 }
        ];
        setthisMonthNewCustomerTableData(thisMonthNewCustomerTableData);
  
        var thisMonthRepCustomerTableData = [
          { "customer": "John Smith","email":"Ella@mail.com", "spend": 1500, "ret_after": 2, "placed_Nth_order": 3 },
          { "customer": "Emily Johnson","email":"Ella@mail.com", "spend": 2000, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Michael Davis","email":"Ella@mail.com", "spend": 1200, "ret_after": 3, "placed_Nth_order": 5 },
          { "customer": "Sophia Wilson","email":"Ella@mail.com", "spend": 1800, "ret_after": 2, "placed_Nth_order": 4 },
          { "customer": "William Taylor","email":"Ella@mail.com", "spend": 2200, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Olivia Miller","email":"Ella@mail.com", "spend": 1700, "ret_after": 2, "placed_Nth_order": 3 },
          { "customer": "Daniel Anderson","email":"Ella@mail.com", "spend": 1300, "ret_after": 3, "placed_Nth_order": 5 },
          { "customer": "Isabella Moore","email":"Ella@mail.com", "spend": 1900, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Liam Jackson","email":"Ella@mail.com", "spend": 2100, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Ava White","email":"Ella@mail.com", "spend": 1400, "ret_after": 3, "placed_Nth_order": 4 },
          { "customer": "Elijah Harris","email":"Ella@mail.com", "spend": 1600, "ret_after": 2, "placed_Nth_order": 3 },
          { "customer": "Mia Martin","email":"Ella@mail.com", "spend": 2300, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Henry Brown","email":"Ella@mail.com", "spend": 1100, "ret_after": 3, "placed_Nth_order": 4 },
          { "customer": "Sofia Davis","email":"Ella@mail.com", "spend": 2500, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Jackson Clark","email":"Ella@mail.com", "spend": 2700, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Chloe Lewis","email":"Ella@mail.com", "spend": 2600, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Alexander Young","email":"Ella@mail.com", "spend": 2000, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Amelia Walker","email":"Ella@mail.com", "spend": 2200, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Benjamin Hall","email":"Ella@mail.com", "spend": 2400, "ret_after": 1, "placed_Nth_order": 2 },
          { "customer": "Ella Turner","email":"Ella@mail.com", "spend": 2100, "ret_after": 1, "placed_Nth_order": 2 }
        ];
        setthisMonthRepCustomerTableData(thisMonthRepCustomerTableData);
  
        shopifyDiscountCodes_obj = [
          { DiscountCode: 'SAVE10', PriceRuleId: 'PR123' },
          { DiscountCode: 'SAVE20', PriceRuleId: 'PR456' },
          { DiscountCode: 'SAVE30', PriceRuleId: 'PR456' },
          { DiscountCode: 'SAVE40', PriceRuleId: 'PR456' },
          { DiscountCode: 'SAVE50', PriceRuleId: 'PR456' }
        ];
  
      }

    }, []);


    var setApiState = () => {
      

      if (dash_tm && dash_tm.tmnew) {
        setthisMonthNewCustomerTableData(structuredClone(dash_tm.tmnew));
        setthisMonthNewCustomerTableNote(dash_tm.tmnew_note.split('_note_'));
      }
      if (dash_tm && dash_tm.tmret) {
        setthisMonthRepCustomerTableData(structuredClone(dash_tm.tmret));
        setthisMonthRepCustomerTableNote(dash_tm.tmret_note.split('_note_'));
      }
  
      setsegment_join(dash_tops?.segment_join || []);
      setsegment_drop(dash_tops?.segment_drop || []);

    }

  //    __________________________________
  //    Instant-email settings and options  
  //    ----------------------------------
  

  var [product, setProduct]         = useState("");
  var [productname, setProductname] = useState("");
  var [type, setType]               = useState("percent");
  var [des, setCouponDes]           = useState("");
  var [code, setCode]               = useState("");
  var [codeRule, setCodeRule]       = useState("");
  var [amount, setAmount]           = useState("");
  var [tableEmails, setTableEmails] = useState([]); // New state to store copied emails
  var [tableIds, setTableIds]       = useState([]);


  var [openModal, setOpenModal]         = useState(false);
  var [emailSubject, setEmailSubject]   = useState('');
  var [emailText, setEmailText]         = useState('');
  var [isSending, setIsSending]         = useState(false);

  
  var CloseModal_ = () => { setOpenModal(false); }

  var uniqueSegments_drop = Array.from(new Set(segment_drop.map((item) => item.segment_name)));
  var segmentData_drop = {};
  uniqueSegments_drop.forEach((segment) => {
    segmentData_drop[segment] = segment_drop.filter((item) => item.segment_name === segment);
  });
  var [selectedSegment_drop, setSelectedSegment_drop] = useState('');
  var handleSegmentChange_drop = (event) => {
    setSelectedSegment_drop(event.target.value); 
  };


  var uniqueSegments_join = Array.from(new Set(segment_join.map((item) => item.segment_name)));
  var segmentData_join = {};
  uniqueSegments_join.forEach((segment) => {
    segmentData_join[segment] = segment_join.filter((item) => item.segment_name === segment);
  });
  var [selectedSegment_join, setSelectedSegment_join] = useState(''); 
  var handleSegmentChange_join = (event) => {
    setSelectedSegment_join(event.target.value); 
  };



  var OpenModal_join = () => {
    
    if(selectedSegment_join!=""){
      var emailToarray = segmentData_join[selectedSegment_join].map((row) => row.customer_email);
      if(shoptype === "shopify"){
        var IdToarray = segmentData_join[selectedSegment_join].map((row) => row.customer_id);
      }
    }else{
        var emailToarray = segment_join.map((row) => row.customer_email);
        if(shoptype === "shopify"){
          var IdToarray = segment_join.map((row) => row.customer_id);
        }
    }
    setTableIds(IdToarray);
    setTableEmails(emailToarray);
    setOpenModal(true);
  }


  var OpenModal_drop = () => {

    if(selectedSegment_drop!=""){
      var emailToarray = segmentData_drop[selectedSegment_drop].map((row) => row.customer_email);
      if(shoptype === "shopify"){
        var IdToarray = segmentData_drop[selectedSegment_join].map((row) => row.customer_id);
      }
    }else{
      var emailToarray = segment_drop.map((row) => row.customer_email);
      if(shoptype === "shopify"){
        var IdToarray = segment_drop.map((row) => row.customer_id);
      }
    }
    setTableIds(IdToarray);
    setTableEmails(emailToarray);
    setOpenModal(true);
  
  }


  var OpenModal_new_customers = () => {
    var emailToarray = thisMonthNewCustomerTableData.map((row) => row.email);
    setTableEmails(emailToarray);
    setOpenModal(true);

    if(shoptype === "shopify"){
      var IdToarray = thisMonthNewCustomerTableData.map((row) => row.customer_id);
      setTableIds(IdToarray);
    }
  }


  var OpenModal_repeat_customers = () => {
    var emailToarray = thisMonthRepCustomerTableData.map((row) => row.email);
    setTableEmails(emailToarray);
    setOpenModal(true);

    if(shoptype === "shopify"){
      var IdToarray = thisMonthRepCustomerTableData.map((row) => row.customer_id);
      setTableIds(IdToarray);
    }
  }

    var woo_product_obj     = useSelector((state) => state.product_List_And_Segments?.product_table_object) ?? [];
    var shopify_product_obj = useSelector((state) => state.product_List_And_Segments?.shopify_product) ?? [];
    var ops = [];
    var optionBuild = null;
    if(shoptype=="woo"){
      optionBuild = woo_product_obj;
    }else if(shoptype=="shopify"){
      optionBuild = shopify_product_obj;
    }
  
    if (optionBuild && optionBuild.length > 0) {
      for (var i of optionBuild) {
        var label = i.product_name;
        var value = i.product_id;
        if(label && value){ops.push({ value: value, label: label });}
      }
    }


    var coupons = useSelector((state) => state.coupon);
    var woo_All_coupons = coupons?.Allcoupon ?? [];
    if (woo_All_coupons !== undefined) {
      woo_All_coupons = structuredClone(woo_All_coupons);
    } else {
      console.error('COUPON FETCH FAILED');
    }

  
    var ops1 = [];
    if (shopifyDiscountCodes_obj && Object.keys(shopifyDiscountCodes_obj).length > 0) {
      for (var i of shopifyDiscountCodes_obj) {
        var label = i.DiscountCode;
        var value = i.DiscountCode+"_NEXT_"+i.PriceRuleId;
        if(label && value){ops1.push({ value: value, label: label });}
      }
    }
    

    var initialDate         = new Date(); 
    var [expiry, setExpiry] = useState(initialDate);


    var emailSamples = [
    {
    subject:`Your Favorites, Now Discounted !`,  
    text :
    `Dear Customer,
    Enjoy <span style="color:red">${amount}%</span> off when you purchase your favorite [CouponProducts] 
    using the coupon-code <span style="color:green">'${code}'</span> at checkout!
    Use your coupon now : <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button>
    Thank you for choosing us!`
    },
    {
    subject:`Enjoy Exclusive Savings Today!`, 
    text :
    `Dear Customer,
    Treat yourself with our exclusive offer! Get <span style="color:red">${amount}%</span> off on your next purchase using coupon-code <span style="color:green">'${code}'</span>. 
    Hurry, this offer expires soon. Visit <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button> and use your coupon-code at checkout.
    Happy Shopping!
    [Your Brand Name]`
    },
    {
    subject:`Your Beauty Treat Awaits!`, 
    text :
    `Dear Customer,
    Pamper yourself with <span style="color:red">${amount}%</span> off on select beauty essentials! 
    Use coupon-code <span style="color:green">'${code}'</span> to unlock this offer. From skincare to makeup, discover your favorites today.
    Click <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button> to indulge in a beauty spree. Don't miss out, 
    limited time only!
    Regards,
    [Your Beauty Brand]`
    },
    {
    subject:`Your Home Deserves a Refresh!`, 
    text :
    `Dear customer,
    Give your home a makeover, Enjoy <span style="color:red">${amount}%</span> off on all home essentials using coupon-code <span style="color:green">'${code}'</span> at checkout.
    Explore our collection at 
    <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button> 
    and add a touch of style to every corner of your home.
    Happy Styling,
    [Your Brand name]`
    },
    {
    subject:`⏳ Hurry! Your Exclusive Coupon Expires Soon! ⏳`, 
    text :
    `Hi,
    Act fast! Use coupon-code: <span style="color:green">'${code}'</span> before ${expiry} to enjoy <span style="color:red">${amount}%</span> off. 
    Shop now for unbeatable savings: <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button>
    Don't wait - time's running out!
    Best,
    [Your Brand name]`
    },
    {
    subject:`⏰ Hurry, ${expiry} Approaches! Use Your coupon-code Now. ⏰`, 
    text :
    `Hi,
    Act fast! Your <span style="color:red">${amount}%</span> off coupon expires on ${expiry}. 
    Apply coupon-code: <span>'${code}'</span> at checkout to seize savings.
    Redeem Now: <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button>
    Don't miss out - shop before ${expiry} and enjoy exclusive discounts!
    Best,
    [Your Brand name]`
    },
    ];
            
    var [bannerColor, setBannerColor]         = useState('#b6e2e2'); // Default color
    var [bannerText, setBannerText]           = useState('Hurry! Limited Time Offer'); // Default text
    var [bannerTextColor, setBannerTextColor] = useState('black'); // Default text
    var [bodybackground,setBodybackground]    = useState("#f5fffa")


    var templates = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div style="background-color: ${bannerColor}; padding: 20px;">
          <h3 style="color: ${bannerTextColor};">${bannerText}</h3>
        </div>
        <div style="padding: 20px;background: ${bodybackground};">
          <pre style="text-wrap: wrap;font-family:system-ui;font-size:'17px'">${emailText}</pre>
        </div>
      </body>
      </html>
    `;


    var handleSendEmail = () => {
      
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setOpenModal(false);
      }, 500);

      let expiry_ = `${expiry.getFullYear()}-${expiry.getMonth() + 1}-${expiry.getDate()}`;

      if(shoptype === "woo"){
        axios.post("https://server.shopex.io/instantEmail/SendCoupon.php",
            {temp : templates, code: code, des : des, amount : amount, expiry : expiry_, type : type, email:tableEmails, emailText : emailText, productID : product, productName : productname },
            {withCredentials : true})
        .then(function (response) {
        })
        .catch(function (error) {
          alert('Error :', error);
        });
      }else  if(shoptype === "shopify"){
        axios.post("https://server.shopex.io/instantEmail/SendShopifyDiscount.php",
            {temp : templates, code: codeRule, email : tableEmails, id : tableIds, emailText : emailText},
            {withCredentials : true})
        .then(function (response) {
        })
        .catch(function (error) {
          alert('Error :', error);
        });
      }

    };


    var [coupontype,setCouponType] = useState('new');
    const handleEmailChange = (emailIndex) => {
      const selectedEmailData = emailSamples[emailIndex];
      setEmailSubject(selectedEmailData.subject);
      setEmailText(selectedEmailData.text);
    };

    var key=1;
  return (
  
    
    <>

      <Grid container style={{paddingBottom:"0px"}}> 

        <Grid item xl={12} lg={12} md={12}  sm={12} xs={12}>
          
          <h4 style={{"padding":"5px 0px 5px 30px","background":"whitesmoke"}}>  </h4>
          
          <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
            Customers joined and dropped from each segemnt in the last 24 hr 
          </h5>

          <div style={{display:"inline-flex",marginBottom: "2%",marginTop: "2%"}}>  

            <a style={{"backgroundColor":"rgba(76, 110, 245, 0.1)","color":"rgb(76, 110, 245)","padding":"5px 5px","fontWeight": "600","marginRight":"10px"}} 
              href={"/customers/customer-and-segemnt"}> 
              Create Segment using key customer attributes 
              <span style={{fontSize: "18px"}}> → </span> 
            </a> 
            
            <a style={{"backgroundColor":"rgba(76, 110, 245, 0.1)","color":"rgb(76, 110, 245)","padding":"5px 5px","fontWeight": "600","marginRight":"10px"}} 
              href={"/products/customer-segment-based-on-product-purchase"}> 
              Create new segment based on buying patterns
              <span style={{fontSize: "18px"}}> → </span> 
            </a> 

            <a style={{"backgroundColor":"rgba(76, 110, 245, 0.1)","color":"rgb(76, 110, 245)","padding":"5px 5px","fontWeight": "600"}} 
              href={"customers/rfm"}> 
              Create new segment based on RFM analysis
              <span style={{fontSize: "18px"}}> → </span> 
            </a> 

          </div>
                
        </Grid>

      </Grid>

      <Grid container style={{paddingTop:"0px"}}> 

        {/* Customers Join in different segemnt Today */}
        <Grid item xl={6} lg={6} md={6}  sm={12} xs={12} style={segments}>

          <div style={{background: "white", padding: "10px"}}>
            
            <div style={{display:'flex'}}>
              <h6 style={{paddingTop: "7px"}}> Joins : Past 24 hr  </h6> &nbsp;&nbsp;
              <Button onClick={OpenModal_join} 
                style={{display:"flex", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",background: "none",color: "tomato",paddingTop: "6px",borderRadius: "5px",marginLeft: "auto"}}>
                <div><ForwardToInboxTwoToneIcon /></div>
                <strong style={{marginTop: "3px", marginLeft: "5px", borderLeft:"1px solid", paddingLeft: "5px"}}> Reach Out </strong>
              </Button>
            </div>
            <br/>
            <select value={selectedSegment_join} onChange={handleSegmentChange_join}>
              <option value="">All Segments</option>
              {uniqueSegments_join.map((segment) => ( 
                <option key={key++} value={segment}>
                  {segment}
                </option>
              ))}
            </select>

          </div>



          <Grid style={{"minHeight": "50vh", "maxHeight":'60vh', "overflowY":"scroll","padding": "0% 5% 1% 0%"}}>
            
            <div className="timeline-container">
            
              <span style={{"marginTop":"1px","float":"right","color":"tomato","borderBottom":"1px solid","borderBottomRightRadius":"11px","width":"19%"}}>  
                {/* <AccountCircleRoundedIcon style={{verticalAlign: "middle"}}/>  */}
                { selectedSegment_join ? segmentData_join[selectedSegment_join].length  : segment_join.length  } 
              </span>
              <br/>

              <ul style={{ padding : "0px 0px 28px",listStyle : "none"}}>
              
              {selectedSegment_join
              
                ? segmentData_join[selectedSegment_join].map((item) => (
                    
                    <li key={key++} style={{marginTop:"10px"}}>
                      <div>
                          <span> 
                            <a style={{textDecoration: "none",color:"white",fontSize:'15px'}} href={"/Customers/profile/" + item.customer_chc}> 
                              {item.customer_email} 
                            </a>  &nbsp; joined :   <strong> {item.segment_name} </strong> 
                          </span>
                      </div>
                    </li>

                  ))

                : segment_join.map((item) => (

                  <li key={key++} style={{marginTop:"10px"}}>
                    <div>
                        <span> 
                          <a style={{textDecoration: "none",color:"white",fontSize:'15px'}} href={"/Customers/profile/" + item.customer_chc}> 
                            {item.customer_email} 
                          </a>  &nbsp; joined :   <strong> {item.segment_name} </strong> 
                        </span>
                    </div>
                  </li>

                ))}

              </ul>

            </div>

          </Grid>


        </Grid>


        {/* Customers Droppped from segment Today */}
        <Grid item xl={6} lg={6} md={6}  sm={12} xs={12} style={segments}>

          <div style={{background: "white", padding: "10px"}}>
            
            <div style={{display:'flex'}}>
              <h6 style={{paddingTop: "7px"}}> Drop-Offs : Past 24 hr  </h6> &nbsp;&nbsp;
              <Button onClick={OpenModal_drop} 
                style={{display:"flex", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",background: "none",color: "tomato",paddingTop: "6px",borderRadius: "5px",marginLeft: "auto"}}>
                <div><ForwardToInboxTwoToneIcon /></div>
                <strong style={{marginTop: "3px", marginLeft: "5px", borderLeft:"1px solid", paddingLeft: "5px"}}> Reach Out</strong>
              </Button>
            </div>

            <br/>
            <select value={selectedSegment_drop} onChange={handleSegmentChange_drop}>
              <option value="">All Segments</option>
              {uniqueSegments_drop.map((segment) => (
                
                <option key={key++} value={segment}>
                  {segment}
                </option>
                
              ))}
            </select>

          </div>


          <Grid style={{"minHeight": "50vh", "maxHeight":'60vh', "overflowY":"scroll","padding": "0% 5% 1% 0%"}}>
            
            <div className="timeline-container">
            
              <span style={{"marginTop":"1px","float":"right","color":"tomato","borderBottom":"1px solid","borderBottomRightRadius":"11px","width":"19%"}}>  
                {/* <AccountCircleRoundedIcon style={{verticalAlign: "middle"}}/>    */}
                { selectedSegment_drop ? segmentData_drop[selectedSegment_drop].length  : segment_drop.length  } 
              </span> 
              <br/>


              <ul style={{ padding : "0px 0px 28px",listStyle : "none"}}>
              
              {selectedSegment_drop
              
                ? segmentData_drop[selectedSegment_drop].map((item) => (
                    
                    <li key={key++} style={{marginTop:"10px"}}>
                      <div>
                        <span> 
                            <a style={{textDecoration: "none",color:"white",fontSize:'15px'}} href={"/Customers/profile/" + item.customer_chc}> 
                              {item.customer_email} 
                            </a> 
                            &nbsp; dropped from <strong>{item.segment_name}</strong>  after <strong>{item.tspan}</strong> Days 
                          </span>
                      </div>
                    </li>

                  ))

                : segment_drop.map((item) => (

                  <li key={key++} style={{marginTop:"10px"}}>
                    <div>
                      <span> 
                          <a style={{textDecoration: "none",color:"white",fontSize:'15px'}} href={"/Customers/profile/" + item.customer_chc}> 
                            {item.customer_email} 
                          </a> 
                          &nbsp; dropped from <strong>{item.segment_name}</strong>  after <strong>{item.tspan}</strong> Days 
                        </span>
                    </div>
                  </li>

                ))}

              </ul>

            </div>

          </Grid>

        </Grid>

      </Grid>

      <Modal open={openModal} onClose={CloseModal_}>

        <Paper style={{ padding: "20px",maxWidth: "70vw",height: "96vh",overflowY:'scroll', marginLeft: "18vw",marginTop:"20px",marginBottom:'20px'}}>
          
          {shoptype === "woo" && 
            <>
              <h5 style={{"margin":"5px"}}> If you want to include a coupon in the email, you have 2 options:</h5>

              <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" 

                style={{ display: "inline-block",
                    color: "tomato",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    margin: "0% 0% 2% 0%"}} 
                    onChange={(e) => { setCouponType(e.target.value);}}>
                    <Radio style={{verticalAlign:"top"}} checked={coupontype === "new"} value="new"             name="coupontype" /> Create a new coupon &nbsp;&nbsp;&nbsp;
                    <Radio style={{verticalAlign:"top"}} checked={coupontype === "available"} value="available" name="coupontype" /> Use an existing coupon

              </RadioGroup>

              {coupontype === "available" && 

                <div class="available" style={{marginBottom:'3%'}}>
                  
                  <h6 style={{background:"whitesmoke",padding:"5px"}}> Coupon :: Available </h6>
                  
                  <div style={{background:"ghostwhite", padding:"1%"}}>
                  
                    {Array.isArray(woo_All_coupons) && woo_All_coupons.length > 0 ? (
                        woo_All_coupons.map((coupon) => (
                            <strong style={{margin:"5px", fontSize:'16px'}}>
                                {coupon.CODE}
                            </strong>
                        ))
                    ) : (
                        <p>No coupons available.</p>
                    )}

                  </div>

                </div>
              }

              {coupontype === "new" && 

                <div class="create_new" style={{marginBottom:'3%'}}>

                  <h6 style={{background:"whitesmoke",padding:"5px"}}> Coupon :: create for customer in the table </h6>

                  <div class="coupon_config" style={{background:"ghostwhite", padding:"1%"}}>

                    <div style={{display:"flex"}}>
                      
                      <TextField onChange={(e) => setCode(e.target.value)} id="outlined-basic" variant="outlined" label="Coupon code"  
                        type="text" InputLabelProps={{ shrink:true}}/>
                      
                      &nbsp;&nbsp;
                      
                      <TextField onChange={(e) => setAmount(e.target.value)} label="Amount"  type="number" id="outlined-basic" 
                        variant="outlined" InputLabelProps={{ shrink:true}}/>
                      
                      &nbsp;&nbsp;
                      
                      <span style={{display:"flex",border:"1px solid lightgrey",width: "fit-content",padding:"6px",borderRadius:"5px",marginRight:'7px'}}>
                      
                        <label style={{marginTop: "-15px",paddingRight: "6px",paddingLeft: "6px",background: "ghostwhite",fontSize: "12px", color:"slategrey"}}> Discount type </label>
                      
                        <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" 
                          style={{ margin:'2% 0% 0% -22%',display:"inline-block",fontSize:"13px",fontWeight:"bolder"}} 
                          onChange={(e) => { setType(e.target.value);}}>
                          <Radio style={{paddingRight: "0px"}} checked={type === "percent"} value="percent"             name="type" /> percent
                          <Radio style={{paddingRight: "0px"}} checked={type === "fixed_cart"} value="fixed_cart"       name="type" /> fixed cart
                          <Radio style={{paddingRight: "0px"}} checked={type === "fixed_product"} value="fixed_product" name="type" /> fixed product
                        </RadioGroup>
                      
                      </span>

                      <span style={{display:"flex",border:"1px solid lightgrey",width: "fit-content",padding:"6px",borderRadius:"5px"}}>
                          <label style={{marginTop: "-15px",paddingRight: "6px",paddingLeft: "6px",background: "ghostwhite",fontSize: "12px", color:"slategrey"}}> 
                              coupon expiry-date 
                          </label>
                          {/* <DatePicker  selected={expiry} onChange={(date) => setExpiry(date)} /> */}
                          <DatePicker style={{padding:'14px',margin:'2% 0% 0% -22%'}} selected={expiry} onChange={(date) => setExpiry(date)} />
                      </span>

                    </div> 
                    
                    <br/>
                    
                    <span style={{display:"flex"}}>
                      
                      <label style={{paddingTop:"7px",fontSize:"large"}}> Discount's On </label> &nbsp;&nbsp;
                      
                        {ops && ops.length > 0 && (

                          <Multiselect
                            
                            displayValue="label"
                            placeholder="Select-Product"

                            onRemove={(e) => {
                              var aa = [];
                              for (var i of e) {aa.push(i.value);}
                              setProduct(JSON.stringify(aa));
                              var aa = [];
                              for (var i of e) {aa.push(i.label);}
                              setProductname(JSON.stringify(aa));
                            }}

                            onSelect={(e) => {
                              var aa = [];
                              for (var i of e) {aa.push(i.value);}
                              setProduct(JSON.stringify(aa));
                              var aa = [];
                              for (var i of e) {aa.push(i.label);}
                              setProductname(JSON.stringify(aa));
                            }}

                            options={ops}
                            showCheckbox
                          />
                          
                        )}

                    </span>


                    <br/>
                    <TextField minRows={1} label="Coupon description"  multiline variant="outlined"  fullWidth value={des} 
                      onChange={(e) => setCouponDes(e.target.value)}
                      placeholder="Write about the ```purpose or goal of this coupon```or any relevant information"
                    />

                    <input name="productList" type={"hidden"} defaultValue={product} />
                    <input name="productname" type={"hidden"} defaultValue={productname} />

                  </div>

                </div>
              }
            </>
          }

          {shoptype === "shopify" &&  
            <>
              <h5 style={{"margin":"5px"}}> If you want to include a discount code in the email, available options : </h5>
              {ops1 && 
              <div style={{width:"350px",border : "1px solid lightgray", borderRadius: "7px"}}>
                
                <Select className="multi" placeholder={"Select code "}
                  onChange={(e) => {setCode(e.label);setCodeRule(e.value);}}
                  options={ops1}/>

              </div>
             
          }
            </> 
          }

          <br/>
          <br/>
          
          <h6 style={{background:"whitesmoke",padding:"5px"}}> Email :: Configuration and Preview </h6>
          <div class="basic_email" style={{padding:"1%",background : "ghostwhite"}}>
            
            <label> Available emails : </label>
            <select style={{height:"40px"}} onChange={(e) => handleEmailChange(e.target.value)}>
              <option value={null}>Select an Email</option>
              {emailSamples.map((email, index) => (
                <option key={index} value={index}>
                  {email.subject}
                </option>
              ))}
            </select>

            <div class="email_subject" style={{marginBottom:'25px',marginTop:'25px'}}>
              <TextField minRows={1} label="Email subject"  multiline variant="outlined" fullWidth value={emailSubject} 
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>

            <div class="email_body">
              <TextField minRows={4} label="Email body"  multiline variant="outlined" fullWidth value={emailText} 
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Compose your message here, including the coupon code. 
                For example: ```Dear customer, use code ABC123 for an exclusive discount on your next purchase. Happy shopping!```
                Feel free to customize the message to suit your promotion and engage your customers.
              "/>
            </div>


            <div class="email_styling" style={{margin:" 3% 0% 0% 0%"}}>
                    
              <div style={{display:'flex'}}>

                  <div class="email_config" style={{display: "grid"}}>
                      
                      <TextField value={bannerText} style={{width:'400px',marginBottom:'20px'}} id="outlined-basic" 
                          fullWidth onChange={(e) => setBannerText(e.target.value)} variant="outlined" label="Banner text"  
                          type="text" InputLabelProps={{ shrink:true}}/>

                      <TextField value={bannerColor} style={{width:'150px',marginBottom:'20px'}} id="outlined-basic" 
                          fullWidth onChange={(e) => setBannerColor(e.target.value)} variant="outlined" label="Banner background"  
                          type="color" InputLabelProps={{ shrink:true}}/>
                      
                      <TextField value={bannerTextColor} style={{width:'150px',marginBottom:'20px'}} id="outlined-basic" 
                          fullWidth onChange={(e) => setBannerTextColor(e.target.value)} variant="outlined" label="Banner text-color"  
                          type="color" InputLabelProps={{ shrink:true}}/>
                      
                      <TextField value={bodybackground} style={{width:'150px'}} id="outlined-basic" 
                          fullWidth onChange={(e) => setBodybackground(e.target.value)} variant="outlined" label="Body background"  
                          type="color" InputLabelProps={{ shrink:true}}/>
                  </div>
              
                  <div style={{marginLeft:"15px" }}>
                      <div className="email-preview" style={{width:"40vw",border:"1px dashed lightgrey",position:"relative"}}>
                          <div dangerouslySetInnerHTML={{ __html: templates }} />
                      </div>
                  </div>

              </div>

            </div>

          </div>

          <br/>

          <br/>

          {rolePower && (
            <>
              {personal_data[0]?.engage_email ? (
                <> 
                  <Button color="primary" variant="contained" onClick={handleSendEmail} disabled={isSending}  
                    style={{ marginTop: '10px' }} >
                    {isSending ? 'Sending...' : 'Send'}
                  </Button>
                </> 
              ) : (
                <h4 style={{ color: 'red',float:'right', }}>
                  Engage-email needed for email-marketing. Add it <a href='https://app.shopex.io/profile'> here </a>
                </h4>
              )}
            </>
          )}

          <br/>

        </Paper>

      </Modal>

      <Grid container style={{paddingTop:"0px"}}> 

        <Grid item xl={6} lg={6} md={6}  sm={12} xs={12}>
          
          {thisMonthNewCustomerTableData && thisMonthNewCustomerTableData.length > 0 && 
            <> 
              <Card className="dash-card"  style={{boxShadow:'none'}}>
              
                  <ThemeProvider theme={defaultMaterialTheme}>
              
                    <MaterialTable
                    sx={{ 
                      [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                      [`& .td`]:{padding:'2px!important'},
                    }}
                      columns={[
                        { title: "Customer", field: "customer", render: row => <h6 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.customer} </h6> },
                        { title: "Spend",type:"numeric", field: "spend", render: row => <strong style={{background: "whitesmoke",display:'block'}}>  {row.spend} </strong>,
                        customSort: (a, b) => a.total_order - b.total_order, },
                      ]}
                      data={thisMonthNewCustomerTableData}
                      title="This Month New-Customer"
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

                      
                      components={{

                        Toolbar: (props) => (
                        
                          <div>
                        
                            <MTableToolbar {...props} />
                        
                            <div style={{ padding: '5px', display: 'flex', alignItems: 'center' }}>
    
                              <Button onClick={OpenModal_new_customers} 
                                style={{display:"flex", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",background: "none",color: "tomato",paddingTop: "6px",borderRadius: "5px",marginLeft: "auto"}}>
                                <div><ForwardToInboxTwoToneIcon /></div>
                                <strong style={{marginTop: "3px", marginLeft: "5px", borderLeft:"1px solid", paddingLeft: "5px"}}> Reach Out</strong>
                              </Button>

                            </div>
    
    
                          </div>
    
                        ),
    
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

                  <div style={{background: "whitesmoke",padding: "20px", textAlign:"center"}}>
                    <p><strong> Customer : {thisMonthNewCustomerTableNote !== undefined && thisMonthNewCustomerTableNote[0]} </strong></p>
                    <p><strong> Spent : {thisMonthNewCustomerTableNote !== undefined && thisMonthNewCustomerTableNote[1]} </strong></p>
                    <p><strong> Avg. Spent : {thisMonthNewCustomerTableNote !== undefined && thisMonthNewCustomerTableNote[2]} </strong></p>
                  </div>

              </Card>
            </>
          }

        </Grid>

        
        <Grid item xl={6} lg={6} md={6}  sm={12} xs={12}>
        
          {thisMonthRepCustomerTableData && thisMonthRepCustomerTableData.length > 0 && 
            <> 
              <Card className="dash-card">
                
                <ThemeProvider theme={defaultMaterialTheme}>
                  
                  <MaterialTable
                  sx={{ 
                    [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                    [`& .td`]:{padding:'2px!important'},
                  }}
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
                    data={thisMonthRepCustomerTableData}
                    title="This month Repeat Customer"
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

                    
                    components={{

                      Toolbar: (props) => (
                      
                        <div>
                      
                          <MTableToolbar {...props} />
                      
                          <Button onClick={OpenModal_repeat_customers} 
                            style={{display:"flex", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",background: "none",color: "tomato",paddingTop: "6px",borderRadius: "5px",marginLeft: "auto"}}>
                            <div><ForwardToInboxTwoToneIcon /></div>
                            <strong style={{marginTop: "3px", marginLeft: "5px", borderLeft:"1px solid", paddingLeft: "5px"}}> Reach Out</strong>
                          </Button>

                        </div>

                      ),

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

                  <div style={{background: "whitesmoke",padding: "20px", textAlign:"center"}}>
                    <p><strong> Customer : {thisMonthRepCustomerTableNote !== undefined && thisMonthRepCustomerTableNote[0]} </strong></p>
                    <p><strong> Spent : {thisMonthRepCustomerTableNote !== undefined && thisMonthRepCustomerTableNote[1]} </strong></p>
                    <p><strong> Avg. Spent : {thisMonthRepCustomerTableNote !== undefined && thisMonthRepCustomerTableNote[2]} </strong></p>
                  </div>

              </Card>
            </>
          }

        </Grid>
      </Grid>

    </>

  );
}

export default DashCustomer