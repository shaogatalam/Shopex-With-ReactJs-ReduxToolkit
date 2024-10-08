import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_segment_join_drop_chart_object } from "../../features/cus/CusSegmentReport";
import { Line } from "react-chartjs-2";
import Grid from "@mui/material/Grid";


// import store,{injectAsyncReducer} from "../../app/NewStore";
// import { combineReducers } from "@reduxjs/toolkit";
// import {TRFSlice} from '../../features/cus/Cus_new_repeat_total_Chart';
// import {TMSlice} from '../../features/cus/CustomersFromThisMonth';
// import {CusLocChartTableSlice} from '../../features/cus/CusLocCT';
// import {GBy1stBuyMonthSlice} from '../../features/cus/CusListGroupBy1stBuy';
// import {RetAllCitySlice} from '../../features/cus/CusRetAllCity';
// import {RetSelCitySlice} from '../../features/cus/CusRetSelCity';
// import {CusListAndSegsSlice} from '../../features/cus/CusListAndSeg';
// import { CustomerSegmentReportSlice } from "../../features/cus/CusSegmentReport";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,  Filler);


function CusSegmentTrack() {

  var accountType   = useSelector((state) => state.dashTops.accountType);
  var dispatch      = useDispatch();
  var [jd,setJD]    = useState();
  var segmentStyle = {  "backgroundColor": "#fff",  "padding": "1rem",  "borderRadius": "4px"  }

  useEffect(() => {
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_segment_join_drop_chart_object")) {
        sessionStorage.setItem("get_segment_join_drop_chart_object", "1");
        dispatch(get_segment_join_drop_chart_object());
      }
    }
  }, []);

  var s_track                         = useSelector((state) => state.CustomerSegmentReport);
  var segment_join_drop_chart_object  = "";

  const tooltipLinePlugIn = {
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

  useEffect(() => {

    if(accountType === "demo") {

      setJD([
        {
          segment_name: "Segment 1",
          join_label: "January,February,March,April,May,June",
          join_data: "10,15,20,18,22,25",
          drop_label: "January,February,March,April,May,June",
          drop_data: "5,7,10,9,12,15"
        },
        {
          segment_name: "Segment 2",
          join_label: "July,August,September,October,November,December",
          join_data: "15,20,25,22,28,30",
          drop_label: "July,August,September,October,November,December",
          drop_data: "8,12,15,13,18,20"
        },
        {
          segment_name: "Segment 3",
          join_label: "January,February,March,April,May,June",
          join_data: "8,12,16,14,18,20",
          drop_label: "January,February,March,April,May,June",
          drop_data: "3,5,8,7,10,12"
        },
        {
          segment_name: "Segment 4",
          join_label: "July,August,September,October,November,December",
          join_data: "12,18,22,20,25,28",
          drop_label: "July,August,September,October,November,December",
          drop_data: "6,10,12,11,15,18"
        }
      ]);

    } else {
      if(s_track !== undefined) {
        //segment_join_drop_chart_object = s_track?.segment_join_drop_chart_object ?? {};
        // setJD(() => {
        //   return s_track?.segment_join_drop_chart_object ?? {};
        // })
        setJD(s_track?.segment_join_drop_chart_object ?? []);
      }
    }
    
  },[])

  console.log(accountType);

  return (
    
    <>

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Customer : Segment tracking</h6>
        </div>
      </Grid>

  

      <Grid container style={{display:"block"}}>
        
        {jd && jd.map(segment => (
        
          <>
          
            <h5 style={{background: "#EDF2F8", padding: ".4rem 1rem", "borderRadius":'3px', "marginBottom":"10px","width":"fit-content"}}>
              {segment.segment_name}
            </h5>
          
            <div style={{display:"flex"}}>

              <Grid item xl={6} lg={6} xs={12} sm={5} md={5} style={{...segmentStyle,"height":"352px","marginRight":"1%"}} >
                
                <Line style={{height:"350px"}}
                  data={{
                    labels: segment.join_label.split(','),
                    datasets: [{
                      label: 'Joining Data',
                      data: segment.join_data.split(','),
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 2,
                    }],
                  }}
                  plugins={[tooltipLinePlugIn]}
                />

              </Grid>

              <Grid item xl={6} lg={6} xs={12} sm={5} md={5} style={{...segmentStyle,height:"352px"}} >
                
                <Line style={{height:"350px"}}
                  data={{
                    labels: segment.drop_label.split(','),
                    datasets: [{
                      label: 'Drop Data',
                      data: segment.drop_data.split(','),
                      backgroundColor: 'rgba(192, 75, 75, 0.2)',
                      borderColor: 'rgba(192, 75, 75, 1)',
                      borderWidth: 2,
                    }],
                  }}
                  plugins={[tooltipLinePlugIn]}
                />
                
              </Grid>

            </div>

          </>

        ))}

      </Grid>

       
    </>
  
  )}

export default CusSegmentTrack