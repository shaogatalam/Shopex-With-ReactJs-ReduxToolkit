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

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement,BarElement, Title, Tooltip, Legend,  Filler);

var styles={"padding": "10px 0px 10px 5px",color: "steelblue",fontWeight: "500",backgroundColor: "rgba(76, 110, 245, 0.1)",color: "rgb(76, 110, 245)"};
const DashTopItems = ( {data_tpbr,data_tpbu,data_tpbp,data_tcbr,data_tcbu,data_tcbp}) => {

    var shoptype      = useSelector((state) => state.dashTops.shoptype);
    
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

    var plugins = [Y_axis_line_plugin,levelPlugin]
    
    return (
        <>
        
        <Grid container>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <h5 style={{"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"}}>
                    {shoptype ==="woo" && <> Top-Performing Products and Categories of the Month  </>}
                    {shoptype ==="shopify" && <>  Top-Performing Products and Collections of the Month </>}
                </h5>
            </Grid>
            
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <div style={styles}>Top products by revenue</div>
                {data_tpbr.labels && data_tpbr.datasets && (
                    <div style={{ height: "450px","background":"white" }}>
                    <Bar data={data_tpbr} options={options} plugins={plugins} />
                    </div>
                )}
            </Grid>


            <Grid item xl={4} lg={4} md={4}  sm={12} xs={12}>
                <div style={styles}>Top products by unit sold</div>
                {data_tpbu.labels && data_tpbu.datasets && (
                    <div style={{ height: "450px","background":"white" }}>
                    <Bar data={data_tpbu} options={options} plugins={plugins} />
                    </div>
                )}
            </Grid>

            <Grid item xl={4} lg={4} md={4}  sm={12} xs={12}>

                <div style={styles}>Top products by profit</div>

                {data_tpbp.labels && data_tpbp.datasets && (
                    <div style={{ height: "450px","background":"white" }}>
                    <Bar data={data_tpbp} options={options} plugins={plugins} />
                    </div>
                )} 

            </Grid>

        </Grid>

        <Grid container>

            <Grid item xl={4} lg={4} md={4}  sm={12} xs={12} style={{marginTop:'2%'}}>

            <div style={styles}>
                {shoptype ==="woo" && <> Top categories by revenue </>}
                {shoptype ==="shopify" && <> Top collection by revenue </>}
            </div>

             {data_tcbr.labels && data_tcbr.datasets && ( 
                <div style={{ height: "450px","background":"white" }}>
                <Bar  data={data_tcbr} options={options} plugins={plugins} />
                </div>
             )} 

            </Grid>

            <Grid item xl={4} lg={4} md={4}  sm={12} xs={12} style={{marginTop:'2%'}}>

            <div style={styles}>
                {shoptype ==="woo" && <> Top categories by unit sold</>}
                {shoptype ==="shopify" && <> Top collection by unit sold </>}
            </div>

            {data_tcbu.datasets && data_tcbu.labels && (
                <div style={{ height: "450px","background":"white" }}>
                <Bar  data={data_tcbu} options={options} plugins={plugins} />
                </div>
            )}

            </Grid>

            <Grid item xl={4} lg={4} md={4}  sm={12} xs={12} style={{marginTop:'2%'}}>

            <div style={styles}>
                {shoptype ==="woo" && <> Top categories by unit profit</>}
                {shoptype ==="shopify" && <> Top collection by unit profit</>}
            </div>

            {data_tcbp.labels && data_tcbp.datasets && (
                <div style={{ height: "450px","background":"white" }}>
                <Bar data={data_tcbp} options={options} plugins={plugins} />
                </div>
             )} 

            </Grid>

        </Grid>

        </>
    )
}

export default DashTopItems