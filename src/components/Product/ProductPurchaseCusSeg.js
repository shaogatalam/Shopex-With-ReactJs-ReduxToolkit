import React, { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import Multiselect from "multiselect-react-dropdown";
import Grid from "@mui/material/Grid";

//import MaterialTable, { MTableToolbar } from 'material-table';
import MaterialTable, { MTableToolbar } from '@material-table/core';
//import { createTheme, Modal, Paper, TextField } from '@material-ui/core';
import Button from "@mui/material/Button";

import { ThemeProvider } from "@mui/material";

import BillCity from "../Order/OrderSegFilters/BillCity";
import ShipCity from "../Order/OrderSegFilters/ShipCity";
import ProductFilter from "./ProductFilter";

import { Get_Product_Purchase_Based_Cus_List_Obj } from "../../features/product/ProductPurchaseBasedCusSeg";
import { Get_Product_Category_Purchase_Based_Cus_List_Obj } from "../../features/product/ProductPurchaseBasedCusSeg";

import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../features/product/ProductPurchaseBasedCusSeg";
import { Get_selected_specific_segments_cus_list_obj } from "../../features/product/ProductPurchaseBasedCusSeg";

import Select from "react-select";
import { get_all_coupons } from "../../features/Coupons/Get_coupon_list";
import { get_product_and_catagory_and_sku_data } from "../../features/product/ProductListAndSegment";
import { get_shopify_product_and_sku_and_type } from "../../features/product/ProductListAndSegment";
import { Card } from "react-bootstrap";

import axios from "axios";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "rsuite/dist/rsuite.css";


// import store,{injectAsyncReducer} from "../../app/NewStore";
// import { Product_List_And_Seg_Slice } from "../../features/product/ProductListAndSegment";
// import { Product_and_catagory_sales_Slice } from "../../features/product/ProductSalesTable";
// import { Product_performance_single_and_mutiple_Slice } from "../../features/product/ProductPerformance";
// import { Product_Purchase_Based_Customer_List_and_Segment_Slice } from "../../features/product/ProductPurchaseBasedCusSeg";
// import { Product_specific_city_all_product_Slice } from "../../features/product/ProductSingleCity";
// import { Product_segments_Slice } from "../../features/product/ProductSegments";

import { debounce } from 'lodash';

import {createTheme, Modal, Paper, TextField } from '@mui/material';
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



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "fit-content",
    },
  },
};

