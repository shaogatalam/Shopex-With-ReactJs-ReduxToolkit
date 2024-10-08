import React, { useEffect, useState } from "react";
//import ProductCatagory from '../../Product/ProductSegmentFilters/ProductCatagory'
import { format } from "date-fns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector, useDispatch } from "react-redux";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import Select from "react-select";
import axios from "axios";

import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../../features/product/ProductPurchaseBasedCusSeg";

import { addRole } from "../../../features/DynamicPricing/CurrentRules";
import { Card } from "react-bootstrap";

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


function CategoryDiscount({ data,schedule_type,schedule_from,schedule_to,Target_segment_Name,Target_SegmentId,offer_name,osrun}) {
  
  var dispatch = useDispatch();
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

  var [target_segment_name_, settarget_segment_name_] = useState("");
  var [target_segment_id, settarget_segment_id] = useState("");

  //var cat_obj = useSelector((state) => state.product_List_And_Segments.product_cat_table_object);

  //
  var cat_obj = useSelector((state) => state.product_List_And_Segments?.product_cat_table_object ?? {});
  console.log(cat_obj); // -- ok
  //

  var [rules, setRules] = useState([
    { offer: "", type: "percent", catid: "", catname: "" },
  ]);

  var [schedule_type, setSchedule_type]               = useState("manual");
  var [start, setStart]                               = useState(null);
  var [end, setEnd]                                   = useState(null);
  var [drflag, setdrflag]                             = useState(false);
  var [offername, setoffername]                       = useState("");
  var [disable_role_onsale, setdisable_role_onsale]   = useState("1");
  //var [NOosrun, setNoOSrun] = useState(1);

  useEffect(() => {

    if (data !== undefined) {

      settarget_segment_name_(Target_segment_Name);
      settarget_segment_id(Target_SegmentId);
      setoffername(offer_name);
      setdisable_role_onsale(osrun);

      if(schedule_type == "tl"){
        setStart(new Date(schedule_from));
        setEnd(new Date(schedule_to));
        setSchedule_type("tl");
        setdrflag(true);
      }else{
        setSchedule_type("manual");
      }
      
      

      var sinrule = data.onerule;

      var cars = [];

      console.log(sinrule);

      if (sinrule && sinrule.length > 0) {

        console.log(sinrule);

        for (var i of sinrule) {

          var name  = i.name;
          var type  = i.type;
          var dtail = i.dtail;

          var dtailArray = dtail.split("_next_");

          console.log(i);
          
          var offer = dtailArray[0];
          var type  = dtailArray[1];
          var catid = dtailArray[2];

          for (var j of cat_obj) {
            //  category_id : "62" category_name  : "Perfume"
            if (j.category_id === catid) {
              var car = {
                catid: catid,
                catname: j.category_name,
                offer: offer,
                type: type,
              };
              
              cars.push(car);
              console.log(cars);
            }
          }
        }

        setRules(cars);
       

      }
    }

  }, [offer_name]);

  
  console.log(data); // -- ok 

  var newRules = [];

  // var ops1 = [];
  // if (cat_obj && cat_obj.length > 0) {
  //   for (var i of cat_obj) {
  //     var label = i.category_name;
  //     var value = i.category_id;
  //     ops1.push({ value: value, label: label });
  //   }
  // }

  var ops1 = [];
  if (cat_obj && Object.keys(cat_obj).length > 0) {
    for (var i of cat_obj) {
      var label = i.category_name;
      var value = i.category_id;
      if(label && value){ops1.push({ value: value, label: label });}
    }
  }


  var [final, setFinal] = useState([]);

  var handleChange = (i, e) => {
    newRules = [...rules];
    newRules[i][e.target.name] = e.target.value;
    setRules([]);
    setRules(newRules);
    setFinal([]);
    setFinal(newRules);
  };

  var handleChange1 = (i, id, name) => {
    newRules = [...rules];
    newRules[i]["catid"] = id;
    newRules[i]["catname"] = name;
    setRules([]);
    setRules(newRules);
    setFinal([]);
    setFinal(newRules);
  };

  var addRules = (len) => {
    setRules([
      ...rules,
      { offer: "", type: "percent", catid: "", catname: "" },
    ]);
    newRules = [...rules];
    setFinal([]);
    setFinal(newRules);
  };

  var removeRules = (idx) => {
    newRules = [...rules];
    newRules.splice(idx, 1);
    rules.splice(idx, 1);
    //setRules(newRules);
    setFinal([]);
    setFinal(newRules);
    //document.getElementById(`id-${idx}`).remove();
  };

  // var Cus_Purchase_based_segment = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  // Cus_Purchase_based_segment = structuredClone(Cus_Purchase_based_segment);
  // var ops = [];
  // if (Cus_Purchase_based_segment) {
  //   for (var i of Cus_Purchase_based_segment) {
  //     var label = i.name;
  //     var value = i.id;
  //     ops.push({ value: value, label: label });
  //   }
  // }

  ///
  // var Cus_Purchase_based_segment = useSelector((state) =>state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  // var Customer_segment_options = [];
  // if (Cus_Purchase_based_segment && Cus_Purchase_based_segment.length > 0) {
  //   for (var i of Cus_Purchase_based_segment) {
  //     var label = i.name;
  //     var value = i.id;
  //     Customer_segment_options.push({ value: value, label: label });
  //   }
  // }
  ///

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

  //var [schedule_type, setSchedule_type] = useState("manual");

  // var formSubmit = (event) => {
  //     event.preventDefault();
  //     //const fdata = new FormData(event.target);
  //     //const data = Object.fromEntries(fdata.entries());
  //     console.log(final);
  // }

  var [target, settarget] = useState("");
  var [onsale, setOnsale] = useState("1");
  
  var Handle_setOnsale = (e) => {
    setdisable_role_onsale(e.target.value);
  };


  var [savingBar, setSavingBar] = useState(false);
  

  var formSubmit = (event) => {

    event.preventDefault();

    var form_     = new FormData(event.target);
    var form_data = Object.fromEntries(form_.entries());

    var discount_string = "";
    for (var i = 0; i < final.length; i++) {
      var offer = final[i].offer;
      var otype = final[i].type;
      var catid = final[i].catid;
      discount_string = discount_string
        .concat(offer)
        .concat("shopex")
        .concat(otype)
        .concat("shopex")
        .concat(catid)
        .concat("_break_");

      //console.log(discount_string);
    }

    var name            = form_data["name"];
    var _name           = name.replace(/\s+/g, "_");
    var pr              = form_data["pr"];
    var target          = form_data["target"];
    var onsalerun       = form_data["onsalerun"];
    var type            = "catdis";
    var schedule        = 0;

    var f = 1;
    var t = 2;

    var status = 0;
    var schedule_ = "";
    if (schedule_type === "tl") {
      f = format(daterange[0], "yyyy-MM-dd"); //daterange[0];
      t = format(daterange[1], "yyyy-MM-dd"); //daterange[1];
      const today = new Date();
      if (today >= f && today <= t) {
        status = "1";
      } else {
        status = "0";
      }
      schedule_ = f + "-To-" + t;
    } else if (schedule_type === "manual") {
      schedule_ = "manual";
      status = "1";
    }

    var post = 1;

    dispatch(
      addRole({
        status: status,
        name: _name,
        type: type,
        target_segment: target,
        schedule: schedule_,
      })
    );

    setSavingBar(true);
    axios.post("https://server.shopex.io/dynamicpricing/dpdis_save_and_sending.php",{
          post: post,
          name: name,
          type: type,
          data: discount_string,
          target: target,
          from: f,
          to: t,
          onsalerun: onsalerun,
          pr: pr,
          ajax_call: "2",
        },{ withCredentials: true })
      .then(function (response) {
        setSavingBar(false);
      })
      .catch(function (error) {
        console.log(error);
      });

    //}
  };


  ////
  var handle_setschedule_type = (event) => {
    setSchedule_type(event.target.value);
  };

  ////
  return (
    
    <Card className="dash-card price">
    
      <form id="dpriceform" onSubmit={formSubmit}>
    
        <div className="input-filters" style={{ marginBottom: "0rem",background:'ghostwhite',  border: "0.5px dashed lightgrey",borderBottom:'0px', padding: "1%",}}>
          <strong> Pricing offer name : </strong>
          <input style={{width:"50vw", fontSize:"17px", borderRadius : "0px", padding : "5px"}} required={true} name="name" type="text" defaultValue={offername} />
        </div>
    
        <div className="input-filters" style={{marginBottom: "0rem",border:"0.5px dashed lightgrey", padding:"1%",displsy:'grid'}}>
          
          {/* {ops && (
            <Select
              placeholder="Select target Segment"
              value={target}
              onChange={(e) => {
                settarget(e.value);
              }}
              options={ops}
            />
          )} */}
          
          <strong style={{display:'flex'}}> Target Segment :: &nbsp; <p> {target_segment_name_} </p> </strong>
          <br/>
          {Customer_segment_options && (
            <Select className="multi"  style={{width:"30vw"}}
              placeholder={"Select target"} 
              defaultValue={target_segment_id}
              onChange = {(e) => {
                settarget_segment_id(e.value);
                settarget_segment_name_(e.label);
              }}
              options={Customer_segment_options}/>
          )}

          <input name="target" type="hidden" defaultValue={target_segment_id || ""}/>
          {/* <input name="target" type="hidden" defaultValue={target} /> */}
        
        </div>
        
       

        <div className="input-filters" style={{padding:'2% 0% 0% 0%',margin:'0px'}}>
          <Button style={{"width":"-webkit-fill-available","background":"slateblue","color":"white","justifyContent":"start","borderRadius":"3px","fontWeight":"900"}}
            className="button add" variant="outlined" onClick={() => addRules(rules.length + 1)}> 
            <span> Add-Option+ [ {rules.length} ] </span>
          </Button>
        </div>

        <div style={{background:'ghostwhite',  border: "0.5px dashed lightgrey", padding: "1%"}}>

          {rules.map((element, index) => (
          
            <div style={{display: "inline-flex", alignItems: "center", width: "100%", marginBottom: "1rem"}} className="form-inline" key={index} id={"id-" + index}>
              
              <label style={{ marginLeft: "0" }}> Offer </label>  &nbsp;

              <input name="offer" type="number" value={element.offer} onChange={(e) => handleChange(index, e)}/> &nbsp;

              <RadioGroup defaultValue={element.type || "percent"}style={{ display: "inline-block" }}onChange={(e) => {handleChange(index, e);}}>
                <Radio checked={element.type === "percent"}       value="percent"     name="type"/> % Off           &nbsp;
                <Radio checked={element.type === "amount"}        value="amount"      name="type"/> $ Off           &nbsp;
                <Radio checked={element.type === "fixedprice"}    value="fixedprice"  name="type"/> $ Each Product  &nbsp;
              </RadioGroup>

              <Select placeholder="pick category" // placeholder={element.catname}
                value={element.catid}
                onChange={(e) => {handleChange1(index, e.value, e.label);}}
                options={ops1}
              />
              <strong> {element.catname} </strong>

              {/* {element.catname} */}

              {index ? (
                <button style={{ borderRadius: "2px", marginLeft: "0.5rem", color: "#fff", background: "red"}} type="button" 
                onClick={() => removeRules(index)}>Remove</button>
              ) : null}

            </div>

          ))}

        </div>

      

       

        {/* <div className="input-filters">
          <strong>Disable this offer for <span style={{ color: "red" }}>  on-sale </span>products:</strong>
          <RadioGroup style={{ display: "inline-block" }} onChange={handle_setOnsale}>
            <Radio value="1" name="onsale_on_off" /> Yes
            <Radio value="0" name="onsale_on_off" /> No
          </RadioGroup>
          <input name="onsalerun" type="hidden" defaultValue={onsale} />
        </div>

        <div className="input-filters" style={{ display: 'table-caption' }}>
          <strong>Set Schedule for this offer: </strong>
          <RadioGroup style={{ display: "inline-block" }} onChange={(e) => { setSchedule_type(e.target.value);}}>
            <Radio value="manual" name="schedule" /> Start now and End manually
            <Radio value="tl" name="schedule" /> Set Timeline
          </RadioGroup>

          {schedule_type === "tl" && ( <DateRangePicker label="Timeline" value={daterange} onChange={setdrange} oneTap={false}></DateRangePicker>
          )}
        </div> */}

        {/* //// */}
        
        <br />

        <div className="input-filters" style={{marginBottom: "0rem",display: 'inline-grid', border: "0.5px dashed lightgrey",borderBottom:'0px', padding: "1%", width: "-webkit-fill-available"}}>

          <div style={{display:'inline-flex'}}>
            <strong> Set Schedule for this offer : </strong>
            <RadioGroup defaultValue={schedule_type} style={ { display: "inline-block" } } onChange={handle_setschedule_type}>
              <Radio checked={ schedule_type === "manual"}  value="manual"name="schedule" />Start now and End manually
              <Radio checked={ schedule_type === "tl"  }value="tl" name="schedule" />Set Timeline
            </RadioGroup>
          </div>
         
          <br />

          {
            drflag === false && schedule_type === "tl" && 
              <DateRangePicker label="Timeline" value={daterange} onChange={setdrange} oneTap={false}> 
              </DateRangePicker>
          }

          {
            drflag === true && schedule_type === "tl" && 
              <DateRangePicker label="Timeline"  value={[start, end]} onChange={setdrange} oneTap={false}>
              </DateRangePicker>
          }

          {/* <input name="schedule_dr" type="hidden" defaultValue={daterange} /> */} 
        
        </div>

        {/* //// */}


        <div className="input-filters" style={{marginBottom: "0rem",border:"0.5px dashed lightgrey",borderBottom:'0px', padding:"1%",displsy:'inline-flex'}}>
          <strong> Disable this offer for &nbsp; <span style={{color:"red"}}> &nbsp; on-sale  </span> products : </strong>
          <RadioGroup defaultValue={disable_role_onsale} style={ { display: "inline-block" } } onChange={Handle_setOnsale}>
            <Radio checked={disable_role_onsale === "1" } value="1" name="onsale_on_off" /> Yes
            <Radio checked={disable_role_onsale === "0" } value="0" name="onsale_on_off" /> No
          </RadioGroup>
          <input name="onsalerun" type="hidden" defaultValue={disable_role_onsale} />
        </div>
        <div className="input-filters" style={{display:'inline-flex',background:'ghostwhite',  border: "0.5px dashed lightgrey", padding: "1%", width: "-webkit-fill-available"}}>
          <strong>  Set Priority for this rule : </strong>  <br />
          <input required={true} name="pr" type="number" defaultValue="10" />
        </div>

        <br />
       

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

export default CategoryDiscount;
