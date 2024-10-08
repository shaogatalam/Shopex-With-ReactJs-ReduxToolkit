import React, { useState,useEffect, useRef } from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


//import MaterialTable from 'material-table';
import MaterialTable, { MTableToolbar } from '@material-table/core';

import { ThemeProvider, createTheme } from "@mui/material";
//import { makeStyles } from '@material-ui/core/styles';
//import { makeStyles } from '@mui/material';

import axios from "axios";

import { Modal, Paper, TextField } from '@mui/material';
import { forwardRef } from 'react';
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
import { Button } from 'rsuite';
//import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
//import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

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



var grid_item = {"width":"25px","border":".2px solid teal","color":"teal","height":"30px","marginBottom":"10px","display":"grid","justifyContent":"center"};
var grid_item_header = {"width":"25px","border":"0px","borderBottom":"0.1px solid","color":"teal","height":"25px","marginBottom":"5px","textAlign":"center","borderRadius":"5px"};
var modelpaper= { padding: "20px",maxWidth: "75vw",height: "65vh",overflowY:'scroll', marginLeft: "18vw",marginTop:"20px",marginBottom:'20px'};
var explaintable = {marginTop:'2%',padding:"1%",display: "grid",boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"};
var grid_container = {marginRight:"30px",display: "grid",gridTemplateColumns: "repeat(4,0fr)",gap: "3px"};
var block_div = {padding: "1% 0% 1% 2px",overflowX:"scroll",display:"flex",boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"};
var segmentBlocks = {display: "grid",marginRight:"20px" };
var tiers = { paddingTop: "17.3%","display": "flex", "flexDirection": "column","alignItems": "center",fontSize:"12px"};
var treediv = {background:'white',boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px","padding":"10px 0px 0px 0px"};


const CusTreemapChart = ({ data,rawData,sd,ed,ad }) => {

  const defaultMaterialTheme = createTheme();
  
  const chartRef = useRef(null);
  
  var [key,setKey]= useState('count');
  
  //var handleKeyChange = (key) => { setKey(key) }
  
  var [openModal, setOpenModal] = useState(false);
  var [title,setTitle]          = useState("");
  var [mtable,setMtable]        = useState();
  
  var [Emails,setEmails]        = useState();

  var CloseModal_ = () => { setOpenModal(false); }
  
  useEffect(() => {

    if (!chartRef.current || !data || data.length === 0) {
      return;
    }
    
    //var a_d = `${ad.getFullYear()}-${ad.getMonth() + 1}-${ad.getDate()}`;
    console.log(data);

    var _rawData = rawData;

    const handleSegmentClick = (event, elements) => {
      
      if (elements && elements.length > 0) {
      
        let target_email  = [];
        let TableObject = {};

        const selectedItem = elements[0].element.$context.raw._data;
        
        var segment_name = selectedItem.name;
        
        console.log(segment_name)

        setTitle(segment_name);

        _rawData.forEach(item => {
          if(item.customer_group === segment_name){
            target_email.push(item.customer_email);
            if (!TableObject[item.customer_email]) {
              TableObject[item.customer_email] = {
                email: item.customer_email,
                r: 0,
                f: 0,
                m: 0,
              };
            }

            TableObject[item.customer_email].r = item.recency;
            TableObject[item.customer_email].f = item.frequency;
            TableObject[item.customer_email].m = item.monetary;
          }

        })

        setOpenModal(true);
        const mtable = Object.values(TableObject);
        console.log(TableObject);
        setMtable(mtable);
        setEmails(target_email);
        
      }
     
    };

    const chartData = {

      datasets: [
        {
          label:"",
          tree: data.map((item) => ({
            name: `${item.segment}`,
            count: Number(item.count),
            frequency: Number(item.total_frequency),
            monetary: Number(item.total_monetary),
          })),
          key: `${key}`,
          labels: {
            display: true,
            formatter: (context) => {
              if (key === "count") {     return [`${context.raw._data.name}`,`Size : ${Number(context.raw._data.count)}`]; } 
              if (key === "monetary") {  return [`${context.raw._data.name}`,`M : ${Number(context.raw._data.monetary)}`];} 
              if (key === "frequency") { return [`${context.raw._data.name}`,`F : ${Number(context.raw._data.frequency)}`];} 
            },
            position:"bottom",
            align:"left",
            font: {
              family: 'circular', 
              size: 11,        
              //style: 'bold',
              weight:900
            }
          },
          
          backgroundColor(context) {
            if (context.type !== 'data') return 'transparent';
            var shadesOfBlue = [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(50, 205, 50, 1)',
              'rgba(255, 140, 0, 1)',
              'rgba(70, 130, 180, 1)',
              'rgba(255, 20, 147, 1)',
              'rgba(128, 0, 128, 1)'
            ];
            return shadesOfBlue[context.dataIndex % 11];
          },
          spacing:3,
          borderWidth:2,
        },
      ],
    };

    const config = {
      type: 'treemap',
      data: chartData,
      options: {
        maintainAspectRatio: false, 
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              title(items) {
                return items[0].raw._data.name;
              },
              label(item) {
                const { _data: {frequency, monetary }} = item.raw;
                return [
                  `Size: ${item.raw._data.count}`,
                  `Frequency: ${frequency}`,
                  `Monetary: ${monetary}`,
                ];
              },
            },
          },
        },
        onClick: handleSegmentClick,
      },
    };

    const myChart = new window.Chart(chartRef.current, config);

    return () => {
      myChart.destroy();
    };

  }, [data,key]);

 
    const cellStyle = {
      padding: '8px',
      textAlign: 'left',
    };

    var SaveRFMSegment = () => {

      var formattedSD = `Start : ${sd}`;
      var formattedED = `End : ${ed}`;
      var n__D = new Date();

      var formattedAD = `Analysis : ${ad.getFullYear()}-${ad.getMonth() + 1}-${ad.getDate()}`;
      //var a_d = `${ad.getFullYear()}-${ad.getMonth() + 1}-${ad.getDate()}`;
      
      var segment  = title;
      var filter   = formattedSD + ', ' + formattedED + ', ' + formattedAD;
      var seg_type = 'rfm';
      var emails   = Emails;

      axios.post("https://server.shopex.io/customers/cus_rfm_segment_create_update.php",
        {segment : segment, filter: filter, seg_type : seg_type, emails : emails, today : `${n__D.getFullYear()}-${n__D.getMonth() + 1}-${n__D.getDate()}` },
        {withCredentials : true})
      .then(function (response) {
      })
      .catch(function (error) {
        alert('Error :', error);
      });

      
    }

    // var useStyles = makeStyles(theme => ({
    //   table: {
    //     '& tbody>.MuiTableRow-root:hover': {
    //       boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)", 
    //     },
    //     '& tbody .MuiTableCell-root': {
    //       padding: "8px!important",
    //     },
    //   },
    // }));
  
    // var classes = useStyles();
  
  
  return (
      
    <div>

      <div style={treediv}>
        
        <div style={{"display": "flex"}}> 
        
          <h6>
        
            RFM analysis results using a treemap visualization ,
        
            <strong style={{"paddingTop": "10px"}}> Sort segment's based on &nbsp; </strong>
            <select defaultValue={key} style={{color:'black'}}
              onChange={(e) => setKey(e.target.value)}>
              <option value="count">Segment size</option>
              <option value="frequency">Frequency</option>
              <option value="monetary">Monetary</option>
            </select>
        
            &nbsp;value
        
          </h6>
        
        </div>

        <div style={{height:"40vh"}}>
          <canvas ref={chartRef} style={{marginBottom:'0px!important'}}> </canvas>
        </div>

      </div>

      <div className="grid-container" style={{marginTop:'2%',display:"flex",background: "white",padding:'1%'}}>

        <div style={{padding: "1% 0% 1% 0%",display: "grid"}}>
          
          <div className="grid-container">
          
            <div className="column" style={tiers}>
              <div className="grid-item" style={{...grid_item,borderRight: "0px",padding: "6px",width:"16.7vw",justifyContent:'left'}}>  Top 20%: Highest performers (80-100%) :- </div>
              <div className="grid-item" style={{...grid_item,borderRight: "0px",padding: "6px",width:"16.7vw",justifyContent:'left'}}>  Next 20%: Strong performers (60-79%) :-</div>
              <div className="grid-item" style={{...grid_item,borderRight: "0px",padding: "6px",width:"16.7vw",justifyContent:'left'}}>  Next 20%: Moderate performers (40-59%) :- </div>
              <div className="grid-item" style={{...grid_item,borderRight: "0px",padding: "6px",width:"16.7vw",justifyContent:'left'}}>  Next 20%: Developing performers (21-39%) :-</div>
              <div className="grid-item" style={{...grid_item,borderRight: "0px",padding: "6px",width:"16.7vw",justifyContent:'left'}}>  Bottom 20%: Lowest performers (0-20%) :-</div>
            </div>

          </div>

        </div>


        <div style={block_div}>

          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>Champion's</strong>
            
            <div className="grid-container" style={grid_container}>
          
              <div className="column" style={{}}>
                <div className="grid-item" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                
              </div>

            </div>

          </div>

          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>Loyal's</strong>
            
            <div className="grid-container" style={grid_container}>
            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
               
              </div>

          
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            </div>

          </div>


          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}> PotentialLoyalist </strong>
            
            <div className="grid-container" style={grid_container}>
                
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            </div>

          </div>


          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  NewCustomer </strong>
            
            <div className="grid-container" style={grid_container}>
            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/></div>
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
              </div>

            </div>

          </div>


          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  Promising </strong>
            
            <div className="grid-container" style={grid_container}>
              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/></div>
                
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/></div>
              </div>

            </div>

          </div>


          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  NeedAttention </strong>
           
            <div className="grid-container" style={grid_container}>
           
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            </div>

          </div>

          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  AboutToSleep </strong>
            
            <div className="grid-container" style={grid_container}>
              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
               
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                
              </div>

            </div>

          </div>


          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  AtRisk </strong>
            
            <div className="grid-container" style={grid_container}>
              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> </div>
                
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}>  </div>
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}>  </div>
              </div>

            </div>

          </div>
          

          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  Can'tLoseThem </strong>
            
            <div className="grid-container" style={grid_container}>
            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/></div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            </div>

          </div>


          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  Hibernate </strong>
            
            <div className="grid-container" style={grid_container}>
            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px",transform: "rotate(180deg)"}}/></div>
                <div className="grid-item" style={grid_item}> </div>
              </div>

            </div>

          </div>
          
          <div style={segmentBlocks}>
            
            <strong style={{background: "whitesmoke"}}>  Lost </strong>
            
            <div className="grid-container" style={grid_container}>
                
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> R </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/></div>
               
              </div>

            
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> F </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> </div>
                <div className="grid-item" style={grid_item}> <KeyboardArrowDownIcon style={{margin:"0px"}}/></div>
                
              </div>

              
              <div className="column" style={{}}>
                <div className="grid-item-header" style={grid_item_header}> M </div>
                <div className="grid-item" style={grid_item}> <KeyboardDoubleArrowDownIcon style={{margin:"0px"}}/> </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
                <div className="grid-item" style={grid_item}>  </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      
      <div style={explaintable}>
        <p style={{ fontSize:"18px",color:'red'}}>For more clarification, Each segment explained based on the individual recency, frequency and monetary scores.</p>
        <table className="table" style={{ fontFamily: 'circular'}}>
          <thead style={{background: "white"}}>
            <tr style={{border: "1px solid lightgrey"}}>
              <th style={cellStyle}>Segment</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>R</th>
              <th style={cellStyle}>F</th>
              <th style={cellStyle}>M</th>
            </tr>
          </thead>

          <tbody>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Champions</td>
              <td style={cellStyle}>Bought recently, buy often and spend the most</td>
              <td style={cellStyle}>4 - 5</td>
              <td style={cellStyle}>4 - 5</td>
              <td style={cellStyle}>4 - 5</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Loyal Customers</td>
              <td style={cellStyle}>Spend good money. Responsive to promotions</td>
              <td style={cellStyle}>2 - 4</td>
              <td style={cellStyle}>3 - 4</td>
              <td style={cellStyle}>4 - 5</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Potential Loyalist</td>
              <td style={cellStyle}>Recent customers, spent good amount, bought more than once</td>
              <td style={cellStyle}>3 - 5</td>
              <td style={cellStyle}>1 - 3</td>
              <td style={cellStyle}>1 - 3</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>New Customers</td>
              <td style={cellStyle}>Bought more recently, but not often</td>
              <td style={cellStyle}>4 - 5</td>
              <td style={cellStyle}>&lt; 2</td>
              <td style={cellStyle}>&lt; 2</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Promising</td>
              <td style={cellStyle}>Recent shoppers, but haven’t spent much</td>
              <td style={cellStyle}>3 - 4</td>
              <td style={cellStyle}>&lt; 2</td>
              <td style={cellStyle}>&lt; 2</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Need Attention</td>
              <td style={cellStyle}>Above average recency, frequency &amp; monetary values</td>
              <td style={cellStyle}>3 - 4</td>
              <td style={cellStyle}>3 - 4</td>
              <td style={cellStyle}>3 - 4</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>About To Sleep</td>
              <td style={cellStyle}>Below average recency, frequency &amp; monetary values</td>
              <td style={cellStyle}>2 - 3</td>
              <td style={cellStyle}>&lt; 3</td>
              <td style={cellStyle}>&lt; 3</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>At Risk</td>
              <td style={cellStyle}>Spent big money, purchased often but long time ago</td>
              <td style={cellStyle}>&lt; 3</td>
              <td style={cellStyle}>2 - 5</td>
              <td style={cellStyle}>2 - 5</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Can’t Lose Them</td>
              <td style={cellStyle}>Made big purchases and often, but long time ago</td>
              <td style={cellStyle}>&lt; 2</td>
              <td style={cellStyle}>4 - 5</td>
              <td style={cellStyle}>4 - 5</td>
            </tr>
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Hibernating</td>
              <td style={cellStyle}>Low spenders, low frequency, purchased long time ago</td>
              <td style={cellStyle}>2 - 3</td>
              <td style={cellStyle}>2 - 3</td>
              <td style={cellStyle}>2 - 3</td>
            </tr>
            
            <tr style={{background: "white",border: "1px solid lightgrey"}}>
              <td style={cellStyle}>Lost</td>
              <td style={cellStyle}>Lowest recency, frequency &amp; monetary scores</td>
              <td style={cellStyle}>&lt; 2</td>
              <td style={cellStyle}>&lt; 2</td>
              <td style={cellStyle}>&lt; 2</td>
            </tr>

            <tr style={{background: "teal",color:'white',border: "1px solid lightgrey"}}>
              <td style={cellStyle}>R(Recency) : How recently a customer made a purchase.</td>
              <td style={cellStyle}>F(Frequency) : Total number of purchase.</td>
              <td colSpan="3" style={cellStyle}>M(Monetary) :  The total amount a customer spends..</td>
            </tr>

          </tbody>
        </table>
      </div>


      <Modal open={openModal} onClose={CloseModal_}>
      
        <Paper className="modelpaper" style={modelpaper}>

          <div style={{margin:'1%'}}>
            <Button color="primary" variant="green" onClick={SaveRFMSegment}> Save segment </Button>
            <p style={{color:'red'}}> Save this segment now, and later, you can configure email automation specifically for this group. </p>  
          </div>

          <ThemeProvider theme={defaultMaterialTheme}>

            <div>     
              
              <MaterialTable

                sx={{ 
                  [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                  [`& .td`]:{padding:'2px!important'},
                }}
                
                columns={[
                  { title: "Customer",field: "email"},
                  { title: "Recency", field: "r" },
                  { title: "Frequency", field: "f" },
                  { title: "Monetory", field: "m" },
                ]}
                data={mtable}
                title={title}
                icons={tableIcons}
                options={{
                  sortIcon: true,
                  draggable: true, 
                  sorting: true, 
                  showFirstLastPageButtons: false,
                  pageSize: 10, 
                  emptyRowsWhenPaging: false, 
                  pageSizeOptions: [10, 15, 25, 40, 50],
                  search: true,
                  cellStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    padding:'0px!important',
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
                    padding: "0px 16px 0px 0px"
                  },
                  rowStyle: (rowData, index) => ({
                    backgroundColor: index % 2 === 1 && rowData.tableData.id % 2 === 0 ? 'ghostwhite' : 'white',
                  }),

                } }
                localization={{
                  pagination: {
                    labelRowsPerPage: "",
                    showFirstLastPageButtons: false,
                  },
                }}
              />
            </div>

          </ThemeProvider>
           
        </Paper>
      
      </Modal>


    </div>
  
  );

};

