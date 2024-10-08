import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import { addDays, subDays, getDate } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { Button, DateRangePicker } from "rsuite";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { get_cusLocCT_data } from "../../features/cus/CusLocCT";
import { get_trf_data } from "../../features/cus/Cus_new_repeat_total_Chart";

import CusCityStateChart from "./CusCityStateChart";
import CusCityStateTable from "./CusCityStateTable";
import CusFromThisMonth from "./CusFromThisMonth";
import CusGroupByFirstMonth from "./CusGroupByFirstMonth";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import "rsuite/dist/rsuite.css";

import { Card } from "react-bootstrap";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";
import { Line,Bar } from "react-chartjs-2";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,  Filler);

//When the user scrolls down 20px from the top of the document Add/Remove class
onscroll = () => {
  const selector = document.querySelector(".notifications");
  (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
  ? selector.classList.add("topper")
  : selector.classList.remove("topper");
};


onscroll = () => {
  const notificationElement = document.querySelector(".notifications");
  if (notificationElement) {
    notificationElement.classList.toggle("topper", window.scrollY > 20);
  }
};
function CusReport() {

  var tooltipLinePlugIn     = "";
  var accountType           = useSelector((state) => state.dashTops.accountType);
  var get_trf_dataFlag      = useSelector((state) => state.cusTRF.get_trf_dataFlag);

  var trf = useSelector((state) => state.cusTRF);

  var[totcus_object,setTotcusObject] = useState();
  var[nrcus_object,setNRcusObject]   = useState();

  var [new_side_note_Array,setNewSideNoteArray]    = useState();
  var [repeat_side_note_Array,setRepSideNoteArray] = useState();
  var [total_side_note_Array,setTRFSideNoteArray]  = useState();
  

  var [duration2, setduration2] = useState("monthly");

  var dispatch2 = useDispatch();
  var dispatch3 = useDispatch();
  var dispatch6 = useDispatch();

  useEffect(() => {
    
    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_trf_data")) {
    //     ReactSession.set("get_trf_data", "1");
    //     dispatch2(get_trf_data({ ajax_seg : 2 }));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_trf_data")) {
        sessionStorage.setItem("get_trf_data", "1");
        dispatch2(get_trf_data({ ajax_seg: 2 }));
      }
    }

    tooltipLinePlugIn = {
      id: 'tooltipLine1',
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

    if(accountType === "demo") {

      var totcus_labels = ["January", "February", "March", "April", "May", "June"];
      var totcus_data = [65, 59, 80, 81, 56, 65];
  
      var totcus_object_ = {
        labels: totcus_labels,
        datasets: [
          {
            id:1,
            labels: totcus_labels,
            label: 'Total-Customer',
            borderColor: 'rgba(106, 90, 205, 0.3)',
            fill: true,
            pointRadius: 6, hoverRadius: 14,
            borderWidth: 1,
            data: totcus_data,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
              gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              return gradient;
            },
          }
        ]
      };
      setTotcusObject(totcus_object_);

      setTRFSideNoteArray([350, 65, 170, 125, 500, 400, 225, 300, 320]);
  
      var nrcus_labels = ["January", "February", "March", "April", "May","June"];
      var new_data = [30, 45, 60, 55, 70,58];
      var repeat_data = [10, 20, 15, 25, 30, 20];
  
      var nrcus_object_ = {
        labels: nrcus_labels,
        datasets: [
          {
            id:2,
            labels: totcus_labels,
            label: 'New-Customer',
            borderColor: "rgba(106, 90, 205, 1)",
            fill: true,
            pointRadius: 6, hoverRadius: 14,
            borderWidth: 1,
            data: new_data,
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
            id:3,
            labels: totcus_labels,
            label: 'Repeat-Customer',
            borderColor: 'rgb(255, 88, 0)',
            fill: true,
            pointRadius: 6, hoverRadius: 14,
            borderWidth: 1,
            data: repeat_data,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
              gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
              return gradient;
            },
          },
          
        ]
      };
      setNRcusObject(nrcus_object_);

      setNewSideNoteArray([250, 40, 95, 75, 300, 20, 50, -10, 5]);
      setRepSideNoteArray([100, 25, 75, 50, 200, -25, 175, 10, -5]);
  
    }
    
  },[]);


  var [daterange2, setdrange2]  = useState([ new Date(moment().startOf("month")), new Date(moment().endOf("month"))]);
  var [duration2, setduration2] = useState("monthly");

  
  useEffect(() => {

    var totcus_labels           = trf?.total_label ? trf.total_label.replace(/\"/g, "").split(",") : [];
    var totcus_data             = trf?.total_data ? trf.total_data.replace(/\"/g, "").split(",") : [];
    var totcus_object_ = {
    labels: totcus_labels,
    datasets : [
      {
        label: 'Total-Customer',
        borderColor: 'rgb(106, 90, 205)',
        fill: true,
        pointRadius: 6, hoverRadius: 14,
        borderWidth: 1,
        data: totcus_data,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
          gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
          return gradient;
        },
      },
    ]
    }  
    setTotcusObject(totcus_object_);

    var nrcus_labels  = trf?.f_r_label ? trf.f_r_label.replace(/\"/g, "").split(","):[];
    var new_data      = trf?.ftime_data ? trf.ftime_data.replace(/\"/g, "").split(","):[];
    var repeat_data   = trf?.ret_data ? trf.ret_data.replace(/\"/g, "").split(",") : [];

    var nrcus_object_ = {
      labels: nrcus_labels,
      datasets: [
        {
          label: 'New-Customer',
          borderColor: "rgb(106, 90, 205)",
          fill: true,
          pointRadius: 6, hoverRadius: 14,
          borderWidth:1,
          data: new_data,
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
          label: 'Repeat-Customer',
          borderColor: 'rgb(255, 88, 0)',
          fill: true,
          pointRadius: 6, hoverRadius: 14,
          borderWidth: 1,
          data: repeat_data,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
        
      ]
    }
    setNRcusObject(nrcus_object_);

    setNewSideNoteArray(trf ? (trf.f_s_note ? trf.f_s_note.split("shop") : []) : []);
    setRepSideNoteArray(trf?.r_s_note ? trf.r_s_note.split("shop") : []);
    setTRFSideNoteArray(trf?.total_s_note ? trf.total_s_note.split("shop") : []);

  },[get_trf_dataFlag])

  var dateSubmit2 = (e) => {
    
    e.preventDefault();
    
    if(accountType === "paid") {

      dispatch3(
        get_trf_data({
          from: format(daterange2[0], "yyyy-MM-dd"),
          to: format(daterange2[1], "yyyy-MM-dd"),
          unit: duration2,
          ajax_seg: 1,
        })
      );
      
    }

  };

  var [daterange, setdrange]   = useState([ new Date(moment().startOf("month")), new Date(moment().endOf("month"))]);
  var [daterange1, setdrange1] = useState([ startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]);
  var [duration, setduration]  = useState("monthly");
  var [cusType, setcusType]    = useState("both");
  
  var dateSubmit = (e) => {

    e.preventDefault();
    if(accountType === "paid") {
      dispatch6(
        get_cusLocCT_data({
          from: format(daterange[0], "yyyy-MM-dd"),
          to: format(daterange[1], "yyyy-MM-dd"),
          from1: format(daterange1[0], "yyyy-MM-dd"),
          to1: format(daterange1[1], "yyyy-MM-dd"),
          unit: duration,
          type: cusType,
          ajax_seg: 1,
        })
      );
    }
  };

  // Line chart plugin
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
    
      
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Customer : Reports</h6>
        </div>
      </Grid>


      <Grid container spacing={3}>
        {/* DateRange and Unit Bar */}
        <Grid item xs={12}>
        
          <div className="date-period">

            <DateRangePicker
              // label="Timeline"
              value={daterange2}
              onChange={setdrange2}
              oneTap={false}
              ranges={[
                {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                {label: "Today", value: [new Date(), new Date()] },
                {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                {label: "Last 7 days", value: [subDays(new Date(), 6), new Date()]},
                {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date(),]},
                {abel: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
              ]}>
            </DateRangePicker>

            <RadioGroup style={{ display:"inline-block",fontSize:"13px",color:"white",fontWeight:"500"}} onChange={(e) => { setduration2(e.target.value);}}>
              <Radio checked={duration2 === "daily"} value="daily" name="duration" /> Day
              <Radio checked={duration2 === "weekly"} value="weekly" name="duration" /> Week
              <Radio checked={duration2 === "monthly"} value="monthly" name="duration" /> Month
            </RadioGroup>
            <Button className="period-btn" variant="contained" color="secondary"  onClick={dateSubmit2} > Submit </Button>
          
          </div>

        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Total Customer */}
        <Grid item xl={6} xs={12}>
          
          <Card className="dash-card">
          
            <h6>Total Customer</h6>

              {
                totcus_object !== undefined &&   totcus_object && 
                <div style={{height:'300px'}}>
                  <Line data={totcus_object} options={chartOptions} plugins={plugins} />
                </div> 
              }
            
            <div style={{background: "whitesmoke",padding: "20px",fontSize:"11px", textAlign:"center"}}>
              
              <p>
                <strong> {total_side_note_Array && total_side_note_Array.length > 0 && <> <span style={{color:"slateblue"}}>Total</span> :  {total_side_note_Array[0]} </> }          </strong> &nbsp; &nbsp; &nbsp;
                <strong> {total_side_note_Array && total_side_note_Array.length > 1 && <> <span style={{color:"slateblue"}}>Min</span> :    {total_side_note_Array[1]} </>}           </strong> &nbsp; &nbsp; &nbsp;
                <strong> {total_side_note_Array && total_side_note_Array.length > 2 && <> <span style={{color:"slateblue"}}>Max</span> :    {total_side_note_Array[2]} </>}   </strong> &nbsp; &nbsp; &nbsp; 
                <strong> {total_side_note_Array && total_side_note_Array.length > 3 && <> <span style={{color:"slateblue"}}>AVG</span> :    {total_side_note_Array[3]} </>}   </strong> &nbsp; &nbsp; &nbsp;
              </p>

              <p>
                <strong> {total_side_note_Array && total_side_note_Array.length > 4 &&  <> <span style={{color:"slateblue"}}> Total Point : </span> {total_side_note_Array[4]}       </>} </strong> &nbsp; &nbsp; &nbsp;
                <strong> {total_side_note_Array && total_side_note_Array.length > 5 &&  <> <span style={{color:"slateblue"}}> Point Bellow AVG : </span> {total_side_note_Array[5]}  </>} </strong> &nbsp; &nbsp; &nbsp;
                <strong> {total_side_note_Array && total_side_note_Array.length > 6 &&  <> <span style={{color:"slateblue"}}> Point Above AVG : </span>{total_side_note_Array[6]}    </>} </strong> &nbsp; &nbsp; &nbsp;
              </p>

              <p>
                <strong> {total_side_note_Array && total_side_note_Array.length > 7 && <> <span style={{color:"slateblue"}}> Change : </span>{total_side_note_Array[7]} </>}        </strong>&nbsp; &nbsp; &nbsp;
                <strong> {total_side_note_Array && total_side_note_Array.length > 8 && <> <span style={{color:"slateblue"}}> AVG Change :  </span>{total_side_note_Array[8]} </>}   </strong>&nbsp; &nbsp; &nbsp;
              </p>
           
            </div>
            
          </Card>

        </Grid>
      
        {/* Repeat and New Customer */}
        <Grid item xl={6} xs={12}>
          
          <Card className="dash-card">
            
            <h6>Repeat & New Customer</h6>
          
            {
              nrcus_object !== undefined && nrcus_object && 
              <div style={{height:'300px'}}> 
                <Line data={nrcus_object} options={chartOptions} plugins={plugins} /> 
              </div> 
            }
            
            <Grid container spacing={2} style={{ padding: 0 }}>
          
              <Grid item md={6}>
          
                <div style={{background: "whitesmoke",padding: "20px",fontSize:"11px", textAlign:"center"}}>
                  
                  <p>Repeat</p>
                  
                  <p>
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 0 && <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Total : </span>  {repeat_side_note_Array[0]} </>}          </strong>&nbsp;
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 1 && <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Min :  </span>   {repeat_side_note_Array[1]} </>}           </strong>&nbsp;
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 2 && <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Max : </span>    {repeat_side_note_Array[2]} </>}   </strong>&nbsp;
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 3 && <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> AVG :  </span>   {repeat_side_note_Array[3]} </>}   </strong>&nbsp;
                  </p>

                  <p>
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 4 &&  <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Total Point : </span> {repeat_side_note_Array[4]}       </>} </strong>&nbsp;
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 5 &&  <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Point Bellow AVG :  </span> {repeat_side_note_Array[5]}  </>} </strong>&nbsp;
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 6 &&  <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Point Above AVG : </span>{repeat_side_note_Array[6]}    </>} </strong>&nbsp;
                  </p>

                  <p>
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 7 && <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> Change : </span> {repeat_side_note_Array[7]} </>}        </strong>&nbsp;
                    <strong> {repeat_side_note_Array && repeat_side_note_Array.length > 8 && <> <span style={{color:"rgba(255, 88, 0, 0.8)"}}> AVG Change : </span> {repeat_side_note_Array[8]} </>}   </strong>&nbsp;
                  </p>
              
                </div>

              </Grid>

              <Grid item md={6}>

                <div style={{background: "whitesmoke",padding: "20px",fontSize:"11px", textAlign:"center"}}>
                  
                  <p>New</p>
                  
                  <p>
                    <strong> {new_side_note_Array && new_side_note_Array.length > 0 && <> <span style={{color:"blueviolet"}}> Total : </span>  {new_side_note_Array[0]} </>}          </strong>&nbsp;
                    <strong> {new_side_note_Array && new_side_note_Array.length > 1 && <> <span style={{color:"blueviolet"}}> Min :  </span>   {new_side_note_Array[1]} </>}           </strong>&nbsp;
                    <strong> {new_side_note_Array && new_side_note_Array.length > 2 && <> <span style={{color:"blueviolet"}}> Max : </span>    {new_side_note_Array[2]} </>}   </strong>&nbsp;
                    <strong> {new_side_note_Array && new_side_note_Array.length > 3 && <> <span style={{color:"blueviolet"}}> AVG : </span>   {new_side_note_Array[3]} </>}   </strong>&nbsp;
                  </p>

                  <p>
                    <strong> {new_side_note_Array && new_side_note_Array.length > 4 &&  <> <span style={{color:"blueviolet"}}> Total Point : </span> {new_side_note_Array[4]}       </>} </strong>&nbsp;
                    <strong> {new_side_note_Array && new_side_note_Array.length > 5 && <> <span style={{color:"blueviolet"}}> Point Bellow AVG : </span> {new_side_note_Array[5]}  </>} </strong>&nbsp;
                    <strong> {new_side_note_Array && new_side_note_Array.length > 6 &&  <> <span style={{color:"blueviolet"}}> Point Above AVG : </span>{new_side_note_Array[6]}    </>} </strong>&nbsp;
                  </p>

                  <p>
                    <strong> {new_side_note_Array && new_side_note_Array.length > 7 && <> <span style={{color:"blueviolet"}}> Change : </span>{new_side_note_Array[7]} </>}        </strong>&nbsp;
                    <strong> {new_side_note_Array && new_side_note_Array.length > 8 && <> <span style={{color:"blueviolet"}}> AVG Change : </span> {new_side_note_Array[8]} </>}   </strong>&nbsp;
                  </p>
              
                </div>

              </Grid>

            </Grid>

          </Card>
        
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <CusFromThisMonth />
      </Grid>

      <Grid container spacing={3}>
          <Grid item xl={12} xs={12}>
            <CusGroupByFirstMonth />
          </Grid>
      </Grid> 
       
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <br />
          <h6> :: Location Based Data</h6>
          <br />
          <div className="date-period" style={{ marginBottom: "-15px" }}>
          
            <div style={{display:'inline-flex'}}>

              <DateRangePicker
                value={daterange}
                onChange={setdrange}
                oneTap={false}
                ranges={[
                  {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                  {label: "Today", value: [new Date(), new Date()] },
                  {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                  {label: "Last 7 days", value: [subDays(new Date(), 6), new Date()]},
                  {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date(),]},
                  {abel: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                  {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
                ]}>
              </DateRangePicker>

              <DateRangePicker
                value={daterange1}
                onChange={setdrange1}
                oneTap={false}
                ranges={[
                  {label: "Yesterday",value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
                  {label: "Today", value: [new Date(), new Date()] },
                  {label: "Tomorrow",value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
                  {label: "Last 7 days", value: [subDays(new Date(), 6), new Date()]},
                  {label: "This month",value: [subDays(new Date(), getDate(new Date()) - 1),new Date(),]},
                  {abel: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date())))]},
                  {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
                ]}>

              </DateRangePicker>
          
            
              <div style={{"display": "flex", "background": "gainsboro"}}>

                <p style={{paddingTop:'12px',fontSize:'12px',color:'red',background:'white'}}> Used in chart  <span> ›  </span>  </p>
                
                <p style={{paddingTop:'5px',fontSize:'12px',color:'red'}}> &nbsp;&nbsp; Time unit   <span> ›  </span>  </p> 
                <RadioGroup onChange={(e) => {setduration(e.target.value);}} style={{display: "inline-block",fontSize: "13px",fontWeight: "500",}}>
                  <Radio style={{paddingRight:" 0px"}} checked={duration === "daily"} type="radio" value="daily" name="gender" />       <span style={{fontSize:'11px'}}> Daily  </span> 
                  <Radio style={{paddingRight:" 0px"}} checked={duration === "weekly"} type="radio" value="weekly" name="gender" />     <span style={{fontSize:'11px'}}> Weekly  </span> 
                  <Radio style={{paddingRight:" 0px"}} checked={duration === "monthly"} type="radio" value="monthly" name="gender" />   <span style={{fontSize:'11px'}}> Monthly  </span> 
                </RadioGroup>

                <p style={{paddingTop:'12px',fontSize:'12px',color:'red'}}> &nbsp;&nbsp; Customer Type   <span> ›  </span>  </p> 
                <RadioGroup onChange={(e) => {setcusType(e.target.value);}}style={{display: "inline-block",fontSize: "13px",fontWeight: "500",}}>
                  <Radio style={{paddingRight:" 0px"}} checked={cusType === "both"} type="radio" value="both" name="cus_type" />   <span style={{fontSize:'11px'}}> Both  </span> 
                  <Radio style={{paddingRight:" 0px"}} checked={cusType === "new"} type="radio" value="new" name="cus_type" />  <span style={{fontSize:'11px'}}> New  </span> 
                  <Radio style={{paddingRight:" 0px"}} checked={cusType === "returning"} type="radio" value="returning" name="cus_type" />   <span style={{fontSize:'11px'}}> Repeat  </span> 
                </RadioGroup>

              </div>

              <Button className="period-btn" variant="contained" color="secondary" onClick={dateSubmit} > Submit </Button>
            
            </div>
            
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <CusCityStateTable />
      </Grid>

      <Grid container spacing={3}>
        <CusCityStateChart />
      </Grid>

      

    </>

  );

}

export default CusReport;
