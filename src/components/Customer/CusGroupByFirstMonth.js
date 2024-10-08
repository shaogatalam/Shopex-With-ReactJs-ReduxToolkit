import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { ThemeProvider, createTheme } from "@mui/material";

import { get_cus_groupBy1stMonthList } from "../../features/cus/CusListGroupBy1stBuy";
import { Card } from "react-bootstrap";

//import { makeStyles } from '@mui/material';

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

function CusGroupByFirstMonth() {

  var dispatch              = useDispatch();
  var defaultMaterialTheme  = createTheme();

  var accountType                     = useSelector((state) => state.dashTops.accountType);
  var groupByFirstOrderMonth          = useSelector((state) => state.cusGroupBy1stMonth);
  var get_cus_groupBy1stMonthListFlag = useSelector((state) => state.cusGroupBy1stMonth.get_cus_groupBy1stMonthListFlag);
  var[customer_Group_by_1st_purchase_month,setCustomer_Group_by_1st_purchase_month] = useState();

  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_cus_groupBy1stMonthList")) {
    //     ReactSession.set("get_cus_groupBy1stMonthList", "1");
    //     dispatch(get_cus_groupBy1stMonthList({ ajax_call: 2 }));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cus_groupBy1stMonthList")) {
        sessionStorage.setItem("get_cus_groupBy1stMonthList", "1");
        dispatch(get_cus_groupBy1stMonthList({ ajax_call: 2 }));
      }
    }

    if(accountType === "demo"){

      var CusGroupBy1stBuy_obj = [
      
        {
          FirstPurchase: "2022Feb",
          Customer: 100,
          Returned: 10,
          Orders: 120,
          Order_Per_customer: 1.2,
          Revenue: 5000,
          Revenue_per_customer: 50,
        },
        {
          FirstPurchase: "2022Mar",
          Customer: 110,
          Returned: 12,
          Orders: 130,
          Order_Per_customer: 1.18,
          Revenue: 5200,
          Revenue_per_customer: 47.27,
        },
        {
          FirstPurchase: "2022Apr",
          Customer: 120,
          Returned: 15,
          Orders: 140,
          Order_Per_customer: 1.17,
          Revenue: 6000,
          Revenue_per_customer: 50,
        },
        {
          FirstPurchase: "2022May",
          Customer: 125,
          Returned: 10,
          Orders: 145,
          Order_Per_customer: 1.16,
          Revenue: 5800,
          Revenue_per_customer: 46.4,
        },
        {
          FirstPurchase: "2022Jun",
          Customer: 130,
          Returned: 11,
          Orders: 150,
          Order_Per_customer: 1.15,
          Revenue: 6200,
          Revenue_per_customer: 47.69,
        },
        {
          FirstPurchase: "2022Jul",
          Customer: 135,
          Returned: 9,
          Orders: 155,
          Order_Per_customer: 1.15,
          Revenue: 6300,
          Revenue_per_customer: 46.67,
        },
        {
          FirstPurchase: "2022Aug",
          Customer: 140,
          Returned: 13,
          Orders: 160,
          Order_Per_customer: 1.14,
          Revenue: 6600,
          Revenue_per_customer: 47.14,
        },
        {
          FirstPurchase: "2022Sep",
          Customer: 145,
          Returned: 8,
          Orders: 165,
          Order_Per_customer: 1.14,
          Revenue: 6800,
          Revenue_per_customer: 46.9,
        },
        {
          FirstPurchase: "2022Oct",
          Customer: 150,
          Returned: 14,
          Orders: 170,
          Order_Per_customer: 1.13,
          Revenue: 7000,
          Revenue_per_customer: 46.67,
        },
        {
          FirstPurchase: "2022Nov",
          Customer: 155,
          Returned: 11,
          Orders: 175,
          Order_Per_customer: 1.13,
          Revenue: 7200,
          Revenue_per_customer: 46.45,
        },
        {
          FirstPurchase: "2022Dec",
          Customer: 160,
          Returned: 10,
          Orders: 180,
          Order_Per_customer: 1.12,
          Revenue: 7400,
          Revenue_per_customer: 46.25,
        },
        {
          FirstPurchase: "2023Jan",
          Customer: 165,
          Returned: 12,
          Orders: 185,
          Order_Per_customer: 1.12,
          Revenue: 7600,
          Revenue_per_customer: 45.76,
        },
      ];
      setCustomer_Group_by_1st_purchase_month(CusGroupBy1stBuy_obj);
    }

  }, [])

  

  useEffect(() => {

    if(groupByFirstOrderMonth !== undefined) {
      var CusGroupBy1stBuy    = groupByFirstOrderMonth?.cuslist_groupBy1stBuy ? groupByFirstOrderMonth.cuslist_groupBy1stBuy : [];
      if(CusGroupBy1stBuy && CusGroupBy1stBuy.length > 0){
        var CusGroupBy1stBuy_obj  = structuredClone(CusGroupBy1stBuy);
        setCustomer_Group_by_1st_purchase_month(CusGroupBy1stBuy_obj);
      }
    }else{
      console.log("cusGroupBy1stMonth reducer :: undefined");
    }

  },[get_cus_groupBy1stMonthListFlag])


  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;"
  //     }
  //   },
  // }));
  // var classes = useStyles();


  return (
    
    <Card className="dash-card">
    
      {customer_Group_by_1st_purchase_month !== undefined && customer_Group_by_1st_purchase_month && customer_Group_by_1st_purchase_month.length > 0 && (
    
        <ThemeProvider theme={defaultMaterialTheme}>
        
          <div>
          <MaterialTable
        
            columns=
            {[
            
              {
                title: "FirstPurchase", field: "FirstPurchase",
                render: (row) => 
                // <div style={{ background: "mintcream", fontFamily: "system-ui", fontSize: "16px", textAlign: "left",  }} > {row.FirstPurchase}</div>
                <h6 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.FirstPurchase} </h6>
              },
              
              {

                title: "Customers", type:"numeric",field: "Customer",
                render: (row) => (<strong style={{ background: "whitesmoke",display:'block' }}> {row.Customer}</strong>) ,
                customSort: (a, b) => a.Customer - b.Customer,
              
              },
              
              {
                title: "Returned", type:"numeric", field: "Returned",
                render: (row) => (<strong style={{ background: "whitesmoke",display:'block' }}>  {row.Returned}</strong>) ,
                customSort: (a, b) => a.Returned - b.Returned,
              
              },
              
              {
                title: "Orders", type:"numeric",field: "Orders",
                render: (row) => (<strong style={{ background: "whitesmoke",display:'block' }}> {row.Orders}</strong>),
                customSort: (a, b) => a.Orders - b.Orders,
              
              },
              
              {
                title: "Order/Customer", type:"numeric", field: "Order_Per_customer",
                render: (row) => (<strong style={{ background: "whitesmoke",display:'block' }}> {row.Order_Per_customer}</strong>),
                customSort: (a, b) => a.Order_Per_customer - b.Order_Per_customer,
              },
              
              {
                title: "Revenue",type:"numeric", field: "Revenue",
                render: (row) => (<strong style={{ background: "whitesmoke",display:'block' }}>  {row.Revenue}</strong>),
                customSort: (a, b) => a.Revenue - b.Revenue,
              },

              {
                title: "Rev/Customer",type:"numeric",  field: "Revenue_per_customer",
                render: (row) => (  <strong style={{ background: "whitesmoke",display:'block' }}> {row.Revenue_per_customer} </strong> ),
                customSort: (a, b) => a.Revenue_per_customer - b.Revenue_per_customer,
              }

            ]}

            data={customer_Group_by_1st_purchase_month}
            title="Customers Group By 1st Purchase Month"
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
    </Card>
  );
}

export default CusGroupByFirstMonth;
