import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import startOfYear from "date-fns/startOfYear";

import { addDays, subDays, getDate } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import Grid from "@mui/material/Grid";
import moment from "moment";

import { get_OrderAndRev_data } from "../../features/order/OrderReport";
import { get_order_and_revenue_location_chart } from "../../features/order/OrderReport";
import ShipCity from "./OrderSegFilters/ShipCity";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import OrderCityStateTable from "./OrderCityStateTable";

import { startOfMonth, endOfMonth, subMonths, isLastDayOfMonth, lastDayOfMonth } from 'date-fns';


import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement} from "chart.js";
import { Line,Bar } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale,PointElement, LineElement,BarElement, Title, Tooltip, Legend,  Filler);

function OrderReport() {
 
  var shoptype    = useSelector((state) => state.dashTops.shoptype);
  var dispatch1   = useDispatch();
  var dispatch2   = useDispatch();
  var accountType = useSelector((state) => state.dashTops.accountType);

  var Order_shipcity_revenue_label  = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.label ?? null);
  var Order_shipcity_revenue        = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.shipcity_revenue ?? null);
  var Order_shipcity_order          = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.shipcity_order ?? null);
  var total_order_note  = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.total_order_note ?? null);
  var total_rev_note    = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.total_rev_note ?? null);
  var new_order_note    = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.new_order_note ?? null);
  var new_rev_note      = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.new_rev_note ?? null);
  var repeat_order_note = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.repeat_order_note ?? null);
  var repeat_rev_note   = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.repeat_rev_note ?? null);
  var wd_rev_data     = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.week_day_rev_data ?? null);
  var wd_rev_labels   = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.week_day_rev_label ?? null);
  var wd_order_data   = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.week_day_or_num_data?? null);
  var wd_order_labels = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.week_day_or_num_label?? null);
  var pm_order_data          = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.paymeth_or_num_data ?? null);
  var pm_order_data_label    = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.paymeth_or_num_label?? null);
  var pm_revenue_data        = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.paymeth_rev_data ?? null);
  var pm_revenue_data_labels = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.paymeth_rev_label ?? null);
  var total_order_data     = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.to_or_num_data?? null);
  var total_order_labels   = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.to_or_num_label?? null);
  var total_revenue_data   = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.to_or_rev_data?? null);
  var total_revenue_labels = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.to_or_rev_label?? null);
  var new_order_data = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.new_or_num_data?? null);
  var ret_order_data = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.ret_or_num_data?? null);
  var newret_labels  = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.new_or_num_label?? null);
  var NewOrder_Revenue_data = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.new_or_rev_data?? null);
  var RetOrder_Revenue_data = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.ret_or_rev_data?? null);
  var newret_labels         = useSelector((state) => state.order_numrev_shipLoc_ChartTable?.new_or_rev_label?? null);


  useEffect(() => {
    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_OrderAndRev_data")) {
    //     ReactSession.set("get_OrderAndRev_data", "1");
    //     dispatch2(get_OrderAndRev_data({ ajax_call: 2 }));
    //   }
    //   if (!ReactSession.get("get_order_and_revenue_location_chart")) {
    //     ReactSession.set("get_order_and_revenue_location_chart", "1");
    //     dispatch1(get_order_and_revenue_location_chart({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_OrderAndRev_data")) {
        sessionStorage.setItem("get_OrderAndRev_data", "1");
        dispatch2(get_OrderAndRev_data({ ajax_call: 2 }));
      }
      if (!sessionStorage.getItem("get_order_and_revenue_location_chart")) {
        sessionStorage.setItem("get_order_and_revenue_location_chart", "1");
        dispatch1(get_order_and_revenue_location_chart({ ajax_call: 2 }));
      }
    }
  }, [])
  
  if(accountType==="paid") {

    var label = structuredClone(Order_shipcity_revenue_label);
  
    var shipcity_rev_obj = {};
    if (Order_shipcity_revenue) {
      shipcity_rev_obj.labels = label;
      shipcity_rev_obj.datasets = structuredClone(Order_shipcity_revenue);
    }
    
    var shipcity_order_obj = {};
    if (Order_shipcity_order) {
      shipcity_order_obj.labels = label;
      shipcity_order_obj.datasets = structuredClone(Order_shipcity_order);
    }

    // Week Day Revenue
    var weekday_revenue_chart_dataobject = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Weekday Revenue ",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    if (wd_rev_data && wd_rev_labels) {
      weekday_revenue_chart_dataobject = {
        datasets: [
          {
            label: "Weekday Revenue",
            borderColor: 'rgb(106, 90, 205)',
            fill: true,
            data: wd_rev_data,
          },
        ],
        //labels: Order_numrev_shiploc_data.week_day_rev_label.replace(/\"/g, "").split(","),
        labels: wd_rev_labels,
      };
    }

    //  Week Day Order
    var weekday_order_chart_dataobject = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Weekday Order ",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgb(106, 90, 205)',
          fill: true,
        
        },
      ],
    };
    if (wd_order_data) {
      weekday_order_chart_dataobject = {
        datasets: [
          {
            label: "Weekday order",
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            data: wd_order_data,
          },
        ],
        labels: wd_order_labels,
      };
    }


    //  PM  Order
    var pm_order = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Order",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    if (pm_order_data && pm_order_data_label) {
      pm_order = {
        datasets: [
          {
            label: "Order",
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            pointRadius: 6,
            borderWidth: 1,
            data: pm_order_data,
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
        // labels: Order_numrev_shiploc_data.paymeth_or_num_label.replace(/\"/g, "").split(","),
        labels: pm_order_data_label,
      };
    }

    //  PM  Revenue
    var pm_revenue = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Revenue",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    if (pm_revenue_data && pm_revenue_data_labels) {
      pm_revenue = {
        datasets: [
          {
            label: "Revenue",
            borderColor: 'rgb(106, 90, 205)',
            fill: true,
            data: pm_revenue_data,
          },
            
        ],
        //labels: Order_numrev_shiploc_data.paymeth_rev_label.replace(/\"/g, "").split(","),
        labels: pm_revenue_data_labels,
      };
    }


    //Total Order
    var to_order = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Total Order",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    if (total_order_data && total_order_labels) {
      to_order = {
        datasets: [{
          id:1,
          labels: total_order_labels,
          label: "Total Order",
          borderColor: 'rgb(106, 90, 205)',
          fill: true,
          pointRadius: 6,
          hoverRadius: 11,
          borderWidth: 1,
          data: total_order_data,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
        }},
          
        ],
        //labels: Order_numrev_shiploc_data.to_or_num_label.replace(/\"/g, "").split(","),
        labels: total_order_labels,
      };
    }

    //Total Revnue
    var to_revenue = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Total Revenue",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgb(255, 88, 0)',
          fill: true,
          pointRadius: 6,
          hoverRadius: 11,
          borderWidth: 1,
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
    if (total_revenue_data && total_revenue_labels) {
      to_revenue = {
        datasets: [
          {
            id:2,
            labels: total_revenue_labels,
            label: "Total Revenue",
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            pointRadius: 6,
            hoverRadius: 11,
            borderWidth: 1,
            data: total_revenue_data,
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
        //labels: Order_numrev_shiploc_data.to_or_rev_label.replace(/\"/g, "").split(","),
        labels: total_revenue_labels,
      };
    }

    //New & Ret Order
    var new_ret_order = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "New Order",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Repeat Order",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    if (new_order_data) {
      new_ret_order = {
        datasets: [
          {
            id:3,
            labels: newret_labels,
            label: "New Order ",
            borderColor: 'rgb(106, 90, 205)',
            fill: true,
            pointRadius: 6,
            hoverRadius: 11,
            borderWidth: 1,
            data: new_order_data,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
              gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              return gradient;
            }
          },
          {
            id:4,
            labels: newret_labels,
            label: "Repeat Order ",
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            pointRadius: 6,
            hoverRadius: 11,
            borderWidth: 1,
            data: ret_order_data,
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
        //labels: Order_numrev_shiploc_data.new_or_num_label.replace(/\"/g, "").split(","),
        labels: newret_labels,
      };
    }

    // New & Ret Revenue
    var new_ret_revenue = {
      labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "New Rev",
          fill: true,
          pointRadius: 6,
          hoverRadius: 11,
          borderWidth: 1,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: "rgba(106, 90, 205, 0.8)",
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
          label: "Repeat Rev",
          fill: true,
          pointRadius: 6,
          hoverRadius: 11,
          borderWidth: 1,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: "rgba(255, 88, 0,0.8)",
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
    if (NewOrder_Revenue_data) {
      new_ret_revenue = {
        datasets: [
          {
            id:5,
            labels: newret_labels,
            label: "New Revenue",
            borderColor: 'rgb(106, 90, 205)',
            fill: true,
            pointRadius: 6,
            hoverRadius: 11,
            borderWidth: 1,
            data: NewOrder_Revenue_data,
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
            id:6,
            labels: newret_labels,
            label: "Repeat Revenue",
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            pointRadius: 6,
            hoverRadius: 11,
            borderWidth: 1,
            data: RetOrder_Revenue_data,
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
        //labels: Order_numrev_shiploc_data.new_or_rev_label.replace(/\"/g, "").split(","),
        labels: newret_labels,
      };
    }

  }

  if(accountType === "demo") {


    var to_order = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          id:1,
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          label: "Total Order",
          data: [120, 150, 180, 200, 220, 250, 280, 300, 270, 240, 220, 200],
          borderColor: "rgba(255, 88, 0,1)",
          fill: true,
          pointRadius: 6,
          hoverRadius:11,
          borderWidth: 1,
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


    var to_revenue = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          id:2,
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          label: "Total Revenue",
          data: [1500, 1800, 2200, 1950, 2100, 2400, 2800, 2600, 3000, 3200, 2900, 3100],
          borderColor: 'rgb(255, 88, 0)',
          fill: true,
          pointRadius: 6,
          hoverRadius:11,
          borderWidth: 1,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
      ],
    };
    

    var new_ret_order = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          id:3,
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          label: "New Order",
          data: [120, 150, 180, 220, 250, 280, 320, 340, 370, 410, 450, 490],
          borderColor: "rgba(106, 90, 205, 1)",
          fill: true,
          pointRadius: 6,
          hoverRadius:11,
          borderWidth: 1,
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
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          label: "Repeat Order",
          data: [80, 110, 130, 160, 190, 220, 250, 280, 310, 340, 370, 400],
          borderColor: "rgba(255, 88, 0, 1)",
          fill: true,
          pointRadius: 6,
          hoverRadius:11,
          borderWidth: 1,
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
    

    var new_ret_revenue = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          id:5,
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          label: "New Rev",
          fill: true,
          pointRadius: 6,
          hoverRadius:11,
          borderWidth: 1,
          data: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400],
          borderColor: "rgba(106, 90, 205, 0.8)",
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
        {
          id:6,
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          label: "Repeat Rev",
          fill: true,
          pointRadius: 6,
          hoverRadius:11,
          borderWidth: 1,
          data: [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900],
          borderColor: "rgba(255, 88, 0,0.8)",
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
      ],
    };
    

    var weekday_revenue_chart_dataobject = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekday Revenue",
          data: [1200,1320,1400,1450,1500,1550,1650],
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Aqua color
          borderWidth: 1,
          // backgroundColor: (ctx) => {
          //   const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          //   gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
          //   gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
          //   return gradient;
          // },
        },
      ],
    };


    var weekday_order_chart_dataobject = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekday Order",
          data: [120,180,150,200,210, 220, 250],
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Aqua color
          borderWidth: 1,
        },
      ],
    };
    

    var pm_order = {
      labels: ["Credit Card", "PayPal", "Stripe", "Apple Pay", "Google Pay", "Bank Transfer"],
      datasets: [
        {
          label: "Orders",
          data: [40,60,85,95,110,120],
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Aqua color
          borderWidth: 1,
        },
      ],
    };


    var pm_revenue = {
      labels: ["PayPal", "Credit Card", "Stripe", "Apple Pay", "Google Pay", "Bank Transfer"],
      datasets: [
        {
          label: "Revenue",
          data: [1200,1500,1800,2000,2500,3200],
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Aqua color
          borderWidth: 1,
          // backgroundColor: (ctx) => {
          //   const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          //   gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
          //   gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
          //   return gradient;
          // },
          
        },
      ],
    };


    var shipcity_order_obj = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          id:6,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "New York",
          data: [10, 20, 15, 30, 25],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:7,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Los Angeles",
          data: [15, 25, 20, 35, 30],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:8,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Chicago",
          data: [8, 18, 12, 28, 22],
          borderColor: "rgba(255, 205, 86, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:9,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Houston",
          data: [12, 22, 17, 32, 27],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: false,
          hoverRadius:11,
        },
        {
          id:10,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Miami",
          data: [18, 28, 23, 38, 33],
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          fill: false,
          hoverRadius:11,
        },
      ],
    };

    var Order_shipcity_order = [
      {
        shipcity: "New York",
        order_date: "2023-01-05",
        order_amount: 1000,
      },
    ];


    var shipcity_rev_obj = {
      labels: ["January", "February", "March", "April", "May","June"],
      datasets: [
        {
          id:1,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "New York",
          data: [1500, 2200, 1800, 2400, 2000,2100],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:2,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Los Angeles",
          data: [1200, 1900, 1300, 2100, 1700,1500],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:3,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Chicago",
          data: [800, 1700, 1400, 1900, 1500,1800],
          borderColor: "rgba(255, 205, 86, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:4,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Houston",
          data: [900, 1600, 1600, 2200, 1400,1700],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
        {
          id:5,
          labels: ["January", "February", "March", "April", "May","June"],
          label: "Miami",
          data: [1000, 1500, 1200, 1700, 1300,2300],
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          hoverRadius:11,
          fill: false,
        },
      ],
    };

    var Order_shipcity_revenue = [
      {
        shipcity: "New York",
        order_date: "2023-01-05",
        order_amount: 1000,
      },
    ];

  }


  var [dr, setdr] = useState([ new Date(moment().startOf("month")),  new Date(moment().endOf("month"))]);
  var today       = new Date();
  var from        = new Date(today.getFullYear(), today.getMonth(), 1);
  var to          = today;
  var from1       = subMonths(from, 1);
  var isLastDayTo = isLastDayOfMonth(to);
  var to1         = isLastDayTo ? lastDayOfMonth(subMonths(to, 1)) : subMonths(to, 1);
  var [dateRange, setDateRange]   = useState([from, to]);
  var [dateRange1, setDateRange1] = useState([from1, to1]);
  var [duration, setduration] = useState();
  var [group1, setgroup1]     = useState();
  var [group2, setgroup2]     = useState();

  var dateSubmit = (e) => {
    e.preventDefault();
    if(accountType==="paid"){
      dispatch1(
        get_OrderAndRev_data({
          from: format(dateRange[0], "yyyy-MM-dd"),
          to: format(dateRange[1], "yyyy-MM-dd"),
          from1: format(dateRange1[0], "yyyy-MM-dd"),
          to1: format(dateRange1[1], "yyyy-MM-dd"),
          unit: duration,
          ajax_call: 1,
        })
      );
    }
  };


  var dateSubmit1 = (event) => {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data = Object.fromEntries(fdata.entries());
    if(accountType === "paid"){
      dispatch1(get_order_and_revenue_location_chart(data));
    }
  };




  /// Charts configuration \\\
  var options = {
    maintainAspectRatio: false,
    responsive: true, // Allow the chart to be responsive
    indexAxis: 'y',
    scales: {
      x: {beginAtZero: true},
      y: {display:false}
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
  };

  var lineOptions = {
    
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        display: true,
      },
      x: {
        display: false,
      },
    },

    legend: { display: false },
    tooltips: { enabled: true },

  };


  var levelPlugin = {
    id: 'levelPlugin',
    afterDraw: (chart, args, pluginOptions) => {
      var { ctx, scales: { x, y }, data } = chart;
      for (let i = 0; i < data.datasets.length; i++) {
        var dataset = data.datasets[i];
        var meta = chart.getDatasetMeta(i);
        for (let j = 0; j < dataset.data.length; j++) {
          var value = dataset.data[j];
          var label = data.labels[j];
          ctx.font = 'bold 12px sans-serif';
          ctx.fillStyle = '#000'; 
          ctx.textAlign = 'left'; 
          ctx.textBaseline = 'middle'; 
          ctx.fillText(`${label}`, x.getPixelForValue(0, j) + 10, meta.data[j].y);
        }
      }
    },
  };


  var tooltipLinePlugIn = {
    id: 'tooltipLine',
    beforeDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        ctx.save();
        const activePoint = chart.tooltip._active[0];
  
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

      {/* <Grid container className="top-wrap" style={{marginBottom:"2%"}}>
        <div className="notifications">
          <h6>Orders : Report</h6>
        </div>
      </Grid> */}

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Orders : Report</h6>
        </div>
      </Grid>

        
      <Grid container spacing={3}>

        <Grid item md={12}>
          
          <form className="date-period" onSubmit={dateSubmit} style={{ marginBottom: "-15px" }}>
          
            <DateRangePicker
              // label="Timeline"
              value={dateRange}
              onChange={setDateRange}
              oneTap={false}
              ranges={[
                {label: "Yesterday", value: [addDays(new Date(), -1), addDays(new Date(), -1)],
                },
                { label: "Today", value: [new Date(), new Date()] },
                { label: "Tomorrow", value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                { label: "Last 7 days",  value: [subDays(new Date(), 6), new Date()]},
                { label: "This month",  value: [subDays(new Date(), getDate(new Date()) - 1),new Date()]},
                { label: "Last month", value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                { label: "Year To date", value: [startOfYear(new Date()), new Date()]},
              ]}
            >

            </DateRangePicker>
            
            <input name="from" type={"hidden"} value={format(dateRange[0], "yyyy-MM-dd")}/>
            <input name="to" type={"hidden"} value={format(dateRange[1], "yyyy-MM-dd")} />
            
            <DateRangePicker
              // label="Timeline"
              value={dateRange1}
              onChange={setDateRange1}
              oneTap={false}
              ranges={[
                { label: "Yesterday", value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                { label: "Today", value: [new Date(), new Date()] },
                { label: "Tomorrow", value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                { label: "Last 7 days", value: [subDays(new Date(), 6), new Date()]},
                { label: "This month", value: [ subDays(new Date(), getDate(new Date()) - 1), new Date()]},
                { label: "Last month", value: [ startOfMonth(subDays(new Date(), getDate(new Date()))), endOfMonth(subDays(new Date(), getDate(new Date())))]},
                { label: "Year To date", value: [startOfYear(new Date()), new Date()]},
              ]}
            >

            </DateRangePicker>
            
            <input name="from1" type={"hidden"} value={format(dateRange1[0], "yyyy-MM-dd")}/>
            <input  name="to1" type={"hidden"} value={format(dateRange1[1], "yyyy-MM-dd")}/>
            
            <RadioGroup style={{  display: "inline-block", fontSize: "13px", color: "white", fontWeight: "500", }} onChange={(e) => { setduration(e.target.value); }} >
              <Radio checked={duration === "daily"} value="daily" name="duration" /> Day
              <Radio checked={duration === "weekly"} value="weekly" name="duration" /> Week
              <Radio checked={duration === "monthly"} value="monthly" name="duration" /> Month
            </RadioGroup>
            
            <input type="hidden" value="1" name="ajax_call" />
            <input className="period-btn" variant="contained" color="secondary" type="submit" value="Submit"/>
          
          </form>

        </Grid>

      </Grid>
      
      <Grid container spacing={3}>

        <Grid item xl={6} lg={6} md={6} sm={12}  xs={12}>
          
          <Card className="dash-card">

            <h6>Total Order</h6>

            <div style={{ height: "300px" }}>
              {to_order && typeof to_order === "object" && 
              <Line data={to_order} options={chartOptions} plugins={plugins}/>}
            </div>

            <div style={{background: "whitesmoke", padding: "20px", textAlign: "center"}}>

              <p>
                <strong>Total :: {total_order_note && typeof total_order_note[0].order === 'string' ? total_order_note[0].order.replace('[INF]', '0') : ''}</strong> &nbsp;&nbsp;
                <strong>Min   :: {total_order_note && typeof total_order_note[0].min_order === 'string' ? total_order_note[0].min_order.replace('10000000', '0') : ''}</strong> &nbsp;&nbsp;
                <strong>Max   :: {total_order_note && total_order_note[0].max_order}</strong> &nbsp;&nbsp;
                <strong>Avg   :: {total_order_note && total_order_note[0].avg_order}</strong>
              </p>


              <p>
                <strong> Total Point :: {total_order_note && total_order_note[0].total_point} </strong>&nbsp;&nbsp;
                <strong> Point Bellow Average ::  {total_order_note && total_order_note[0].bellow_avg} </strong> &nbsp;&nbsp;
                <strong> Point Above Average :: {total_order_note && total_order_note[0].above_avg} </strong>
              </p>

              <p>
                <strong> Change :: {total_order_note && total_order_note[0].change}  </strong> &nbsp;&nbsp;
                <strong> Avg Change :: {total_order_note && total_order_note[0].avg_change} </strong>
              </p>
            </div>

          </Card>

        </Grid>

      
        <Grid item xl={6} lg={6} md={6} sm={12}  xs={12}>
          
          <Card className="dash-card">
            
            <h6>Total Revenue</h6>

            <div style={{ height: "300px" }}>
              {to_revenue && typeof to_revenue === "object" &&
                ( <Line data={to_revenue} options={chartOptions} plugins={plugins}/> )}
            </div>

            <div style={{background: "whitesmoke", padding: "20px", textAlign: "center"}}>
          
              <p>
                <strong>Total :: {total_rev_note && typeof total_rev_note[0].amount === 'string' ? total_rev_note[0].amount.replace('[INF]', '0') : ''}</strong> &nbsp;&nbsp;
                <strong>Min   :: {total_rev_note && typeof total_rev_note[0].min_amount === 'string' ? total_rev_note[0].min_amount.replace('10000000', '0') : ''}</strong> &nbsp;&nbsp;
                <strong>Max   :: {total_rev_note && total_rev_note[0].max_amount}</strong> &nbsp;&nbsp;
                <strong>Avg   :: {total_rev_note && total_rev_note[0].avg_amount}</strong>
              </p>

              <p>
                <strong> Total Point :: {total_rev_note && total_rev_note[0].total_point} </strong> &nbsp;&nbsp;
                <strong> Point Bellow Average :: {total_rev_note && total_rev_note[0].bellow_avg} </strong>  &nbsp;&nbsp;
                <strong> Point Above Average :: {total_rev_note && total_rev_note[0].above_avg} </strong>
              </p>

              <p>
                <strong> Change :: {total_rev_note && total_rev_note[0].change} </strong> &nbsp;&nbsp;
                <strong> Avg Change :: {total_rev_note && total_rev_note[0].avg_change} </strong>
              </p>

            </div>

          </Card>

        </Grid>

      </Grid>

      <Grid container spacing={3}>

      
        <Grid item  xl={6} lg={6} md={6} sm={12}  xs={12}>
          
          <Card className="dash-card">
            
            <h6>Order from New and Returning Customer</h6>

            <div style={{ height: "300px" }}>
              {new_ret_order && typeof new_ret_order === "object" && (
                <Line data={new_ret_order} options={chartOptions} plugins={plugins} />
              )}
            </div>

            <div style={{background: "whitesmoke", padding: "20px", textAlign: "center"}}>

              <p>
                <strong>
                  Total :: {new_order_note && typeof new_order_note[0].order === 'string' ? new_order_note[0].order.replace('[INF]', '0') : ''}
                  : {repeat_order_note && typeof repeat_order_note[0].order === 'string' ? repeat_order_note[0].order.replace('[INF]', '0') : ''}
                </strong>
                &nbsp;&nbsp;
                <strong>
                  Min :: {new_order_note && typeof new_order_note[0].min_order === 'string' ? new_order_note[0].min_order.replace('10000000', '0') : ''}
                  : {repeat_order_note && typeof repeat_order_note[0].min_order === 'string' ? repeat_order_note[0].min_order.replace('10000000', '0') : ''}
                </strong>
                <strong>Max :: {new_order_note && new_order_note[0].max_order} : {repeat_order_note && repeat_order_note[0].max_order}</strong>
                &nbsp;&nbsp;
                <strong>Avg :: {new_order_note && new_order_note[0].avg_order} : {repeat_order_note && repeat_order_note[0].avg_order}</strong>
              </p>

              <p>
                <strong>Total Point :: {new_order_note && new_order_note[0].total_point} : {repeat_order_note && repeat_order_note[0].total_point}</strong>
                &nbsp;&nbsp;
                <strong>Point Bellow Avg ::{new_order_note && new_order_note[0].bellow_avg} : {repeat_order_note && repeat_order_note[0].bellow_avg}</strong>
                &nbsp;&nbsp;
                <strong>Point Above Avg ::{new_order_note && new_order_note[0].above_avg} : {repeat_order_note && repeat_order_note[0].above_avg}</strong>
              </p>

              <p>
                <strong>Change :: {new_order_note && new_order_note[0].change} : {repeat_order_note && repeat_order_note[0].change}</strong>
                &nbsp;&nbsp;
                <strong>Avg Change :: {new_order_note && new_order_note[0].avg_change} : {repeat_order_note && repeat_order_note[0].avg_change}</strong>
              </p>

            </div>

          </Card>

        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}  xs={12}>
          
          <Card className="dash-card">
          
            <h6>Revenue from New and Repeat Customer</h6>

            <div style={{ height: "300px" }}>
              {new_ret_revenue && typeof new_ret_revenue === "object" && (
                <Line data={new_ret_revenue} options={chartOptions} plugins={plugins} />
              )}
            </div>

            <div style={{background: "whitesmoke", padding: "20px", textAlign: "center"}}>
              <p>
                <strong>Total :: {new_rev_note && typeof new_rev_note[0].amount === 'string' ? new_rev_note[0].amount.replace('[INF]', '0') : ''} : {repeat_rev_note && typeof repeat_rev_note[0].amount === 'string' ? repeat_rev_note[0].amount.replace('[INF]', '0') : ''}</strong>
                &nbsp;&nbsp;
                <strong>Min :: {new_rev_note && typeof new_rev_note[0].min_amount === 'string' ? new_rev_note[0].min_amount.replace('10000000', '0') : ''} : {repeat_rev_note && typeof repeat_rev_note[0].min_amount === 'string' ? repeat_rev_note[0].min_amount.replace('10000000', '0') : ''}</strong>
                &nbsp;&nbsp;

                <strong>Max :: {new_rev_note && new_rev_note[0].max_amount} : {repeat_rev_note && repeat_rev_note[0].max_amount}</strong>
                &nbsp;&nbsp;
                <strong>Avg :: {new_rev_note && new_rev_note[0].avg_amount} : {repeat_rev_note && repeat_rev_note[0].avg_amount}</strong>
              </p>

              <p>
                <strong>Total Point :: {new_rev_note && new_rev_note[0].total_point}     : {repeat_rev_note && repeat_rev_note[0].total_point}</strong>
                &nbsp;&nbsp;
                <strong>Point Bellow Avg :: {new_rev_note && new_rev_note[0].bellow_avg} : {repeat_rev_note && repeat_rev_note[0].bellow_avg}</strong>
                &nbsp;&nbsp;
                <strong>Point Above Avg :: {new_rev_note && new_rev_note[0].above_avg}   : {repeat_rev_note && repeat_rev_note[0].above_avg}</strong>
              </p>

              <p>
                <strong>Change :: {new_rev_note && new_rev_note[0].change} :{repeat_rev_note && repeat_rev_note[0].change}</strong>
                &nbsp;&nbsp;
                <strong>Avg Change :: {new_rev_note && new_rev_note[0].avg_change} :{repeat_rev_note && repeat_rev_note[0].avg_change}</strong>
              </p>

            </div>

          </Card>

        </Grid>
        
      </Grid>

      <Grid container spacing={3}>
       
        <Grid item xl={6} lg={6} md={6} sm={12}  xs={12}>
          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Order from different weekdays</div>
          <Card className="dash-card">
            <div style={{ height: "300px" }}>
              {weekday_order_chart_dataobject && typeof weekday_order_chart_dataobject === "object" &&
                (<Bar options={options} data={weekday_order_chart_dataobject} plugins={[levelPlugin]} />)
              }
            </div>
          </Card>
        </Grid>

       
        <Grid item xl={6} lg={6} md={6} sm={12}  xs={12}>
          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Revenue from different weekdays</div>
          <Card className="dash-card">
            <div style={{ height: "300px" }}>
              <Bar options={options} data={weekday_revenue_chart_dataobject}  plugins={[levelPlugin]}/>
            </div>
          </Card>
        </Grid>

      </Grid>
       


      <Grid container spacing={3}>
        
        <Grid style={{paddingTop: "5vw",paddingBottom: "5vw"}} item xl={6} lg={6} md={6} sm={12}  xs={12}>
          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Order from different Payment method</div>
          <Card className="dash-card">
            <div style={{ height: "300px" }}>
              {pm_order && typeof pm_order === "object" &&
                <Bar options={options} data={pm_order} plugins={[levelPlugin]}/>
              }
            </div>
          </Card>
        </Grid>
        
        <Grid style={{paddingTop: "5vw",paddingBottom: "5vw"}} item xl={6} lg={6} md={6} sm={12}  xs={12}>
          <div style={{"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"}}>Revenue from different Payment method</div>
          <Card className="dash-card">
            <div style={{ height: "300px" }}>
              <Bar options={options} data={pm_revenue} plugins={[levelPlugin]}/>
            </div>
          </Card>
        </Grid>
        
      </Grid>

      <Grid container spacing={3}>
        <Grid style={{paddingTop: "5vw"}} item xl={12} lg={12} md={12} sm={12}  xs={12}>
          <strong style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
            Summary and Comparison of Key Metrics Over Time, [%] column shows the changes compared to second timeline
          </strong>
        </Grid>
        <OrderCityStateTable />
      </Grid>
       

      <Grid container spacing={3}>

        <Grid item md={12} sm={12} xs={12}>
          
          {/* Order Shipping City Charts And Tables */}
          <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
            Order and Revenue trends over time across shipping cities
          </h5>
            
          
          <form className="date-period" onSubmit={dateSubmit1} style={{ marginBottom: "-15px" }}>
            
            {/* Form Including Two Timeline , Order Type, Time Period */}
            <DateRangePicker
              value={dr} onChange={setdr} oneTap={false}
              ranges={[
                { label: "Yesterday", value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                { label: "Today", value: [new Date(), new Date()] },
                { label: "Tomorrow", value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                { label: "Last 7 days", value: [subDays(new Date(), 6), new Date()]},
                { label: "This month",value: [ subDays(new Date(), getDate(new Date()) - 1), new Date()]},
                { label: "Last month", value: [ startOfMonth(subDays(new Date(), getDate(new Date()))), endOfMonth(subDays(new Date(), getDate(new Date())))]},
                { label: "Year To date", value: [startOfYear(new Date()), new Date()]},
              ]}>

            </DateRangePicker>

            <input name="from" type={"hidden"} value={format(dr[0], "yyyy-MM-dd")}/>
            <input name="to" type={"hidden"} value={format(dr[1], "yyyy-MM-dd")}/>

            
            <RadioGroup style={{ display: "inline-block", fontSize: "13px", fontWeight: "500",}} onChange={(e) => { setgroup1(e.target.value);}}>
              <Radio checked={group1 === "daily"} value="daily" name="group1" /> Day
              <Radio checked={group1 === "weekly"} value="weekly" name="group1" />Week
              <Radio checked={group1 === "monthly"} value="monthly" name="group1"/>Month
            </RadioGroup>

            
            <RadioGroup style={{display: "inline-block",fontSize: "13px",fontWeight: "500",}}onChange={(e) => {setgroup2(e.target.value);}}>
              <Radio checked={group2 === "0"} value="0" name="group2" /> New
              <Radio checked={group2 === "1"} value="1" name="group2" /> Repeat
              <Radio checked={group2 === "2"} value="2" name="group2" /> Both
            </RadioGroup>
            
            <input className="period-btn" variant="contained" color="secondary" type="submit" value="Submit"/>
            
            <input type="hidden" value="1" name="ajax_call" />
            
            <br />
            <br />
            
            <strong> Select specific shipping locations </strong>
            <br />
          
            <ShipCity />
        
          </form>
        
        </Grid>

      </Grid>

      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          
          {/* <Card className="dash-card"> */}
          
            <Timeline className="timeline">
          
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Revenue :: shipping city</span>
                    <AttachMoneyIcon />
                  </TimelineDot>
                  <TimelineConnector style={{ background: "teal" }} />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {Order_shipcity_revenue &&
                    Order_shipcity_revenue.length > 0 && (
                      // <Line data={shipcity_rev_obj} options={lineOptions} />
                      <Line width={700} height={350} data={shipcity_rev_obj} options={lineOptions} plugins={[tooltipLinePlugIn]} />
                    )}
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot className="tml-title-icon">
                    <span>Order :: shipping city</span>
                    <ShoppingBasketIcon />
                  </TimelineDot>
                  <TimelineConnector style={{ background: "teal" }} />
                </TimelineSeparator>
                <TimelineContent className="tml-chart">
                  {Order_shipcity_order && Order_shipcity_order.length > 0 && (
                    // <Line data={shipcity_order_obj} options={lineOptions} />
                    <Line width={700} height={350} data={shipcity_order_obj} options={lineOptions} plugins={[tooltipLinePlugIn]} />
                  )}
                </TimelineContent>
              </TimelineItem>

            </Timeline>

          {/* </Card> */}

        </Grid>
      </Grid>
      
    
    </>

  );

}

export default OrderReport;
