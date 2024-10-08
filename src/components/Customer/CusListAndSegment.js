import React, { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Group, useMantineTheme } from "@mantine/core";
import debounce from "lodash.debounce";
// import { Button, Modal, Paper, TextField } from '@material-ui/core';
//import { debounce } from 'lodash';

import Select from "react-select";

import { Card } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import Grid from "@mui/material/Grid";
//import MaterialTable, { MTableToolbar } from 'material-table';

import MaterialTable, { MTableToolbar } from '@material-table/core';

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { ThemeProvider, createTheme } from "@mui/material";
import "rsuite/dist/rsuite.css";

import Spends from "./CusSegmentFilters/Spends";
import Aov_ from "./CusSegmentFilters/Aov_";
import Order_Count_ from "./CusSegmentFilters/Order_Count_";
import Item_Count_ from "./CusSegmentFilters/Item_Count_";
import Joined_ from "./CusSegmentFilters/Joined_";
import First_Ordered_ from "./CusSegmentFilters/First_Ordered_";
import Last_Ordered_ from "./CusSegmentFilters/Last_Ordered_";
import Dbet_ret_ from "./CusSegmentFilters/Dbet_ret_";
import Order_From_Offer_ from "./CusSegmentFilters/Order_From_Offer_";
import Total_Discount_ from "./CusSegmentFilters/Total_Discount_";
import Avg_Discount_ from "./CusSegmentFilters/Avg_Discount_";
import Total_Profit_ from "./CusSegmentFilters/Total_Profit_";
import Coupon_Use_ from "./CusSegmentFilters/Coupon_Use_";
import Customer_Source_ from "./CusSegmentFilters/Customer_Source_";
import Customer_Tag_ from "./CusSegmentFilters/Customer_Tag_";
import Billing_City_ from "./CusSegmentFilters/Billing_City_";
import Billing_Country_ from "./CusSegmentFilters/Billing_Country_";
import Shipping_City_ from "./CusSegmentFilters/Shipping_City_";
import Shipping_Country_ from "./CusSegmentFilters/Shipping_Country_";
import Shipping_Cost_ from "./CusSegmentFilters/Shipping_Cost_";
import Avg_Shipping_Cost_ from "./CusSegmentFilters/Avg_Shipping_Cost_";

import { get_cusList_data } from "../../features/cus/CusListAndSeg";
import { get_cusfilter_List_data } from "../../features/cus/CusListAndSeg";
import { get_cussegs_List } from "../../features/cus/CusListAndSeg";
import { get_selseg_List } from "../../features/cus/CusListAndSeg";
import { get_all_coupons } from "../../features/Coupons/Get_coupon_list";
import { get_product_and_catagory_and_sku_data } from "../../features/product/ProductListAndSegment";
import { personaldata_ } from "../../features/profile/PersonalData";

import { DeleteCusSegment } from "../../features/cus/CusListAndSeg";
import axios from "axios";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


import './CustomerStyle.css';

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
import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "rsuite";

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

