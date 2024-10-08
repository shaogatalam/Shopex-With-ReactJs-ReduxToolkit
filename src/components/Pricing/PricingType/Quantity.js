import React, { useEffect, useState } from "react";
import ProductCatagory from "../../Product/ProductSegmentFilters/ProductCatagory";
import Products from "../../Product/ProductSegmentFilters/Products";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import Select from "react-select";
import axios from "axios";

import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../../features/product/ProductPurchaseBasedCusSeg";

import { addRole } from "../../../features/DynamicPricing/CurrentRules";
import { Card } from "@mui/material";

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';



function Quantity({target_segment_name,target_segment_id,offername,schedule_type,schedule_from,schedule_to,osrun,status,pr,for_category,for_product,offer_on_pro_or_cat,qt}){
  
  var dispatch = useDispatch();

  var [rules, setRules] = useState([ { from: "", to: "", offer: "", type: "percent" },]);

  //var [rules1, setRules1] = useState([{from: "", to : "", offer : "", type : "percent"}]);

  var [schedule_type, setSchedule_type] = useState("manual");
  var [start, setStart]                 = useState(null);
  var [end, setEnd]                     = useState(null);
  var [drflag, setdrflag]               = useState(false);

  var [QDIS_OnProduct, setQdisOnProduct]   = useState([]);
  var [QDIS_OnCategory, setQdisOnCategory] = useState([]);

  var accountType = useSelector((state) => state.dashTops.accountType);
  
  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //     ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //     dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //   }
    //   if (!ReactSession.get("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
    //     ReactSession.set("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
    //     dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
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

  var [final, setFinal] = useState([]);
  var newRules          = [];
  var [cat, setCat]     = useState(false);
  var [prod, setProd]   = useState(false);
  var [all, setAll]     = useState(false);
  var [savingBar, setSavingBar] = useState(false);


  var [target_segment_name1, setTarget_segment_name]  = useState("");
  var [target_segment_id1, setTarget_segment_id]      = useState("");
  var [rulename, setOfferName]                        = useState("");
  var [pr, setPriority]                               = useState(10);
  var [NOosrun, setNoOSrun]                           = useState(1);

  useEffect(() => {

    if (offer_on_pro_or_cat) {
      setTarget_segment_name(target_segment_name);
      setTarget_segment_id(target_segment_id);
      setOfferName(offername);
      setPriority(pr);
      setNoOSrun(osrun);

      //var sch_ = schedule;

      setRules(qt);

      if (offer_on_pro_or_cat === "prod") {
        setProd(true);
        setCat(false);
        setQdisOnProduct(for_product);
      } else if (offer_on_pro_or_cat === "cat") {
        setCat(true);
        setProd(false);
        setQdisOnCategory(for_category);
      }

      if(schedule_type == "tl"){
        setStart(new Date(schedule_from));
        setEnd(new Date(schedule_to));
        setSchedule_type("tl");
        setdrflag(true);
      }else{
        setSchedule_type("manual");
      }

    }
  }, [offername]);

  var available_for = (e) => {
    setProd(false);
    setCat(false);
    setAll(false);

    var v = e.target.value;
    if (v == "prod") setProd(true);
    else if (v === "cat") setCat(true);
    else if (v === "all") setAll(true);
  };

  var handleChange = (i, e) => {
    newRules = [...rules];
    newRules[i][e.target.name] = e.target.value;
    setRules(newRules);
    setFinal([]);
    setFinal(newRules);
  };

  var addRules = (len) => {
    setRules([...rules, { from: "", to: "", offer: "", type: "percent" }]);
    newRules = [...rules];
    setFinal([]);
    setFinal(newRules);
  };

  var removeRules = (idx) => {
    newRules = [...rules];
    newRules.splice(idx, 1);
    setRules(newRules);
    setFinal([]);
    setFinal(newRules);
  };

  // var Cus_Purchase_based_segment = useSelector((state) =>state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  // Cus_Purchase_based_segment = structuredClone(Cus_Purchase_based_segment);
  // var ops = [];
  // if (Cus_Purchase_based_segment) {
  //   for (var i of Cus_Purchase_based_segment) {
  //     var label = i.name;
  //     var value = i.id;
  //     ops.push({ value: value, label: label });
  //   }
  // }

  // var Cus_Purchase_based_segment = useSelector((state) =>state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
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



  //var[onsale,setOnsale] = useState('1');

  var [target, settarget] = useState();

  var formSubmit = (event) => {

    event.preventDefault();
    var form_ = new FormData(event.target);
    var form_data = Object.fromEntries(form_.entries());
    

    console.log(form_data);

    setSavingBar(true);

    var discount_string = "";
    var pro_or_cats = "";

    var available_for = "";

    if (final.length > 0 && (cat || prod || all)) {
      if (cat || prod) {
        if (cat) {
          available_for = "cat";
          pro_or_cats = JSON.parse(form_data["productCatList"]);
        }

        if (prod) {
          available_for = "prod";
          pro_or_cats = JSON.parse(form_data["productList"]);
        }

        for (var i = 0; i < pro_or_cats.length; i++) {
          var pro_or_cat_id = pro_or_cats[i];
          for (var j = 0; j < final.length; j++) {
            var from = final[j].from;
            var to = final[j].to;
            var offer = final[j].offer;
            var typee = final[j].type;
            discount_string = discount_string
              .concat(available_for)
              .concat("shopex")
              .concat(pro_or_cat_id)
              .concat("shopex")
              .concat(from)
              .concat("shopex")
              .concat(to)
              .concat("shopex")
              .concat(offer)
              .concat("shopex")
              .concat(typee)
              .concat("_break_");
          }
        }
      }

      if (all) {
        available_for = "all";
        for (var i = 0; i < final.length; i++) {
          var from = final[i].from;
          var to = final[i].to;
          var offer = final[i].offer;
          var typee = final[i].type;
          discount_string = discount_string
            .concat(available_for)
            .concat("shopex")
            .concat(from)
            .concat("shopex")
            .concat(to)
            .concat("shopex")
            .concat(offer)
            .concat("shopex")
            .concat(typee)
            .concat("_break_");
        }
      }
    }

    var f = 1;
    var t = 2;

    var post      = 1;
    var name      = form_data["name"];
    var _name     = name.replace(/\s+/g, "_");
    var pr        = form_data["pr"];
    var target    = form_data["target"];
    var onsalerun = form_data["onsalerun"];
    var type      = "q_dis";

    var status = 0;
    var schedule_ = "";
    
    if (schedule_type === "tl") {
      
      var schedule_dr = form_data["schedule_dr)"];
      var dateArray = schedule_dr.split("TO");
      
      f = dateArray[0];
      t = dateArray[1];

      const today = new Date();
      if (today >= f && today <= t) {status = "1";} 
      else { status = "0";}
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

    if(accountType==="paid"){
      axios.post("https://server.shopex.io/dynamicpricing/dpdis_save_and_sending.php",
          {
            post: post,
            name: name,
            type: type,
            data: discount_string,
            target: target,
            from: f,
            to: t,
            onsalerun: onsalerun,
            pr: pr,
            ajax_call: 2,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          setSavingBar(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  };

  //var[,setQdisOnProduct]=useState([]);
  //var[

  var [target_segment_name_, settarget_segment_name_] = useState("");
  var [target_segment_id, settarget_segment_id] = useState("");
  

  var handle_setschedule_type = (event) => {
    setSchedule_type(event.target.value);
  };

  return (
    
    <Card className="dash-card price">
    
      <form onSubmit={formSubmit}>
    
        {/* <div className="input-filters">
          <strong>Set a relevant offer name:</strong>
          <input required={true} name="name" type="text" defaultValue={rulename}/>
        </div> */}

        <div className="input-filters" style={{ background:'ghostwhite',  border: "1px dashed lightgrey", padding: "1%"}}>
          <strong> Pricing offer name : </strong>
          <input style={{width:"50vw", fontSize:"17px", borderRadius : "0px", padding : "5px"}} required={true} name="name" type="text" defaultValue={offername} />
        </div>

        <div className="input-filters" style={{border:"1px dashed lightgrey", padding:"1%",displsy:'grid'}}>
          
          <strong style={{paddingTop:"15px"}}> Target Segment &nbsp; :: &nbsp; <p>{target_segment_name1}</p> </strong>
          <br/>

          {Customer_segment_options && (
            <Select className="multi" placeholder={"Select target"} defaultValue={target_segment_id}
              onChange={(e) => {
                settarget_segment_id(e.value);
                settarget_segment_name_(e.label);
              }}
              options={Customer_segment_options}
            />
          )}

          <input name="target" type="hidden" defaultValue={target_segment_id || ""}/>

        </div>

        <div className="input-filters" style={{border:"1px dashed lightgrey", padding:"1%",displsy:'grid'}}>
          
          <div style={{display:'inline-flex'}}>
            <strong style={{paddingTop:"11px"}}> Discount is available for : </strong> &nbsp;
            <RadioGroup style={{ display: "inline-block" }}onChange={(e) => {available_for(e);}}>
              <Radio checked={prod} value="prod" name="cat_or_product" /> Specific Product  &nbsp;
              <Radio checked={cat} value="cat" name="cat_or_product" /> Specific Category  &nbsp;
              <Radio checked={all} value="all" name="cat_or_product" /> All product & category  &nbsp;
            </RadioGroup>
          </div>
          <br/>
          {cat && <ProductCatagory data={QDIS_OnCategory} />}
          {prod && <Products data={QDIS_OnProduct} />}
        
        </div>

        {/* {JSON.stringify(QDIS_OnCategory)}
                <h1></h1>
            {JSON.stringify(QDIS_OnProduct)}
        */}

     
        <br/> 
        
        <div className="input-filters" style={{padding:'2% 0 0 0',margin:"0px"}}>
          <Button style={{"width":"-webkit-fill-available","background":"slateblue","color":"white","justifyContent":"start","borderRadius":"3px","fontWeight":"900"}}
            className="button add" variant="outlined" onClick={() => addRules(rules.length + 1)}> 
            <span> Add-Option+ </span>&nbsp;[{rules.length}]
          </Button>
        </div>

        {/* <div className="input-filters" style={{border:"1px dashed lightgrey", padding:"1%",displsy:'grid'}}> */}
        <div style={{background:'ghostwhite',  border: "1px dashed lightgrey", padding: "1%",maxHeight:'30vh',overflow:'scroll'}}>

          {/* <div className="input-filters">
            <Button className="button add" onClick={() => addRules(rules.length + 1)} variant="outlined"><strong>+ADD</strong></Button>
          </div> */}

          {rules.map((element, index) => (
            <>
              <div className="form-inline" key={index} id={"id-" + index}>
                
                <label style={{ marginLeft: 0 }}>From</label> &nbsp;
                <input required={true}name="from"type="number"value={element.from}onChange={(e) => handleChange(index, e)}/> &nbsp;

                <label>To</label> &nbsp; 
                <input required={true} name="to" type="number" value={element.to} onChange={(e) => handleChange(index, e)}/> &nbsp;

                <label>Offer</label> &nbsp;
                <input required={true}name="offer"type="number"value={element.offer}onChange={(e) => handleChange(index, e)}/> &nbsp;

                <RadioGroup defaultValue={element.type} style={{ display: "inline-block" }} onChange={(e) => { handleChange(index, e);}}>
                  <Radio checked={element.type === "percent"} value="percent" name="type"/> % Off &nbsp;
                  <Radio checked={element.type === "amount"} value="amount" name="type"/> $ Off &nbsp;
                  <Radio checked={element.type === "fixedprice"} value="fixedprice" name="type"/> $ Each Product &nbsp;
                </RadioGroup>

                {
                  index ? ( <button style={{ borderRadius: "2px", marginLeft: "0.5rem", color: "#fff", background: "red", }} 
                  className="fields-remove" type="button" onClick={() => removeRules(index)}> Remove </button> ) : null
                }
              </div>
              <br />
            </>
          ))}
          
        </div>

        <br/>
        

        <div className="input-filters" style={{border:"1px dashed lightgrey", padding:"1%",displsy:'inline-flex',marginBottom: "0rem"}}>

          <strong> Disable this offer for &nbsp;<span style={{ color: "red" }}>&nbsp; on-sale </span> products : </strong>
          <RadioGroup style={{ display: "inline-block" }} onChange={(e) => { setNoOSrun(e.target.value);}}>
            <Radio value="1" name="onsale_on_off" /> Yes
            <Radio value="0" name="onsale_on_off" /> No
          </RadioGroup>
          <input name="onsalerun" type="hidden" defaultValue={NOosrun} />

        </div>

        {/* <div className="input-filters">
          
          <strong>Set Schedule for this offer:</strong>

          <RadioGroup style={{ display: "inline-block" }}onChange={(e) => {set_schedule_type(e.target.value);}}>
            <Radio value="manual" name="schedule" /> Start now and End manually
            <Radio value="tl" name="schedule" /> Set Timeline
          </RadioGroup>

          {schedule_type === "tl" && (
            <>
              <DateRangePicker label="Timeline" value={daterange} onChange={setdrange} oneTap={false}></DateRangePicker>
              <input name="schedule_dr" type={"hidden"} defaultValue={format(daterange[0], "yyyy-MM-dd") + "To" +format(daterange[1], "yyyy-MM-dd")}/>
            </>
          )}

          <input name="schedule" type="hidden" defaultValue={daterange} />

        </div> */}

        <div className="input-filters" style={{marginBottom: "0rem",display: 'inline-grid', border: "1px dashed lightgrey", padding: "1%", width: "-webkit-fill-available"}}>

          <div className="input-filters" style={{display: 'inline-flex',marginBottom: "0rem"}}>
            <strong> Set Schedule for this offer : </strong> 
            <RadioGroup defaultValue={schedule_type} style={ { display: "inline-block" } } onChange={handle_setschedule_type}>
              <Radio checked={ schedule_type === "manual"}  value="manual"name="schedule" />Start now and End manually &nbsp;
              <Radio checked={ schedule_type === "tl"  }value="tl" name="schedule" />Set Timeline
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
        
        <br />

        <div className="input-filters" style={{display: 'inline-flex',  border: "1px dashed lightgrey", padding: "1%", width: "-webkit-fill-available"}}>
          <strong>Set Priority for this rule:</strong><br />
          <input required={true} name="pr" type="number" defaultValue={pr} />
        </div><br />

        {/* <input type="submit" style={{ width: "100%", maxWidth: "500px" }} /> */}

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

export default Quantity;