export default CusTreemapChart;


// import React, { useEffect, useRef } from 'react';
// import { Helmet } from 'react-helmet';

// const TreemapChart = () => {

//   const chartRef = useRef(null);

//   useEffect(() => {
//     const loadScripts = async () => {
//       // Load Chart.js dynamically
//       const chartJsScript = document.createElement('script');
//       chartJsScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.8.0/dist/chart.min.js';
//       document.head.appendChild(chartJsScript);

//       // Load chartjs-chart-treemap dynamically
//       const treemapScript = document.createElement('script');
//       treemapScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-chart-treemap@2.0.2';
//       document.head.appendChild(treemapScript);

//       // Wait for both scripts to load
//       await Promise.all([
//         new Promise((resolve) => (chartJsScript.onload = resolve)),
//         new Promise((resolve) => (treemapScript.onload = resolve)),
//       ]);

//       // Treemap chart data and configuration
//       const data = {
//         datasets: [
//           {
//             label: 'Tree Sales',
//             data: [5, 12, 6, 9, 12, 3, 9],
//             backgroundColor: ['rgba(255, 26, 104, 0.2)'],
//             borderColor: ['rgba(255, 26, 104, 1)'],
//             borderWidth: 1,
//           },
//         ],
//       };

//       const config = {
//         type: 'treemap',
//         data,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       };

//       // Create the treemap chart
//       if (chartRef.current) {
//         new window.Chart(chartRef.current, config);
//       }
//     };

//     // Call the function to load scripts and create the chart
//     loadScripts();
//   }, []);

//   return (
//     <div>
//       {/* Use Helmet to add script tags */}
//       <Helmet>
//         {/* Scripts are dynamically loaded, so we don't need to include them here */}
//       </Helmet>

//       <h1>This is a Heading</h1>
//       <p>This is a paragraph.</p>
//       <canvas ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default TreemapChart;