function CusListAndSegment() {
  
  var shoptype      = useSelector((state) => state.dashTops.shoptype);
  var accountType   = useSelector((state) => state.dashTops.accountType);
  var rolePower     = useSelector((state) => state.dashTops.rolePower);
  var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);

  var dispatch               = useDispatch();
  //const theme                = useMantineTheme();
  const defaultMaterialTheme = createTheme();
  
  var [segname, setSegname]  = useState(null);
  var [CustomerTableTitle, setCustomerTableTitle]  = useState("Top 100 Customers : Last 3 Months");
  var [opened, setOpened]    = useState(false);
  var [cusListCloneData, setCusListCloneData] = useState(null);
  var[Current_shop,setShop]  = useState();
  
  var Seg_And_list    = useSelector((state) => state.cusListAndSegs);
  

  useEffect(() => {

    // var dynamic_customer_Reducer = () => {
    //   if (ReactSession.get("dynamic_customer_Reducer")) {
    //     return true;
    //   } else {
    //     ReactSession.set("dynamic_customer_Reducer", "1");
    //     return false;
    //   }
    // }
    // if(!(dynamic_customer_Reducer())) {
    //   injectAsyncReducer('cusTRF', TRFSlice.reducer);
    //   injectAsyncReducer('cusTM', TMSlice.reducer);
    //   injectAsyncReducer('cusLocChartTable', CusLocChartTableSlice.reducer);
    //   injectAsyncReducer('cusGroupBy1stMonth', GBy1stBuyMonthSlice.reducer);
    //   injectAsyncReducer('CusRetAC', RetAllCitySlice.reducer);
    //   injectAsyncReducer('CusRetSC', RetSelCitySlice.reducer);
    //   injectAsyncReducer('cusListAndSegs', CusListAndSegsSlice.reducer);
    //   injectAsyncReducer('CustomerSegmentReport', CustomerSegmentReportSlice.reducer);
    // }
    // get_cussegs_ListFlag
    // get_cusList_dataFlag
    // get_all_couponsFlag
    // get_product_and_catagory_and_sku_dataFlag
    // personaldata_Flag

    // if(accountType==="paid") {

    //   if (!ReactSession.get("get_cussegs_List")) {
    //     ReactSession.set("get_cussegs_List", "1");
    //     dispatch(get_cussegs_List({ ajax_call: 2 }));
    //   }

    //   if (!ReactSession.get("get_cusList_data")) {
    //     ReactSession.set("get_cusList_data", "1");
    //     dispatch(get_cusList_data({ ajax_call: 2 }));
    //   }


    //   if (!ReactSession.get("get_all_coupons")) {
    //     ReactSession.set("get_all_coupons", "1");
    //     dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
    //   }


    //   if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //     ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //     dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //   }


    //   if (!ReactSession.get("profile_personal_data")) {
    //     ReactSession.set("profile_personal_data", "1");
    //     dispatch(personaldata_({type:1}));
    //   }

    //   axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
    //   .then(
    //     (response) => {
    //       setShop(response.data.shopurl);
    //     },
    //     (error) => {}
    //   );

    // }

    if (accountType === "paid") {

      if (!sessionStorage.getItem("get_cussegs_List")) {
        sessionStorage.setItem("get_cussegs_List", "1");
        dispatch(get_cussegs_List({ ajax_call: 2 }));
      }
    
      if (!sessionStorage.getItem("get_cusList_data")) {
        sessionStorage.setItem("get_cusList_data", "1");
        dispatch(get_cusList_data({ ajax_call: 2 }));
      }
    
      if (!sessionStorage.getItem("get_all_coupons")) {
        sessionStorage.setItem("get_all_coupons", "1");
        dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
      }
    
      if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
        sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
        dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
      }
    
      if (!sessionStorage.getItem("profile_personal_data")) {
        sessionStorage.setItem("profile_personal_data", "1");
        dispatch(personaldata_({ type: 1 }));
      }

      axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
      .then(
        (response) => {
          setShop(response.data.shopurl);
        },
        (error) => {}
      );

    }

    if(accountType==="demo") {

      function getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      }
      const sampleData = [];
      for (let i = 1; i <= 100; i++) {
        const customer = {
          name: `Christopher Nolan ${i}`,
          email: `Christopher Nolan@${i}.com`,
          reg: getRandomDate(new Date(2019, 0, 1), new Date(2023, 8, 1)).toLocaleDateString(),
          fod: getRandomDate(new Date(2019, 0, 1), new Date(2023, 8, 1)).toLocaleDateString(),
          lod: getRandomDate(new Date(2019, 0, 1), new Date(2023, 8, 1)).toLocaleDateString(),
          total_order: Math.floor(Math.random() * 100), // Generate random integer for total_order
          adbo: Math.floor(Math.random() * 10),
          total_spent: Math.floor(Math.random() * 1000),
          total_discount: Math.floor(Math.random() * 100), // Generate random integer for total_discount
          aov: Math.floor(Math.random() * 100), // Generate random integer for aov
          profit: Math.floor(Math.random() * 500), // Generate random integer for profit
        };
        sampleData.push(customer);
      }
      setCusListCloneData(structuredClone(sampleData));
    
    }
  
  },[]);


  
  var cSegs   =  Seg_And_list?.segs ?? [];
  var clist   =  Seg_And_list?.list ?? [];
  

 

  var default_list  =  Seg_And_list?.default_list ?? [];
  var defaultList = () => {
    if(accountType === "paid"){
      setCusListCloneData(structuredClone(default_list));
    }else{
      const sampleData = [];
      function getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      }
      for (let i = 1; i <= 100; i++) {
        const customer = {
          name: `Christopher Nolan ${i}`,
          email: `Christopher Nolan@${i}.com`,
          reg: getRandomDate(new Date(2019, 0, 1), new Date(2023, 8, 1)).toLocaleDateString(),
          fod: getRandomDate(new Date(2019, 0, 1), new Date(2023, 8, 1)).toLocaleDateString(),
          lod: getRandomDate(new Date(2019, 0, 1), new Date(2023, 8, 1)).toLocaleDateString(),
          total_order: Math.floor(Math.random() * 100), // Generate random integer for total_order
          adbo: Math.floor(Math.random() * 10),
          total_spent: Math.floor(Math.random() * 1000),
          total_discount: Math.floor(Math.random() * 100), // Generate random integer for total_discount
          aov: Math.floor(Math.random() * 100), // Generate random integer for aov
          profit: Math.floor(Math.random() * 500), // Generate random integer for profit
        };
        sampleData.push(customer);
      }
      setCusListCloneData(structuredClone(sampleData));
    }
  }


  if (cSegs.length > 0) {
    var Seglist = structuredClone(cSegs);
  }

  //- Each time user selects an specific segment from the list 
  //- value of clist changes and each time clist changes cusListCloneData
  //- Updates with value of clist
  useEffect(() => {
      if (clist.length > 0) {
        setCusListCloneData(structuredClone(clist));
      }
  }, [clist]);


  // New sep-18-2023

  var filterSubmit = (event) => {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data = Object.fromEntries(fdata.entries());
    console.log(data);
    if(accountType==="paid"){
      if(segname!==null){
        const exists = Seglist.some(segment => segment.name === segname);
        if (exists) {
          alert('Segment name already exists');
          return;
        }else{
          setSegname(null);
          setCustomerTableTitle("");
          setCusListCloneData(null);
          dispatch(get_cusfilter_List_data(data));
          dispatch(get_cussegs_List({ ajax_call: 2 }));
        }
      }else{
        setSegname(null);
        setCustomerTableTitle("");
        setCusListCloneData(null);
        dispatch(get_cusfilter_List_data(data));
        dispatch(get_cussegs_List({ ajax_call: 2 }));  
      }
    }
  };

  var [segfils, setfils] = useState([
    "Spend",
    "Aov",
    "Order_Count",
    "Item_Count",
    "Joined",
    "First_Ordered",
    "Last_Ordered",
    "Average_Day_Between_order",
    "Order_From_Offer",
    "Total_Discount",
    "Avg_Discount",
    "Total_Profit",
    "Coupon_Use",
    "Customer_Source",
    "Customer_Tag",
    "Billing_City",
    "Billing_Country",
    "Shipping_City",
    "Shipping_Country",
    "Shipping_Cost",
    "Avg_Shipping_Cost",
  ]);

  var [filterList, setfilterList] = useState([]);

  const debounceMethod = useCallback(

    debounce(() => {

      const form  = document.getElementById('myForm');
      const fdata = new FormData(form);
      var data = Object.fromEntries(fdata.entries());
      console.log(data);
      if(accountType==="paid"){
        if(segname!==null){
          const exists = Seglist.some(segment => segment.name === segname);
          if (exists) {
            alert('Segment name already exists');
            return;
          }else{
            setSegname(null);
            setCustomerTableTitle("");
            setCusListCloneData(null);
            dispatch(get_cusfilter_List_data(data));
            dispatch(get_cussegs_List({ ajax_call: 2 }));
          }
        }else{
          setSegname(null);
          setCustomerTableTitle("");
          setCusListCloneData(null);
          dispatch(get_cusfilter_List_data(data));
          dispatch(get_cussegs_List({ ajax_call: 2 }));  
        }
      }
    }, 1200),[]
  );
  

  var addfilter = (e, arg) => {
    // cus-Filter De-selested from Dropdown
    if (arg === 99) {
      // Get previous state
      var prev_state = JSON.parse(localStorage.getItem("filts"));

      // Get Removed state
      var removed_filter = prev_state.filter((x) => !e.includes(x));
      var remfil = removed_filter[0];

      var newfils = filterList.filter((item) => item.key !== remfil);
      setfilterList(newfils);

      // Update The latest selected's as previous state in local-Storage
      localStorage.setItem("filts", JSON.stringify(e));
    }

    // cus-Filter Selected from Dropdown
    if (arg !== 99) {
      localStorage.setItem("filts", JSON.stringify(e));

      if (arg === "Spend")
        setfilterList(filterList.concat(<Spends key={"Spend"}  onChange={debounceMethod}/>));

      if (arg === "Aov") setfilterList(filterList.concat(<Aov_ key={"Aov"}  onChange={debounceMethod}/>));

      if (arg === "Order_Count")
        setfilterList(filterList.concat(<Order_Count_ key={"Order_Count"}  onChange={debounceMethod}/>));

      if (arg === "Item_Count")
        setfilterList(filterList.concat(<Item_Count_ key={"Item_Count"}  onChange={debounceMethod}/>));

      if (arg === "Joined")
        setfilterList(filterList.concat(<Joined_ key={"Joined"}  onChange={debounceMethod}/>));

      if (arg === "First_Ordered")
        setfilterList(filterList.concat(<First_Ordered_ key={"First_Ordered"}  onChange={debounceMethod}/>));

      if (arg === "Last_Ordered")
        setfilterList(filterList.concat(<Last_Ordered_ key={"Last_Ordered"}  onChange={debounceMethod}/>));

      if (arg === "Average_Day_Between_order")
        setfilterList(filterList.concat(<Dbet_ret_ key={"Average_Day_Between_order"}  onChange={debounceMethod}/>));

      if (arg === "Order_From_Offer")
        setfilterList(filterList.concat(<Order_From_Offer_ key={"Order_From_Offer"}  onChange={debounceMethod}/>));
        

      if (arg === "Total_Profit")
        setfilterList(filterList.concat(<Total_Profit_ key={"Total_Profit"}  onChange={debounceMethod}/>));
        

      if (arg === "Total_Discount")
        setfilterList(filterList.concat(<Total_Discount_ key={"Total_Discount"}  onChange={debounceMethod}/>));

      if (arg === "Coupon_Use")
        setfilterList(filterList.concat(<Coupon_Use_ key={"Coupon_Use"}  onChange={debounceMethod}/>));

      if (arg === "Billing_City")
        setfilterList(filterList.concat(<Billing_City_ key={"Billing_City"}  onChange={debounceMethod}/>));

      if (arg === "Billing_Country")
        setfilterList(filterList.concat(<Billing_Country_ key={"Billing_Country"}  onChange={debounceMethod}/>));

      if (arg === "Shipping_City")
        setfilterList(filterList.concat(<Shipping_City_ key={"Shipping_City"}  onChange={debounceMethod}/>));

      if (arg === "Shipping_Country")
        setfilterList(filterList.concat(<Shipping_Country_ key={"Shipping_Country"}  onChange={debounceMethod}/>));

      if (arg === "Shipping_Cost")
        setfilterList(filterList.concat(<Shipping_Cost_ key={"Shipping_Cost"}  onChange={debounceMethod}/>));

      if (arg === "Customer_Source")
        setfilterList(filterList.concat(<Customer_Source_ key={"Customer_Source"}  onChange={debounceMethod}/>));

      if (arg === "Customer_Tag")
        setfilterList(filterList.concat(<Customer_Tag_ key={"Customer_Tag"}  onChange={debounceMethod}/>));

      if (arg === "Avg_Shipping_Cost")
        setfilterList(filterList.concat(<Avg_Shipping_Cost_ key={"Avg_Shipping_Cost"}  onChange={debounceMethod}/>));

      if (arg === "Avg_Discount")
        setfilterList(filterList.concat(<Avg_Discount_ key={"Avg_Discount"}  onChange={debounceMethod}/>));
    }
  };

  var columns = [

    {
      title: "", 
      cellStyle: {
        textAlign: 'right', // Align text to the right for the first column
        borderBottom:"0px",
      },
      headerStyle: {
          textAlign: 'right', // Align right for the first header
      },
      field: "name",  
      width: "20%",

      filterComponent: (props) => (
        <input
          type="text"
          placeholder="Search with email.."
          onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
          style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
        />
      ),

      customFilterAndSearch: (filterValue, rowData) => {
        return rowData.email.toLowerCase().includes(filterValue.toLowerCase());
      },
      
      render: (row) => 
        <span style={{borderBottomLeftRadius: "16px",borderTopLeftRadius: "16px",
                  width: "-webkit-fill-available",
                  backgroundColor: "rgba(76, 110, 245, 0.08)",
                  color: "rgb(76, 110, 245)",
                  textAlign:'left',
                  float: "left"}}>  
          <a style={{verticalAlign : "test-top",textDecoration: "none",padding: "0px"}} href={"/Customers/profile/" + row.chc}> 
            <AccountCircleIcon style={{verticalAlign: "middle",fontSize: "32px",color: "slateblue",border: "1px solid", borderRadius: "50px"}}/>   {row.name}
          </a>
        </span>
    },

    { title: "Joined",type:"date",field: "reg", filtering: false,  },

    { title: "FirstOrder",type:"date",field: "fod", filtering: false, },

    { title: "LastOrder",type:"date",field: "lod",filtering: false, },

    { title: "Order",type:"numeric",field: "total_order", filtering: false,
      customSort: (a, b) => a.total_order - b.total_order
    },
    
    { title: "avg.Gap(Day)",type:"numeric",field: "adbo", filtering: false,
      customSort: (a, b) => a.adbo - b.adbo
    },

    { title: "Spent",type:"numeric",field: "total_spent", filtering: false,
      customSort: (a, b) => a.total_spent - b.total_spent
    },
    
    { title: "Discount",type:"numeric",field: "total_discount", filtering: false,
      customSort: (a, b) => a.total_discount - b.total_discount
    },

    { title: "AOV",type:"numeric",field: "aov", filtering: false,
      customSort: (a, b) => a.aov - b.aov
    },
    
    { title: "Profit",type:"numeric",field: "profit", filtering: false,
      customSort: (a, b) => a.profit - b.profit
    }

  ];

  var handleDeleteClick = (row) => {
    var confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete && accountType === "paid") {
      dispatch(DeleteCusSegment({id: row.id}));
      
      axios.post("https://server.shopex.io/customers/cus_segment_delete.php",{id: row.id},{ withCredentials: true })
      .then(function (response) {
        alert('Order segment deleted successfully');
      })
      .catch(function (error) {
        alert('Error deleting segment:', error);
      });
    }
  }



  /* ...............................................  Instant-email settings and options  */
  /* ...............................................  Instant-email settings and options  */
  /* ...............................................  Instant-email settings and options  */


  var initialDate = new Date(); 
  var [expiry, setExpiry] = useState(initialDate);


  var [product, setProduct]         = useState("");
  var [productname, setProductname] = useState("");
  var [type, setType]               = useState("percent");
  var [des, setCouponDes]           = useState();
  var [code, setCode]               = useState("");
  var [codeRule, setCodeRule]       = useState("");
  var [amount, setAmount]           = useState("");
  var [tableEmails, setTableEmails] = useState([]); // New state to store copied emails
  var [tableIds, setTableIds]       = useState([]);

  var copyEmailsToClipboard = () => {
    var emails = cusListCloneData.map((row) => row.email).join(',');
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
    var emailToarray = cusListCloneData.map((row) => row.email);
    setTableEmails(emailToarray); // Save emails to the new state
    var idToarray = cusListCloneData.map((row) => row.customer_id);
    setTableIds(idToarray); 
    setOpenModal(true);
  }


 
  var product_obj = useSelector((state) => state.product_List_And_Segments);
  var product_obj_ = product_obj?.all_product_object ?? {};
  var ops = [];
  if (product_obj_ && product_obj_.length > 0) {
    for (var i of product_obj_) {
      var label = i.product_name;
      var value = i.product_id;
      if(label && value){ops.push({ value: value, label: label });}
    }
  }

  var coupons = useSelector((state) => state.coupon);
  var All_coupons = coupons?.Allcoupon ?? [];
  if (All_coupons !== undefined) {
    All_coupons = structuredClone(All_coupons);
  } else {
    console.error('COUPON FETCH FAILED');
  }

  var shopifyDiscountCodes_obj = useSelector((state) => state.coupon?.shopifyDiscountCodes ?? {});
  var ops1 = [];
  if (shopifyDiscountCodes_obj && Object.keys(shopifyDiscountCodes_obj).length > 0) {
    for (var i of shopifyDiscountCodes_obj) {
      var label = i.DiscountCode;
      var value = i.DiscountCode+"_NEXT_"+i.PriceRuleId;
      if(label && value){ops1.push({ value: value, label: label });}
    }
  }

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

  var[coupontype,setCouponType]=useState('new');

  const handleEmailChange = (emailIndex) => {
    const selectedEmailData = emailSamples[emailIndex];
    setEmailSubject(selectedEmailData.subject);
    setEmailText(selectedEmailData.text);
  };

  return (
    
    <>
  

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Customer : List & segments</h6>
        </div>
      </Grid>


      <Grid container spacing={3}>
        
        <Grid item xs={12}>
      
          {/* Customer filters Dropdown  */}
         
          {segfils && segfils.length > 0 && (
            <Multiselect
              isObject={false}
              style={{ background: "#fff" }}
              placeholder=" + Find with Filter "
              //onRemove={(e) => { addfilter(e, 99);}}
              onRemove = { 
                (selectedList, selectedItem) => {
                    if (selectedList.length > 0) {
                      addfilter(selectedList, 99);
                    }else{
                      defaultList();
                      setfilterList([]);
                    }
                }
              } 
              onSelect={(e) => {addfilter(e, e[e.length - 1]);}}
              options={segfils}
              selectedValues={[]}
              showCheckbox
            />
          )}
         

          {/* Customer filters  */}
          <form id="myForm" className="dash-card" onSubmit={filterSubmit}>
            
            {filterList.length > 0 && (
              <div className="input-filters">
                <strong> Create Segment : </strong>
                <input type="text" name="segname" size="45" value={segname} 
                  onChange={(e)=>{setSegname(e.target.value); setCustomerTableTitle(e.target.value);}} 
                  placeholder="Insert segment name...Ex: Loyal Customer"  />
              </div>
            )}
            
            {filterList}
            {filterList.length > 0 && (
              <input style={{ marginTop: ".5rem" }} type="submit" value="Submit" />
            )}

          </form>



          {/* Customer List */}
         
            
          <Card style={{marginTop:"10px",background:"none",padding:"0px"}} className="dash-card">

            {cusListCloneData == null && (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
              </Stack>
            )}

            {cusListCloneData !== undefined && cusListCloneData && cusListCloneData.length > 0 && (
            
              <ThemeProvider theme={defaultMaterialTheme}>
                
                <MaterialTable  
                  sx={{ 
                      [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                      [`td`]:{padding:'4px!important'},
                    }}
                    columns={columns}
                    data={cusListCloneData}
                    title={CustomerTableTitle}
                    icons={tableIcons}
                    options={{
                      filtering: true,
                      sortIcon: true,
                      draggable: true, 
                      sorting: true, 
                      selection:true,
                      showFirstLastPageButtons: false,
                      pageSize: 10, 
                      emptyRowsWhenPaging: false, 
                      pageSizeOptions: [10, 15, 25, 40, 50],
                      search: true,
                      cellStyle: {
                        fontFamily: "Montserrat",
                        textAlign: "right",
                        padding:'0px!important',
                        borderTop:"0px",
                        borderBottom:"0px",
                        borderLeft:"1px dashed lightgray",
                        borderRight:"1px dashed lightgray",
                        padding: "8px"
                      },
                      headerStyle: {
                        fontFamily: "Montserrat",
                        textAlign: "right",
                        fontWeight:700,
                        padding: "0px",
                        backgroundColor: "rgba(76, 110, 245, 0.1)",
                        color: "rgb(76, 110, 245)",
                        border: "0px",
                        padding: "0px 8px 0px 0px"
                      },
                      rowStyle: (rowData, index) => ({
                        backgroundColor: index % 2 === 1 && rowData.tableData.id % 2 === 0 ? 'ghostwhite' : 'white',
                      }),
                    }}
                    onSelectionChange={(rows) => {
                      const emails = rows.map(row => row.email).join(', ');
                      navigator.clipboard.writeText(emails)
                        .then(() => console.log('Emails copied to clipboard'))
                        .catch((error) => console.error('Unable to copy emails to clipboard', error));
                    }}

                    components={{

                      Toolbar: (props) => (
                      
                        <div>
                      
                          <MTableToolbar {...props} />
                      
                          <div style={{ padding: '5px', display: 'flex', alignItems: 'center' }}>
  
                            <Button onClick={copyEmailsToClipboard}  style={{display:'flex',"boxShadow":"rgba(0, 0, 0, 0.35) 0px 5px 15px","background":"none","color":"slateblue","paddingTop":"6px","borderRadius":"5px"}}>
                              <div> <CopyAllTwoToneIcon style={{verticalAlign : "text-top"}} /> </div>
                              <strong style={{marginTop: "3px", marginLeft:"5px", borderLeft:"1px solid", paddingLeft:"5px"}}> Copy All Emails </strong>
                            </Button>
                          
                            &nbsp;&nbsp;
  
                            <Button onClick={OpenModal_} 
                              style={{"marginRight":'8px',"display":'flex',"boxShadow":"rgba(0, 0, 0, 0.35) 0px 5px 15px","background":"none","color":"tomato","paddingTop":"6px","borderRadius":"5px"}}>
                              <div><ForwardToInboxTwoToneIcon style={{verticalAlign : "text-top"}} /></div>
                              <strong style={{marginTop: "3px", marginLeft:"5px", borderLeft:"1px solid", paddingLeft:"5px"}}> Send Personalized Offers </strong>
                            </Button>


                            {/* {Seglist && ( */}
                            <Button onClick={()=>setOpened(true)}style={{"display":'flex',"boxShadow":"rgba(0, 0, 0, 0.35) 0px 5px 15px","background":"none","color":"teal","paddingTop":"6px","borderRadius":"5px"}}>
                                <div>
                                  {/* <Groups2Icon style={{verticalAlign:"baseline"}}/> */}
                                </div>
                                <strong style={{marginTop: "3px",marginLeft: "5px", borderLeft: "1px solid", paddingLeft: "5px"}}> Segments </strong>
                            </Button> 
                            {/* )} */}

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
              </ThemeProvider>
            )}

          </Card> 
          

             

         

        </Grid>

      </Grid>



      <Modal open={openModal} onClose={CloseModal_}>
       
        <Paper style={{ padding: "20px",maxWidth: "70vw",height: "90vh",overflowY:'scroll', marginLeft: "18vw",marginTop:"20px",marginBottom:'20px'}}>

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
                   {Array.isArray(All_coupons) && All_coupons.length > 0 ? (
                       All_coupons.map((coupon) => (
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


           <div class="email_styling_and_preview" style={{margin:" 3% 0% 0% 0%"}}>
                   
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

     <Modal open={opened} overflow="inside">
         
        <Paper style={{ padding: "20px",maxWidth: "60vw",height: "fit-content", margin: "5vh auto auto" }}>
       {

           Seglist !== undefined && Seglist && Seglist.length > 0 ? (

           <ThemeProvider theme={defaultMaterialTheme}>
             
             <MaterialTable

               sx={{ 
                 [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                 [`& .td`]:{padding:'2px!important'},
               }}
               columns={[
                 {
                   title: "Segment",field: "name",
                   render: (row) => (
                     <Button onClick={() => { 
                       setSegname(row.name); 
                       setCustomerTableTitle(row.name);
                       setOpened(false);
                       setCusListCloneData(null);
                       dispatch(get_selseg_List({ segid: row.id }));
                     }}> 
                       {row.name} 
                     </Button>
                   )
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
               localization={{
                 pagination: {
                   labelRowsPerPage: "",
                   showFirstLastPageButtons: false,
                 },
               }}
             />

           </ThemeProvider>

           ) : (
             <p> No Segment created </p>
           )

         }
         
        </Paper>

     </Modal>

    </>

  );

}

export default CusListAndSegment;
