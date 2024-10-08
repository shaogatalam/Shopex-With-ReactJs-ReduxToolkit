import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { get_all_engage_automation_performance } from "../../features/engage/PerformanceCompare";
import { editEngageStatus } from "../../features/engage/PerformanceCompare";
import { removeEngage } from "../../features/engage/PerformanceCompare";
import axios from "axios";
import {Grid,Card, Modal, Paper, TextField,Button,ThemeProvider, createTheme } from '@mui/material';
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
function Available() {
  
  var dispatch              = useDispatch();
  var defaultMaterialTheme  = createTheme();

  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var accountType = useSelector((state) => state.dashTops.accountType);
  var automated_email_campaign_table_data = null;

  var autolist = useSelector((state) => state.engage);
  if(accountType === "paid"){
    var autolist = autolist?.autoList ?? [];
    if (autolist.length > 0) {
      automated_email_campaign_table_data = structuredClone(autolist);
    }
  }

  useEffect(() => {

    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_all_engage_automation_performance")) {
    //     ReactSession.set("get_all_engage_automation_performance", "1");
    //     dispatch(get_all_engage_automation_performance({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_all_engage_automation_performance")) {
        sessionStorage.setItem("get_all_engage_automation_performance", "1");
        dispatch(get_all_engage_automation_performance({ ajax_call: 2 }));
      }
    }

    if(accountType === "demo") {
      automated_email_campaign_table_data = [
        {
          name: "Campaign 1",
          target_segment_name: "Segment A",
          mailSend: 1000,
          visitor: 150,
          order: 30,
          amount: 2000.00,
          auto_created: new Date("2023-04-01"),
          status: 1,
        },
        {
          name: "Campaign 2",
          target_segment_name: "Segment B",
          mailSend: 800,
          visitor: 120,
          order: 20,
          amount: 1500.00,
          auto_created: new Date("2023-03-15"),
          status: 0,
        },
        {
          name: "Campaign 3",
          target_segment_name: "Segment C",
          mailSend: 1500,
          visitor: 200,
          order: 50,
          amount: 3000.00,
          auto_created: new Date("2023-05-10"),
          status: 1,
        },
      ];
    }

  }, []);


  var ChangeStatus = (row) => {
    
    let id      = row.id;
    let _status = row.status;

    if(_status == 1){
      _status=0;
    }
    
    else if(_status == 0){
      _status = 1;
    } 

    dispatch(editEngageStatus({id: id,status: _status}));
    if(accountType === "paid"){
      axios.post("https://server.shopex.io/engage/engage_status_changing.php",{id: id, status:_status, ajax_call: "2"},{ withCredentials: true })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    }
  };





  var deleteEngage = (segid) => {
    axios.post("https://server.shopex.io/engage/engage_delete.php",{id: segid},{ withCredentials: true })
    .then(function (response) {
      alert('engage deleted successfully');
    })
    .catch(function (error) {
      alert('Error deleting engage:', error);
    });
  }
  var handleDeleteClick = (row) => {
    var confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      dispatch(removeEngage({id: row.id}));
      if(accountType === "paid") {
        deleteEngage(row.id);
      }
    }
  }


  return (

    <>

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Engage : available and performance  </h6>
        </div>
      </Grid>


      <Grid className="campaign" container spacing={3}>
      
        <Grid item md={12}>

          {/* { automated_email_campaign_table_data && ( */}
          { automated_email_campaign_table_data && automated_email_campaign_table_data.length > 0 ? (

            <Card className="dash-card">
            
              <ThemeProvider theme={defaultMaterialTheme}>
            
                <MaterialTable
                sx={{ 
                  [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                  [`& .td`]:{padding:'2px!important'},
                }}
                  columns={[
                    { title: "Name", field: "name" },
                    { title: "Target segment", field: "target_segment_name" },
                    { title: "MailSend",type:"numeric", field: "mailSend" ,
                    customSort: (a, b) => a.mailSend - b.mailSend,},
                    { title: "Visitor",type:"numeric", field: "visitor",
                    customSort: (a, b) => a.visitor - b.visitor, },
                    { title: "Order",type:"numeric", field: "order",
                    customSort: (a, b) => a.order - b.order, },
                    { title: "Amount",type:"numeric", field: "amount",
                    customSort: (a, b) => a.amount - b.amount, },
                    { title: "Created", type:"date",field: "auto_created" },
                    {title: "status",field: "status",render: (row) =>(
                      <Button 
                        onClick={() => {ChangeStatus(row)}} 
                        variant="contained" color="info">
                          {row.status == 1 && <strong> Running </strong>} 
                          {row.status == 0 && <strong> Not-Running </strong>}
                      </Button>)
                    },
                    {
                      title: 'Delete',
                      field: '',
                      render: (row) => (
                        <div style={{cursor:'pointer',background:'ghostwhite'}} onClick={() => handleDeleteClick(row)}>Delete</div>
                      ),
                    },
                  ]}
                  data={automated_email_campaign_table_data}
                  title="Created email campaigns"
                  icons={tableIcons}
                  
                  options={{
                    sorting: true,
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
                      fontFamily: "system-ui",
                      textAlign: "center",
                      borderBottom: "2px solid rgb(246, 224, 224)",
                    },
                  }}
                />
              </ThemeProvider>
            </Card>
          
          ) : 
              <div style={{  marginTop: '5vh' }}>
                <strong style={{"color": "springgreen","fontSize": "large",marginBottom:'15px'}}>
                  Currently you don't have any email campaigns.
                </strong>
                <Button variant="contained" color="primary" href="/engage/createnew"  >
                  :: Create Email Campaign 
                </Button>
              </div>
          }

        </Grid>

      </Grid>

    </>

  );

}

export default Available;
