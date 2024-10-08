import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import EmailEditor from "react-email-editor";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import moment from "moment";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "fit-content",
    },
  },
};

var camtype_ = {display: "flex",backgroundColor:"rgba(62, 158, 212, 0.15)",outline:"rgba(62, 158, 212, 0.5) dashed 1px"};

var temptitle = { marginBottom:'1%',color: "white",display: "flex",backgroundColor: "rgba(62, 158, 212, 0.15)",
outline: "rgba(62, 158, 212, 0.5) dashed 1px",padding: "10px"                
};

var emaileditor_ = { borderRadius: ".5rem", overflow: "hidden", background: "snow",
minHeight: "min(67.5rem, 100vh)", boxShadow : "rgb(65 69 88 / 10%) 0px 7px 14px 0px, rgb(0 0 0 / 7%) 0px 3px 6px 0px",
};

var createSegmentLink = {"backgroundColor":"rgba(76, 110, 245, 0.1)","color":"rgb(76, 110, 245)","padding":"5px 5px",
"fontWeight": "600","marginRight":"10px"
};

var createSegmentLink_ = {"backgroundColor":"rgba(76, 110, 245, 0.1)","color":"rgb(76, 110, 245)",
"padding":"5px 5px","fontWeight": "600"
};

var input_ = { minWidth: "30vw", marginRight: "1rem", minHeight: "50px", fontSize: "17px" };

