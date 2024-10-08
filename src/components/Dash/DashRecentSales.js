import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_recent_sales } from "../../features/dash/dashboard";

import EmailIcon from '@mui/icons-material/Email';
import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

function DashRecentSales() {

  var accountType = useSelector((state) => state.dashTops.accountType);
  var timelinecontentstyle = {
    "background":"ghostwhite",
    "margin":".3rem 0 .3rem 1rem",
    "fontWeight":"400",
    "lineHeight":"1",
    "flex":"1 1 0%",
    "padding":".5rem 1rem",
    "textAlign":"left",
    "fontSize":"17px",
    "border":"1px dashed #ccc",
    "borderRadius":"3px"
  };

  var dispatch = useDispatch();
  
  useEffect(() => {
    // if(accountType === "paid") {
    //   if (!ReactSession.get("get_recent_sales")) {
    //     ReactSession.set("get_recent_sales", "1");
    //     dispatch(get_recent_sales({ ajax_call: 'recent_sales' }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_recent_sales")) {
        sessionStorage.setItem("get_recent_sales", "1");
        dispatch(get_recent_sales({ ajax_call: 'recent_sales' }));
      }
    }
  },[]);

  var recent_sales = useSelector((state) => state.dash.rsale.rsd);

  if(accountType === "demo") {

    var recent_sales = [
      {
        orderid: 1,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-15T10:00:00",
        order_total: 150.0,
        cusmail: "customer1@example.com",
      },
      {
        orderid: 2,
        order_type: "repeat",
        atdate: "2023-09-14T15:30:00",
        order_total: 75.5,
        cusmail: "customer2@example.com",
      },
      {
        orderid: 3,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-14T09:45:00",
        order_total: 200.25,
        cusmail: "customer3@example.com",
      },
      {
        orderid: 4,
        order_type: "repeat",
        atdate: "2023-09-13T14:20:00",
        order_total: 50.0,
        cusmail: "customer4@example.com",
      },
      {
        orderid: 5,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-13T11:15:00",
        order_total: 100.75,
        cusmail: "customer5@example.com",
      },
      {
        orderid: 6,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-12T16:45:00",
        order_total: 80.0,
        cusmail: "customer6@example.com",
      },
      {
        orderid: 7,
        order_type: "repeat",
        atdate: "2023-09-12T10:30:00",
        order_total: 45.5,
        cusmail: "customer7@example.com",
      },
      {
        orderid: 8,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-11T14:50:00",
        order_total: 120.0,
        cusmail: "customer8@example.com",
      },
      {
        orderid: 9,
        order_type: "repeat",
        atdate: "2023-09-11T09:10:00",
        order_total: 60.25,
        cusmail: "customer9@example.com",
      },
      {
        orderid: 10,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-10T13:30:00",
        order_total: 175.0,
        cusmail: "customer10@example.com",
      },
      {
        orderid: 7,
        order_type: "repeat",
        atdate: "2023-09-12T10:30:00",
        order_total: 45.5,
        cusmail: "customer7@example.com",
      },
      {
        orderid: 8,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-11T14:50:00",
        order_total: 120.0,
        cusmail: "customer8@example.com",
      },
      {
        orderid: 9,
        order_type: "repeat",
        atdate: "2023-09-11T09:10:00",
        order_total: 60.25,
        cusmail: "customer9@example.com",
      },
      {
        orderid: 10,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-10T13:30:00",
        order_total: 175.0,
        cusmail: "customer10@example.com",
      },
      {
        orderid: 7,
        order_type: "repeat",
        atdate: "2023-09-12T10:30:00",
        order_total: 45.5,
        cusmail: "customer7@example.com",
      },
      {
        orderid: 8,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-11T14:50:00",
        order_total: 120.0,
        cusmail: "customer8@example.com",
      },
      {
        orderid: 9,
        order_type: "repeat",
        atdate: "2023-09-11T09:10:00",
        order_total: 60.25,
        cusmail: "customer9@example.com",
      },
      {
        orderid: 10,
        order_type: "new",order_status: "processing",
        atdate: "2023-09-10T13:30:00",
        order_total: 175.0,
        cusmail: "customer10@example.com",
      },
    
    ];

  }
    
  var key=1;
  return (
  
    <>
    
      <Grid style={{"maxHeight": "60vh","overflowY":"auto"}}>
        
        <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, }, }}>

          {recent_sales !== undefined && recent_sales.length > 0 &&
              
              recent_sales.map((sale) => (
              
                <TimelineItem key={key++} style={{ minHeight: "57px" }}>
                  
                  <TimelineSeparator>
                  </TimelineSeparator>

                  <TimelineContent style={timelinecontentstyle}>
                    
                    <Typography>
                      
                      {/* <div> */}
                        <span> 
                          <a href={"/Orders/" + sale.orderid} style={{ color: sale.order_type === "new" ? "red" : "green"}}> 
                            <strong>  {sale.order_type === "new" ? "New" : "Repeat"} : {sale.order_status} </strong> 
                          </a> 
                        </span>
                        {new Date(sale.atdate).toLocaleString("default", {month: "short",}) + " " + new Date(sale.atdate).getDate()}
                        &nbsp;&nbsp; 
                        <span> ${sale.order_total.toLocaleString()} </span>
                      {/* </div> */}

                      <span style={{display:'flex'}}> 
                          <EmailIcon style={{fontSize:'20px',color:'cornflowerblue',verticalAlign:'text-top'}} />  &nbsp;
                          <strong style={{verticalAlign:'baseline'}}> {sale.cusmail.toLocaleString()} </strong> 
                      </span>

                    </Typography>
                    
                  </TimelineContent>

                </TimelineItem>
              )
          )}

        </Timeline>

      </Grid>
      
    </>

  );

}

export default DashRecentSales;
