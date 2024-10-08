import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { Bar } from 'react-chartjs-2';
import { get_tops } from "../../features/dash/DashTopsSlice";
import { format } from "date-fns";
import startOfYear from "date-fns/startOfYear";
import { addDays, subDays, getDate } from "date-fns";
import { get_init_data } from "../../features/dash/dashboard";
import "rsuite/dist/rsuite.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Card } from "react-bootstrap";

import { startOfMonth, endOfMonth, subMonths, isLastDayOfMonth, lastDayOfMonth } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "rsuite";
import { personaldata_ } from "../../features/profile/PersonalData";

import './SegmentLogStyle.css'; 

import DashRecentSales from "./DashRecentSales";
import DashCustomer from "./DashCustomer";



//import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Modal, Paper, TextField,Button,ThemeProvider, createTheme } from '@mui/material';
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
//import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
//import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';


import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler} from "chart.js";
import { Line } from "react-chartjs-2";
import DashTopItems from "./DashTopItems";
import DashBasket from "./DashBasket";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement,BarElement, Title, Tooltip, Legend,  Filler);



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

var segments = {
  "padding": "20px","marginLeft": "23px",
  "border": "0.5px dashed olivedrab","background": "white"
}

//__oid__nextval__sid__nextval__cid__

function DashTops() {

    var dispatch      = useDispatch();
    var shoptype      = useSelector((state) => state.dashTops.shoptype);
    var accountType   = useSelector((state) => state.dashTops.accountType);
    var rolePower     = useSelector((state) => state.dashTops.rolePower);
    var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);
    var status        = useSelector((state) => state.dashTops.status);
    var defaultMaterialTheme = createTheme();
    var today                     = new Date();
    var from                      = new Date(today.getFullYear(), today.getMonth(), 1);
    var to                        = today;
    var from1                     = subMonths(from, 1);
    var isLastDayTo               = isLastDayOfMonth(to);
    var to1                       = isLastDayTo ? lastDayOfMonth(subMonths(to, 1)) : subMonths(to, 1);
    var [daterange, setdrange]    = useState([from, to]);
    var [daterange1, setdrange1]  = useState([from1, to1]);
    //var [Current_shop,setShop]     = useState();
    var [duration, setduration]   = useState("monthly");


    var Order_numrev_shiploc_data = useSelector((state) => state.order_numrev_shipLoc_ChartTable);
    var basket_data               = useSelector((state) => state.dashTops);
    //var dash_tm                   = useSelector((state) => state.dashTops.ThisMonth);
    var dash_tops                 = useSelector((state) => state.dashTops);
    var corp                      = useSelector((state) => state.dash.corp_chart);
    var get_init_dataFlag         = useSelector((state) => state.dash.get_init_dataFlag);
    //var shopifyDiscountCodes_obj  = useSelector((state) => state.coupon?.shopifyDiscountCodes ?? {});

    var [rev_note, setRevNote]     = useState([]);
    var [prof_note, setProfNote]   = useState([]);
    var [cus_note, setCusNote]     = useState("");
    var [order_note, setOrderNote] = useState("");

    // var[segment_join,setsegment_join] = useState([]);
    // var[segment_drop,setsegment_drop] = useState([]);

    // var[thisMonthRepCustomerTableData,setthisMonthRepCustomerTableData] = useState();
    // var[thisMonthNewCustomerTableData,setthisMonthNewCustomerTableData] = useState();

    // var[thisMonthRepCustomerTableNote,setthisMonthRepCustomerTableNote] = useState();
    // var[thisMonthNewCustomerTableNote,setthisMonthNewCustomerTableNote] = useState();

    var[Citywise_delivery_table_data,setCitywise_delivery_table_data]                   = useState();
    
    var[RevProfit_chart_data_object,setRevProfit_chart_data_object]                     = useState();
    var[CustomerOrder_chart_data_object,setCustomerOrder_chart_data_object]             = useState();

    var[frequently_bought_together_table_data,setFrequently_bought_together_table_data] = useState();
    var[purchase_recom_table_data,setPurchase_recom_table_data]                         = useState();
    
   
    var [data_tpbr, setData_tpbr] = useState({ labels: [], datasets: [] });
    var [data_tpbu, setData_tpbu] = useState({ labels: [], datasets: [] });
    var [data_tpbp, setData_tpbp] = useState({ labels: [], datasets: [] });
    var [data_tcbr, setData_tcbr] = useState({ labels: [], datasets: [] });
    var [data_tcbu, setData_tcbu] = useState({ labels: [], datasets: [] });
    var [data_tcbp, setData_tcbp] = useState({ labels: [], datasets: [] });


    useEffect(() => {

      var labels                                = corp?.or_l ? corp.or_l.replace(/\"/g, "").split(",") : [];
      
      var RevProfit_chart_dataset_Revdata       = corp?.rev_d ? corp.rev_d.replace(/\"/g, "").split(",") : [];
      var RevProfit_chart_dataset_Prodata       = corp?.prof_d ? corp.prof_d.replace(/\"/g, "").split(",") : [];
    
      var CustomerOrder_chart_dataset_Cusdata   = corp?.cus_d ? corp.cus_d.replace(/\"/g, "").split(",") : [];
      var CustomerOrder_chart_dataset_Orderdata = corp?.or_d ? corp.or_d.replace(/\"/g, "").split(",") : [];


      var RevProfit_chart_data_object_ = {
        labels: labels,
        datasets: [
          {
            id:3,
            labels: labels,
            label: 'Revenue',
            borderColor: "rgba(106, 90, 205, 1)",
            fill: true,
            pointRadius: 6,
            hoverRadius: 14,
            borderWidth: 1,
            data: RevProfit_chart_dataset_Revdata,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
              gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              return gradient;
            },
          }, 
          
          {
            id:4,
            labels: labels,
            label: 'Profit',
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            pointRadius: 6,hoverRadius: 14,
            borderWidth: 1,
            data: RevProfit_chart_dataset_Prodata,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
              gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              return gradient;
            },

        }],

      }
      setRevProfit_chart_data_object(RevProfit_chart_data_object_);

      var CustomerOrder_chart_data_object_ = {
        labels: labels,
        datasets: [{
          id:1,
          labels: labels,
          label: 'Customer',
          borderColor: "#08FAFA",
          borderWidth: 1,
          pointRadius: 6,hoverRadius: 14,
          data: CustomerOrder_chart_dataset_Cusdata,
          fill:true,

          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(37, 150, 190, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
        {
          id:2,
          labels: labels,
          label: 'Order',
          fill:true,
          borderColor: "mediumaquamarine",
          borderWidth: 1,
          pointRadius: 6,hoverRadius: 14,
          data: CustomerOrder_chart_dataset_Orderdata,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(60, 179, 113, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        }]
      }
      setCustomerOrder_chart_data_object(CustomerOrder_chart_data_object_);
      
      setRevNote(corp?.rev_note ? corp.rev_note.split("OO") : []);
      setProfNote(corp?.profit_note ? corp.profit_note.split("OO") : []);
      setCusNote(corp?.cus_note ?? "");
      setOrderNote(corp?.order_note ?? "");

    },[get_init_dataFlag])



    useEffect(() => {

      if (accountType === "paid") {
        if (!sessionStorage.getItem("get_tops")) {
          sessionStorage.setItem("get_tops", "1");
          dispatch(get_tops());
        }
      
        if (!sessionStorage.getItem("get_init_data")) {
          sessionStorage.setItem("get_init_data", "1");
          dispatch(get_init_data({ ajax_call: 2 }));
        }
      
        if (!sessionStorage.getItem("personaldata_")) {
          sessionStorage.setItem("personaldata_", "1");
          dispatch(personaldata_({ type: 1 }));
        }
      
        setApiState();
      }
     

      if(accountType==="demo") {

        console.log(accountType);
        setRevNote(["70 Vs 0 [0]","70 Vs 0 [0]","70 Vs 0 [0]"]);
        setProfNote(["6000 Vs [0]","620 Vs 0 [0]"]);
        setCusNote(["1 Vs 0 [0]"]);
        setOrderNote(["1 Vs 0 [0]"]);
      
        var RevProfit_chart_dataset_Revdata = [120, 150, 200, 180, 250, 210];
        var RevProfit_chart_dataset_Prodata = [30, 45, 50, 40, 60, 55];
        var labels                          = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; 
        var RevProfit_chart_data_object_ = {
          labels: labels,
          datasets: [
            {
              id:3,
              labels: labels,
              label: 'Revenue',
              borderColor: "rgba(106, 90, 205, 1)",
              fill: true,
              pointRadius: 6,
              hoverRadius: 14,
              borderWidth: 1,
              data: RevProfit_chart_dataset_Revdata,
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                return gradient;
              },
            },
            {
              id:4,
              labels: labels,
              label: 'Profit',
                borderColor: 'rgb(255, 88, 0)',
                fill: true,
                pointRadius: 6,
                hoverRadius: 14,
                borderWidth: 1,
                data: RevProfit_chart_dataset_Prodata,
                backgroundColor: (ctx) => {
                  const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
                  gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
                  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                  return gradient;
                },
  
            },
          ],
        };
        setRevProfit_chart_data_object(RevProfit_chart_data_object_);
  
        var CustomerOrder_chart_dataset_Cusdata = [50, 60, 70, 65, 80, 75];
        var CustomerOrder_chart_dataset_Orderdata = [10, 12, 15, 14, 18, 16]; 
        var CustomerOrder_chart_data_object_ = {
          labels: labels,
          datasets: [
            {
              id:1,
              labels: labels,
              label: 'Customer',
              borderColor: "#08FAFA",
              borderWidth: 1,
              pointRadius: 6,
              hoverRadius: 14,
              data: CustomerOrder_chart_dataset_Cusdata,
              fill:true,
  
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(37, 150, 190, 0.8)'); // Solid color near the line
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                return gradient;
              },
            },
            {
              id:2,
              labels: labels,
              label: 'Order',
              fill:true,
              borderColor: "mediumaquamarine",
              borderWidth: 1,
              pointRadius: 6,
              hoverRadius: 14,
              data: CustomerOrder_chart_dataset_Orderdata,
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(60, 179, 113, 0.8)'); // Solid color near the line
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
                return gradient;
              },
            },
          ],
  
        };
        setCustomerOrder_chart_data_object(CustomerOrder_chart_data_object_);
  
      
        
        var Citywise_delivery_table_data = [
          {
              city: "New York",
              total_order: 1500,
              total_order_change: "+10%",
              total_order_rev: 35000,
              total_order_amount_change: "-5%",
              new_order: 600,
              new_order_change: "+15%",
              new_order_rev: 18000,
              new_order_rev_change: "+8%",
              ret_order: 900,
              ret_order_change: "-5%",
              ret_order_rev: 17000,
              ret_order_rev_change: "-4%",
              avg_order_rev: 350,
              avg_order_rev_change: "+2%",
              order_profit: 12000,
              order_profit_change: "-3%",
          },
  
          {
            city: "Los Angeles",
            total_order: 1200,
            total_order_change: "-5%",
            total_order_rev: 28000,
            total_order_amount_change: "+8%",
            new_order: 500,
            new_order_change: "+10%",
            new_order_rev: 15000,
            new_order_rev_change: "+6%",
            ret_order: 700,
            ret_order_change: "-8%",
            ret_order_rev: 13000,
            ret_order_rev_change: "-5%",
            avg_order_rev: 350,
            avg_order_rev_change: "+1%",
            order_profit: 9000,
            order_profit_change: "+2%",
          },
  
          {
            city: "Chicago",
            total_order: 1000,
            total_order_change: "+2%",
            total_order_rev: 24000,
            total_order_amount_change: "-3%",
            new_order: 450,
            new_order_change: "+7%",
            new_order_rev: 13000,
            new_order_rev_change: "+5%",
            ret_order: 550,
            ret_order_change: "-1%",
            ret_order_rev: 11000,
            ret_order_rev_change: "-2%",
            avg_order_rev: 350,
            avg_order_rev_change: "+3%",
            order_profit: 8000,
            order_profit_change: "-6%",
          },
  
          {
            city: "Houston",
            total_order: 900,
            total_order_change: "-3%",
            total_order_rev: 21000,
            total_order_amount_change: "+5%",
            new_order: 400,
            new_order_change: "+8%",
            new_order_rev: 12000,
            new_order_rev_change: "+4%",
            ret_order: 500,
            ret_order_change: "-5%",
            ret_order_rev: 9000,
            ret_order_rev_change: "-3%",
            avg_order_rev: 350,
            avg_order_rev_change: "-2%",
            order_profit: 7000,
            order_profit_change: "+1%",
          },
  
          {
            city: "Miami",
            total_order: 750,
            total_order_change: "+1%",
            total_order_rev: 18000,
            total_order_amount_change: "-2%",
            new_order: 350,
            new_order_change: "+6%",
            new_order_rev: 11000,
            new_order_rev_change: "+3%",
            ret_order: 400,
            ret_order_change: "-3%",
            ret_order_rev: 7000,
            ret_order_rev_change: "-1%",
            avg_order_rev: 350,
            avg_order_rev_change: "+4%",
            order_profit: 6000,
            order_profit_change: "-4%",
          },
  
          {
            city: "Dallas",
            total_order: 850,
            total_order_change: "-2%",
            total_order_rev: 20000,
            total_order_amount_change: "+4%",
            new_order: 380,
            new_order_change: "+4%",
            new_order_rev: 11500,
            new_order_rev_change: "+2%",
            ret_order: 470,
            ret_order_change: "-2%",
            ret_order_rev: 8500,
            ret_order_rev_change: "-2%",
            avg_order_rev: 350,
            avg_order_rev_change: "+5%",
            order_profit: 6500,
            order_profit_change: "-5%",
          },
  
          {
            city: "San Francisco",
            total_order: 1300,
            total_order_change: "+7%",
            total_order_rev: 31000,
            total_order_amount_change: "-8%",
            new_order: 580,
            new_order_change: "+12%",
            new_order_rev: 17500,
            new_order_rev_change: "+10%",
            ret_order: 720,
            ret_order_change: "+5%",
            ret_order_rev: 13500,
            ret_order_rev_change: "+6%",
            avg_order_rev: 350,
            avg_order_rev_change: "-1%",
            order_profit: 10000,
            order_profit_change: "+7%",
          },
  
          {
            city: "Seattle",
            total_order: 1100,
            total_order_change: "+4%",
            total_order_rev: 26000,
            total_order_amount_change: "-7%",
            new_order: 520,
            new_order_change: "+9%",
            new_order_rev: 16000,
            new_order_rev_change: "+7%",
            ret_order: 580,
            ret_order_change: "+2%",
            ret_order_rev: 10000,
            ret_order_rev_change: "+3%",
            avg_order_rev: 350,
            avg_order_rev_change: "-3%",
            order_profit: 8500,
            order_profit_change: "+4%",
          },
  
          {
            city: "Boston",
            total_order: 950,
            total_order_change: "-1%",
            total_order_rev: 22000,
            total_order_amount_change: "+2%",
            new_order: 430,
            new_order_change: "+5%",
            new_order_rev: 12500,
            new_order_rev_change: "+3%",
            ret_order: 520,
            ret_order_change: "-4%",
            ret_order_rev: 9500,
            ret_order_rev_change: "-5%",
            avg_order_rev: 350,
            avg_order_rev_change: "+6%",
            order_profit: 7500,
            order_profit_change: "-2%",
          },
        
          {
            city: "Atlanta",
            total_order: 800,
            total_order_change: "-4%",
            total_order_rev: 19000,
            total_order_amount_change: "+3%",
            new_order: 380,
            new_order_change: "+3%",
            new_order_rev: 11500,
            new_order_rev_change: "+1%",
            ret_order: 420,
            ret_order_change: "-6%",
            ret_order_rev: 7500,
            ret_order_rev_change: "-4%",
            avg_order_rev: 350,
            avg_order_rev_change: "+7%",
            order_profit: 7000,
            order_profit_change: "-1%",
          },
        ];
        var Citywise_delivery_table_data = Citywise_delivery_table_data.sort((a, b) => a.total_order - b.total_order);
        setCitywise_delivery_table_data(Citywise_delivery_table_data);
  
        // var thisMonthNewCustomerTableData = [
        //   { "customer": "John Smith","email":"JohnSmith@mail.com", "spend": 1500 },
        //   { "customer": "Emily Johnson","email":"Emily@mail.com", "spend": 2000 },
        //   { "customer": "Michael Davis","email":"Michael@mail.com", "spend": 1200 },
        //   { "customer": "Sophia Wilson","email":"Sophia@mail.com", "spend": 1800 },
        //   { "customer": "William Taylor","email":"William@mail.com", "spend": 2200 },
        //   { "customer": "Olivia Miller","email":"Olivia@mail.com", "spend": 1700 },
        //   { "customer": "Daniel Anderson","email":"Daniel@mail.com", "spend": 1300 },
        //   { "customer": "Isabella Moore","email":"Isabella@mail.com", "spend": 1900 },
        //   { "customer": "Liam Jackson","email":"Liam@mail.com", "spend": 2100 },
        //   { "customer": "Ava White","email":"Ava@mail.com", "spend": 1400 },
        //   { "customer": "Elijah Harris","email":"Elijah@mail.com", "spend": 1600 },
        //   { "customer": "Mia Martin","email":"Mia@mail.com", "spend": 2300 },
        //   { "customer": "Henry Brown","email":"Henry@mail.com", "spend": 1100 },
        //   { "customer": "Sofia Davis","email":"Sofia@mail.com", "spend": 2500 },
        //   { "customer": "Jackson Clark","email":"Jackson@mail.com", "spend": 2700 },
        //   { "customer": "Chloe Lewis","email":"Chloe@mail.com", "spend": 2600 },
        //   { "customer": "Alexander Young","email":"Alexander@mail.com", "spend": 2000 },
        //   { "customer": "Amelia Walker","email":"Amelia@mail.com", "spend": 2200 },
        //   { "customer": "Benjamin Hall","email":"Benjamin@mail.com", "spend": 2400 },
        //   { "customer": "Ella Turner","email":"Ella@mail.com", "spend": 2100 }
        // ];
        // setthisMonthNewCustomerTableData(thisMonthNewCustomerTableData);
  
        // var thisMonthRepCustomerTableData = [
        //   { "customer": "John Smith","email":"Ella@mail.com", "spend": 1500, "ret_after": 2, "placed_Nth_order": 3 },
        //   { "customer": "Emily Johnson","email":"Ella@mail.com", "spend": 2000, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Michael Davis","email":"Ella@mail.com", "spend": 1200, "ret_after": 3, "placed_Nth_order": 5 },
        //   { "customer": "Sophia Wilson","email":"Ella@mail.com", "spend": 1800, "ret_after": 2, "placed_Nth_order": 4 },
        //   { "customer": "William Taylor","email":"Ella@mail.com", "spend": 2200, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Olivia Miller","email":"Ella@mail.com", "spend": 1700, "ret_after": 2, "placed_Nth_order": 3 },
        //   { "customer": "Daniel Anderson","email":"Ella@mail.com", "spend": 1300, "ret_after": 3, "placed_Nth_order": 5 },
        //   { "customer": "Isabella Moore","email":"Ella@mail.com", "spend": 1900, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Liam Jackson","email":"Ella@mail.com", "spend": 2100, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Ava White","email":"Ella@mail.com", "spend": 1400, "ret_after": 3, "placed_Nth_order": 4 },
        //   { "customer": "Elijah Harris","email":"Ella@mail.com", "spend": 1600, "ret_after": 2, "placed_Nth_order": 3 },
        //   { "customer": "Mia Martin","email":"Ella@mail.com", "spend": 2300, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Henry Brown","email":"Ella@mail.com", "spend": 1100, "ret_after": 3, "placed_Nth_order": 4 },
        //   { "customer": "Sofia Davis","email":"Ella@mail.com", "spend": 2500, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Jackson Clark","email":"Ella@mail.com", "spend": 2700, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Chloe Lewis","email":"Ella@mail.com", "spend": 2600, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Alexander Young","email":"Ella@mail.com", "spend": 2000, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Amelia Walker","email":"Ella@mail.com", "spend": 2200, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Benjamin Hall","email":"Ella@mail.com", "spend": 2400, "ret_after": 1, "placed_Nth_order": 2 },
        //   { "customer": "Ella Turner","email":"Ella@mail.com", "spend": 2100, "ret_after": 1, "placed_Nth_order": 2 }
        // ];
        // setthisMonthRepCustomerTableData(thisMonthRepCustomerTableData);
  
        // shopifyDiscountCodes_obj = [
        //   { DiscountCode: 'SAVE10', PriceRuleId: 'PR123' },
        //   { DiscountCode: 'SAVE20', PriceRuleId: 'PR456' },
        //   { DiscountCode: 'SAVE30', PriceRuleId: 'PR456' },
        //   { DiscountCode: 'SAVE40', PriceRuleId: 'PR456' },
        //   { DiscountCode: 'SAVE50', PriceRuleId: 'PR456' }
        // ];
  
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
        setPurchase_recom_table_data(purchase_recom_table_data);
  
        var frequently_bought_together_table_data_ = [
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
        setFrequently_bought_together_table_data(frequently_bought_together_table_data_);
  
        setData_tpbr({
          labels: [
            "Yellow Gizmo (7.5%)",
            "Silver Doohickey (9.375%)",
            "Red Widget (10%)",
            "White Gizmo (11.875%)",
            "Purple Thingamajig (11.25%)",
            "Orange Apparatus (12.5%)",
            "Black Widget (13.75%)",
            "Blue Widget (15%)",
            "Gold Contraption (16.875%)",
            "Green Gadget (20%)"
          ],
          datasets: [
            {
              label: 'Revenue',
              data: [600, 750, 800, 950, 900, 1000, 1100, 1200, 1350, 1600],
              backgroundColor: '#ff7f50'
            }
          ]
        });
        
        setData_tpbu({
          labels: [
            "Accessory B (7.5%)",
            "Component G (9%)",
            "Appliance A (10%)",
            "Machine F (11%)",
            "Widget X (10%)",
            "Item E (14%)",
            "Tool Z (15%)",
            "Product D (17.5%)",
            "Device C (20%)",
            "Gadget Y (20%)"
          ],
          datasets: [
            {
              label: 'Unit sold',
              data: [15, 18, 20, 22, 25, 28, 30, 35, 40, 50],
              backgroundColor: '#6dd47e'
            }
          ]
        });
  
        setData_tpbp({
          labels: [
            "Fantastic Gizmo B (11%)",
            "Gizmo Y (12%)",
            "Mega Gizmo E (13%)",
            "Widget X (15%)",
            "Amazing Thing C (16%)",
            "Thingamajig Z (18%)",
            "Ultra Thingamajig F (19%)",
            "Super Widget A (20%)",
            "Superior Widget G (21%)",
            "Incredible Widget D (22%)"
          ],
          datasets: [
            {
              label: 'Profit',
              data: [1100, 1200, 1300, 1500, 1600, 1800, 1900, 2000, 2100, 2200],
              backgroundColor: '#00bfff'
            }
          ]
        });
        
  
        setData_tcbr({
          labels: [
            "Books (22%)",
            "Toys (28%)",
            "Jewelry (29%)",
            "Sports Equipment (38%)",
            "Clothing (35%)",
            "Beauty Products (41%)",
            "Furniture (45%)",
            "Groceries (55%)",
            "Electronics (50%)",
            "Home Appliances (62%)"
          ],
          datasets: [
            {
              label: 'Revenue',
              data: [2200, 2800, 2900, 3500, 3800, 4100, 4500, 5000, 5500, 6200],
              backgroundColor: '#ff7f50'
            }
          ]
        });
  
        setData_tcbu({
          labels: [
            "Jewelry (5%)",
            "Toys (7.5%)",
            "Sports Equipment (10%)",
            "Electronics (10%)",
            "Beauty Products (14%)",
            "Home Appliances (15%)",
            "Furniture (17.5%)",
            "Books (20%)",
            "Clothing (20%)",
            "Food and Beverages (30%)"
          ],
          datasets: [
            {
              label: 'Unit sold',
              data: [10, 15, 20, 25, 28, 30, 35, 40, 50, 60],
              backgroundColor: '#6dd47e'
            }
          ]
        });
  
        setData_tcbp({
          labels: [
            "Toys (6%)",
            "Books (9%)",
            "Jewelry (7.5%)",
            "Food & Beverages (11%)",
            "Home Decor (12%)",
            "Beauty Products (15%)",
            "Clothing (18%)",
            "Furniture (22%)",
            "Electronics (25%)",
            "Sports Equipment (28%)"
          ],
          datasets: [
            {
              label: 'Profit',
              data: [600, 900, 750, 1100, 1200, 1500, 1800, 2200, 2500, 2800],
              backgroundColor: '#00bfff'
            }
          ]
        });

      }

    }, []);


    var setApiState = () => {
      
      var shipcityTable  = Order_numrev_shiploc_data?.shipcity_table ?? [];
      if (shipcityTable.length > 0) {
        var Citywise_delivery_table_data_ = structuredClone(shipcityTable);
        var Citywise_delivery_table_data_ = Citywise_delivery_table_data_.sort((a, b) => a.total_order - b.total_order);
        setCitywise_delivery_table_data(Citywise_delivery_table_data_);
      }

      var fbt  = basket_data?.fbt_table ?? [];
      if (fbt.length > 0) {
        var frequently_bought_together_table_data_ = structuredClone(fbt);
        var frequently_bought_together_table_data_ = frequently_bought_together_table_data_.sort((a, b) => a.bought_together - b.bought_together);
        setFrequently_bought_together_table_data(frequently_bought_together_table_data_);
      }


      var associatiol_rule  = basket_data?.associatiol_rule_table ?? [];
      if (associatiol_rule.length > 0) {
        var purchase_recom_table_data_ = structuredClone(associatiol_rule);
        var purchase_recom_table_data_ = purchase_recom_table_data_.sort((a, b) => a.confidence - b.confidence);
        setPurchase_recom_table_data(purchase_recom_table_data_);
      }

      if (dash_tops && dash_tops.tops) {

        var tops = dash_tops.tops;

        var tpbr = tops.tpbr;
        if (Array.isArray(tpbr)) {
          var sorted_tpbr = tpbr.slice().sort((a, b) => a.revenue - b.revenue);
          var data_tpbr = {
              labels: sorted_tpbr.map((product) => `${product.proname} (${product.percent}%)`),
              datasets: [
                  {
                      label: 'Revenue',
                      data: sorted_tpbr.map((product) => product.revenue),
                      backgroundColor: '#ff7f50',
                  },
              ],
          };
          setData_tpbr(data_tpbr);
        } 
        
        var tpbu = tops.tpbu;  
        if (Array.isArray(tpbu)) {
          var sorted_tpbu = tpbu.slice().sort((a, b) => a.unit - b.unit);
          var data_tpbu = {
            labels: sorted_tpbu.map((product) => `${product.proname} (${product.percent}%)`),
            datasets: [
              {
                label: 'Unit sold',
                data: sorted_tpbu.map((product) => product.unit),
                backgroundColor: '#6dd47e',
              },
            ],
          };
          setData_tpbu(data_tpbu);
        }
  
        var tpbp = tops.tpbp;
        if (Array.isArray(tpbp)) {
          var sorted_tpbp = tpbp.slice().sort((a, b) => a.profit - b.profit);
          var data_tpbp = {
            labels: sorted_tpbp.map((product) => `${product.proname} (${product.percent}%)`),
            datasets: [
              {
                label: 'Profit',
                data: sorted_tpbp.map((product) => product.profit),
                backgroundColor: '#00bfff', 
              },
            ],
          };
          setData_tpbp(data_tpbp);
        }
  
        var tcbr  =tops.tcbr;
        if (Array.isArray(tcbr)) {
          var sorted_tcbr = tcbr.slice().sort((a, b) => a.revenue - b.revenue);
          var data_tcbr = {
            labels: sorted_tcbr.map((category) => `${category.category} (${category.percent}%)`),
            datasets: [
              {
                label: 'Revenue',
                data: sorted_tcbr.map((category) => category.revenue),
                backgroundColor: '#ff7f50',
              },
            ],
          };
          setData_tcbr(data_tcbr);
        }
  
        var tcbu = tops.tcbu;
        if (Array.isArray(tcbu)) {
          var sorted_tcbu = tcbu.slice().sort((a, b) => a.unit - b.unit);
          var data_tcbu = {
            labels: sorted_tcbu.map((category) => `${category.category} (${category.percent}%)`),
            datasets: [
              {
                label: 'Unit sold',
                data: sorted_tcbu.map((category) => category.unit),
                backgroundColor: '#6dd47e',
              },
            ],
          };
          setData_tcbu(data_tcbu);
        }
        
        var tcbp = tops.tcbp;
        if (Array.isArray(tcbp)) {
          var sorted_tcbp = tcbp.slice().sort((a, b) => a.profit - b.profit);
          var data_tcbp = {
            labels: sorted_tcbp.map((category) => `${category.category} (${category.percent}%)`),
            datasets: [
              {
                label: 'Profit',
                data: sorted_tcbp.map((category) => category.profit),
                backgroundColor: '#00bfff', 
              },
            ],
          };
          setData_tcbp(data_tcbp);
        }

      }

    }

 

    var frequently_bought_together_table_column = [
  
      { title: "Product-set", 
        field: "product_group", render: (row) => <h5 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.product_group} </h5> 
      },
      
      { title: "Bought", field: "bought_together",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.bought_together)} </strong> ), 
        customSort: (a, b) => { return a.bought_together - b.bought_together; },
        type: "numeric",
      },
    ];

    var purchase_recom_table_column = [
  
      { title: "if-buy", 
        field: "if_buy", render: (row) => <h5 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.if_buy} </h5> 
      },
      
      { title: "Then-buy", field: "then_buy",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.then_buy)} </strong> )},

      { title: "Confidence", field: "confidence",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.confidence)} </strong> ), 
        customSort: (a, b) => { return a.confidence - b.confidence; },
       
      },

      { title: "% of total", field: "n_percent_of_all_transaction",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {(row.n_percent_of_all_transaction)} </strong> ), 
        customSort: (a, b) => { return a.n_percent_of_all_transaction - b.n_percent_of_all_transaction; },
        
      },

    ];

    var Citywise_delivery_table_column = [
  
      { title: <LocationOnIcon style={{color: "tomato",borderBottom: "3px dashed red",width: "33px", fontSize: "30px"}}/>, 
        field: "city", render: (row) => <h5 style={{backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)",textAlign:'left'}}> {row.city} </h5> 
      },
      
      { title: "Order",field: "total_order",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {parseInt(row.total_order)} </strong> ), 
        customSort: (a, b) => { return a.total_order - b.total_order; },
        type: "numeric",
      },

      { title: "Change",field: "total_order_change",type: "numeric",render: (row) => ( <strong style={{background: "whitesmoke",display:'block'}}> {row.total_order_change} </strong> ), 
        customSort: (a, b) => a.total_order_change - b.total_order_change
      },
     
      { title: "Revenue",field: "total_order_rev",render: (row) => (<strong style={{background: "whitesmoke",display:'block'}}> {parseInt(row.total_order_rev)} </strong>),
        customSort: (a, b) => a.total_order_rev - b.total_order_rev,
        type: "numeric",
      },
       
      { title: "Change",field:"total_order_amount_change",type: "numeric",render:(row)=>( <strong style={{background: "whitesmoke",display:'block'}}>{row.total_order_amount_change}</strong>),
        customSort: (a, b) =>a.total_order_amount_change - b.total_order_amount_change
      },

    ];

    // var [daterange, setdrange] = useState([ new Date(moment().startOf("month")),  new Date(moment().endOf("month"))]);
    // var [daterange1, setdrange1] = useState([startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]);

    var dateSubmit = (e) => {

      e.preventDefault();
      if(accountType === "paid"){
        dispatch(
          get_init_data({
            from: (daterange[0], "yyyy-MM-dd"),
            to: format(daterange[1], "yyyy-MM-dd"),
            from1: format(daterange1[0], "yyyy-MM-dd"),
            to1: format(daterange1[1], "yyyy-MM-dd"),
            unit: duration,
            ajax_call: 1,
          })
        );
      }
    };

    var Y_axis_line_plugin = {
      id: 'tooltipLine',
      beforeDraw: (chart) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          var ctx = chart.ctx;
          ctx.save();
          var activePoint = chart.tooltip._active[0];
          ctx.beginPath();
          ctx.setLineDash([5, 15]);
          ctx.moveTo(activePoint.element.x, chart.chartArea.top);
          ctx.lineTo(activePoint.element.x, activePoint.element.y); // Use activePoint.element.y
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'grey';
          ctx.stroke();
          ctx.restore();
    
          ctx.beginPath();
          ctx.moveTo(activePoint.element.x, activePoint.element.y);
          ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(255, 99, 132, 1)'; // Remove spaces within rgba()
          ctx.stroke();
          ctx.restore();
        }
      },
      
    };

    var CustomLabelShow = {
      
      id: 'CustomLevelShow',
    
      afterDraw: (chart, easing) => {
        
        chart.data.labels = chart.data.labels.map((label, index) => {
          return chart.data.datasets[0].labels[index];
        });

        if(chart.tooltip._active.length){
          var activePoint = chart.tooltip._active;
        }
          
        var Current_datasetIndex=0;
        if (chart.tooltip._active.length) {
          chart.tooltip._active.forEach((activePoint, index) => {
            Current_datasetIndex = activePoint.datasetIndex;
          });
        }
        
        if (activePoint) {

          var dataPoints = chart.tooltip.dataPoints;

          dataPoints.forEach((dataPoint, index) => {
          
            var selected_datapoint_index = dataPoint.dataIndex;
          
            var selected_dataset_id      = dataPoint.dataset.id;

            var original_labels = dataPoint.dataset.ls;
          
            var flag = 0;

            chart.data.datasets.forEach((dataset,index) => {
          
              if (dataset.id === selected_dataset_id && flag === 0) {
  
                var dataset_name = dataset.label;
                
                if (typeof dataset_name === 'string') {
                  
                  // Split the string into words
                  var words = dataset_name.split(' ');
              
                  if (words.length === 1) {
                    // Single-word string, take the first 3 characters
                    dataset_name =  dataset_name.slice(0, 3);
                    
                  } else {
                    // Multi-word string, take the first character of each word
                    dataset_name =  words.map(word => word[0]).join('');
                  }

                }

                var selected_index_data = dataset.data[selected_datapoint_index];

                chart.data.labels.forEach((label,index) => {

                  if(index > selected_datapoint_index) {

                    var dataPoint = dataset.data[index];

                    var change_in_percentage = ((dataPoint - selected_index_data) / selected_index_data) * 100;
                    
                    if (change_in_percentage > 0) {
                      if (Array.isArray(label)) {
                        // If the label is already an array, insert the change_in_percentage
                        label.push(dataset_name + ' : +' + change_in_percentage.toFixed(1) + '%');
                      } else {
                        // If the label is a string, create a new array
                        label = [label, dataset_name + ' : +' + change_in_percentage.toFixed(1) + '%'];
                      }
                    } else if (change_in_percentage === 0) {
                      // If the change is 0, keep the label as is
                    } else if (change_in_percentage < 1) {
                      if (Array.isArray(label)) {
                        // If the label is already an array, insert the change_in_percentage
                        label.push(dataset_name + ' :' + change_in_percentage.toFixed(1) + '%');
                      } else {
                        // If the label is a string, create a new array
                        label = [label, dataset_name + ' : ' + change_in_percentage.toFixed(1) + '%'];
                      }
                    }
                    
                    chart.data.labels[index] = label; 
                  
                  }else{
                    chart.data.labels[index] = label; 
                  }

                })

                chart.options.scales.x.ticks.maxRotation = 90;
                chart.options.scales.x.ticks.minRotation = 0;
                chart.update();
              }
            });
          });
          
        
          dataPoints.forEach((dataPoint, index) => {
          
            var sum     = 0;
            var min     = 999999999999999;
            var max     = 0;
            var average = 0;

            var selected_datapoint_index = dataPoint.dataIndex;
            var selected_dataset_id      = dataPoint.dataset.id;

            var flag_A = 0; 

            chart.data.datasets.forEach((dataset,index) => {
          
              if (dataset.id === selected_dataset_id && flag_A === 0) {
                
                flag_A = 1;
                var datasetValues = dataset.data;
                sum     = 0;
                min     = 999999999999999;
                max     = 0;
                average = 0;
                for (let i = selected_datapoint_index; i < datasetValues.length; i++) {
                  var value = datasetValues[i];
                  sum += value;
                  min = Math.min(min, value);
                  max = Math.max(max, value);
                }
                //var denominator = datasetValues.length - selected_datapoint_index - 1;
                var denominator = datasetValues.length - selected_datapoint_index;
                if (denominator === 0) {
                  average = value; 
                } else {
                  average = sum / denominator;
                }

                dataset.tooltipLabel = 'Sum=' + sum.toFixed(1) + ' :: Min=' + min.toFixed(1) + ' :: Max=' + max.toFixed(1) + ' :: Avg=' + average.toFixed(1);

              }
            
            })

            // Modify the tooltip content for the tooltips of each dataset
            chart.tooltip.options.callbacks.label = (tooltipItem, data) => {
              var defaultLabel = tooltipItem.dataset.label + ' : ' + tooltipItem.formattedValue;
              var customLabel  = tooltipItem.dataset.tooltipLabel;
              return defaultLabel + ' :: ' + customLabel;
            };
            chart.update();
          
          });

        }

      }

    }; 

    var chartOptions = {

      maintainAspectRatio: false,
      
      responsive: true,

      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: true, 
          },
          ticks: {
            maxTicksLimit: 50, // Set the maximum number of labels to display
          },
        },

        y: {
          beginAtZero: true,
          position: 'right', 
          grid: {
            display: false,
          },
        },
      
      },

      elements: {
        line: {
          tension: 0.1,
        },
        point: {
          radius: 8,
          borderWidth: 2,
        },
      },
    };

    var plugins = [Y_axis_line_plugin,CustomLabelShow]


  return (
  
    <>
    
      
      <Grid container style={{padding:"0px"}}>
        
        <div className="date-period" style={{ margin: "10px 10px 10px 0px" }}>
        
          <a href="http://localhost:8080/oauth2/authorization/google">Sign Up with Google</a>
          <a href=" http://localhost:8080/oauth2/authorization/github">Sign Up with GitHub</a>
         

          <DateRangePicker
            value={daterange}
            onChange={setdrange}
            oneTap={false}
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

          <DateRangePicker
            value={daterange1}
            onChange={setdrange1}
            oneTap={false}
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

          <RadioGroup style={{ display:"inline-block",fontSize:"13px",color:"white",fontWeight:"500" }} onChange={(e)=>{setduration(e.target.value);}}>
            <Radio checked={duration === "daily"} value="daily" name="duration" />Day
            <Radio checked={duration === "weekly"} value="weekly" name="duration" /> Week
            <Radio checked={duration === "monthly"} value="monthly" name="duration" /> Month
          </RadioGroup>
          
          <Button className="period-btn" variant="contained" color="secondary" onClick={dateSubmit}>Submit</Button>
        
        </div>

      </Grid>

        
      <Grid container spacing={2}>
        
          <Grid item xl={6} lg={6} md={6}  sm={12} xs={12}>
          
            <Card style={{height:"300px",width:'97%'}} className="dash-card">
              
              <h6>Revenue & Profit</h6>
                { 
                  RevProfit_chart_data_object && 
                  RevProfit_chart_data_object.labels && 
                  Array.isArray(RevProfit_chart_data_object.labels) && 
                  RevProfit_chart_data_object.datasets && 
                  Array.isArray(RevProfit_chart_data_object.datasets) &&
                  RevProfit_chart_data_object.datasets.length > 0 && 
                  <Line data={RevProfit_chart_data_object}  plugins={plugins} options={chartOptions}/> 
                }
            </Card>

            <Card style={{height:"300px",width:'97%',marginTop:'10px'}} className="dash-card">
              
              <h6> Customer & Order </h6>
              
              { 
                CustomerOrder_chart_data_object && 
                CustomerOrder_chart_data_object.labels && 
                Array.isArray(CustomerOrder_chart_data_object.labels) && 
                CustomerOrder_chart_data_object.datasets && 
                Array.isArray(CustomerOrder_chart_data_object.datasets) && 
                CustomerOrder_chart_data_object.datasets.length > 0 &&  
                <Line data={CustomerOrder_chart_data_object}  plugins={plugins} options={chartOptions}/>
              }

            </Card>

          </Grid>

             
          <Grid item xl={2} lg={2} md={2} sm={12} xs={12} style={{"marginTop": "1.6%",textAlign: "center"}}>
            <h6> Month-over-Month Comparison </h6>
            <br/><br/>
            
            <strong style={{borderBottom: "1px dashed darkgrey"}}> 
              <span style={{color: "chocolate"}}>Revenue</span><br/>          
              {rev_note  && rev_note[0]} 
            </strong>

            <br/><br/>
            
            <strong style={{borderBottom: "1px dashed darkgrey"}}> 
              <span style={{color: "chocolate"}}>Revenue</span> 
              Per 
              <span style={{color:"rgb(76, 110, 245)"}}>Order</span><br/>
              {rev_note  && rev_note[1]}
            </strong>

            <br/><br/>

            <strong style={{borderBottom: "1px dashed darkgrey"}}> 
              <span style={{color: "chocolate"}}> Revenue </span> 
              Per  
              <span style={{color: "chocolate"}}> Customer </span>   
              <br/>{rev_note  && rev_note[2]}
            </strong>

            <br/><br/>

            <strong style={{borderBottom: "1px dashed darkgrey"}}> <span style={{color: "rgb(76, 110, 245)"}}>Profit</span>             <br/>       
            {prof_note && prof_note[0]}</strong>
            <br/><br/>
            <strong style={{borderBottom: "1px dashed darkgrey"}}> <span style={{color:"rgb(76, 110, 245)"}}>Profit</span> Per <span style={{color: "chocolate"}}> Customer</span>    <br/>       
            {prof_note && prof_note[1]}</strong>
            <br/><br/>
            <strong style={{borderBottom: "1px dashed darkgrey"}}> <span style={{color: "chocolate"}}>Customer</span>           <br/>       
            {cus_note} </strong>
            <br/><br/>
            <strong> <span style={{color: "rgb(76, 110, 245)"}}>Order</span>              <br/>       
            {order_note}</strong>

          </Grid>

          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card className="dash-card" 
              style={{'height':'100%',"flexDirection":"column","padding":"15px 20px","borderRadius":"6px","background":"#fff","boxShadow":"0 0 2rem 0 rgba(136,152,170,.15)"}}>
              <h6> Recent Sales </h6>
              <DashRecentSales />
            </Card>
          </Grid>

      </Grid>

      <br/><br/><br/>
      <Grid container>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

          <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
            City-wise Deliveries
          </h5>

          {Citywise_delivery_table_data && (

            <ThemeProvider theme={defaultMaterialTheme}>

                <MaterialTable
            
                  columns={Citywise_delivery_table_column}
                  data={Citywise_delivery_table_data}
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

            </ThemeProvider>
            
          )}

        </Grid>

      </Grid>
     
      
      <DashCustomer />

      <DashTopItems data_tpbr={data_tpbr} data_tpbu={data_tpbu}data_tpbp={data_tpbp}data_tcbr={data_tpbr}data_tcbu={data_tpbu}data_tcbp={data_tpbp}/>

        {/* <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>

          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Top products by revenue</div>

          {data_tpbr.labels && data_tpbr.datasets && (
            <div style={{ height: "450px","background":"white" }}>
              <Bar data={data_tpbr} options={options} plugins={[levelPlugin]} />
            </div>
          )}

        </Grid>

        <Grid item xl={4} lg={4} md={4}  sm={12} xs={12}>
          
          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Top products by unit sold</div>

          {data_tpbu.labels && data_tpbu.datasets && (
            <div style={{ height: "450px","background":"white" }}>
              <Bar data={data_tpbu} options={options} plugins={[levelPlugin]} />
            </div>
          )}

        </Grid>

        <Grid item xl={4} lg={4} md={4}  sm={12} xs={12}>

          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Top products by profit</div>

          {data_tpbp.labels && data_tpbp.datasets && (
            <div style={{ height: "450px","background":"white" }}>
              <Bar data={data_tpbp} options={options} plugins={[levelPlugin]} />
            </div>
          )}

        </Grid> */}

     


      {/* <Grid container> */}
   
        {/* <Grid item xl={4} lg={4} md={4}  sm={12} xs={12} style={{marginTop:'2%'}}>
    
          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>
            {shoptype ==="woo" && <> Top categories by revenue </>}
            {shoptype ==="shopify" && <> Top collection by revenue </>}
          </div>

          {data_tcbr.labels && data_tcbr.datasets && (
            <div style={{ height: "450px","background":"white" }}>
              <Bar  data={data_tcbr} options={options} plugins={[levelPlugin]} />
            </div>
          )}

        </Grid>

        <Grid item xl={4} lg={4} md={4}  sm={12} xs={12} style={{marginTop:'2%'}}>

          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>
            {shoptype ==="woo" && <> Top categories by unit sold</>}
            {shoptype ==="shopify" && <> Top collection by unit sold </>}
          </div>

          {data_tcbu.datasets && data_tcbu.labels && (
            <div style={{ height: "450px","background":"white" }}>
              <Bar  data={data_tcbu} options={options} plugins={[levelPlugin]} />
            </div>
          )}

        </Grid>

        <Grid item xl={4} lg={4} md={4}  sm={12} xs={12} style={{marginTop:'2%'}}>

          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>
            {shoptype ==="woo" && <> Top categories by unit profit</>}
            {shoptype ==="shopify" && <> Top collection by unit profit</>}
          </div>

          {data_tcbp.labels && data_tcbp.datasets && (
            <div style={{ height: "450px","background":"white" }}>
              <Bar data={data_tcbp} options={options} plugins={[levelPlugin]} />
            </div>
          )}

        </Grid> */}
      {/* </Grid> */}

      <Grid container>
        
        <DashBasket frequently_bought_together_table_column={frequently_bought_together_table_column}
                    frequently_bought_together_table_data={frequently_bought_together_table_data}
                    purchase_recom_table_column={purchase_recom_table_column} 
                    purchase_recom_table_data={purchase_recom_table_data}/>
      </Grid>


        


      {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

        <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
          Frequently bought together
        </h5>

        {frequently_bought_together_table_data && (

          <ThemeProvider theme={defaultMaterialTheme}>
            
            <MaterialTable
                columns={frequently_bought_together_table_column}
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

                localization={{
                  pagination: {
                    labelRowsPerPage: "",
                    showFirstLastPageButtons: false,
                  },
                }}
              />

          </ThemeProvider>
          
        )}

      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

        <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
          Purchase Recommendations 
        </h5>

        {purchase_recom_table_data && (

          <ThemeProvider theme={defaultMaterialTheme}>

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
          
          </ThemeProvider>
          
        )}

      </Grid> */}

    </>
    
  );

}

export default DashTops;
