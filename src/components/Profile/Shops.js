import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shops_ } from "../../features/profile/Shops";

//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";

import { Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useRef } from "react";


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



function Shops() {

  var rolePower     = useSelector((state) => state.dashTops.rolePower);
  var accountType   = useSelector((state) => state.dashTops.accountType);

  var navigate    = useNavigate();
  var navigateRef = useRef(navigate);

  
  var dispatch = useDispatch();
  const defaultMaterialTheme = createTheme();

  var[shop,setShop] = useState();

  useEffect(() => {

    // if(accountType === "paid") {
    //   if (!ReactSession.get("shops_")) {
    //       ReactSession.set("shops_", "1");
    //       dispatch(shops_({ ajax_call: 2 }));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("shops_")) {
        sessionStorage.setItem("shops_", "1");
        dispatch(shops_({ ajax_call: 2 }));
      }
    }


    if(accountType === "paid") {
      axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
      .then(
        (response) => {
          setShop(response.data.shopurl);
        },
        (error) => {}
      );
    }

  }, []);



  // var Profile_shops = useSelector((state) => state.Profile_shops.profile_shops);
  
  // if(Profile_shops){
  //   Profile_shops = structuredClone(Profile_shops);
  //   console.log(Profile_shops);
  // }

  var Profile_shops = useSelector((state) => state.Profile_shops.profile_shops);
  if (Profile_shops && Profile_shops.length > 0) {
    var Profile_shops_ = structuredClone(Profile_shops);
  }

  var account_type = useSelector((state) => state.Profile_shops.account_type);
  console.log(account_type);

  return (
    
    <>
    
      <div id="shops">
    
        <div id="shopindiv">

          <h4> Current Shop : {shop} </h4>
    
          <Card className="dash-card">
    
            <ThemeProvider theme={defaultMaterialTheme}>
            
            {Profile_shops_ && 
            
              <MaterialTable
                
              columns={[{ title: "Shop", field: "shopurl" }]}
              
                data={Profile_shops_}

                title="Connected shops"
             
                icons={tableIcons}

                options={{
                  showFirstLastPageButtons: false,
                  paging: false,
                  pageSize: 10, // make initial page size
                  emptyRowsWhenPaging: false, // To avoid of having empty rows
                  pageSizeOptions: [10, 15, 25, 40, 50],
                  searchFieldAlignment: "right",
                  cellStyle: {
                    padding: "5px",
                    textAlign: "left",
                  },
                }}

                onRowClick={(event, rowData) => {
                  setShop(rowData.shopurl);
                  axios.post('https://server.shopex.io/profile/shop_switch.php', {shopid:rowData.shopid},{withCredentials: true})
                    .then(response => {
                      navigateRef.current('/dashboard');
                    })
                    .catch(error => {
                      // Handle the error
                      console.error(error);
                    });
                }}
              />
            }
            </ThemeProvider>
         
          </Card>

          <br />
          
          <a href={"/InsertShopURL/profile/addmoreshop"} style={{ color: "red" }}> <strong>  + ADD NEW SHOP </strong> </a>

        </div>

      </div>

    </>

  );

}

export default Shops;
