import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { format } from "date-fns";
import { addDays, subDays, getDate,startOfMonth,endOfMonth,startOfYear } from "date-fns";
import moment from "moment";

import {Button, DatePicker} from "rsuite";
import { DateRangePicker } from "rsuite";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

import "rsuite/dist/rsuite.css";
import CusRFMTreemapChart from './CusRFMTreemapChart'; 
//import { get_cusret_allcity } from "../../features/cus/CusRetAllCity";

function CusRFM() {

  var accountType                     = useSelector((state) => state.dashTops.accountType);
  var dispatch                        = useDispatch();
  
  //const theme                       = useMantineTheme();
  //const defaultMaterialTheme        = createTheme();

  var[daterange, setDaterange]        = useState([ moment().startOf('year').toDate(), moment().toDate()]);
  var [sd, setSD]                     = useState(format(daterange[0], "yyyy-MM-dd"));
  var [ed, setED]                     = useState(format(daterange[1], "yyyy-MM-dd"));

  var [ad, setAD]                     = useState(new Date());
  var [rfmData,setRfmData]            = useState();
  var [customerData,setCustomerData]  = useState();


  var analyzeRFM = () => {

    let sd_ = `${daterange[0].getFullYear()}-${daterange[0].getMonth() + 1}-${daterange[0].getDate()}`;
    let ed_ = `${daterange[1].getFullYear()}-${daterange[1].getMonth() + 1}-${daterange[1].getDate()}`;
    let ad_ = `${ad.getFullYear()}-${ad.getMonth() + 1}-${ad.getDate()}`;
   
    if(accountType === "paid") {

      axios.post("https://server.shopex.io/customers/cus_rfm_segment.php",
          // {start_date : format(daterange[0], "yyyy-MM-dd"), end_date: format(daterange[1], "yyyy-MM-dd"), analysis_date : format(ad, "yyyy-MM-dd")},
          {start_date : sd_, end_date: ed_, analysis_date : ad_},
          {withCredentials : true})
      .then(function (response) {
        const responseData = response.data;
        const customerData = responseData.map(item => {
          return {
            customer_group: item.customer_group,
            customer_email: item.cusmail,
            recency: item.recency,
            frequency: item.frequency,
            monetary: item.monetary,
          };
        });
        setCustomerData(customerData);
        setRfmData(calculateSegmentStatistics(customerData));
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  };


  const calculateSegmentStatistics = (data) => {
    
    const segmentStatistics = {};
    
    if (data && data.length > 0) {
      data.forEach((item) => {
        const segment = item.customer_group;
        if(segment && segment!=null && segment !=""){
          if (!segmentStatistics[segment]) {
            segmentStatistics[segment] = {
              segment: segment,
              total_monetary: 0,
              total_frequency: 0,
              count: 0,
            };
          }
          segmentStatistics[segment].total_monetary += Number(item.monetary);
          segmentStatistics[segment].total_frequency += Number(item.frequency);
          segmentStatistics[segment].count += Number(1);
        }
        
      });
    }
   
    const resultArray = Object.values(segmentStatistics);
    console.log(resultArray);
    return resultArray;

  };
  

  useEffect(() => {
    
    if(accountType === "paid") {

      axios.post("https://server.shopex.io/customers/cus_rfm_segment.php",
      {start_date : format(daterange[0], "yyyy-MM-dd"), end_date: format(daterange[1], "yyyy-MM-dd"), analysis_date : format(ad, "yyyy-MM-dd")},
      {withCredentials : true})
      .then(function (response) {
        const responseData = response.data;
        const customerData = responseData.map(item => {
          return {
            customer_group: item.customer_group,
            customer_email: item.cusmail,
            recency: item.recency,
            frequency: item.frequency,
            monetary: item.monetary,
          };
        });
        setCustomerData(customerData);
        setRfmData(calculateSegmentStatistics(customerData));
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    if(accountType === "demo") {

      var customerData = [
        {
          customer_group: 'Loyal',
          customer_email: 'customerLoyal5@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'Loyal',
          customer_email: 'customerLoyal1@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'Loyal',
          customer_email: 'customerLoyal2@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'Loyal',
          customer_email: 'customerLoyal3@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'Loyal',
          customer_email: 'customerLoyal4@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'New',
          customer_email: 'customerNew4@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'New',
          customer_email: 'customerNew5@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'New',
          customer_email: 'customerNew6@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'New',
          customer_email: 'customerNew1@example.com',
          recency: 13,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'New',
          customer_email: 'customerNew2@example.com',
          recency: 10,
          frequency: 3,
          monetary: 1000,
        },
        {
          customer_group: 'New',
          customer_email: 'customerNew3@example.com',
          recency: 8,
          frequency: 5,
          monetary: 500,
        },
        {
          customer_group: 'Lost',
          customer_email: 'customerLost1@example.com',
          recency: 130,
          frequency: 2,
          monetary: 1000,
        },
        {
          customer_group: 'Lost',
          customer_email: 'customerLost2@example.com',
          recency: 130,
          frequency: 3,
          monetary: 1000,
        },
        {
          customer_group: 'Lost',
          customer_email: 'customerLost3@example.com',
          recency: 130,
          frequency: 5,
          monetary: 500,
        },
        {
          customer_group: 'Champion',
          customer_email: 'customerChamp1@example.com',
          recency: 30,
          frequency: 40,
          monetary: 10000,
        },
        {
          customer_group: 'Champion',
          customer_email: 'customerChamp2@example.com',
          recency: 30,
          frequency: 40,
          monetary: 10000,
        },
        {
          customer_group: 'Champion',
          customer_email: 'customerChamp3@example.com',
          recency: 30,
          frequency: 40,
          monetary: 10000,
        },
        {
          customer_group: 'Champion',
          customer_email: 'customerChamp4@example.com',
          recency: 7,
          frequency: 55,
          monetary: 18000,
        },
        {
          customer_group: 'Champion',
          customer_email: 'customerChamp5@example.com',
          recency: 10,
          frequency: 45,
          monetary: 11500,
        },
        {
          customer_group: 'Champion',
          customer_email: 'customerChamp6@example.com',
          recency: 30,
          frequency: 50,
          monetary: 12000,
        },
        {
          customer_group: 'High-Value',
          customer_email: 'customer1@example.com',
          recency: 30,
          frequency: 10,
          monetary: 2000,
        },
        {
          customer_group: 'High-Value',
          customer_email: 'customer2@example.com',
          recency: 35,
          frequency: 12,
          monetary: 2200,
        },
        {
          customer_group: 'High-Value',
          customer_email: 'customer3@example.com',
          recency: 28,
          frequency: 9,
          monetary: 1900,
        },
        {
          customer_group: 'High-Value',
          customer_email: 'customer4@example.com',
          recency: 32,
          frequency: 11,
          monetary: 2100,
        },
        {
          customer_group: 'At-Risk',
          customer_email: 'customer5@example.com',
          recency: 180,
          frequency: 2,
          monetary: 500,
        },
        {
          customer_group: 'At-Risk',
          customer_email: 'customer6@example.com',
          recency: 175,
          frequency: 3,
          monetary: 480,
        },
        {
          customer_group: 'At-Risk',
          customer_email: 'customer7@example.com',
          recency: 185,
          frequency: 19,
          monetary: 520,
        },
        {
          customer_group: 'At-Risk',
          customer_email: 'customer8@example.com',
          recency: 178,
          frequency: 22,
          monetary: 490,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer9@example.com',
          recency: 90,
          frequency: 5,
          monetary: 800,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer10@example.com',
          recency: 85,
          frequency: 6,
          monetary: 780,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer11@example.com',
          recency: 92,
          frequency: 4,
          monetary: 820,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer12@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer13@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer14@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer15@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Promising',
          customer_email: 'customer16@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer17@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer18@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer19@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer20@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer21@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer22@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer23@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer24@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer25@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Hibernate',
          customer_email: 'customer26@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Hibernate',
          customer_email: 'customer26@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Hibernate',
          customer_email: 'customer27@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Hibernate',
          customer_email: 'customer28@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'Hibernate',
          customer_email: 'customer29@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'CannotLoseThem',
          customer_email: 'customer30@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        
        {
          customer_group: 'AboutToSleep',
          customer_email: 'customerAboutToSleep1@example.com',
          recency: 88,
          frequency: 5,
          monetary: 810,
        },
        {
          customer_group: 'AboutToSleep',
          customer_email: 'customerAboutToSleep2@example.com',
          recency: 88,
          frequency: 5,
          monetary: 510,
        },
        {
          customer_group: 'AboutToSleep',
          customer_email: 'customerAboutToSlee3p@example.com',
          recency: 88,
          frequency: 5,
          monetary: 210,
        },
        {
          customer_group: 'AboutToSleep',
          customer_email: 'customerAboutToSleep4@example.com',
          recency: 88,
          frequency: 5,
          monetary: 1810,
        },
      ];
      // var customerData=[
      //   {
      //       "cusmail": "sha822@gmail.com",
      //       "frequency": "1",
      //       "monetary": "62",
      //       "recency": 1097,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "sh11@gmail.com",
      //       "frequency": "4",
      //       "monetary": "2437",
      //       "recency": 997,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss41@q.q",
      //       "frequency": "1",
      //       "monetary": "211",
      //       "recency": 1279,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss42@q.q",
      //       "frequency": "1",
      //       "monetary": "636",
      //       "recency": 1278,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cuss43@q.q",
      //       "frequency": "1",
      //       "monetary": "350",
      //       "recency": 1277,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss40@q.q",
      //       "frequency": "2",
      //       "monetary": "1547",
      //       "recency": 1241,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss1@q.q",
      //       "frequency": "3",
      //       "monetary": "1286",
      //       "recency": 1106,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss2@q.q",
      //       "frequency": "8",
      //       "monetary": "4171",
      //       "recency": 169,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss12@q.q",
      //       "frequency": "2",
      //       "monetary": "985",
      //       "recency": 1110,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cuss37@q.q",
      //       "frequency": "2",
      //       "monetary": "1192",
      //       "recency": 1218,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss35@q.q",
      //       "frequency": "2",
      //       "monetary": "713",
      //       "recency": 1183,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cuss28@q.q",
      //       "frequency": "2",
      //       "monetary": "1377",
      //       "recency": 1158,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss39@q.q",
      //       "frequency": "1",
      //       "monetary": "118",
      //       "recency": 1244,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss31@q.q",
      //       "frequency": "2",
      //       "monetary": "1063",
      //       "recency": 1187,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss20@q.q",
      //       "frequency": "2",
      //       "monetary": "1226",
      //       "recency": 1114,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss4@q.q",
      //       "frequency": "2",
      //       "monetary": "1013",
      //       "recency": 1108,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cuss32@q.q",
      //       "frequency": "1",
      //       "monetary": "479",
      //       "recency": 1186,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss33@q.q",
      //       "frequency": "1",
      //       "monetary": "394",
      //       "recency": 1185,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss34@q.q",
      //       "frequency": "1",
      //       "monetary": "253",
      //       "recency": 1184,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss36@q.q",
      //       "frequency": "1",
      //       "monetary": "428",
      //       "recency": 1182,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss27@q.q",
      //       "frequency": "1",
      //       "monetary": "498",
      //       "recency": 1159,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss29@q.q",
      //       "frequency": "1",
      //       "monetary": "225",
      //       "recency": 1157,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss30@q.q",
      //       "frequency": "1",
      //       "monetary": "453",
      //       "recency": 1156,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss5@q.q",
      //       "frequency": "3",
      //       "monetary": "2195",
      //       "recency": 1108,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss26@q.q",
      //       "frequency": "1",
      //       "monetary": "545",
      //       "recency": 1119,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss23@q.q",
      //       "frequency": "2",
      //       "monetary": "471",
      //       "recency": 1117,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss25@q.q",
      //       "frequency": "1",
      //       "monetary": "628",
      //       "recency": 1118,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cuss22@q.q",
      //       "frequency": "1",
      //       "monetary": "254",
      //       "recency": 1116,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss21@q.q",
      //       "frequency": "1",
      //       "monetary": "241",
      //       "recency": 1115,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "",
      //       "frequency": "1",
      //       "monetary": "376",
      //       "recency": 1115,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss19@q.q",
      //       "frequency": "1",
      //       "monetary": "549",
      //       "recency": 1113,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss17@q.q",
      //       "frequency": "1",
      //       "monetary": "481",
      //       "recency": 1112,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss18@q.q",
      //       "frequency": "1",
      //       "monetary": "470",
      //       "recency": 1112,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss14@q.q",
      //       "frequency": "1",
      //       "monetary": "318",
      //       "recency": 1111,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss15@q.q",
      //       "frequency": "1",
      //       "monetary": "447",
      //       "recency": 1111,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss16@q.q",
      //       "frequency": "1",
      //       "monetary": "523",
      //       "recency": 1111,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss9@q.q",
      //       "frequency": "1",
      //       "monetary": "380",
      //       "recency": 1110,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss10@q.q",
      //       "frequency": "1",
      //       "monetary": "180",
      //       "recency": 1110,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss13@q.q",
      //       "frequency": "1",
      //       "monetary": "505",
      //       "recency": 1110,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss7@q.q",
      //       "frequency": "1",
      //       "monetary": "440",
      //       "recency": 1109,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss8@q.q",
      //       "frequency": "1",
      //       "monetary": "580",
      //       "recency": 1109,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cuss6@q.q",
      //       "frequency": "1",
      //       "monetary": "455",
      //       "recency": 1108,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss3@q.q",
      //       "frequency": "1",
      //       "monetary": "196",
      //       "recency": 1107,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss38@q.q",
      //       "frequency": "1",
      //       "monetary": "439",
      //       "recency": 1105,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuss3000@q.q",
      //       "frequency": "1",
      //       "monetary": "315",
      //       "recency": 1095,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cusaaa@q.q",
      //       "frequency": "1",
      //       "monetary": "45",
      //       "recency": 1087,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "shaogatalam@q.q",
      //       "frequency": "1",
      //       "monetary": "87",
      //       "recency": 1082,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cuszzzz@q.q",
      //       "frequency": "1",
      //       "monetary": "342",
      //       "recency": 1029,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cusssss@q.q",
      //       "frequency": "1",
      //       "monetary": "910",
      //       "recency": 1029,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "custttt@q.q",
      //       "frequency": "1",
      //       "monetary": "957",
      //       "recency": 1029,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cusut@q.q",
      //       "frequency": "1",
      //       "monetary": "257",
      //       "recency": 1028,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cusut1@q.q",
      //       "frequency": "1",
      //       "monetary": "882",
      //       "recency": 1028,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus888@q.q",
      //       "frequency": "1",
      //       "monetary": "1223",
      //       "recency": 1021,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus777@q.q",
      //       "frequency": "1",
      //       "monetary": "280",
      //       "recency": 1021,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus666@q.q",
      //       "frequency": "3",
      //       "monetary": "1785",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "su10@q.q",
      //       "frequency": "1",
      //       "monetary": "39",
      //       "recency": 960,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "qwe@rtyu.u",
      //       "frequency": "1",
      //       "monetary": "192",
      //       "recency": 937,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "camcus9@q.q",
      //       "frequency": "1",
      //       "monetary": "624",
      //       "recency": 930,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cartmail@q.q",
      //       "frequency": "1",
      //       "monetary": "72",
      //       "recency": 923,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_a@a.a",
      //       "frequency": "1",
      //       "monetary": "287",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_b@b.b",
      //       "frequency": "1",
      //       "monetary": "265",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_c@c.c",
      //       "frequency": "1",
      //       "monetary": "408",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_d@d.d",
      //       "frequency": "1",
      //       "monetary": "1290",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_e@e.e",
      //       "frequency": "1",
      //       "monetary": "457",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_f@f.f",
      //       "frequency": "1",
      //       "monetary": "434",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_g@g.g",
      //       "frequency": "1",
      //       "monetary": "1009",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus_h@h.h",
      //       "frequency": "1",
      //       "monetary": "698",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus_i@i.i",
      //       "frequency": "1",
      //       "monetary": "1683",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_j@j.j",
      //       "frequency": "1",
      //       "monetary": "1225",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_k@k.k",
      //       "frequency": "1",
      //       "monetary": "619",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus_l@l.l",
      //       "frequency": "1",
      //       "monetary": "480",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_n@n.n",
      //       "frequency": "1",
      //       "monetary": "542",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_o@o.o",
      //       "frequency": "1",
      //       "monetary": "895",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus_q@q.q",
      //       "frequency": "1",
      //       "monetary": "455",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_r@r.r",
      //       "frequency": "1",
      //       "monetary": "565",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus_s@s.s",
      //       "frequency": "1",
      //       "monetary": "457",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_t@t.t",
      //       "frequency": "1",
      //       "monetary": "220",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 2,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_u@u.u",
      //       "frequency": "1",
      //       "monetary": "418",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_v@v.v",
      //       "frequency": "1",
      //       "monetary": "517",
      //       "recency": 885,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_p@p.p",
      //       "frequency": "1",
      //       "monetary": "446",
      //       "recency": 883,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 3,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_w@w.w",
      //       "frequency": "1",
      //       "monetary": "910",
      //       "recency": 881,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cus_x@x.x",
      //       "frequency": "1",
      //       "monetary": "561",
      //       "recency": 878,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 4,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_y@y.y",
      //       "frequency": "1",
      //       "monetary": "1250",
      //       "recency": 873,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cus_z@z.z",
      //       "frequency": "1",
      //       "monetary": "692",
      //       "recency": 872,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "cusnew1@1.1",
      //       "frequency": "1",
      //       "monetary": "1172",
      //       "recency": 863,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cusnew2@2.2",
      //       "frequency": "1",
      //       "monetary": "1150",
      //       "recency": 863,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   },
      //   {
      //       "cusmail": "cusnew3@3.3",
      //       "frequency": "1",
      //       "monetary": "612",
      //       "recency": 863,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 5,
      //       "customer_group": null
      //   },
      //   {
      //       "cusmail": "A2@s.c",
      //       "frequency": "1",
      //       "monetary": "14",
      //       "recency": 177,
      //       "recency_quartile": 1,
      //       "frequency_quartile": 1,
      //       "monetary_quartile": 1,
      //       "customer_group": "Lost"
      //   }
      // ];

      var customerData = customerData.map(item => {
        return {
          customer_group: item.customer_group,
          customer_email: item.cusmail,
          recency: item.recency,
          frequency: item.frequency,
          monetary: item.monetary,
        };
      });
      setCustomerData(customerData);
      setRfmData(calculateSegmentStatistics(customerData));
    
    }

  },[]);

  
  


  return (
  
    <>
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Customer : RFM analysis</h6>
        </div>
      </Grid>

      <Grid container spacing={3}>

        <Grid item xs={12}>

          <div style={{"borderRadius": "10px","display":"grid","fontFamily":"system-ui","background":"mediumseagreen","padding":"1%","width":"55vw","color":'white'}}>  
              
            <strong> 
              Instead of using a random timeline, we will retrieve orders from customers with their first purchase within a defined timeline.
              Capturing data from their initial to most recent purchase enhances the accuracy of the analysis
            </strong>

            <div style={{"display":"flex"}}>

              <div style={{"display":"grid"}}>
                
                <span style={{paddingBottom:"10px",paddingTop:"10px"}}> First purchase timeline :: (Required)</span>  
                
                <DateRangePicker
                  value={daterange}
                  onChange={setDaterange}
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

              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
              <div style={{"display":"grid",width:'fit-content'}}>
                <span style={{paddingBottom:"10px",paddingTop:"10px"}}> Analysis date :: (Optional, default value will be Today)</span>  
                <DatePicker value={ad} onChange={(date) => setAD(date)} />
              </div>
              
            </div>

            <Button color="primary" variant="contained" onClick={analyzeRFM} style={{ marginTop: '10px',width:"fit-content" }} >
              Analyze
            </Button>

          </div>

        </Grid>

        <Grid item xs={12} style={{paddingTop:"3vh"}}>
          {rfmData && customerData && <CusRFMTreemapChart data={rfmData} rawData={customerData} sd={sd} ed={ed} ad={ad} />}
        </Grid>

      </Grid>
    </>
  )

}

export default CusRFM