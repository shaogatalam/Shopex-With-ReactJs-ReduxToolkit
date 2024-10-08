import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { save_new_campaign_data } from "../../features/campaign/OrderListAndGroupByCam";
import { get_all_src_name_and_url } from "../../features/campaign/OrderListAndGroupByCam";
import { DeleteCam } from "../../features/campaign/OrderListAndGroupByCam";
import { get_order_from_campaign_shopify } from "../../features/campaign/OrderListAndGroupByCam";

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


function AddNewCampaign() {
  
  var dispatch = useDispatch();
  const defaultMaterialTheme = createTheme();
  
  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);

  var cams = useSelector((state) => state.campaign);
  var all_src_and_url__ = cams?.all_src_and_url ?? [];
  if (all_src_and_url__.length > 0) {
    var all_src_and_url = structuredClone(all_src_and_url__);
  }
  var shopify_cam_perform__ = cams?.shopify_order_from_campaign ?? [];
  if (shopify_cam_perform__.length > 0) {
    var shopify_order_from_campaign = structuredClone(shopify_cam_perform__);
  }
  

  useEffect(() => {

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_order_from_campaign_shopify")) {
        sessionStorage.setItem("get_order_from_campaign_shopify", "1");
        dispatch(get_order_from_campaign_shopify({ ajax_call: 2 }));
      }
      if (!sessionStorage.getItem("get_all_src_name_and_url")) {
        sessionStorage.setItem("get_all_src_name_and_url", "1");
        dispatch(get_all_src_name_and_url({ ajax_call: 2 }));
      }
    }

    if(accountType === "demo") {

      all_src_and_url = [
        {
          "src_name": "Google Ads",
          "url": "https://www.example.com/landing-page-1"
        },
        {
          "src_name": "Facebook Ads",
          "url": "https://www.example.com/landing-page-2"
        },
        {
          "src_name": "Email Campaign",
          "url": "https://www.example.com/landing-page-3"
        },
        {
          "src_name": "Organic Search",
          "url": "https://www.example.com/landing-page-4"
        },
        {
          "src_name": "Referral",
          "url": "https://www.example.com/landing-page-5"
        }
      ];

    }
    

  }, []);


  var AddNewSrc = (event) => {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data = Object.fromEntries(fdata.entries());
    if(accountType === "paid") {
      dispatch(save_new_campaign_data(data));
      dispatch(get_all_src_name_and_url({ ajax_call: 2 }));
    }
  };


  var handleDeleteClick = (row) => {
    
    var confirmDelete = window.confirm('Are you sure?');
    
    if (confirmDelete) {

      if(accountType === "paid") {
        dispatch(DeleteCam({id: row.id}));
        axios.post("https://server.shopex.io/customers/cam_delete.php",{id: row.id},{ withCredentials: true })
        .then(function (response) {
          //alert('campaign data deleted successfully');
        })
        .catch(function (error) {
          alert('Error deleting campaign:', error);
        });
      }
    }
  }


  return (
    
    <>
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Campaign : List  </h6>
        </div>
      </Grid>

      <Grid className="campaign" container spacing={3}>
        
      
        <Grid item md={12}>

          <form onSubmit={AddNewSrc}>

            <h4> Campaign source : </h4>
            <input style={{height: "40px", width: "500px",fontSize:"18px"}} name="src_name" type="text" id="src_name"  required />
        
            <div>
                <h4> Landing page url : </h4>
                <input style={{height: "40px", width: "500px",fontSize:"18px"}} name="adurl" type="text"  required />
            </div>

            <button style={{marginLeft:"0px",marginTop:"10px"}} className="period-btn" variant="contained" color="secondary" type="submit">Save </button>

          </form>

        </Grid>

        <Grid item md={10} style={{marginTop:"3vh"}}>

          {all_src_and_url && (
            
            <ThemeProvider theme={defaultMaterialTheme}>
              
              <MaterialTable
                columns={[
                  { title: "Campaign source", field: "src_name" },
                  { title: "Landing page url", field: "url" },
                  {
                    title: 'Delete',
                    field: '',
                    render: (row) => (
                      <div style={{cursor:'pointer',background:'ghostwhite'}} onClick={() => handleDeleteClick(row)}>Delete</div>
                    ),
                  },
                ]}

                data={all_src_and_url}
                title="Campaigns"
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
          
          )}

        </Grid>

        <Grid item md={10} style={{marginTop:"3vh"}}>

          {shoptype === "shopify" && shopify_order_from_campaign && (
            
            <ThemeProvider theme={defaultMaterialTheme}>
              
              <MaterialTable
                columns={[
                  { title: "Campaign platform", field: "campaign_platform" },
                  { title: "Total order", field: "campaign_order" },
                  { title: 'Total amount',field: 'campaign_revenue'},
                ]}

                data={shopify_order_from_campaign}
                title="Order from campaign"
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
          
          )}

        </Grid>


      </Grid>

    </>
  );
  
}

export default AddNewCampaign;
