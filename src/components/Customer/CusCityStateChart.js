import React, {useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_cusLocCT_data } from "../../features/cus/CusLocCT";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Grid from "@mui/material/Grid";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

ChartJS.register( CategoryScale, LinearScale, PointElement,  LineElement, Title,  Tooltip,  Legend);

function CusCityStateChart() {
  
  var dispatch5             = useDispatch();
  var accountType           = useSelector((state) => state.dashTops.accountType);
  var get_cusLocCT_dataFlag = useSelector((state) => state.cusTRF.get_cusLocCT_dataFlag);
  
  var [shipcity_rev_obj_,setShipcity_rev_obj_]    = useState(null);
  var [shipcity_cus_obj_,setShipcity_cus_obj_]    = useState(null);
  var [billcity_rev_obj_,setBillcity_rev_obj_]    = useState(null);
  var [billcity_cus_obj_,setBillcity_cus_obj_]    = useState(null);
  var CusLocChartTable                            = useSelector((state) => state.cusLocChartTable);


  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_cusLocCT_data")) {
    //     ReactSession.set("get_cusLocCT_data", "1");
    //     dispatch5(get_cusLocCT_data({ ajax_seg: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusLocCT_data")) {
        sessionStorage.setItem("get_cusLocCT_data", "1");
        dispatch5(get_cusLocCT_data({ ajax_seg: 2 }));
      }
    }
  
    if(accountType ==="demo") {

        var shipcity_cus_obj = {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "New York",
              data: [10, 20, 15, 30, 25,35],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Los Angeles",
              data: [15, 25, 20, 35, 30,40],
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Chicago",
              data: [8, 18, 12, 28, 22,28],
              borderColor: "rgba(255, 205, 86, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Houston",
              data: [12, 22, 17, 32, 27,35],
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Miami",
              data: [18, 28, 23, 38, 33,45],
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        };
        setShipcity_cus_obj_(shipcity_cus_obj);
        
        var billcity_cus_obj = {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "New York",
              data: [10, 20, 15, 30, 25,35],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Los Angeles",
              data: [15, 25, 20, 35, 30,40],
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Chicago",
              data: [8, 18, 12, 28, 22,28],
              borderColor: "rgba(255, 205, 86, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Houston",
              data: [12, 22, 17, 32, 27,35],
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Miami",
              data: [18, 28, 23, 38, 33,45],
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        };
        setBillcity_cus_obj_(billcity_cus_obj);

        var shipcity_rev_obj = {
          labels: ["January", "February", "March", "April", "May","June"],
          datasets: [
            {
              label: "New York",
              data: [1500, 2200, 1800, 2400, 2000,2100],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Los Angeles",
              data: [1200, 1900, 1300, 2100, 1700,1500],
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Chicago",
              data: [800, 1700, 1400, 1900, 1500,1800],
              borderColor: "rgba(255, 205, 86, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Houston",
              data: [900, 1600, 1600, 2200, 1400,1700],
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Miami",
              data: [1000, 1500, 1200, 1700, 1300,2300],
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        };
        setShipcity_rev_obj_(shipcity_rev_obj);

        var billcity_rev_obj = {
          labels: ["January", "February", "March", "April", "May","June"],
          datasets: [
            {
              label: "New York",
              data: [1500, 2200, 1800, 2400, 2000,2100],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Los Angeles",
              data: [1200, 1900, 1300, 2100, 1700,1500],
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Chicago",
              data: [800, 1700, 1400, 1900, 1500,1800],
              borderColor: "rgba(255, 205, 86, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Houston",
              data: [900, 1600, 1600, 2200, 1400,1700],
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Miami",
              data: [1000, 1500, 1200, 1700, 1300,2300],
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        };
        setBillcity_rev_obj_(billcity_rev_obj);
    }
    
  }, [])


  useEffect(() => {

    if (CusLocChartTable !== undefined) {

      var label = structuredClone(CusLocChartTable.label) ?? [];
    
      var shipcity_rev_obj      = {};
      shipcity_rev_obj.labels   = label ? label : null;
      shipcity_rev_obj.datasets = structuredClone(CusLocChartTable.shipcity_rev) ?? [];
      setShipcity_rev_obj_(shipcity_rev_obj);

      var shipcity_cus_obj      = {};
      shipcity_cus_obj.labels   = label ? label : null;
      shipcity_cus_obj.datasets = structuredClone(CusLocChartTable.shipcity_cus) ?? [];
      setShipcity_cus_obj_(shipcity_cus_obj);

      var billcity_cus_obj      = {};
      billcity_cus_obj.labels   = label ? label : null;
      billcity_cus_obj.datasets = structuredClone(CusLocChartTable.billcity_cus) ?? [];
      setBillcity_cus_obj_(billcity_cus_obj);

      var billcity_rev_obj      = {};
      billcity_rev_obj.labels   = label ? label : null;
      billcity_rev_obj.datasets = structuredClone(CusLocChartTable.billcity_rev) ?? [];
      setBillcity_rev_obj_(billcity_rev_obj);

    } else {
      console.log("CusLocChartTable reducer :: undefined");
    }

  },[get_cusLocCT_dataFlag])

  {/* Billing And Shipping City, Customer & Revenue Chart */ }

  var option = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
      },
      x: {
        display: false,
      },
    },

    lineTension: 0.3,
    legend: {
      display: true,
      position: "right",
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




  return (

    <>
    
      <Grid item xs={12}>
        <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
          Customer and Revenue trends over time across billing and shipping cities, [specified period in first date range]
        </h5>
      </Grid>

      <Grid item xs={12}>
        <Timeline className="timeline">
        
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="tml-title-icon">
              <span>Customer trends :: Billing city</span>
              <ShoppingBasketIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="tml-chart">
            {billcity_cus_obj_ && billcity_cus_obj_.labels && billcity_cus_obj_.datasets && (
              <Line data={billcity_cus_obj_} options={option} plugins={[tooltipLinePlugIn]} />
            )}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="tml-title-icon">
              <span>Customer trends :: Shipping city</span>
              <LayersRoundedIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="tml-chart">
            {shipcity_cus_obj_ && shipcity_cus_obj_.labels && shipcity_cus_obj_.datasets && (
              <Line data={shipcity_cus_obj_} options={option} plugins={[tooltipLinePlugIn]} />
            )}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="tml-title-icon">
              <span>Revenue trends :: Billing city</span>
              <AttachMoneyIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="tml-chart">
            {billcity_rev_obj_ && billcity_rev_obj_.labels && billcity_rev_obj_.datasets && (
              <Line data={billcity_rev_obj_} options={option} plugins={[tooltipLinePlugIn]} />
            )}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="tml-title-icon">
              <span>Revenue trends :: Shipping City</span>
              <PeopleAltIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="tml-chart">
            {shipcity_rev_obj_ && shipcity_rev_obj_.labels && shipcity_rev_obj_.datasets && (
              <>
                <Line data={shipcity_rev_obj_} options={option} plugins={[tooltipLinePlugIn]} />
              </>
            )}
          </TimelineContent>
        </TimelineItem>
      
        </Timeline>
      </Grid>

    </>

  );

}

export default CusCityStateChart;
