import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { subYears } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";

import { addDays, subDays, getDate } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

import { Button, DateRangePicker } from "rsuite";

import Grid from "@mui/material/Grid";

//import moment from "moment";

import { get_cusret_allcity } from "../../features/cus/CusRetAllCity";

import "rsuite/dist/rsuite.css";



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


import {  Chart as ChartJS, CategoryScale,  LinearScale, PointElement, LineElement,  Title, Tooltip, Legend,} from "chart.js";
ChartJS.register(  CategoryScale, LinearScale, PointElement, LineElement,  Title, Tooltip,  Legend);



function CusRetention() {

      
  // var status = useSelector((state) => state.dashTops.status);
  // if (status !== "success") {
  //   window.location.href = "/";
  // }

  var today                  = new Date();
  var oneYearAgo             = subYears(today, 1);
  var [daterange, setdrange] = useState([oneYearAgo, today]);
  var dispatch = useDispatch();

  var accountType             = useSelector((state) => state.dashTops.accountType);
  var accountType             = useSelector((state) => state.dashTops.accountType);
  var get_cusret_allcityFlag  = useSelector((state) => state.CusRetAC.get_cusret_allcityFlag);
  var [duration, setduration] = useState();

  var CusRetAC                      = useSelector((state) => state.CusRetAC);
  var [rev_table,setRev_table]      = useState();
  var [order_table,setOrder_table]  = useState();
  var [cus_table,setCus_table]      = useState();


  useEffect(() => {
    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_cusret_allcity")) {
    //     ReactSession.set("get_cusret_allcity", "1");
    //     dispatch(get_cusret_allcity({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusret_allcity")) {
        sessionStorage.setItem("get_cusret_allcity", "1");
        dispatch(get_cusret_allcity({ ajax_call: 2 }));
      }
    }
  },[]);

  useEffect(() => {
    if(CusRetAC !== undefined) {
      setRev_table(CusRetAC?.rev_table ? structuredClone(CusRetAC.rev_table) : '');
      setOrder_table(CusRetAC?.order_table ? structuredClone(CusRetAC.order_table) : '');
      setCus_table(CusRetAC?.cus_table ? structuredClone(CusRetAC.cus_table) : '');
    }
  },[get_cusret_allcityFlag]);
  

  var dateSubmit = (e) => {
    dispatch(get_cusret_allcity({
        from : format(daterange[0],'yyyy-MM-dd'), to : format(daterange[1],'yyyy-MM-dd'),
        unit : duration,
        ajax_call : 1
    }));
  };

  return (

    <>
      
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Customer : Retention</h6>
        </div>
      </Grid>

      <Grid container spacing={1} style={{display:'block'}}>
    
        <Grid item xs={12} style={{"display":"inline-flex","background":"white","padding":"15px","borderRadius":"6px","marginLeft":"8px","marginTop":"1%","marginBottom":"3%"}}>
          <strong style={{"fontSize":"17px","paddingTop":"5px","marginRight":"20px"}}> Set the timeline for analysis </strong>
          <div className="date-period">
            <DateRangePicker
              label=""
              value={daterange}
              onChange={setdrange}
              oneTap={false}
              ranges={[
                {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                {label: "Today", value: [new Date(), new Date()] },
                {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                {label: "Last 7 days",value: [subDays(new Date(), 6), new Date()]},
                {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date()]},
                {label: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                {label: "Year To date",value: [startOfYear(new Date()), new Date()]}
              ]}>
            </DateRangePicker>
            <Button className="period-btn" variant="contained" color="orange" onClick={dateSubmit}>Submit</Button>
          </div>
        </Grid>

        <Grid item xl={8} lg={8} md={8} sm={12} xs={12} style={{marginBottom:"2%"}}>
          <div dangerouslySetInnerHTML={{ __html: cus_table }}></div>
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12} style={{marginBottom:"2%"}}>
          <div dangerouslySetInnerHTML={{ __html: order_table }}></div>
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12} style={{marginBottom:"2%"}}>
          <div dangerouslySetInnerHTML={{ __html: rev_table }}></div>
        </Grid>

      </Grid>

    </>

  );

}

export default CusRetention;

