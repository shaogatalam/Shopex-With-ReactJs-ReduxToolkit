import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MaterialTable, { MTableToolbar } from '@material-table/core';
//import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
//import { makeStyles } from '@material-ui/core/styles';

import { Modal, Paper, TextField,Button,ThemeProvider, createTheme } from '@mui/material';

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

function SingleOrder() {

  var demo_check = useSelector((state) => state.Profile_personal_data.demo);

  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
  //     }
  //   },
  // }));

  // var classes = useStyles();

  var defaultMaterialTheme = createTheme();
  var { chc } = useParams();

  var [date, setDate]           = useState();
  var [mail, setMail]           = useState();
  var [status, setStatus]       = useState();
  var [foro, setForo]           = useState();
  var [cusCHC, setcusCHC]       = useState();
  var [hello, sethello]         = useState();

  var [OrderItemsTableData, setOrderItemsTableData] = useState([]);

  var [dis, setDis]             = useState([]);
  var [shipcost, setshipcost]   = useState([]);
  var [tax, settax]             = useState([]);
  var [total, settotal]         = useState([]);

  var [source, setSource]       = useState();

  var [shipcity, setShipcity]   = useState();
  var [shipstate, setshipstate] = useState();
  var [sa1, setsa1]             = useState();
  var [sa2, setsa2]             = useState();

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

  useEffect(() => {

    const sinOrder = async () => {
      try {
        const res = await axios.post(
          "https://server.shopex.io/orders/single-order/single_order.php",
          { oid: chc },
          { withCredentials: true }
        );
        setDate(res.data.date);
        setMail(res.data.mail);
        setStatus(res.data.status);
        setForo(res.data.nth);
        setcusCHC(res.data.chc);
        sethello(res.data.hello);
        setOrderItemsTableData(res.data.item);

        setSource(res.data.source);
        setShipcity(res.data.shipcity);

        setshipstate(res.data.shipstate);
        setsa1(res.data.sa1);
        setsa2(res.data.sa2);

        setDis(res.data.discount);
        setshipcost(res.data.shipcost);
        settax(res.data.tax);
        settotal(res.data.amount);
      } catch {}
    };

    if(demo_check!=1){
      sinOrder();
    }else{
      const demoData = {
        date: '2023-12-31',
        mail: 'demo@example.com',
        status: 'Delivered',
        nth: 5,
        chc: 'DEMOCHC',
        hello: 'Demo Hello',
        item: [
          { name: 'Product A', unit: 1, Price: 10.00, amount: 10.00, profit: 2.00 },
          { name: 'Product B', unit: 2, Price: 20.00, amount: 40.00, profit: 8.00 },
          { name: 'Product C', unit: 3, Price: 15.00, amount: 45.00, profit: 6.00 }
        ],
        source: 'Demo Source',
        shipcity: 'Demo City',
        shipstate: 'Demo State',
        sa1: 'Demo Address 1',
        sa2: 'Demo Address 2',
        discount: 5.00,
        shipcost: 7.00,
        tax: 3.00,
        amount: 100.00
      };

      setDate(demoData.date);
      setMail(demoData.mail);
      setStatus(demoData.status);
      setForo(demoData.nth);
      setcusCHC(demoData.chc);
      sethello(demoData.hello);
      setOrderItemsTableData(demoData.item);
      setSource(demoData.source);
      setShipcity(demoData.shipcity);
      setshipstate(demoData.shipstate);
      setsa1(demoData.sa1);
      setsa2(demoData.sa2);
      setDis(demoData.discount);
      setshipcost(demoData.shipcost);
      settax(demoData.tax);
      settotal(demoData.amount);
    }

  }, []);

  var OrderItemsTableColumn = [
    {
      title: "Product",field: "name",
      render: (row)=>(<div style={{background: "mintcream",fontFamily: "system-ui",fontSize: "16px",textAlign: "left"}}>
                        {row.name}
                      </div>)
    },
    {title: "Unit",field: "unit",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.unit} </div>)},
    {title: "Price",field: "price",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.price} </div>)},
    {title: "Amount",field: "amount",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.amount} </div>)},
    {title: "Profit",field: "profit",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.profit} </div>)},
  ];

 

  return (
  
    <>

      <Grid>
        <p style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}> <ShoppingCartIcon style={{verticalAlign:"middle"}}/> :: {date}</p>
        <p style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}> Order    ::  {chc}     :: {status} </p>
        <p style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}> Customer ::  {mail}    :: {foro}</p>
        <p style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}>  Address  ::  {shipcity},{shipstate},{sa1},{sa2}</p>
      </Grid>

      <Grid container>
        
        <Grid item xl={4} lg={4} md={4}  sm={12} xs={12}>
          <h5 style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}>Discount :: {dis}</h5>
          <h5 style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}>Shipping-cost :: {shipcost}</h5>
          <h5 style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}>Tax :: {tax}</h5>
          <h5 style={{fontFamily: "monospace",fontSize:"16px",background:"white",width:'fit-content',padding:'1%'}}>Total :: {total}</h5>
        </Grid>

        <Grid item xl={6} lg={6} md={6}  sm={12} xs={12}>
          
          <ThemeProvider theme={defaultMaterialTheme}>
          
          <div>
            <MaterialTable
              columns={OrderItemsTableColumn}
              data={OrderItemsTableData}
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

              localization={{
                pagination: {
                  labelRowsPerPage: "",
                  showFirstLastPageButtons: false,
                  showPageSizeOptions: false,
                  showPageJump: false,
                },
              }}

              components={{

                Toolbar: (props) => (
                  <>
                    <MTableToolbar {...props}/>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center',marginTop:"-40px" }}>
                      <button style={{"background": "none","color": "slateblue", "border" : "0px"}}>
                        <div style={{"fontSize": "20px","borderLeft" : "1px solid","paddingLeft": "5px"}}> Order items</div>
                      </button>
                    </div>
                  </>
                ),

              }}
            />
          </div>
          
          </ThemeProvider>

        </Grid>

      </Grid>

    </>

  );
  
}

export default SingleOrder;
