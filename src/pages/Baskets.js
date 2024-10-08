import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material";
import { format } from "date-fns";
import { addDays, subDays, getDate,startOfMonth,endOfMonth,startOfYear } from "date-fns";
import moment from "moment";

import "rsuite/dist/rsuite.css";
import Button from "@mui/material/Button";

import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import { Modal, Paper, TextField } from '@material-ui/core';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { DateRangePicker } from "rsuite";




//import { makeStyles } from '@material-ui/core/styles';
//import { forwardRef } from 'react';
import Multiselect from "multiselect-react-dropdown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import axios from "axios";
import { get_all_coupons } from "../features/Coupons/Get_coupon_list";
import { get_product_and_catagory_and_sku_data } from "../features/product/ProductListAndSegment";
import { get_basket_anaysis } from "../features/dash/DashTopsSlice";
import { personaldata_ } from "../features/profile/PersonalData";

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


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


function Baskets() {

    var dispatch = useDispatch();
    var defaultMaterialTheme = createTheme();

    var shoptype      = useSelector((state) => state.dashTops.shoptype);
    var accountType   = useSelector((state) => state.dashTops.accountType);
  
    var basket_data = useSelector((state) => state.dashTops);
    var shoptype    = useSelector((state) => state.dashTops.shoptype);


    // var useStyles = makeStyles(theme => ({
    //     table: {
    //       '& tbody>.MuiTableRow-root:hover': {
    //         boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
    //       }
    //     },
    // }));
    // var classes = useStyles();
    
    var[Current_shop,setShop] = useState();

    useEffect(() => {

        // if(accountType === "paid") {

        //     if (!ReactSession.get("get_basket_anaysis")) {
        //         ReactSession.set("get_basket_anaysis", "1");
        //         dispatch( get_basket_anaysis({ajax_call: 2}));
        //     }

        //     if (!ReactSession.get("get_all_coupons")) {
        //         ReactSession.set("get_all_coupons", "1");
        //         dispatch(get_all_coupons({ ajax_call: "get_all_coupons_list" }));
        //     }

        //     if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
        //         ReactSession.set("get_product_and_catagory_and_sku_data", "1");
        //         dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
        //     }

        //     if (!ReactSession.get("personaldata_")) {
        //         ReactSession.set("personaldata_", "1");
        //         dispatch(personaldata_({type:1}));
        //     }
            
           
        // }

        if (accountType === "paid") {

            if (!sessionStorage.getItem("get_basket_anaysis")) {
              sessionStorage.setItem("get_basket_anaysis", "1");
              dispatch(get_basket_anaysis({ ajax_call: 2 }));
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

          }

    }, []);
  

    // var [daterange, setdrange] = useState([
    //     new Date(moment().startOf("month")),
    //     new Date(moment().endOf("month")),
    // ]);

    var fbt  = basket_data?.fbt_table ?? [];
    if (fbt.length > 0) {
      var frequently_bought_together_table_data = structuredClone(fbt);
      var frequently_bought_together_table_data = frequently_bought_together_table_data.sort((a, b) => a.bought_together - b.bought_together);
    }
    var associatiol_rule  = basket_data?.associatiol_rule_table ?? [];
    if (associatiol_rule.length > 0) {
      var purchase_recom_table_data = structuredClone(associatiol_rule);
      var purchase_recom_table_data = purchase_recom_table_data.sort((a, b) => a.confidence - b.confidence);
    }


    // var fbt_columns = [
  
    //   { title: "Product-set", 
    //     field: "product_group", render: (row) => <strong style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.product_group} </strong> 
    //   },
      
    //   { title: "Bought", field: "bought_together",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.bought_together)} </strong> ), 
    //     customSort: (a, b) => { return a.bought_together - b.bought_together; },
    //     type: "numeric",
    //   },
    // ];


    var fbt_columns = [
    
        {   title: "Product-set", 
            cellStyle: {
                textAlign: 'right', // Align text to the right for the first column
                borderBottom:"0px"
            },
            headerStyle: {
                textAlign: 'right', // Align right for the first header
            },
            field: "product_group", render: (row) => <strong style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",display:'block',width:'100%'}}> {row.product_group} </strong> 
        },
        
        {   title: "Numbers of times purchased together", field: "bought_together",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.bought_together)} </strong> ), 
            customSort: (a, b) => { return a.bought_together - b.bought_together; },
            cellStyle: {
                textAlign: 'left', // Align text to the right for the first column
                borderBottom:"0px"
            },
            headerStyle: {
                textAlign: 'left', // Align right for the first header
            },
            type: "numeric",
        },

    ];

    var purchase_recom_table_column = [
  
      { title: "if-buy", 
        field: "if_buy", render: (row) => <strong style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.if_buy} </strong> 
      },
      
      { title: "Then-buy", field: "then_buy",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.then_buy)} </strong> )},

      { title: "Likelihood", field: "confidence",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.confidence)} </strong> ), 
        customSort: (a, b) => { return a.confidence - b.confidence; },
        type: "numeric",
      },

      { title: "Share of Total", field: "n_percent_of_all_transaction",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.n_percent_of_all_transaction)} </strong> ), 
        customSort: (a, b) => { return a.n_percent_of_all_transaction - b.n_percent_of_all_transaction; },
        type: "numeric",
      },

    ];

    if(accountType === "demo") {

        var purchase_recom_table_data = [
            {
              if_buy: "Apple iPhone 13",
              then_buy: "Apple AirPods Pro",
              confidence: "80%",
              n_percent_of_all_transaction: "15%"
            },
            {
              if_buy: "Samsung Galaxy S21",
              then_buy: "Samsung Galaxy Watch",
              confidence: "65%",
              n_percent_of_all_transaction: "10%"
            },
            {
              if_buy: "Sony WH-1000XM4",
              then_buy: "Sony Xperia 5 II",
              confidence: "75%",
              n_percent_of_all_transaction: "20%"
            },
            {
              if_buy: "Dell XPS 13",
              then_buy: "Dell Wireless Mouse",
              confidence: "85%",
              n_percent_of_all_transaction: "25%"
            },
            {
              if_buy: "Apple MacBook Pro",
              then_buy: "Apple Magic Mouse",
              confidence: "70%",
              n_percent_of_all_transaction: "12%"
            }
        ];
    

        var frequently_bought_together_table_data = [
            {
              product_group: "Laptop, Headphones, Charger",
              bought_together: 15
            },
            {
              product_group: "Sofa, Rug, Lamp",
              bought_together: 8
            },
            {
              product_group: "Mixer, Blender, Toaster",
              bought_together: 12
            },
            {
              product_group: "Tent, Sleeping Bag, Backpack",
              bought_together: 10
            },
            {
              product_group: "Shampoo, Conditioner, Lotion",
              bought_together: 9
            },
            {
              product_group: "Pens, Notebooks, Folders",
              bought_together: 6
            },
            {
              product_group: "Basketball, Sneakers, Jersey",
              bought_together: 11
            },
            {
              product_group: "Shirt, Pants, Socks",
              bought_together: 14
            },
            {
              product_group: "Fiction Book, Non-Fiction Book, Cookbook",
              bought_together: 7
            },
            {
              product_group: "Doll, Board Game, Stuffed Animal",
              bought_together: 13
            }
        ];

        var demoProductCombinationCustomerTableData = [
            {
              customerEmail: "johndoe@example.com",
              purchaseCount: 15
            },
            {
              customerEmail: "janedoe@example.com",
              purchaseCount: 8
            },
            {
              customerEmail: "bobsmith@example.com",
              purchaseCount: 12
            },
            {
              customerEmail: "sarahjones@example.com",
              purchaseCount: 10
            },
            {
              customerEmail: "mikeanderson@example.com",
              purchaseCount: 9
            },
            {
              customerEmail: "emilywilson@example.com",
              purchaseCount: 6
            },
            {
              customerEmail: "davidbrown@example.com",
              purchaseCount: 11
            },
            {
              customerEmail: "amandagray@example.com",
              purchaseCount: 14
            },
            {
              customerEmail: "johnthompson@example.com",
              purchaseCount: 7
            },
            {
              customerEmail: "jessicapark@example.com",
              purchaseCount: 13
            }
        ]
       
    }
    
    var dateSubmit = (e) => {
        e.preventDefault();
        if(accountType === "paid"){
            dispatch(
                get_basket_anaysis({
                    from: format(daterange[0], "yyyy-MM-dd"),
                    to: format(daterange[1], "yyyy-MM-dd"),
                    ajax_call: 1,
                })
            );
        }
    };


    //....................
    var [product, setProduct]         = useState();
    var [productname, setProductname] = useState();
    var [type, setType]               = useState();
    var [des, setCouponDes]               = useState();
    var [code, setCode]               = useState();
    var [codeRule, setCodeRule]       = useState("");
    var [amount, setAmount]           = useState();
    var [tableEmails, setTableEmails] = useState([]); // New state to store copied emails
    var [tableIds, setTableIds]       = useState([]);


    var[daterange, setDaterange]                   = useState([ moment().startOf('year').toDate(), moment().toDate()]);
    var[open_COMBCUS_Modal,SET_open_COMBCUS_Modal] = useState(false);
    var[modalCustabledata,setModalCusTableData]    = useState();


    var copyEmailsToClipboard = () => {
        // var emails = cusListCloneData.map((row) => row.email).join(',');
        // navigator.clipboard.writeText(emails)
        // .then(() => console.log('Emails copied to clipboard'))
        // .catch((error) => console.error('Unable to copy emails to clipboard', error));
    };


    var [openModal, setOpenModal] = useState(false);
    var [emailSubject, setEmailSubject]   = useState('');
    var [emailText, setEmailText] = useState('');
    var [isSending, setIsSending] = useState(false);

    var CloseModal_ = () => {
        setOpenModal(false);
    }


    var OpenModal_ = () => {

        var emailToarray = modalCustabledata.map((row) => row.customerEmail);
        setTableEmails(emailToarray); 

        var idToarray = modalCustabledata.map((row) => row.customerId);
        setTableIds(idToarray);

        setOpenModal(true);
    }


    // var handleSendEmail = () => {
    //     setIsSending(true);
    //     setTimeout(() => {
    //     setIsSending(false);
    //     setOpenModal(false);
    //     }, 500);
    //     axios.post("https://server.shopex.io/instantEmail/SendCoupon.php",
    //         {code: code, des : des, amount : amount, expiry : expiry, type : type, email:tableEmails, emailText : emailText, productID : product, productName : productname },
    //         {withCredentials : true})
    //     .then(function (response) {
    //     })
    //     .catch(function (error) {
    //     alert('Error :', error);
    //     });

    // };


    var product_obj = useSelector((state) => state.product_List_And_Segments);
    var product_obj_ = product_obj?.all_product_object ?? {};
    var ops = [];
    if (product_obj_ && product_obj_.length > 0) {
        for (var i of product_obj_) {
        var label = i.product_name;
        var value = i.product_id;
        ops.push({ value: value, label: label });
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
        ops1.push({ value: value, label: label });
      }
    }

    var Open_combination_customers_Modal = (rowData) => {
        
        setModalCusTableData([]); 
        
        if(accountType === "paid"){
            axios.post("https://server.shopex.io/dashboard/basket_get_comb_customer.php",
                    {   products : rowData.product_group,
                        from: format(daterange[0], "yyyy-MM-dd"),
                        to: format(daterange[1], "yyyy-MM-dd"),
                    },
                    { withCredentials: true })
            .then(function (response) {
                setModalCusTableData(response.data); 
            })
            .catch(function (error) { //alert('Error getting customer:', error);
            });
        } else if(accountType === "demo"){
            setModalCusTableData(demoProductCombinationCustomerTableData); 
        }

        SET_open_COMBCUS_Modal(true);
    }

    var Close_COMBCUS_Modal_ = () => {
        SET_open_COMBCUS_Modal(false);
    }

    // var basket_data = useSelector((state) => state.dashTops);
    // var fbt = basket_data?.fbt_table ?? [];
    // if (fbt.length > 0) {
    //     var frequently_bought_together_table_data = [...fbt];
    //     frequently_bought_together_table_data = frequently_bought_together_table_data.sort((a, b) => a.bought_together - b.bought_together);
    // }
    

  


    var ModalCusTableColumn = [
        {   title: "Customer", 
            field: "customerEmail", 
            render: (row) => <strong style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",display:'block',width:'100%'}}> {row.customerEmail} </strong> 
        },
        {   title: "Purchase Count", field: "purchaseCount",
            render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.purchaseCount)} </strong> ), 
            customSort: (a, b) => { return a.bought_together - b.bought_together; },
            type: "numeric",
        },
    ];




    var dateSubmit = (e) => {
        e.preventDefault();
        if(accountType === "paid"){
            dispatch(
                get_basket_anaysis({
                    from: format(daterange[0], "yyyy-MM-dd"),
                    to: format(daterange[1], "yyyy-MM-dd"),
                    ajax_call: 1,
                })
            );
        }
    };

    //....................

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
      
    var [clickedIndex, setClickedIndex] = useState(null);
    
    var [startIndex, setStartIndex] = useState(0);
    var samplesPerPage = 2; 
    var totalSamples = emailSamples.length;

    var handleNext = () => {
      if (startIndex + samplesPerPage < emailSamples.length) {
        setStartIndex(startIndex + samplesPerPage);
      }
    };
    var handlePrevious = () => {
      if (startIndex - samplesPerPage >= 0) {
        setStartIndex(startIndex - samplesPerPage);
      }
    };
    
    
    
    var SampleEmail = (index,email) => {
      navigator.clipboard.writeText(email.text)
      .then(() => {
          setClickedIndex(index); 
          setEmailSubject(email.subject);
          setEmailText(email.text)
      })
      .catch((err) => {
          console.error('Unable to use:', err);
      });
    };
    
    
    var [bannerColor, setBannerColor] = useState('#b6e2e2'); // Default color
    var [bannerText, setBannerText] = useState('Hurry! Limited Time Offer'); // Default text
    var [bannerTextColor, setBannerTextColor] = useState('black'); // Default text
    var [bodybackground,setBodybackground] = useState("#f5fffa")
    
    
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

        axios.post("https://server.shopex.io/instantEmail/SendCoupon.php",
            {temp : templates, code: code, des : des, amount : amount, expiry : expiry_, type : type, email:tableEmails, emailText : emailText, productID : product, productName : productname },
            {withCredentials : true})
        .then(function (response) {
        })
        .catch(function (error) {
          alert('Error :', error);
        });

        //--
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
        //--
    
      };
    
    var [coupontype,setCouponType]=useState('new');
    
    var handleEmailChange = (emailIndex) => {
        var selectedEmailData = emailSamples[emailIndex];
        setEmailSubject(selectedEmailData.subject);
        setEmailText(selectedEmailData.text);
    };

    return (

        <>

            <Grid container spacing={3} style={{ padding : "23px" }}>

                <Grid item xs={12}>

                    <DateRangePicker
                        value={daterange} onChange={setDaterange} oneTap={false}
                        ranges={[
                            {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                            {label: "Today",value: [new Date(), new Date()]},
                            {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                            {label: "Last 7 days",value: [subDays(new Date(), 6), new Date()]},
                            {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date()]},
                            {label: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                            {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
                        ]}>
                    </DateRangePicker>

                    <button className="period-btn" variant="contained" color="secondary" onClick={dateSubmit}> Find Report </button>
                
                </Grid>


                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                    <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
                        Frequently bought together
                    </h5>

                    {frequently_bought_together_table_data && (

                        <ThemeProvider theme={defaultMaterialTheme}>

                            <div >

                                <MaterialTable
                                    columns={fbt_columns}
                                    data={frequently_bought_together_table_data}
                                    title={""}
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

                                    actions={[
                                        {
                                            icon: GroupTwoToneIcon,
                                            tooltip: 'Browse Buyers List',
                                            onClick: (event, rowData) => Open_combination_customers_Modal(rowData)
                                        }
                                    ]}

                                    localization={{
                                        pagination: {
                                            labelRowsPerPage: "",
                                            showFirstLastPageButtons: false,
                                        },
                                    }}
                                />

                            </div>
                        
                        </ThemeProvider>
                        
                    )}

                </Grid>


                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
                        Purchase Recommendations 
                    </h5>

                    {purchase_recom_table_data && (
                        <ThemeProvider theme={defaultMaterialTheme}>

                            <div >

                                <MaterialTable
                                    columns={purchase_recom_table_column}
                                    data={purchase_recom_table_data}
                                    title={""}
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
                    )}
                </Grid>



                {/* Modal for showing selected product sets buyers in a table */}
                <Modal open={open_COMBCUS_Modal} onClose={Close_COMBCUS_Modal_}>
                    
                    <Paper style={{ padding: "20px",height: "70vh",maxWidth:'70vw', margin: "15vh 0vh 0vh 40vh" }}>
                    
                        {   
                            modalCustabledata !== undefined && modalCustabledata && modalCustabledata.length > 0 ? (
                        
                            <ThemeProvider theme={defaultMaterialTheme}>
                        
                                <div >

                                    <MaterialTable 

                                        onRowClick={(event, rowData) => { }}
                                        columns={ModalCusTableColumn}
                                        data={modalCustabledata}
                                        title={" Customers of Selected Product-set "}
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
                                                textAlign: "center",
                                                padding:'10px',
                                                paddingLeft:'0px',
                                                paddingRight:'0px',
                                                borderTop:"0px",
                                                borderBottom:"0px",
                                                borderLeft:"1px solid lightgray",
                                                borderRight:"1px solid lightgray",
                                                borderBottom:"none!important",
                                            },
                                            headerStyle: {
                                                fontFamily: "Montserrat",
                                                textAlign: "center",
                                                fontWeight:700,
                                                padding: "7px",
                                                paddingRight: "1px",
                                                backgroundColor: "rgba(76, 110, 245, 0.2)",
                                                color: "rgb(76, 110, 245)",
                                                border: "0px",
                                            },
                                            rowStyle :  { }
                                            
                                        }}

                                        components={{

                                            Toolbar: (props) => (
                                            
                                                <div>
                                            
                                                    <MTableToolbar {...props} />
                                                
                                                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>

                                                        <button onClick={copyEmailsToClipboard}  
                                                            style={{display:'flex',"boxShadow":"rgba(0,0,0,0.35) 0px 5px 15px","background":"none","color":"slateblue","paddingTop":"6px","borderRadius":"5px"}}>
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

                            </ThemeProvider>
                        
                        ) : <>
                                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                                    <LinearProgress color="secondary" />
                                    <LinearProgress color="success" />
                                </Stack>
                            </>
                        }
                
                    </Paper>

                </Modal>


                {/* Modal for sending email with coupon code */}
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

            </Grid>
        
        </>

    )
}

export default Baskets