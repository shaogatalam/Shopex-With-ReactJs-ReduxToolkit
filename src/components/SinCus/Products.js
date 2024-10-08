import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

import PersonPinIcon from "@mui/icons-material/PersonPin";

import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import Orders from "./Orders";

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


function Products() {

  

  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }

  var { chc } = useParams();

  var defaultMaterialTheme = createTheme();

  var [pros, setPros] = useState([]);
  var [ondis_pros, setOndisPros] = useState([]);
  var [profile, setprofile] = useState([{}]);

  useEffect(() => {
   
    var getProduct = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/customers/single-customer/SingleCustomer_products.php",
          { customer_chc: chc },
          { withCredentials: true }
        );
        setprofile(res.data.profile);
        setPros(res.data.pros);
        setOndisPros(res.data.pros_ondis);
      } catch {}
    };
    getProduct();
    
  }, [chc]);

  console.log(profile);

  var columns = [
    {title: "Product",field: "Product",
      render: (row) => (<div style={{background: "mintcream",fontFamily: "system-ui",fontSize: "16px",textAlign: "left"}}>{row.Product}</div>)
    },
    {title: "firstbuy",field: "firstbuy",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.firstbuy} </div>)},
    {title: "lastbuy",field: "lastbuy",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.lastbuy} </div>)},
    {title: "avg buy gap",field: "avg_buy_gap",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.avg_buy_gap} </div>)},
    {title: "Total unit",field: "totalunit",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.totalunit} </div>)},
    {title: "Total spent",field: "totalspent",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.totalspent} </div>)},
    {title: "Total order",field: "totalorder",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.totalorder} </div>)},
  ];

  var ondisbuy_columns = [
    
    {
      title: "Product", field: "Product",
      render: (row) => 
        <div style={{ background: "mintcream",fontFamily: "system-ui",fontSize: "16px",textAlign: "left",}}>
          {row.Product}
        </div>
    },

    {
      title: "Total unit",field: "totalunit",
      render: (row) =>  <div style={{ background: "ghostwhite" }}> {row.totalunit} </div>
    },

    {
      title: "Total spent",field: "totalspent",
      render: (row) => <div style={{ background: "whitesmoke" }}> {row.totalspent} </div>
    },

    {
      title: "Times bought",field: "timesbought",
      render: (row) => <div style={{ background: "ghostwhite" }}> {row.timesbought} </div>
    },

  ];

  var timelinecontentstyle = {
    background: "ghostwhite",
    margin: "0px",
    fontWeight: "400",
    lineHeight: "1",
    letterSpacing: "0.00938em",
    flex: "1 1 0%",
    padding: "3px 6px 5px 9px",
    textAlign: "left",
    fontSize: "12px",
    boxShadow:
      "rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px",
    height: "35px",
    fontFamily: "system-ui",
  };

  return (
    <>
      <Grid container style={{ margin: "1%", borderRadius: "11px", boxShadow: "rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px", }}>
        <Grid style={{ display: "inline-flex" }}>
          <PersonPinIcon style={{fontSize: "60px",color: "snow",borderRadius: "30px",padding: "6px",marginTop: "3px"}}/>
          <div style={{}}>
            <h5 style={{marginTop: "11px",marginLeft: "10px",color: "white",letterSpacing: "1px",}}>{profile[0].name}</h5>
            <p style={{ marginLeft: "10px", marginTop: "0px", color: "white" }}>{profile[0].mail}</p>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        
        <Grid item sm={2}>
        
          {profile.map((element, index) => (
        
            <Timeline sx={{[`& .${timelineItemClasses.root}:before`]: {flex: 0,padding: 0}}}>
              
              {/* <TimelineItem style={{ minHeight: '57px' }}>
                  <TimelineSeparator>
                      <TimelineDot variant="outlined" color="primary" />
                      <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent style={timelinecontentstyle}>
                      <Typography variant="p" component="p">
                          Name
                      </Typography>
                      <Typography>{element.name}</Typography>
                  </TimelineContent>
              </TimelineItem>


              <TimelineItem style={{ minHeight: '57px' }}>
                  <TimelineSeparator>
                      <TimelineDot variant="outlined" color="secondary" />
                      <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent style={timelinecontentstyle}>
                      <Typography variant="p" component="span">
                          Mail
                      </Typography>
                      <Typography>{element.mail}</Typography>
                  </TimelineContent>
              </TimelineItem> */}

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Order
                  </Typography>
                  <Typography>{element.order}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Engage :: order
                  </Typography>
                  <Typography>{element.en_email_order}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Spent
                  </Typography>
                  <Typography>{element.spent}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    AOV
                  </Typography>
                  <Typography>{element.aov}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Last Order
                  </Typography>
                  <Typography>{element.lod}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    First Order
                  </Typography>
                  <Typography>{element.fod}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    AOP
                  </Typography>
                  <Typography>{element.aop}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Avg. Day Gap
                  </Typography>
                  <Typography>{element.adbo}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Registration
                  </Typography>
                  <Typography>{element.regdate}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Shipping Cost
                  </Typography>
                  <Typography>{element.shipping}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Avg. Shipping Cost
                  </Typography>
                  <Typography>{element.avg_shipping}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Discount
                  </Typography>
                  <Typography>{element.discount}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Avg. Discount
                  </Typography>
                  <Typography>{element.avg_discount}</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem style={{ minHeight: "44px" }}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                </TimelineSeparator>
                <TimelineContent style={timelinecontentstyle}>
                  <Typography variant="p" component="span">
                    Tax
                  </Typography>
                  <Typography>{element.sum_total_tax}</Typography>
                </TimelineContent>
              </TimelineItem>

            </Timeline>

          ))}

        </Grid>

        {/* {profile.map((element, index) => (
          <div>
              <strong> Name :: {element.name} </strong>
              <strong> mail :: {element.mail} </strong>
              <strong> order :: {element.order} </strong>
              <strong> en_email_order :: {element.en_email_order} </strong>
              <strong> spent :: {element.spent} </strong>
              <strong> aov :: {element.aov} </strong>
              <strong> lod :: {element.lod} </strong>
              <strong> fod :: {element.fod} </strong>
              <strong> aop :: {element.aop} </strong>
              <strong> adbo :: {element.adbo} </strong>
              <strong> regdate :: {element.regdate} </strong>
              <strong> shipping :: {element.shipping} </strong>
              <strong> avg_shipping :: {element.avg_shipping} </strong>
              <strong> discount :: {element.discount} </strong>
              <strong> avg_discount :: {element.avg_discount} </strong>
              <strong> sum_total_tax :: {element.sum_total_tax} </strong>
          </div>
        ))} */}

        <Grid item sm={8}>
          
          <Grid style={{ marginTop: "8px" }}>
          
            <ThemeProvider theme={defaultMaterialTheme}>
              
              <MaterialTable
                columns={columns}
                data={pros}
                title={"Product Purchased"}
                icons={tableIcons}
                options={{
                  pageSize: 10, // make initial page size
                  emptyRowsWhenPaging: false, // To avoid of having empty rows
                  pageSizeOptions: [],
                  search: true,
                  searchFieldAlignment: "right",
                  exportButton: true,
                  exportAllData: true,
                  cellStyle: {
                    padding: "0px",
                    lineHeight: 3,
                    fontFamily: "Circular-Loom",
                    textAlign: "center",
                    borderBottom: "2px solid rgb(246, 224, 224)",
                  },
                  headerStyle: {
                    background: "rgb(52, 195, 255)",
                    fontSize: "12px",
                    color: "white",
                    padding: "2px",
                    height: "40px",
                  },
                  // rowStyle: {
                  //     backgroundColor: '#EEE',
                  // }
                  //rowStyle: (data, index) => index % 2 === 0 ? { background: "ghostwhite" } : {background:'white'},
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
          </Grid>

          <Grid style={{ marginTop: "20px" }}>
           
            <ThemeProvider theme={defaultMaterialTheme}>
           
              <MaterialTable
                
                columns={ondisbuy_columns}
                data={ondis_pros}
                title={"Product Purchased on discount"}
                icons={tableIcons}
                options={{
                  pageSize: 10, // make initial page size
                  emptyRowsWhenPaging: false, // To avoid of having empty rows
                  pageSizeOptions: [],
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
                  headerStyle: {
                    background: "rgb(52, 195, 255)",
                    fontSize: "17px",
                    color: "white",
                    padding: "2px",
                    height: "40px",
                  },
                  // rowStyle: {
                  //     backgroundColor: '#EEE',
                  // }
                  //rowStyle: (data, index) => index % 2 === 0 ? { background: "ghostwhite" } : {background:'white'},
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

          </Grid>

          <Orders />

        </Grid>

      </Grid>

    </>

  );

}

export default Products;
