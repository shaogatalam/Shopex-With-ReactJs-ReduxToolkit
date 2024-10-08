import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { team_ } from "../../features/profile/Team";
import { shops_ } from "../../features/profile/Shops";
import Grid from "@mui/material/Grid";
import Multiselect from "multiselect-react-dropdown";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme, RadioGroup, Radio } from "@mui/material";

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


function Team() {

  var rolePower     = useSelector((state) => state.dashTops.rolePower);
  var accountType   = useSelector((state) => state.dashTops.accountType);

  var dispatch  = useDispatch();
  var dispatch1 = useDispatch();

  var defaultMaterialTheme = createTheme();

  useEffect(() => {

    
    // if(accountType === "paid" ) {
    //   if (!ReactSession.get("team_")) {
    //     ReactSession.set("team_", "1");
    //     dispatch(team_({ajax_call:2}));
    //   }
    //   if (!ReactSession.get("shops_")) {
    //     ReactSession.set("shops_", "1");
    //     dispatch1(shops_({ajax_call:2}));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("team_")) {
        sessionStorage.setItem("team_", "1");
        dispatch(team_({ ajax_call: 2 }));
      }
    
      if (!sessionStorage.getItem("shops_")) {
        sessionStorage.setItem("shops_", "1");
        dispatch1(shops_({ ajax_call: 2 }));
      }
    }

  },[])


  //var Profile_team = useSelector((state) => state.profile_team.profile_team);
  //var Profile_team = structuredClone(Profile_team);

  var Profile_team   = useSelector((state) => state.profile_team);
  var Profile_team__ = Profile_team?.profile_team ?? [];
  if (Profile_team__.length > 0) {
    var Profile_team_ = structuredClone(Profile_team__);
  }


  // var ops = [];
  // var Profile_shops = useSelector((state) => state.Profile_shops.profile_shops);
  // if (Profile_shops && Profile_shops.length > 0) {
  //   for (var i of Profile_shops) {
  //     var label = i.shopurl;
  //     var value = i.shopid;
  //     ops.push({ value: value, label: label });
  //   }
  // }

  var Profile_shops = useSelector((state) => state.Profile_shops?.profile_shops) ?? [];
  var ops = [];
  if (Profile_shops && Profile_shops.length > 0) {
    for (var i of Profile_shops) {
      var label = i.shopurl;
      var value = i.shopid;
      ops.push({ value: value, label: label });
    }
  }
  

  var [role, setrole]                  = useState();
  var [AccessToID, setAccessToID]      = useState("");
  var [AccessToURL, setAccessToURL]    = useState("");

  var[invitationSent,setInvitationSent] = useState(false);

  var[failedToSend,setFailedToSend]     = useState(false);

  var teamUpdate = (event) => {
    
    event.preventDefault();

    setInvitationSent(false);
    setFailedToSend(false);

    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());
    //dispatch(profile_personal_data(data));
    if(AccessToID !== "" && accountType === "paid"){
      axios.post("https://server.shopex.io/profile/profile_team_member_invite.php",data,{ withCredentials: true })
        .then(
          (response) => {
            setInvitationSent(true);
          },
          (error) => {
            setFailedToSend(true);
          }
        );
    }else{
      alert("Select Shop");
    }
  };



  var handleDeleteClick = (row) => {

    var email               = row.email;
    var confirmationMessage = `Remove ${email} from the team?`;
    var confirmDelete       = window.confirm(confirmationMessage);
    
    if (confirmDelete && accountType === "paid") {
      axios.post("https://server.shopex.io/profile/profile_team_member_remove.php",{email: row.email},{ withCredentials: true })
      .then(function (response) {
        dispatch(team_({ajax_call:2}));
        // alert('Order segment deleted successfully');
      })
      .catch(function (error) {
        // alert('Error deleting segment:', error);
      });

    }
  }


  return (

    <Grid container spacing={5} style={{ padding: 0 }}>
    
      <Grid item md={6} sm={12}>
    
        <h4 style={{color:"yellowgreen","background": "aliceblue", "padding": "5px"}}> Add team member :: </h4>
    
        <br />
    
        <form className="date-period" onSubmit={teamUpdate}>
    
          <strong> Select Role : </strong>
          
          <RadioGroup style={{display: "inline-block",fontSize: "13px",fontWeight: "500",}}onChange={(e) => {setrole(e.target.value);}}>
            <Radio type="radio" value="2" name="power" /> Analyst
            <Radio type="radio" value="3" name="power" /> Shop-Assistant
          </RadioGroup>
          
          <div style={{ position: "relative" }}>
            <input placeholder=" Type here Team member email " type="email"  name="email" required/>
          </div>

          {ops && ops.length > 0 && (
            
            <>
              <br />
              <br />
              <h6 style={{borderBottom : "2px solid royalblue",paddingBottom:'3px'}}> The email will have access to the selected shop below </h6>
              <br />
              <br />

              <div style={{ border: "2px solid lightgray" }}>

                <Multiselect displayValue="label" placeholder=" Select shop : "
                  onRemove={(e) => {
                    var aa = [];
                    for (var i of e) {  aa.push(i.value); } setAccessToID(JSON.stringify(aa));
                    var aa = [];
                    for (var i of e) { aa.push(i.label); } setAccessToURL(JSON.stringify(aa));
                  }}
                  onSelect={(e) => {
                    var aa = [];
                    for (var i of e) { aa.push(i.value); } setAccessToID(JSON.stringify(aa));
                    var aa = [];
                    for (var i of e) {  aa.push(i.label); } setAccessToURL(JSON.stringify(aa));
                  }}
                  options={ops}
                  showCheckbox
                />
                
              </div>

            </>

          )}

          <input name="shops" type={"hidden"} defaultValue={AccessToID} />
          <input name="role" type={"hidden"} defaultValue={role} />
          
          {/* <button className="send-mail" type="submit"> Send invitation </button> */}

          <button style={{margin:"20px",marginLeft: "0px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
            Send invitation 
          </button>

          <div className="raccess">
           
           <p style={{ color: "rgb(43, 206, 161)",margin:"0px" }}> Only Owner </p>
           <span> Add / Delete shop </span>
           <br />
           <span> Add / Delete Team member</span>
           <br />
           <span> Create / Update / Cancel subscription</span>
           <br /><br />

           <p style={{ color: "rgb(115, 102, 227)", margin:"0px" }}> Owner & Analyst</p>
           <span>Create/Edit/Delete Dynamic product pricing</span>
           <br />
           <span>Create cart recovery automation</span>
           <br />
           <span>Create engage email automation</span>
           <br />
           <span>Create segments</span>
           <br />
           <span>Download CSV </span>
           <br />
           <span>Create product group in Performance</span>
           <br /><br />

           <p style={{ color: "rgb(5, 175, 197)",margin:"0px" }}> Shop-Assistant</p>
           <span> Data View and Order status change </span>
           <br />
           <br />

         </div>

          { failedToSend && <strong> Try again ! failed to send invitation </strong> }
          { invitationSent && <strong> invitation sent </strong> }

        </form>

      </Grid>


      <Grid item md={6} sm={12}>
        {Profile_team_ && Profile_team_.length > 0 && (
          
          <ThemeProvider theme={defaultMaterialTheme}>
          
            <MaterialTable
          
              columns={[
                { title: "Email", field: "email" },
                { title: "Title", field: "title" },
                { title: "Shop",  field: "shoplink" },
                {
                  title: 'Remove',
                  field: '',
                  render: (row) => (
                    <div style={{cursor:'pointer',background:'ghostwhite'}} onClick={() => handleDeleteClick(row)}>Delete</div>
                  ),
                },
              ]}
              onRowClick={(event, rowData) => {}}
              data={Profile_team_}
              title="Current members  :: "
              actions={[
                {
                  
                  tooltip: "Fetch",
                  onClick: (event, rowData) =>
                    console.log("saved"),
                },
              ]}

              icons={tableIcons}

              options={{
                paging: false,
                pageSize: 10, // make initial page size
                emptyRowsWhenPaging: false, // To avoid of having empty rows
                pageSizeOptions: [10, 15, 25, 40, 50],
                searchFieldAlignment: "right",
                cellStyle: {
                  padding: "5px",
                  textAlign: "left",
                },
                headerStyle: {
                  backgroundColor: "#01579b",
                  color: "#FFF",
                  textAlign: "left",
                },
              }}

              localization={{
                pagination: {
                  labelRowsPerPage: "",
                },
                header: {
                  actions: "",
                },
              }}
            />

          </ThemeProvider>

        )}

      </Grid>

    </Grid>

  );

}

export default Team;
