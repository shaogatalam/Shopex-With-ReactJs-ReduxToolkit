import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import { addDays, subDays, getDate } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { Button, DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { get_cusret_Selcity } from "../../features/cus/CusRetSelCity";
import { get_cusret_getcity } from "../../features/cus/CusRetSelCity";
import Multiselect from "multiselect-react-dropdown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CusRetentionSC() {

  var dispatch    = useDispatch();
  var accountType = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_cusret_getcity")) {
    //     ReactSession.set("get_cusret_getcity", "1");
    //     dispatch(get_cusret_getcity({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusret_getcity")) {
        sessionStorage.setItem("get_cusret_getcity", "1");
        dispatch(get_cusret_getcity({ ajax_call: 2 }));
      }
    }

  },[]);

  
  var [scity, setScity] = useState([]);

  var [daterange, setdrange] = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);

  var [duration, setduration] = useState();

  var dateSubmit = (e) => {
    dispatch(get_cusret_Selcity({
      from: format(daterange[0], "yyyy-MM-dd"),
      to: format(daterange[1], "yyyy-MM-dd"),
      unit: duration,
      ajax_call: 1,
      city: scity,
    }));
  };

  var CusRetSC = useSelector((state) => state.CusRetSC);
  var cus_table, order_table, rev_table;

  if (CusRetSC) {

    var CusRetSC_city = CusRetSC?.scity ?? []; 

    if (CusRetSC.cus_table) {
      cus_table = structuredClone(CusRetSC.cus_table);
    }

    if (CusRetSC.order_table) {
      order_table = structuredClone(CusRetSC.order_table);
    }

    if (CusRetSC.rev_table) {
      rev_table = structuredClone(CusRetSC.rev_table);
    }
  }

  return (
    
    <Grid container spacing={3}>
      
      <Grid item xs={12} className="top-wrap">
        <div className="notifications">
          <h6>Customer retention from specific city</h6>
          
        </div>
      </Grid>

      <Grid item xs={12}>
        
        <div className="date-period">

          <DateRangePicker
            label="First Purchase Timeline"
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
          

          <Button className="period-btn" variant="contained" color="secondary" onClick={dateSubmit}>Submit</Button>
        
        </div>
      
      </Grid>

      <Grid item sm={12} style={{ zIndex: "0"}}>
        
        <Grid container>
          <Grid item sm={6}>
            {CusRetSC_city && 
            <Multiselect placeholder="Select Shippping city" isObject={false}onRemove={(e)=>{setScity(e);}}onSelect={(e)=>{setScity(e);}}options={CusRetSC_city}selectedValues={[]}showCheckbox/>}
          </Grid>
        </Grid>


        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <div style={{ height: '100%', marginBottom: '15px',background:'ghostwhite', }} dangerouslySetInnerHTML={{ __html: cus_table }}>
          </div>
        </Grid>

        
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <div style={{ height: '100%', marginBottom: '15px',background:'ghostwhite', }} dangerouslySetInnerHTML={{ __html: order_table }}>
          </div>
        </Grid>
        

        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <div style={{ height: '100%', marginBottom: '15px',background:'ghostwhite', }} dangerouslySetInnerHTML={{ __html: rev_table }}>
          </div>
        </Grid>

        

      </Grid>
    
    </Grid>
  
  );

}

export default CusRetentionSC;
