import React, { useState, useRef,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import PeopleIcon from "@mui/icons-material/People";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CampaignIcon from "@mui/icons-material/Campaign";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AnalyticsIcon from "@mui/icons-material/Analytics";

import { LogOut } from "../features/dash/DashTopsSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


//import { persistor } from "../app/store";

function SideNav() {

  var dispatch    = useDispatch();
  var rolePower   = useSelector((state) => state.dashTops.rolePower);
  var shoptype    = useSelector((state) => state.dashTops.shoptype);

  var navigate    = useNavigate();
  var navigateRef = useRef(navigate);



  var [open1, setOpen1] = useState(false);
  var [open2, setOpen2] = useState(false);
  var [open3, setOpen3] = useState(false);
  var [open4, setOpen4] = useState(false);
  var [open5, setOpen5] = useState(false);
  var [open6, setOpen6] = useState(false);

  var [selectedIndex, setSelectedIndex] = useState(0);

  var handleClick1 = () => { setSelectedIndex(1);  setOpen1(!open1); };
  var handleClick2 = () => { setSelectedIndex(2);  setOpen2(!open2); };
  var handleClick3 = () => { setSelectedIndex(3);  setOpen3(!open3); };
  var handleClick4 = () => { setSelectedIndex(4);  setOpen4(!open4); };
  var handleClick5 = () => { setSelectedIndex(5);  setOpen5(!open5); };
  var handleClick6 = () => { setSelectedIndex(6);  setOpen6(!open6); };

  var handleListItemClick = (event, index) => { setSelectedIndex(index); };

  var Log_Out = (event, index) => {
    
    event.preventDefault();
    
    sessionStorage.removeItem("get_all_orders_from_campaign");
    sessionStorage.removeItem("get_all_orders_group_by_campaign");
    sessionStorage.removeItem("get_cusret_getcity");
    sessionStorage.removeItem("get_cusLocCT_data");
    sessionStorage.removeItem("get_segment_join_drop_chart_object");
    sessionStorage.removeItem("get_product_and_catagory_sales_object");
    sessionStorage.removeItem("get_OrderLocCT_data");
    sessionStorage.removeItem("get_OrderAndRev_data");
    sessionStorage.removeItem("get_all_coupons");
    sessionStorage.removeItem("get_custm_data");
    sessionStorage.removeItem("get_cus_groupBy1stMonthList");
    sessionStorage.removeItem("get_cusList_data");
    sessionStorage.removeItem("get_cussegs_List");
    sessionStorage.removeItem("get_trf_data");
    sessionStorage.removeItem("get_cusret_allcity");
    sessionStorage.removeItem("recent_sales");
    sessionStorage.removeItem("get_tops");
    sessionStorage.removeItem("get_init_data");
    sessionStorage.removeItem("get_all_engage_automation_performance");
    sessionStorage.removeItem("get_product_and_catagory_and_sku_data");
    sessionStorage.removeItem("Get_Product_Purchase_Based_Cus_Seg_Obj");
    sessionStorage.removeItem("get_pricing_current_rules");
    sessionStorage.removeItem("get_product_segments");
    sessionStorage.removeItem("profile_personal_data");
    sessionStorage.removeItem("get_profile_plan");
    sessionStorage.removeItem("get_connected_shops");
    sessionStorage.removeItem("get_profile_team");
    dispatch(LogOut());
    
    localStorage.clear();
    sessionStorage.clear();
    caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name);
        });
    });

    axios.post('https://server.shopex.io/logout.php', {} , { withCredentials: true })
      .then(function (response) {
        dispatch(LogOut());
        // navigateRef.current('/');
        window.location.href = 'https://shopex.io';
        if (response.data === 'done') {
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  var location    = useLocation();
  //var currentPath = location.pathname;
  var currentPath = location.pathname.substr(1);


  useEffect(() => {

    if( currentPath === "customers/reports" || currentPath === "customers/customer-and-segemnt" || currentPath === "customers/retention" || currentPath === "customers/retention/selected-city" || currentPath === "customers/Segment-tracker" || currentPath === "customers/rfm"){
      setOpen1(true);
    }

    if( currentPath === "products" || currentPath === "products/sales" || currentPath === "products/performance" || currentPath === "products/specific-city" || currentPath === "products/product-segment-performance" || currentPath === "products/customer-segment-based-on-product-purchase"){
      setOpen2(true);
    }

    if( currentPath === "orders" || currentPath === "orders/report"){
      setOpen3(true);
    }

    if( currentPath === "campaign" || currentPath === "campaign/orders" || currentPath === "campaign/compare"){
      setOpen4(true);
    }


    if( currentPath === "pricing" || currentPath === "pricing/created"){
      setOpen5(true);
    }


    if( currentPath === "engage/available" || currentPath === "engage/createnew"){
      setOpen6(true);
    }


  }, []); 



  var [isHover1, setIsHover1]   = useState(false);
  var [isHover2, setIsHover2]   = useState(false);
  var [isHover3, setIsHover3]   = useState(false);
  var [isHover4, setIsHover4]   = useState(false);
  var [isHover5, setIsHover5]   = useState(false);
  var [isHover5A, setIsHover5A]   = useState(false);
  var [isHover6, setIsHover6]   = useState(false);
  var [isHover7, setIsHover7]   = useState(false);
  var [isHover8, setIsHover8]   = useState(false);
  var [isHover9, setIsHover9]   = useState(false);
  var [isHover10, setIsHover10] = useState(false);
  var [isHover11, setIsHover11] = useState(false);
  var [isHover12, setIsHover12] = useState(false);
  var [isHover13, setIsHover13] = useState(false);
  var [isHover14, setIsHover14] = useState(false);
  var [isHover15, setIsHover15] = useState(false);
  var [isHover16, setIsHover16] = useState(false);
  var [isHover17, setIsHover17] = useState(false);
  var [isHover18, setIsHover18] = useState(false);
  var [isHover19, setIsHover19] = useState(false);
  var [isHover20, setIsHover20] = useState(false);
  var [isHover21, setIsHover21] = useState(false);
  var [isHover22, setIsHover22] = useState(false);

  var underlineStyles1 = {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    borderBottom: '1px dashed lightgray',
    backgroundColor: '#1675e0', 
  };

  var leftUnderlineStyles1 = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '3px', // Adjust the width as needed
    backgroundColor: '#1675e0', // Change this to your desired color
  };


  
  return (

    <>
      
      <List className="nav-list" component="nav" aria-labelledby="nested-list-subheader" subheader={ 
        <Link to="/dashboard">  
          <img className="logo" src="/images/logo.png" />  
        </Link>}
      >

        <hr />
        
        <Link to="/dashboard" style={{ display: "flex", alignItems: "center" }}>
          <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon style={{ minWidth: "35px" }}><AnalyticsIcon style={{ color: "#7366E3" }}/></ListItemIcon>
            <ListItemText style={{marginTop: "4px"}} primary={currentPath === 'dashboard' ? <span style={{ color: 'coral' }}> Dashboard </span> : 'Dashboard'} />
          </ListItemButton>
        </Link>

      
        <Link to="/baskets" style={{display: "flex",textDecoration: "none",width:'webkit-fill-available'}}>
          <ListItemButton>
              <ListItemIcon style={{ minWidth: "35px" }}><img style={{ width: "25px", height: "25px" }} src="/images/baskets.png"/></ListItemIcon>
              <ListItemText style={{ marginTop: "2px"}} primary={currentPath === 'baskets' ? <span style={{ color: 'coral' }}> Basket analysis </span> : 'Basket Analysis'} />
          </ListItemButton>
        </Link>

        


        <ListItemButton selected={selectedIndex === 1} onClick={handleClick1} style={{width:"webkit-fill-available"}}>
          <ListItemIcon style={{minWidth:"35px"}}>
            <PeopleIcon style={{ color: "#F44D48" }} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>


            <Collapse  in={open1} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)} style={{display: "flex",textDecoration: "none"}} to="/customers/customer-and-segemnt" > 
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover2 ? leftUnderlineStyles1 : {}} /> 
                  <div style={isHover2 ? underlineStyles1 : {}}/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "customers/customer-and-segemnt" ? ( <span style={{ color: "coral" }}> List & Segemnt </span> ) : ( "List & Segemnt" )} 
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  className="nice" in={open1} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)} to="/customers/reports" style={{display: "flex",textDecoration: "none"}}>
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div className="report" style={isHover1 ? leftUnderlineStyles1 : {}} /> 
                  <div  className="report" style={isHover1 ? underlineStyles1 : {}}/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "customers/reports" ? ( <span style={{ color: "coral" }}> Reports </span> ) : <span> Reports </span> }  
                </ListItemButton>
              </Link>
            </Collapse>

            

            <Collapse  in={open1} timeout="auto" unmountOnExit>
              <Link  onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)}  to="/customers/retention" style={{display: "flex",textDecoration: "none"}}>  
                <ListItemButton sx={{ pl: 4 }}  >
                  <div style={isHover3 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover3 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "customers/retention" ? ( <span style={{ color: "coral" }}> Retention </span> ) : ( "Retention" )}  
                </ListItemButton>
              </Link>
            </Collapse>

            {/* <Collapse  in={open1} timeout="auto" unmountOnExit>
              <Link  onMouseEnter={()=>setIsHover4(true)} onMouseLeave={()=>setIsHover4(false)}  to="/customers/retention/selected-city" style={{display: "flex",textDecoration: "none"}}>  
                <ListItemButton sx={{ pl: 4 }}  >
                  <div style={isHover4 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover4 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "customers/retention/selected-city" ? ( <span style={{ color: "coral" }}>Retention by City </span> ) : ( " Retention by City" )} 
                </ListItemButton>
              </Link>  
            </Collapse> */}

            <Collapse  in={open1} timeout="auto" unmountOnExit>
              <Link  onMouseEnter={()=>setIsHover5(true)} onMouseLeave={()=>setIsHover5(false)}  to="/customers/segment-tracker" style={{display: "flex",textDecoration: "none"}}>  
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}} >
                  <div style={isHover5 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover5 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "customers/segment-tracker" ? ( <span style={{ color: "coral" }}> Segment Tracker </span> ) : ( "  Segment Tracker" )} 
                </ListItemButton> 
              </Link>
            </Collapse>


            <Collapse  in={open1} timeout="auto" unmountOnExit>
              <Link  onMouseEnter={()=>setIsHover5A(true)} onMouseLeave={()=>setIsHover5A(false)}  to="/customers/rfm" style={{display: "flex",textDecoration: "none"}}>  
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}} >
                  <div style={isHover5A ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover5A ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "customers/rfm" ? ( <span style={{ color: "coral" }}> RFM Analysis </span> ) : ( "RFM Analysis" )} 
                </ListItemButton> 
              </Link>
            </Collapse>


        <ListItemButton selected={selectedIndex === 2} onClick={handleClick2} style={{width:"webkit-fill-available"}}>
          <ListItemIcon style={{minWidth:"35px"}}>
            <WidgetsIcon style={{ color: "#2BCEA1" }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

            <Collapse  in={open2} timeout="auto" unmountOnExit>
              <Link  onMouseEnter={()=>setIsHover6(true)} onMouseLeave={()=>setIsHover6(false)} style={{display: "flex",textDecoration: "none"}} to="/products">  
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover6 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover6 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "products" ? ( <span style={{ color: "coral" }}> Prod & Cats </span> ) : ( "Prod & Cats" )}  
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open2} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover7(true)} onMouseLeave={()=>setIsHover7(false)} style={{display: "flex",textDecoration: "none"}} to="/products/sales"> 
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover7 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover7 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "products/sales" ? ( <span style={{ color: "coral" }}> Sales </span> ) : ( "Sales" )}  
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open2} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover8(true)} onMouseLeave={()=>setIsHover8(false)} style={{display: "flex",textDecoration: "none"}} to="/products/performance">  
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover8 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover8 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "products/performance" ? ( <span style={{ color: "coral" }}> Performance </span> ) : ( "Performance" )}  
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open2} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover9(true)} onMouseLeave={()=>setIsHover9(false)} style={{display: "flex",textDecoration: "none"}} to="/products/specific-city"> 
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover9 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover9 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "products/specific-city" ? ( <span style={{ color: "coral" }}>  Performance by City </span> ) : ( " Performance by City" )} 
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open2} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover10(true)} onMouseLeave={()=>setIsHover10(false)} style={{display: "flex",textDecoration: "none"}} to="/products/product-segment-performance">
              <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                <div style={isHover10 ? leftUnderlineStyles1 : {} } /> 
                <div style={isHover10 ? underlineStyles1 : {} }/>
                <ListItemIcon style={{minWidth:"0px"}}>
                  <NavigateNextOutlinedIcon />
                </ListItemIcon>
                {currentPath === "products/product-segment-performance" ? ( <span style={{ color: "coral" }}>  Performance by Segemnt </span> ) : ( " Performance by Segemnt " )} 
              </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open2} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover11(true)} onMouseLeave={()=>setIsHover11(false)} style={{display: "flex",textDecoration: "none"}} to="/products/customer-segment-based-on-product-purchase">  
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover11 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover11 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "products/customer-segment-based-on-product-purchase" ? ( <span style={{ color: "coral" }}> Purchase segmentation </span> ) : ( " Purchase segmentation " )} 
                </ListItemButton>
              </Link> 
            </Collapse>

            


        <ListItemButton selected={selectedIndex === 3} onClick={handleClick3} style={{width:"webkit-fill-available"}}>
          <ListItemIcon style={{minWidth:"35px"}}>
            <ShoppingBasketIcon style={{ color: "#FB7A40" }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
            
            <Collapse  in={open3} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover13(true)} onMouseLeave={()=>setIsHover13(false)} style={{display: "flex",textDecoration: "none"}} to="/orders"> 
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover13 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover13 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "orders" ? ( <span style={{ color: "coral" }}> List & Segments </span> ) : ( " List & Segments " )} 
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open3} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover12(true)} onMouseLeave={()=>setIsHover12(false)} style={{display: "flex",textDecoration: "none"}} to="/orders/report">
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover12 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover12 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "orders/report" ? ( <span style={{ color: "coral" }}> Report </span> ) : ( " Report " )} 
                </ListItemButton>
              </Link>
            </Collapse>

           


        <ListItemButton selected={selectedIndex === 4} onClick={handleClick4} style={{width:"webkit-fill-available"}}>
          <ListItemIcon style={{minWidth:"35px"}}>
            <CampaignIcon style={{ color: "#2C7AE5" }} />
          </ListItemIcon>
          <ListItemText primary="Campaign" />
          {open4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

            <Collapse  in={open4} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover14(true)} onMouseLeave={()=>setIsHover14(false)} style={{display: "flex",textDecoration: "none"}} to="/campaign">
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover14 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover14 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "campaign" ? ( <span style={{ color: "coral" }}> Campaign </span> ) : ( " Campaign " )}  
                </ListItemButton>
              </Link>
            </Collapse>
            {shoptype ==="woo" && <>
            <Collapse  in={open4} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover15(true)} onMouseLeave={()=>setIsHover15(false)} style={{display: "flex",textDecoration: "none"}} to="/campaign/orders"> 
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover15 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover15 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "campaign/orders" ? ( <span style={{ color: "coral" }}> Orders </span> ) : ( " Orders " )} 
                </ListItemButton>
              </Link>
            </Collapse>

            <Collapse  in={open4} timeout="auto" unmountOnExit>
              <Link onMouseEnter={()=>setIsHover16(true)} onMouseLeave={()=>setIsHover16(false)} style={{display: "flex",textDecoration: "none"}} to="/campaign/compare">
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover16 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover16 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "campaign/compare" ? ( <span style={{ color: "coral" }}> Compare </span> ) : ( " Compare " )} 
                </ListItemButton>
              </Link>
            </Collapse>
            </>}

        {shoptype ==="woo" && <>
       
        <ListItemButton selected={selectedIndex === 5} onClick={handleClick5} style={{width:"webkit-fill-available"}}>
          <ListItemIcon style={{minWidth:"35px"}}>
            <DiscountRoundedIcon style={{ color: "#ECA13B" }} />
          </ListItemIcon>
          <ListItemText primary="Pricing" />
          {open5 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      
          <Collapse  in={open5} timeout="auto" unmountOnExit>
            {rolePower != 3 && 
            <>
              <Link onMouseEnter={()=>setIsHover17(true)} onMouseLeave={()=>setIsHover17(false)} style={{display: "flex",textDecoration: "none"}} to="/pricing"> 
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover17 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover17 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "pricing" ? ( <span style={{ color: "coral" }}> Create New </span> ) : ( " Create New " )}  
                </ListItemButton>
              </Link>
            </>}
          </Collapse>

          <Collapse  in={open5} timeout="auto" unmountOnExit>
            {rolePower != 3 &&  <>
              <Link onMouseEnter={()=>setIsHover18(true)} onMouseLeave={()=>setIsHover18(false)} style={{display: "flex",textDecoration: "none"}} to="/pricing/created">
                <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover18 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover18 ? underlineStyles1 : {} }/>
                  <ListItemIcon style={{minWidth:"0px"}}>
                    <NavigateNextOutlinedIcon />
                  </ListItemIcon>
                  {currentPath === "pricing/created" ? ( <span style={{ color: "coral" }}> Available </span> ) : ( " Available " )}  
                </ListItemButton>
              </Link>
            </>}
          </Collapse>
        
        </>}


        <Link onMouseEnter={()=>setIsHover19(true)} onMouseLeave={()=>setIsHover19(false)} style={{display: "flex",textDecoration: "none",width:'webkit-fill-available'}} to="/coupons"> 
          <ListItemButton selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)}>
            <div style={isHover19 ? leftUnderlineStyles1 : {} } /> 
            <div style={isHover19 ? underlineStyles1 : {} }/>
            <ListItemIcon style={{minWidth:"35px"}}>
              <LocalOfferIcon style={{ color: "#DE2868" }} />
            </ListItemIcon>
            {/* {currentPath === "coupons" ? ( <span style={{ color: "coral" }}> Coupon </span> ) : ( " Coupon " )}  */}
            <ListItemText style={{marginTop: "2px"}} primary={currentPath === 'coupons' ? <span style={{ color: 'coral' }}> Coupon </span> : 'Coupon'} />
          </ListItemButton>
        </Link>

        <ListItemButton selected={selectedIndex === 6} onClick={handleClick6} style={{width:"webkit-fill-available"}}>
          <ListItemIcon style={{minWidth:"35px"}}>
            <ScheduleSendIcon style={{ color: "#05AFC5" }} />
          </ListItemIcon>
          <ListItemText primary="Engage" />
          {open6 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
            <Collapse  in={open6} timeout="auto" unmountOnExit>
              {/* {rolePower != 3 &&  */}
                <Link onMouseEnter={()=>setIsHover20(true)} onMouseLeave={()=>setIsHover20(false)} style={{display: "flex",textDecoration: "none"}} to="/engage/available"> 
                  <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                  <div style={isHover20 ? leftUnderlineStyles1 : {} } /> 
                  <div style={isHover20 ? underlineStyles1 : {} }/>
                    <ListItemIcon style={{minWidth:"0px"}}>
                      <NavigateNextOutlinedIcon />
                    </ListItemIcon>
                    {currentPath === "engage/available" ? ( <span style={{ color: "coral" }}> Available </span> ) : ( " Available " )}  
                  </ListItemButton>
                </Link>
              {/* } */}
            </Collapse>
            
            <Collapse  in={open6} timeout="auto" unmountOnExit>
              {/* {rolePower != 3 &&  */}
                <Link onMouseEnter={()=>setIsHover21(true)} onMouseLeave={()=>setIsHover21(false)} style={{display: "flex",textDecoration: "none"}} to="/engage/createnew">
                  <ListItemButton sx={{ pl: 4 }} style={{justifyContent:"start!important"}}>
                    <div style={isHover21 ? leftUnderlineStyles1 : {} } /> 
                    <div style={isHover21 ? underlineStyles1 : {} }/>
                    <ListItemIcon style={{minWidth:"0px"}}>
                      <NavigateNextOutlinedIcon />
                    </ListItemIcon>
                      {currentPath === "engage/createnew" ? ( <span style={{ color: "coral" }}> Create New </span> ) : ( " Create New " )}  
                  </ListItemButton>
                </Link>
              {/* } */}
            </Collapse>

        <Link onMouseEnter={()=>setIsHover22(true)} onMouseLeave={()=>setIsHover22(false)} style={{display: "flex",textDecoration: "none",width:'webkit-fill-available'}} to="/profile">
          <ListItemButton selected={selectedIndex === 8} onClick={(event) => handleListItemClick(event, 8)}>
            <div style={isHover22 ? leftUnderlineStyles1 : {} } /> 
            <div style={isHover22 ? underlineStyles1 : {} }/>
            <ListItemIcon style={{minWidth:"35px"}}>
              <ManageAccountsIcon style={{ color: "#4FA953" }} />
            </ListItemIcon>
            {/* {currentPath === "profile" ? ( <span style={{ color: "coral" }}> Profile </span> ) : ( " Profile " )}   */}
            <ListItemText style={{marginTop: "2px"}} primary={currentPath === 'profile' ? <span style={{ color: 'coral' }}> Profile </span> : 'Profile'} />
          </ListItemButton>
        </Link>

        <ListItemButton selected={selectedIndex === 9} onClick={(event) => Log_Out(event, 9)} style={{width:'webkit-fill-available',justifyContent: "left!important"}} >
          <ListItemIcon style={{minWidth:"35px"}}>
            <ExitToAppIcon style={{ color: "red" }} />
          </ListItemIcon>
          LogOut
        </ListItemButton>

      </List>

    </>

  );

}

export default SideNav;