function CreateNew() {

  var accountType = useSelector((state) => state.dashTops.accountType);

  var status    = useSelector((state) => state.dashTops.status);
  var rolePower = useSelector((state) => state.dashTops.rolePower);
  if (status !== "success") {
    window.location.href = "/";
  }


  var date = moment();
  var currentDate = date.format("YYYY-MM-D");

  var emailEditorRef         = useRef(null);
  var [name, setName]        = useState("");
  var [designs, setDesigns]  = useState([]);
  var [Current_shop,setShop] = useState();


  var [subject, setSubject]         = useState("");
  var [segments, setSegments]       = useState();
  var [target, setTarget]           = useState("");
  var [SegmentName, setSegmentName] = useState(null);
  var [SegmentType, setSegmentType] = useState(null);
  var [TargetSegment, setTargetSegment] = useState("");

  var [selectedTarget, setSelected]           = useState("");
  var [selectedEngageId, setSelectedEngageId] = useState(null);
  var [fetchingCampaign,setFetchingCampaign]  = useState(false);


  var [campaignType,setCampaignType] = useState("new");


  var rolePower     = useSelector((state) => state.dashTops.rolePower);
  var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);


  var saveDesign = () => {

    if(selectedTarget && subject && name){

      if(rolePower != 3 && accountType === "paid"){
    
        var type = "create_update_template";
        var automation_name = name;
        var status = 1;
        var count = 0;
  
        emailEditorRef.current.editor.exportHtml((data) => {
          var { design, html } = data;
          if(design && html) {
            axios.post("https://server.shopex.io/engage/mailtemp.php",
                {
                  type: type,
                  template_html: html,
                  template_design: design,
                  automation_name: automation_name,
                  subject: subject,
                  segment_row_id: selectedTarget,
                  date: currentDate,
                  selectedEngageId : selectedEngageId
                },
                { withCredentials: true }
              )
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
          }else{
            alert("Template is required");
          }
        });
      }
    }else{
      alert("Target-segment , Email-subject OR Engage-name is empty");
    }
    
  };

  // var getDesign = (design) => {
  //   setName(design.replaceAll("_", " "));
  //   var post_data = {
  //     automation_name: design,
  //     type : "select_single_template",
  //   };
  //   axios.post("https://server.shopex.io/engage/mailtemp.php", post_data, {
  //       withCredentials: true,
  //     })
  //     .then(function (response) {
  //       emailEditorRef.current.editor.loadDesign(
  //         JSON.parse(response.data.design)
  //       );
  //       setSubject(response.data.subject);
  //       setSegmentName(response.data.segment_name);
  //       setSegmentType(response.data.segment_type);
  //       setSelected(response.data.segment_id);
  //       //setTargetSegment({ value: response.data.segment_id, label: "SegmentType ::   " + response.data.segment_type + "   ::   " + response.data.segment_name })
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  //const [selectedDesign, setSelectedDesign] = useState("");

  var onCampaignSelect = (design) => {

    if(rolePower!=3 && accountType === "paid" ){

      setName(design.replaceAll("_", " "));
      
      var post_data = {
        automation_name: design,
        type: "select_single_template",
      };
      
      setFetchingCampaign(true);

      axios.post("https://server.shopex.io/engage/mailtemp.php", post_data, {withCredentials: true,})
        .then(function (response) {
          emailEditorRef.current.editor.loadDesign(
            JSON.parse(response.data.design)
          );
          setFetchingCampaign(false);
          setSubject(response.data.subject);
          setSegmentName(response.data.segment_name);
          setSegmentType(response.data.segment_type);
          setSelected(response.data.segment_id);
          setSelectedEngageId(response.data.engage_rid);
          //setTargetSegment({ value: response.data.segment_id, label: "SegmentType ::   " + response.data.segment_type + "   ::   " + response.data.segment_name })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {

    // var dynamic_engage_Reducer = () => {
    //   if (ReactSession.get("dynamic_engage_Reducer")) {
    //     return true;
    //   } else {
    //     ReactSession.set("dynamic_engage_Reducer", "1");
    //     return false;
    //   }
    // }

    // if(!(dynamic_engage_Reducer())) {

    //   injectAsyncReducer('engage', engage_Slice.reducer);       
    //   console.log(store.getState());

    //   store.subscribe(() => {
    //     const newState = store.getState();
    //     if ( newState.order_List_And_Segs && newState.order_numrev_shipLoc_ChartTable){
    //       console.log('Dynamic reducers injected successfully!');
    //     }
    //   });
    // }

    if(accountType === "paid") {
      axios.get("https://server.shopex.io/engage/mailtemp.php", {withCredentials: true,})
        .then(function (response) {
          var segs = response.data.customer_segments;
          var ops = [];
          for (var i of segs) {
            var label = "Type ::   " + i.type + "   ::   " + i.segname;
            var value = i.id;
            if(label && value){ops.push({ value: value, label: label });}
          }
          setSegments(ops);

          setDesigns(response.data.designs);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if(accountType === "paid") {
      axios.post("https://server.shopex.io/profile/CurrentShop.php",{},{withCredentials: true})
        .then(
          (response) => {
            setShop(response.data.shopurl);
          },
          (error) => {}
        );
    }

    if(accountType === "demo"){
      var demo_segments = [
        { label: "Loyal customer", value: "Segment 1" },
        { label: "New customers", value: "Segment 2" },
        { label: "Frequent buyers", value: "Segment 3" },
        { label: "Offer grabers", value: "Segment 4" },
        { label: "At risk", value: "Segment 5" },
      ];
      setSegments(demo_segments);
    }

  }, []);

  var dispatch = useDispatch();

  var Select_target_cus_segment = (event) => {
    var {target: { value }} = event;
    setSelected(value);
  };

  var button_link = `${Current_shop}?segengage=__oid__nextval__sid__nextval__cid__`;
  if(accountType === "demo") {
    var button_link = "https://www.YOUR-SHOP-URL.com?segengage=__oid__nextval__sid__nextval__cid__";
  }


  var ControlCampaignType = (value) => {
    var camtype = value;
    setCampaignType(camtype);
    if(camtype == "new"){
      const emptyDesign = {
        body: {
          rows: []
        }
      };
      const editor_ = emailEditorRef.current.editor;
      editor_.loadDesign(emptyDesign);
      setName(null);
      setSubject(null);
      setSegmentName(null);
      setSegmentType(null);
      setSelected(null);
      setSelectedEngageId(null);
    }else{
    }
  }


  return (
    
    <>

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Engage : Create OR Edit </h6>
        </div>
      </Grid>

      <Grid className="campaign" container spacing={3}>

        <Grid item md={12} xl={12} lg={12} xs={12} sm={12}>
      
          <div style={{width:'81vw',backgroundColor:"rgba(62, 158, 212, 0.15)",outline:"rgba(62, 158, 212, 0.5) dashed 1px"}}>

            {accountType === "paid" && rolePower === 1 && (
              <>
                {personal_data && personal_data[0] && personal_data[0].engage_email ? (
                  <> </> 
                ) : (
                  <h4 style={{background:'white',color:'red'}}>
                    **Engage-email is required. Please add it from <a href='https://app.shopex.io/profile'> Here </a>
                  </h4>
                )}
              </>
            )}

            {accountType === "demo" && (
              <h4 style={{background:'white',color:'red'}}>
                *Engage-email is required. Please add it from <a href='https://app.shopex.io/profile'> Here </a>
              </h4>
            )}

            <br/>
          
            {/* {designs && */}
              
              <div style={camtype_}>

                <strong> 
                  <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" 
                      style={{ display: "inline-block", color: "white"}} 
                      onChange={(e) => { ControlCampaignType(e.target.value);}}>
                      <Radio checked={campaignType === "new"}  value="new"  name="camtype" /> Create new &nbsp;&nbsp;&nbsp;
                      <Radio checked={campaignType === "edit"} value="edit" name="camtype" /> Edit &nbsp;&nbsp;&nbsp; 
                      { campaignType === "edit" && accountType === "demo" &&
                        <strong>There are no available campaigns to edit </strong>
                      }
                      
                  </RadioGroup>
                </strong>

                { campaignType === "edit" && designs.length > 0 && accountType === "paid" &&
                  <Select style={{display: "block",marginBottom: "13px",width: "80%",background: "white"}}
                    // value={selectedEngage}
                    onChange={(e) => onCampaignSelect(e.target.value)}
                    input={<OutlinedInput label="" />}
                    MenuProps={MenuProps}>
                    {designs.map((element, index) => (
                      <MenuItem key={index} value={element}> {element.replace(/_/g, " ")} </MenuItem>
                    ))}
                  </Select>
                }

                

              </div>

            {/* } */}
          
          </div>

        </Grid>
        

        <Grid item md={12}>
          
          <strong className="template-title" style={temptitle}>Email template : </strong>

          {fetchingCampaign && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
                <LinearProgress color="success" />
            </Stack>
          )}

          <div> <EmailEditor ref={emailEditorRef} style={emaileditor_}/> </div>

          <br/>
          <br/>

          {segments && (
            <>
              <InputLabel id="demo-simple-select-label"> 
                <strong style={{color:'red'}}> [ *Required ] :: Target Segmnent </strong>  
              </InputLabel>
              <Select style={{display: "block",marginBottom: "13px",width: "80%",background: "white"}}
                single
                value={selectedTarget}
                onChange={Select_target_cus_segment}
                input={<OutlinedInput label="" />}
                MenuProps={MenuProps}>
                {segments.map((item) => (
                  <MenuItem value={item.value}>{item.label} </MenuItem>
                ))}
              </Select>
              
              <a style={createSegmentLink} href={"/customers/customer-and-segemnt"}> Create segment using key customer attributes
                <span style={{fontSize: "18px"}}> → </span> 
              </a> 
              
              <a style={createSegmentLink} href={"/products/customer-segment-based-on-product-purchase"}> Create purchase-centric customer segment
                <span style={{fontSize: "18px"}}> → </span> 
              </a> 

              <a style={createSegmentLink_} href={"customers/rfm"}> Create new segment based on RFM analysis
                <span style={{fontSize: "18px"}}> → </span> 
              </a> 

            </>
          )}

          <br/>
          <br/>
          <br/>

          <form style={{display:"grid", width:"fit-content"}}>
            
            <strong style={{color:'red'}}>[ *Required ] :: Set this as button URL - {button_link} </strong> 
            <br/>
            <br/>
            
            <strong id="1" style={{color:'red'}}>[ *Required ] :: Email-campaign name : </strong>
            <input style={input_} id="1" 
            required={true} name="name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
            <br/>
            <br/>

            <strong id="2" style={{color:'red'}}>[ *Required ] :: Email-Subject : </strong>
            <input style={input_} id="2" 
            required={true} name="subject" type="text" defaultValue={subject} 
            onChange={(e) => setSubject(e.target.value)}/>
            <br/>
            <br/> 
            
            <Button style={{ background: "rgb(43, 206, 161)", fontWeight: 500,width:'10vw' }} variant="contained" onClick={saveDesign}>
              Save
            </Button>
          
          </form>
          
          <br/>
          <br/>


        </Grid>

      </Grid>

    </>

  );

}

export default CreateNew;