function ProductPurchaseCusSeg() {

  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);
  var [product_purchaseBasedSegment, setProduct_purchaseBasedSegment] = useState("");

  // var Select_purchase_Based_cus_segment = (event) => {
  //   setProduct_purchaseBasedSegment(event.target.name);
  //   var {target: { value }, } = event;
  //   dispatch(Get_selected_specific_segments_cus_list_obj({ segid: value }));
  // };

  var[Current_shop,setShop] = useState();
  var defaultMaterialTheme  = createTheme();
  //var theme                 = useMantineTheme();
  var dispatch              = useDispatch();

  
  useEffect(() => {

    if (accountType === "paid") {

      if (!sessionStorage.getItem("get_all_coupons")) {
        sessionStorage.setItem("get_all_coupons", "1");
        dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
      }
    
      if (!sessionStorage.getItem("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
        sessionStorage.setItem("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
        dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
      }
    
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

      axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
      .then(
        (response) => {
          setShop(response.data.shopurl);
        },
        (error) => {}
      );

    }

  }, []);


  //var product_obj = useSelector((state) => state.product_List_And_Segments.all_product_object);
 
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
      if(label && value){
        ops.push({ value: value, label: label });
      }
    }
  }

  var [seletedpros, setSeletedPros] = useState("");
  var [segname, setSegname] = useState("");
  var [billCity_, setbillCity_] = useState(false);
  var [shipCity_, setshipCity_] = useState(false);
  var [BillShip, setBillShip] = useState("");
  var [filterList1, setfilterList1] = useState([]);

  const debounceMethod = useCallback(
    
    debounce(() => {
      
      const form  = document.getElementById('myForm');
      const fdata = new FormData(form);
      const data  = Object.fromEntries(fdata.entries());
      console.log(data);
      //const fdata = new FormData(event.target);
      //const data = Object.fromEntries(fdata.entries());
      setSegname("");
      if(accountType==="paid"){
        if(selectedOption=="specific_product"){
          dispatch(Get_Product_Purchase_Based_Cus_List_Obj(data));
      
        }else if(selectedOption=="products_from_a_category"){
          dispatch(Get_Product_Category_Purchase_Based_Cus_List_Obj(data))
        }
      }
      
    }, 1200),
    []
  );

  var product_selected_deselected = (e, arg) => {
    // cus-Filter De-selested from Dropdown
    if (arg === 99) {
      // Get previous state
      var prev_state = JSON.parse(localStorage.getItem("shopex_Product_cusseg_filts"));

      // Get Removed state
      var removed_filter = prev_state.filter((x) => !e.includes(x));
      var remfil = removed_filter[0];

      var newfils = filterList1.filter((item) => item.key !== remfil);
      setfilterList1(newfils);

      // Update The latest selected's as previous state in local-Storage
      localStorage.setItem("shopex_Product_cusseg_filts", JSON.stringify(e));
    }

    // cus-Filter Selected from Dropdown
    if (arg !== 99) {
      localStorage.setItem("shopex_Product_cusseg_filts", JSON.stringify(e));
      setfilterList1(
        filterList1.concat(<ProductFilter key={arg} productnid={arg} debounce={debounceMethod}/>)
      );
    }
  };

  var [selectedOption, setSelectedOption] = useState('');
  var [selectedCat, setSelectedCat] = useState();

  var handleProductFrom = (ProductFrom) => {
    setSelectedOption(ProductFrom);
    setfilterList1([]);
  };



  var product_category_selected = (value, label) => {
    //alert(value);
    var arg = value+"_SHOPEX_"+label;
    setSelectedCat(arg);
    filterList1.splice(0, filterList1.length);
    setfilterList1(
      filterList1.concat(<ProductFilter key={arg} productnid={arg} debounce={debounceMethod}/>)
    );
  };


  var product_purchase_Submit = (event) => {
    
    event.preventDefault();
    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());
    setSegname("");
    if(accountType==="paid"){
      if(selectedOption=="specific_product"){
        dispatch(Get_Product_Purchase_Based_Cus_List_Obj(data));
    
      }else if(selectedOption=="products_from_a_category"){
        dispatch(Get_Product_Category_Purchase_Based_Cus_List_Obj(data))
      }
    }
   
  };

  
  var [opened, setOpened]  = useState(false);
  var customer_list_object = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment);

  var segs_ = customer_list_object?.Product_Purchase_Based_Cus_Segment_Obj ?? [];
  var segs  = null;
  if (segs_.length > 0) {
    segs = structuredClone(segs_);
  }
  var consumers_ = customer_list_object?.Product_Purchase_Based_Cus_List_Obj ?? [];
  var consumers  = null;
  if (consumers_.length > 0) {
    consumers = structuredClone(consumers_);
  }

   
  if(accountType === "demo") {

    var product_obj_ = [
      { product_name: 'Product A', product_id: 1 },
      { product_name: 'Product B', product_id: 2 },
      { product_name: 'Product C', product_id: 3 },
      { product_name: 'Product D', product_id: 4 },
      { product_name: 'Product E', product_id: 5 },
      { product_name: 'Product F', product_id: 6 },
    ];
    
    if (product_obj_ && product_obj_.length > 0) {
      for (var i of product_obj_) {
        var label = i.product_name;
        var value = i.product_id;
        if(label && value){
          ops.push({ value: value, label: label });
        }
      }
    }
   
    var woo_All_coupons = [
      { ID: 1, CODE: 'COUPON1', AMOUNT: 10, TYPE: 'Percentage', 'TOTAL-USER': 100 },
      { ID: 2, CODE: 'COUPON2', AMOUNT: 20, TYPE: 'Fixed', 'TOTAL-USER': 50 },
      { ID: 3, CODE: 'COUPON3', AMOUNT: 15, TYPE: 'Percentage', 'TOTAL-USER': 75 },
      { ID: 1, CODE: 'COUPON1', AMOUNT: 10, TYPE: 'Percentage', 'TOTAL-USER': 100 },
      { ID: 2, CODE: 'COUPON2', AMOUNT: 20, TYPE: 'Fixed', 'TOTAL-USER': 50 },
    ];

    var dropdown_categories_or_collection = [
      { label: 'category A', value: 1 },
      { label: 'category B', value: 2 },
      { label: 'category C', value: 3 },
      { label: 'category D', value: 4 },
      { label: 'category E', value: 5 },
      { label: 'category F', value: 6 },
    ];

    segs = [
      {
        id: 1,
        name: "Segment 1",
        filter: "Filter for Segment 1",
        created: "2022-02-15",
      },
      {
        id: 2,
        name: "Segment 2",
        filter: "Filter for Segment 2",
        created: "2022-03-20",
      },
      {
        id: 3,
        name: "Segment 3",
        filter: "Filter for Segment 3",
        created: "2022-03-20",
      },
      {
        id: 4,
        name: "Segment 4",
        filter: "Filter for Segment 4",
        created: "2022-03-20",
      },
      {
        id: 5,
        name: "Segment 5",
        filter: "Filter for Segment 5",
        created: "2022-03-20",
      },
     
    ];

  }

  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
  //     }
  //   },
  // }));
  // var classes = useStyles();



   //...............................Instant email setting and options
   
   var [product, setProduct]         = useState("");
   var [productname, setProductname] = useState("");
   var [type, setType]               = useState("percent");
   var [code, setCode]               = useState("");
   var [codeRule, setCodeRule]       = useState("");

   var [des, setCouponDes]           = useState();
   var [amount, setAmount]           = useState("");
   var [tableEmails, setTableEmails] = useState([]); // New state to store copied emails
   var [tableIds, setTableIds]       = useState([]); // New state to store copied emails
 
   var copyEmailsToClipboard = () => {
     var emails = consumers.map((row) => row.email).join(',');
     navigator.clipboard.writeText(emails)
       .then(() => console.log('Emails copied to clipboard'))
       .catch((error) => console.error('Unable to copy emails to clipboard', error));
   };
 
 
   var [openModal, setOpenModal] = useState(false);
   var [emailSubject, setEmailSubject]   = useState('');
   var [emailText, setEmailText] = useState('');
   var [isSending, setIsSending] = useState(false);
 
   var CloseModal_ = () => { setOpenModal(false); }

   var OpenModal_ = () => {
    
     var emailToarray = consumers.map((row) => row.email);
     setTableEmails(emailToarray); // Save emails to the new state

     var idToarray = consumers.map((row) => row.customer_id);
     setTableIds(idToarray); // Save emails to the new state

     setOpenModal(true);
   }
 
 
    // var handleSendEmail = () => {
      
    //   setIsSending(true);
    //   setTimeout(() => {
    //     setIsSending(false);
    //     setOpenModal(false);
    //   }, 500);

    //   axios.post("https://server.shopex.io/instantEmail/SendCoupon.php",
    //       {code: code, des : des, amount : amount, expiry : expiry, type : type, email : tableEmails, emailText : emailText, productID : product, productName : productname },
    //       {withCredentials : true})
    //   .then(function (response) {
    //   })
    //   .catch(function (error) {
    //     alert('Error :', error);
    //   });

    // };

 
    // var product_obj = useSelector((state) => state.product_List_And_Segments);
    // var product_obj_ = product_obj?.all_product_object ?? {};
    // var ops = [];
    // if (product_obj_ && product_obj_.length > 0) {
    //   for (var i of product_obj_) {
    //     var label = i.product_name;
    //     var value = i.product_id;
    //     ops.push({ value: value, label: label });
    //   }
    // }
 
   var coupons = useSelector((state) => state.coupon);
   var woo_All_coupons = coupons?.Allcoupon ?? [];
   if (woo_All_coupons !== undefined) {
    woo_All_coupons = structuredClone(woo_All_coupons);
   } else {
     console.error('COUPON FETCH FAILED');
   }
 
     
  var shopifyDiscountCodes_obj = useSelector((state) => state.coupon?.shopifyDiscountCodes ?? {});
  var shopify_coupon_code_options = [];
  if (shopifyDiscountCodes_obj && Object.keys(shopifyDiscountCodes_obj).length > 0) {
    for (var i of shopifyDiscountCodes_obj) {
      var label = i.DiscountCode;
      var value = i.DiscountCode+"_NEXT_"+i.PriceRuleId;
      if(label && value){
        shopify_coupon_code_options.push({ value: value, label: label });
      }
    }
  }



  var rolePower = useSelector((state) => state.dashTops.rolePower);
  var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);

  var initialDate = new Date(); 
  var [expiry, setExpiry] = useState(initialDate);


  // Updated emailing //
  var emailSamples = [
  {
  subject:`Your Favorites, Now Discounted !`,  
  text :
  `Dear Customer,
  Enjoy <strong style="color:red">${amount}%</strong> off when you purchase your favorite [CouponProducts] 
  using the coupon-code <strong style="color:green">'${code}'</strong> at checkout!
  Use your coupon now : <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button>
  Thank you for choosing us!`
  },
  {
  subject:`Enjoy Exclusive Savings Today!`, 
  text :
  `Dear Customer,
  Treat yourself with our exclusive offer! Get <strong style="color:red">${amount}%</strong> off on your next purchase using coupon-code <strong style="color:green">'${code}'</strong>. 
  Hurry, this offer expires soon. Visit <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button> and use your coupon-code at checkout.
  Happy Shopping!
  [Your Brand Name]`
  },
  {
  subject:`Your Beauty Treat Awaits!`, 
  text :
  `Dear Customer,
  Pamper yourself with <strong style="color:red">${amount}%</strong> off on select beauty essentials! 
  Use coupon-code <strong style="color:green">'${code}'</strong> to unlock this offer. From skincare to makeup, discover your favorites today.
  Click <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button> to indulge in a beauty spree. Don't miss out, 
  limited time only!
  Regards,
  [Your Beauty Brand]`
  },
  {
  subject:`Your Home Deserves a Refresh!`, 
  text :
  `Dear customer,
  Give your home a makeover, Enjoy <strong style="color:red">${amount}%</strong> off on all home essentials using coupon-code <strong style="color:green">'${code}'</strong> at checkout.
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
  Act fast! Use coupon-code: <strong style="color:green">'${code}'</strong> before ${expiry} to enjoy <strong style="color:red">${amount}%</strong> off. 
  Shop now for unbeatable savings: <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button>
  Don't wait - time's running out!
  Best,
  [Your Brand name]`
  },
  {
  subject:`⏰ Hurry, ${expiry} Approaches! Use Your coupon-code Now. ⏰`, 
  text :
  `Hi,
  Act fast! Your <strong style="color:red">${amount}%</strong> off coupon expires on ${expiry}. 
  Apply coupon-code: <strong style="color:green">'${code}'</strong> at checkout to seize savings.
  Redeem Now: <button style="background: tomato;border: 0.4px dashed black;color: white;cursor: pointer;font-size: 22px;" onclick="window.location.href='${Current_shop}';"> Shop ›› </button>
  Don't miss out - shop before ${expiry} and enjoy exclusive discounts!
  Best,
  [Your Brand name]`
  },
  ];
  
    
  var [bannerColor, setBannerColor]         = useState('#b6e2e2');
  var [bannerText, setBannerText]           = useState('Hurry! Limited Time Offer'); 
  var [bannerTextColor, setBannerTextColor] = useState('black'); 
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

    if(shoptype === "woo" && accountType === "paid"){
      axios.post("https://server.shopex.io/instantEmail/SendCoupon.php",
          {temp : templates, code: code, des : des, amount : amount, expiry : expiry_, type : type, email:tableEmails, emailText : emailText, productID : product, productName : productname },
          {withCredentials : true})
      .then(function (response) {
      })
      .catch(function (error) {
        alert('Error :', error);
      });
    }
    else if(shoptype === "shopify" && accountType === "paid"){
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
  
  var[coupontype,setCouponType] = useState('new');

  var handleEmailChange = (emailIndex) => {
    var selectedEmailData = emailSamples[emailIndex];
    setEmailSubject(selectedEmailData.subject);
    setEmailText(selectedEmailData.text);
  };

 
  console.log(dropdown_categories_or_collection);
  
  return (

    <>

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
        <h6>Product : Customer segment based on product purchase</h6>
        </div>
      </Grid>


      <Grid container spacing={3}>
        
      
        <Grid item xs={12}>
       
          {
            segs && 
            <div position="left">
              <Button style={{marginBottom:"20px",background:"mediumseagreen",color:"white"}} onClick={()=>{setOpened(true)}}> 
                <h6> Purchase-centric segments :- </h6>
              </Button>
            </div>
          }
          
          {/* Modal :: Customers List :: product purchase behavior  */}
          
          <form id="myForm" onSubmit={product_purchase_Submit} style={{display:"grid"}}>
            
            <div style={{display:'inline-flex',background:"mediumseagreen",color:"white",padding:"5px",borderRadius: "5px"}}>
              <h6 style={{padding:"9px 0px 0px 3px",textTransform:"uppercase"}}> Find customer's based on : </h6>
              <RadioGroup style={{ display: "inline-block", color: "#fff" }} onChange={(e) => { handleProductFrom(e.target.value);}}>
                <Radio checked={selectedOption === 'specific_product'} value="specific_product" name="ProductFrom" /> 
                Purchased Specific products
                <Radio checked={selectedOption === 'products_from_a_category'} value="products_from_a_category" name="ProductFrom" /> 
                { shoptype === "woo" && <>Purchased from Specific category</> }
                { shoptype === "shopify" && <>Purchased from Specific collection</> }
              </RadioGroup>
            </div>

            {selectedOption === 'products_from_a_category' &&  dropdown_categories_or_collection && 
              <Select className="multi" 
                  // placeholder={"Specific catagory"}
                  placeholder={shoptype === "woo"  ? "Specific category"  : shoptype === "shopify" ? "Specific collection" : "" }
                  onChange={
                      (e) => {
                        product_category_selected(e.value,e.label);
                      }
                  }
                options={dropdown_categories_or_collection}/>
            }

            {selectedOption === 'specific_product' && ops && (
              <Multiselect
                displayValue="label"
                placeholder="Select-Product"
                onRemove={(e) => {
                  var arr = [];
                  for (var i of e) {
                    var data = i.value + "_SHOPEX_" + i.label;
                    arr.push(data);
                  }
                  setSeletedPros(JSON.stringify(arr));
                  product_selected_deselected(arr, 99);
                }}
                onSelect={(e) => {
                  var arr = [];
                  var data = "";
                  for (var i of e) {
                    data = i.value + "_SHOPEX_" + i.label;
                    arr.push(data);
                  }
                  setSeletedPros(JSON.stringify(arr));
                  product_selected_deselected(arr, data);
                }}
                options={ops}
                selectedValues={[]}
                showCheckbox
              />
            )}

            <div style={{display:'inline-flex',marginTop:"20px",background:"mediumseagreen",color:"white",padding:"5px",borderRadius: "5px"}}>
              <h6 style={{padding:"9px 0px 0px 3px",textTransform:"uppercase"}}> Customer's location : </h6>
                <RadioGroup style={{ display: "inline-block",fontSize: "13px",color: "white  ",fontWeight: "500"}}
                  onChange={(e) => {
                    if (e.target.value == "Billing_City") {
                      setbillCity_(true);
                      setshipCity_(false);
                      setBillShip("Billing_City");
                    } else if (e.target.value == "Shipping_City") {
                      setbillCity_(false);
                      setshipCity_(true);
                      setBillShip("Shipping_City");
                    }
                  }}
                >
                <Radio onClick={(e) => {if(e.target.value === BillShip) setbillCity_(false);}} value="Billing_City"  name="customerslocation"/> Billing City
                <Radio onClick={(e) => {if(e.target.value === BillShip) setshipCity_(false);}} value="Shipping_City" name="customerslocation"/> Shipping City
              </RadioGroup>
            </div>

            {billCity_ && <BillCity />}

            {shipCity_ && <ShipCity />}

            <br/>
            <br/>
            
            <div>
              {filterList1} 
              {filterList1.length > 0 && 
                <>
                  <br/>
                  <br/>
                  <strong style={{color:"red",fontSize:"18px"}}>Insert a name here, if you want to create a segment based on the filters you provided : </strong>
                  <input name="proseg" type="text" placeholder="Example... 'Beverage users' " style={{padding: "15px 25px",marginBottom: "1rem",width: "100%"}}/>
                  <br/>
                  <br/>
                  <input type="submit" value="Find customers" style={{color:'#fff',backgroundColor:'#f50057',height:'40px',width:'120px'}} />
                </>
              }
            </div>

            <input name="billship"      type={"hidden"} value={BillShip} />
            <input name="prods"         type={"hidden"} value={seletedpros} />
            <input name="single_cat"    type={"hidden"} value={selectedCat} />
          
          </form>

          <Card style={{marginTop:"30px",background:"none",padding:"0px"}} className="dash-card">
            
            <ThemeProvider theme={defaultMaterialTheme}>
            
              {consumers && (

                <div id="consumerTable">

                  <MaterialTable
                    sx={{ 
                      [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                      [`td`]:{padding:'12px!important'},
                    }}
                    columns={[
                      { title: "Customer", field: "email" },
                      { title: "Spend", field: "total_spend" ,
                      customSort: (a, b) => a.total_spend - b.total_spend},
                      { title: "Unit", field: "total_unit",
                      customSort: (a, b) => a.total_unit - b.total_unit },
                      { title: "Order", field: "total_order",
                      customSort: (a, b) => a.total_order - b.total_order },
                      { title: "On-Dis-Order", field: "total_ondis",
                      customSort: (a, b) => a.total_ondis - b.total_ondis },
                      { title: "FirstBuy", field: "first_purchase" },
                      { title: "LastBuy", field: "last_purchase" },
                      {
                        title: "AvgDayGapOfPurchase",
                        field: "avgDayGapOfPurchase",
                      },
                    ]}
                    data={consumers}
                    title={product_purchaseBasedSegment}
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
                          <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                            <button onClick={copyEmailsToClipboard}  style={{display:'flex',"boxShadow":"rgba(0, 0, 0, 0.35) 0px 5px 15px","background":"none","color":"slateblue","paddingTop":"6px","borderRadius":"5px"}}>
                              <div><CopyAllTwoToneIcon /></div>
                              <div style={{"margin": "-2px", fontSize:"20px", marginLeft : "5px", borderLeft : "1px solid", paddingLeft : "5px"}}> Copy Emails </div>
                            </button>
                            &nbsp;&nbsp;
                            <button onClick={OpenModal_} style={{display:'flex',"boxShadow":"rgba(0, 0, 0, 0.35) 0px 5px 15px","background":"none","color":"tomato","paddingTop":"6px","borderRadius":"5px"}}>
                              <div><ForwardToInboxTwoToneIcon /></div>
                              <div style={{"margin": "-2px", fontSize:"20px", marginLeft : "5px", borderLeft : "1px solid", paddingLeft : "5px"}}> Email Personalized Coupons to these Customers</div>
                            </button>
                          </div>
                        </div>
                      ),
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


      <Modal open={opened} onClose={() => setOpened(false)} >
        
        <Paper style={{ padding: "20px",maxWidth: "70vw",height: "96vh",overflowY:'scroll', marginLeft: "18vw",marginTop:"20px",marginBottom:'20px'}}>

          <ThemeProvider theme={defaultMaterialTheme}>
          
            {segs && 
              
              <MaterialTable
                
              sx={{ 
                [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                [`& .td`]:{padding:'20px!important'},
              }}
                title="Purchase-centric customer segments"
                
                columns={[
                  {
                    title: "Segment",field: "name",
                    render: (row) =>(<Button onClick={() =>{
                                      setSegname(row.name);
                                      setOpened(false);
                                      dispatch(Get_selected_specific_segments_cus_list_obj({segid: row.id}));}}>
                                      {row.name}
                                    </Button>)
                  },
                  { title: "Filter",field: "filter",render: (row) => (<div style={{ background: "whitesmoke" }}>{row.filter}</div>)},
                  { title: "Created",field: "created",render: (row) => (<div style={{ background: "ghostwhite" }}>{row.created}</div>)},
                ]}

                  data={segs || []}
                  icons={tableIcons}
                  options={{
                    showFirstLastPageButtons: false,
                    pageSize: 10, // make initial page size
                    emptyRowsWhenPaging: false, // To avoid of having empty rows
                    pageSizeOptions: [10, 15, 25, 40, 50],
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
          
        </Paper>
      </Modal>

      <Modal open={openModal} onClose={CloseModal_}>
      
      <Paper style={{ padding: "20px",maxWidth: "70vw",height: "96vh",overflowY:'scroll', marginLeft: "18vw",marginTop:"20px",marginBottom:'20px'}}>

        {shoptype === "woo" && 
          <>
            <h5 style={{"margin":"5px"}}> If you want to include a coupon in the email, you have 2 options:</h5>

            <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" style={{ display: "inline-block",color: "tomato",fontSize: "18px",fontWeight: "bolder",margin: "0% 0% 2% 0%"}} 
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
                          <strong key={coupon.CODE} style={{margin:"5px", fontSize:'16px'}}>
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
            {shopify_coupon_code_options && 
            <div style={{width:"350px",border : "1px solid lightgray", borderRadius: "7px"}}>
              
              <Select className="multi" placeholder={"Select code "}
                onChange={(e) => {setCode(e.label);setCodeRule(e.value);}}
                options={shopify_coupon_code_options}/>

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

    </>

  );
  
}

export default ProductPurchaseCusSeg;


