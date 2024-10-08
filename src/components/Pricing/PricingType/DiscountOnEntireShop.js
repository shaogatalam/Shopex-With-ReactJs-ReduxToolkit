import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector, useDispatch } from "react-redux";

import { DateRangePicker } from "rsuite";
import moment from "moment";
import Select from "react-select";
import axios from "axios";
import { addRole } from "../../../features/DynamicPricing/CurrentRules";
import { format } from "date-fns";

import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../../features/product/ProductPurchaseBasedCusSeg";
import { Card } from "@mui/material";

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';



function DiscountOnEntireShop({ data, target_segment_name,schedule_type,schedule_from,schedule_to }) {

  var [schedule_type, setSchedule_type] = useState("manual");
  var [start, setStart]                 = useState(null);
  var [end, setEnd]                     = useState(null);

  var [offername, setoffername]                       = useState("");
  var [target_segment_name_, settarget_segment_name_] = useState("");
  var [target_segment_id, settarget_segment_id]       = useState("");
  var [offer, setOffer]                               = useState("");
  var [offertype, setOffertype]                       = useState("percent");
  var [disable_role_onsale, setdisable_role_onsale]   = useState("1");
  var [pr, setpr]                                     = useState(10);
  var [status, setStatus]                             = useState();

  var [drflag, setdrflag]                             = useState(false);
  var [savingBar, setSavingBar] = useState(false);


  useEffect(() => {

    if (data !== undefined) {

      var sinrole = data.onerule;

      if (sinrole && sinrole.length > 0) {

        if(schedule_type == "tl"){
          setStart(new Date(schedule_from));
          setEnd(new Date(schedule_to));
          setSchedule_type("tl");
          setdrflag(true);
        }else{
          setSchedule_type("manual");
        }

        for (var i of sinrole) {

          setoffername(i.name);
          settarget_segment_name_(target_segment_name);
          settarget_segment_id(i.target_segment);

          var dtail = i.dtail.split("_next_");
          setOffer(dtail[0]);
          setOffertype(dtail[1]);

          setdisable_role_onsale(i.osrun);
          setpr(i.pr);
          setStatus(i.status);

          
        }
      }
    }
  }, []);

  var dispatch    = useDispatch();
  var accountType = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
    //     ReactSession.set("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
    //     dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
    //   }
    //   if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //     ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //     dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
        sessionStorage.setItem("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
        dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
      }
      if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
        sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
        dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
      }
    }

  }, [])

  // var pro_Pur_based_cussegment = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  // pro_Pur_based_cussegment = structuredClone(pro_Pur_based_cussegment);


  // var Cus_Purchase_based_segment = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  // var Customer_segment_options = [];
  // if (Cus_Purchase_based_segment && Cus_Purchase_based_segment.length > 0) {
  //   for (var i of Cus_Purchase_based_segment) {
  //     var label = i.name;
  //     var value = i.id;
  //     Customer_segment_options.push({ value: value, label: label });
  //   }
  // }

  var Cus_Purchase_based_segment = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment);
  var segs_ = Cus_Purchase_based_segment?.Product_Purchase_Based_Cus_Segment_Obj ?? [];
  var Customer_segment_options = [];
  if (segs_ && Object.keys(segs_).length > 0) {
    for (var i of segs_) {
      var label = i.name;
      var value = i.id;
      if(label && value){Customer_segment_options.push({ value: value, label: label });}
    }
  }
  

  var [daterange, setdrange] = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);

  var handleChange = (event) => {
    setOffertype(event.target.value);
  };

  var Handle_setOnsale = (event) => {
    setdisable_role_onsale(event.target.value);
  };

  var handle_setschedule_type = (event) => {
    setSchedule_type(event.target.value);
  };

  var formSubmit = (event) => {

    event.preventDefault();

    var form_ = new FormData(event.target);
    var form_data = Object.fromEntries(form_.entries());

    var entire_offer = form_data["entire_offer"];
    var entire_offer_type = form_data["entire_offer_type"];
    var discount_string = entire_offer + "_next_" + entire_offer_type;

    let name = form_data["name"];
    var _name = name.replace(/\s+/g, "_");
    let pr = form_data["pr"];
    let target = form_data["target"];
    let onsalerun = form_data["onsalerun"];
    let type = "entire";
    let schedule_ = 0;

    let f = 1;
    let t = 2;

    var status = 0;
    if (schedule_type === "tl") {
      f = format(daterange[0], "yyyy-MM-dd"); // daterange[0];
      t = format(daterange[1], "yyyy-MM-dd"); // daterange[1];
      const today = new Date();
      if (today >= f && today <= t) {
        status = "1";
      } else {
        status = "0";
      } schedule_ = f + "-To-" + t;
    } else if (schedule_type === "manual") {
      schedule_ = "manual";
      status = "1";
    }

    setSavingBar(true);
    var post = 1;

    dispatch(addRole({status: status,name: _name,type: type,target_segment: target,schedule: schedule_}));

    axios.post("https://server.shopex.io/dynamicpricing/dpdis_save_and_sending.php", {
      post: post,
      name: name,
      type: type,
      data: discount_string,
      target: target,
      from: f,
      to: t,
      onsalerun: onsalerun,
      pr: pr,
      ajax_call: 2
    }, { withCredentials: true }).then(function (response) { setSavingBar(false); }).catch(function (error) {
      console.log(error);
    });
  };

  return (

    <Card className="dash-card price">
      
      <form id="dpriceform" onSubmit={formSubmit}>
        
        {/* <div className="input-filters">
          <strong>Set a relevant offer name:</strong>
          <input required={true} name="name" type="text" defaultValue={ offername || ""} />
        </div> */}

        <div className="input-filters" style={{ background:'ghostwhite',  border: "0.5px dashed lightgrey",borderBottom:'0px', padding: "1%",}}>
          <strong> Pricing offer name : </strong>
          <input style={{width:"50vw", fontSize:"17px", borderRadius : "0px", padding : "5px"}} required={true} name="name" type="text" defaultValue={offername || ""} />
        </div>

        <div className="input-filters" style={{border:"0.5px dashed lightgrey", padding:"1%",displsy:'grid'}}>

          <strong> Select target Segment  ::  <p style={{fontSize:'10px'}}> {target_segment_name_} </p> </strong>

          {
            Customer_segment_options && (
              <Select className="multi"
                placeholder={"Select target"}
                defaultValue={target_segment_id}
                onChange={
                  (e) => {
                    settarget_segment_id(e.value);
                    settarget_segment_name_(e.label);
                  }
                }
                options={Customer_segment_options} />
            )
          }

          <input name="target" type="hidden" defaultValue={ target_segment_id || ""} />

        </div>


        <div style={{border: "0.5px dashed lightgrey", padding: "1%"}}>
          
          <div className="input-filters">

            <strong> Offer : </strong> &nbsp;
 
            <input name="entire_offer" type="number" defaultValue={offer} /> &nbsp;

            <RadioGroup defaultValue={ offertype || "percent"} style={{ display: "inline-block" }}onChange={handleChange}>
              <Radio checked={ offertype === "percent"} value="percent" name="type" />% Off &nbsp;
              <Radio checked={ offertype === "amount"} value="amount" name="type" />$ Off &nbsp;
              <Radio checked={ offertype === "fixedprice" } value="fixedprice" name="type" />$ Each Product  &nbsp;
            </RadioGroup>

            <input name="entire_offer_type" type="hidden" defaultValue={ offertype || "percent"} />

          </div>

        </div>

        

        <br />

        <div className="input-filters" style={{border:"0.5px dashed lightgrey",borderBottom:'0px', padding:"1%",displsy:'inline-flex',marginBottom:'0px'}}>
          
          <strong>Disable this offer for &nbsp;<span style={{color:"red"}}> &nbsp; on-sale  </span> products : </strong> &nbsp;
         
          
          <RadioGroup defaultValue={disable_role_onsale} style={ { display: "inline-block" } } onChange={Handle_setOnsale}>
            <Radio checked={disable_role_onsale === "1" } value="1" name="onsale_on_off" /> Yes &nbsp;
            <Radio checked={disable_role_onsale === "0" } value="0" name="onsale_on_off" /> No &nbsp;
          </RadioGroup>
          
          <input name="onsalerun" type="hidden" defaultValue={disable_role_onsale} />
            
        </div>
        <div className="input-filters" style={{display: 'grid', border: "0.5px dashed lightgrey",borderBottom:'0px', padding: "1%", width: "-webkit-fill-available"}}>
          
          <div style={{display:'inline-flex'}}>
            <strong> Set Schedule for this offer : </strong> &nbsp;
            <RadioGroup defaultValue={schedule_type} style={ { display: "inline-block" } } onChange={handle_setschedule_type}>
              <Radio checked={ schedule_type === "manual"}  value="manual"name="schedule" /> Start now and End manually &nbsp;
              <Radio checked={ schedule_type === "tl"  }value="tl" name="schedule" /> Set Timeline &nbsp;
            </RadioGroup>
          </div>
          
          <br />

          {
            drflag === false && schedule_type === "tl" && 
              <DateRangePicker label="Timeline" value={daterange} onChange={setdrange} oneTap={false}> </DateRangePicker>
          }

          {
            drflag === true && schedule_type === "tl" && 
              <DateRangePicker label="Timeline"  value={[start, end]} onChange={setdrange} oneTap={false}></DateRangePicker>
          }

          {/* <input name="schedule_dr" type="hidden" defaultValue={daterange} /> */} 
        
        </div>

        <div className="input-filters" style={{display:'inline-flex',border: "0.5px dashed lightgrey", padding: "1%", width: "-webkit-fill-available"}}>
          <strong> Set Priority for this pricing offer : </strong> &nbsp;
          <input required={true} name="pr" type="number" defaultValue={pr} />
        </div>

        <br/>
        {/* <input type="submit" style={{width: "100%", maxWidth: "500px"}}/> */}
        
        <div style={{ width: "100%",padding:'1%'}}>
          { savingBar  ? (
            <>
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
                <LinearProgress color="success" />
              </Stack>
            </>
          ) : (
              <Button 
              type="submit"
              style={{"width":"-webkit-fill-available",
                    "background": "red",
                    "color": "white",
                    "padding":'1%',
                    "fontWeight":"900"}}> 
              Save 
            </Button>
          )}
        </div>
      
      </form>

    </Card>
  );
}

export default DiscountOnEntireShop;
