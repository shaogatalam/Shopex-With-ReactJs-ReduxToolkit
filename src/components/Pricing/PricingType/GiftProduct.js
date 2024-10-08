import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductCatagory from "../../Product/ProductSegmentFilters/ProductCatagory";
import Products from "../../Product/ProductSegmentFilters/Products";

import Multiselect from "multiselect-react-dropdown";

import { DateRangePicker } from "rsuite";
import moment from "moment";
import Select from "react-select";
import { format } from "date-fns";
import axios from "axios";

import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../../features/product/ProductPurchaseBasedCusSeg";

import { addRole } from "../../../features/DynamicPricing/CurrentRules";
import { Card } from "@mui/material";

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';



function GiftProduct({ offername, schedule_type,schedule_from,schedule_to, gifts, giftfor, giftfor_List, products, target_segment_name, target_segment_id, minItem, minAmount, status,osrun,pr})
{

  var dispatch = useDispatch();

  var accountType                       = useSelector((state) => state.dashTops.accountType);

  var [schedule_type, setSchedule_type] = useState("manual");
  var [start, setStart]                 = useState(null);
  var [end, setEnd]                     = useState(null);
  var [drflag, setdrflag]               = useState(false);


  var [pr, setPr] = useState(10);
  var [status, setStatus] = useState(0);
  var [onsalerun, setOnsalerun] = useState("1");

  var [cat, setCat] = useState(false);
  var [prod, setProd] = useState(false);
  var [all, setAll] = useState(false);

  var [minQuantitydiv, setminQ] = useState(false);
  var [minAmountdiv, setminA] = useState(false);

  // var product_obj = useSelector((state) => state.product_List_And_Segments.all_product_object);
  // var product_cat_obj = useSelector((state) => state.product_List_And_Segments.all_product_cat_object);

  var [GiftOnProduct, setGiftOnProduct] = useState([]);
  var [GiftOnCategory, setGiftOnCategory] = useState([]);

  var [Target_segment_Name, setTarget_segment_Name] = useState("");
  var [Target_segment_Id, setTarget_segment_Id] = useState("");

  var [gift_min_quantity, setGift_min_quantity] = useState(0);
  var [gift_min_amount, setGift_min_amount] = useState(0);

  var [savingBar, setSavingBar] = useState(false);


  var [daterange, setdrange] = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);

  var [item_amount, setItem_amount] = useState(0);

  var [all_or_cat_or_product_radio, SetAll_or_cat_or_product_radio] = useState("prod");

  var gift_available_for = (e) => {

    setProd(false);
    setCat(false);
    setAll(false);

    var v = e.target.value;
    SetAll_or_cat_or_product_radio(v);

    if (v === "prod") setProd(true);
    else if (v === "cat") setCat(true);
    else if (v === "all") setAll(true);
  };

  var [product_optionsH, SetProduct_options]  = useState([]); // Gifts Options - List of Products
  var [offer_as_gifts, SetOfferASgifts]       = useState([]); // Preselected Gifts Options - List of Products - When Editing Rule
  var [offerName, setOfferName]               = useState("");

  useEffect(() => {

    SetAll_or_cat_or_product_radio(giftfor);
    setOfferName(offername);
    setTarget_segment_Name(target_segment_name);
    setTarget_segment_Id(target_segment_id);
    SetOfferASgifts(gifts);
    SetProduct_options(products);
    setPr(pr);
    setStatus(status);
    setOnsalerun(osrun);

    
    if(schedule_type == "tl"){
      setStart(new Date(schedule_from));
      setEnd(new Date(schedule_to));
      setSchedule_type("tl");
      setdrflag(true);
    }else{
      setSchedule_type("manual");
    }

    if (giftfor === "prod") {
      setProd(true);
      setGiftOnProduct(giftfor_List);
    } else if (giftfor === "cat") {
      setGiftOnCategory(giftfor_List);
      setCat(true);
    } else if (giftfor === "all") {
      setAll(true);
    }

    // var minitem             = sinrule[0].dtail.split("_next_")[3];
    // var minamount           = sinrule[0].dtail.split("_next_")[4];

    if (minItem === "NOITEM") {
      setminA(true);
      setGift_min_amount(minAmount);
    } else if (minAmount === "NOAMOUNT") {
      setminQ(true);
      setGift_min_quantity(minItem);
    }

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

  }, []);

  //console.log();

  // var Cus_Purchase_based_segment = useSelector((state) =>state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  // var Customer_segment_options = [];
  // if (Cus_Purchase_based_segment && Cus_Purchase_based_segment.length > 0) {
  //   for (var i of Cus_Purchase_based_segment) {
  //     var label = i.name;
  //     var value = i.id;
  //     Customer_segment_options.push({ value: value, label: label });
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
  



  var minimum_amount_OR_quantity = (e) => {
    
    setminA(false);
    
    setminQ(false);
    
    var v = e.target.value;
    setItem_amount(v);

    if (v == "minAdiv") {
      setminA(true);
    }  
    if (v == "minQdiv") {
      setminQ(true);
    }
  };

  var [giftproduct, setGiftProduct] = useState("");
  var [target, settarget] = useState();

  var formSubmit = (event) => {
    
    event.preventDefault();

    var form_ = new FormData(event.target);
    var form_data = Object.fromEntries(form_.entries());

    var name                  = form_data["name"];
    var _name                 = name.replace(/\s+/g, "_");
    var pr                    = form_data["pr"];
    var target                = form_data["target"];
    var min_item_or_amount    = form_data["item_or_amount"]; //
    var onsalerun             = form_data["onsalerun"];
    var giftstring            = form_data["giftstring111"];
    var type                  = "gift_dis";

    var minAmount             = form_data["gift_min_amount"];
    var minQuantity           = form_data["gift_min_quantity"];
    

    var amount = "NOAMOUNT";
    var item   = "NOITEM";

    if(minAmount)   { 
      amount = minAmount; 
      item = "NOITEM"; 
    }

    if(minQuantity) { 
      item = minQuantity; 
      amount = "NOAMOUNT"; 
    }

    // if(min_item_or_amount == "minQdiv"){
    //   amount = "NOAMOUNT";
    // } 
    // if(min_item_or_amount == "minAdiv"){
    //   item = "NOITEM";
    // }

    var discount_string = "";
    var pro_or_cats = "";

    var available_for = "";

    if (cat || prod || all) {
      
      if (cat || prod) {
      
        if (cat) {
          available_for = "cat";
          pro_or_cats = JSON.parse(form_data["productCatList"]);
        }

        if (prod) {
          available_for = "prod";
          pro_or_cats = JSON.parse(form_data["productList"]);
        }

        if (pro_or_cats.length > 0) {
          for (var i = 0; i < pro_or_cats.length; i++) {
            var pro_or_cat_id = pro_or_cats[i];
            discount_string = discount_string
              .concat(available_for)
              .concat("shopex")
              .concat(pro_or_cat_id)
              .concat("shopex")
              .concat(giftstring)
              .concat("shopex")
              .concat(item)
              .concat("shopex")
              .concat(amount)
              .concat("_break_");
            console.log(discount_string);
          }
        }
      }

      if (all) {
        available_for = "all";
        discount_string = discount_string
          .concat(available_for)
          .concat("shopex")
          .concat(giftstring)
          .concat("shopex")
          .concat(item)
          .concat("shopex")
          .concat(amount)
          .concat("_break_");
      }
    }

    var status = 0;
    var schedule_ = "";
    var f = 1;
    var t = 2;
    if (schedule_type === "tl") {
      f = format(daterange[0], "yyyy-MM-dd");
      t = format(daterange[1], "yyyy-MM-dd");
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

    // let fd = new FormData();    //formdata object
    var post = 1;

    setSavingBar(true);

    var status = 0;
    dispatch(
      addRole({
        status: status,
        name: _name,
        type: type,
        target_segment: target,
        schedule: schedule_,
      })
    );
    
    if(accountType==="paid") {

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
        ajax_call: 2},{ withCredentials: true })
        .then(function (response) {
          setSavingBar(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
  };

  var product_obj = useSelector((state) => state.product_List_And_Segments.all_product_object);

  var ops = [];
  if (product_obj && product_obj.length > 0) {
    for (var i of product_obj) {
      var label = i.product_name;
      var value = i.product_id;
      if(label && value){ops.push({ value: value, label: label });}
    }
  }

  var [target_segment_name_, settarget_segment_name_] = useState("");
  var [target_segment_id, settarget_segment_id] = useState("");

  var handle_setschedule_type = (event) => {
    setSchedule_type(event.target.value);
  };

  return (

    <Card className="dash-card price">
    
      <form id="dpriceform" onSubmit={formSubmit}>
    
        {/* <div className="input-filters">
          <strong> Offer name : </strong>
          <input style={{ height: "40px", width: "300px", fontSize: "16px" }} required={true} name="name" type="text" defaultValue={offerName}/>
        </div> */}

        <div className="input-filters" style={{ marginBottom: "0rem",background:'ghostwhite',  border: "0.5px dashed lightgrey",borderBottom:'0px', padding: "1%",}}>
          <strong> Pricing offer name : </strong>
          <input style={{width:"50vw", fontSize:"17px", borderRadius : "0px", padding : "5px"}} required={true} name="name" type="text" defaultValue={offername} />
        </div>
        <div className="input-filters" style={{border:"0.5px dashed lightgrey", padding:"1%",displsy:'grid'}}>
          <strong style={{display:'flex'}}>Target Segment &nbsp;::&nbsp; {target_segment_name_}</strong>
          {Customer_segment_options && 
            <Select
              className="multi"
              placeholder={"Select target"}
              defaultValue={Target_segment_Id}
              onChange={(e) => {
                settarget_segment_id(e.value);
                settarget_segment_name_(e.label);
              }}
              options={Customer_segment_options}
            />
          }
          <input name="target" type="hidden" defaultValue={target_segment_id || ""}/>
        </div>


        <br/>
       

        <div className="input-filters" style={{ display: 'grid',border:"0.5px dashed lightgrey",borderBottom:'0px',padding:'1%'}}>
       
          <div style={{ paddingBottom:"1%",display:'inline-flex'}}>
            <strong>Discount is available for : </strong> &nbsp;
            <RadioGroup defaultValue={all_or_cat_or_product_radio || "prod"} style={{ display: "inline" }} onChange={(e) => {gift_available_for(e);}}>
              <Radio checked={all_or_cat_or_product_radio === "all"} value="all" name="cat_or_product"/> All product & category &nbsp;
              <Radio checked={all_or_cat_or_product_radio === "prod"} value="prod" name="cat_or_product"/> Specific Product &nbsp;
              <Radio checked={all_or_cat_or_product_radio === "cat"} value="cat" name="cat_or_product"/> Specific Category &nbsp;
            </RadioGroup>
          </div>
          
          <br/>

          {cat && <ProductCatagory data={GiftOnCategory} />}
          
          {prod && <Products data={GiftOnProduct} />}
          
        </div>
    
        <div style={{border:"0.5px dashed lightgrey",borderBottom:'0px', padding:"1%",displsy:'grid'}}>
          
          <div style={{"paddingBottom": "1%","displsy":'inline-flex'}}>
            
            <strong> Required : </strong> &nbsp;
            <RadioGroup style={{ display: "inline-block" }} onChange={(e) => { minimum_amount_OR_quantity(e); }} >
              <Radio value="minQdiv" name="item_or_amount_r" /> Minimal Quantity &nbsp;
              <Radio value="minAdiv" name="item_or_amount_r" /> Minimul amount &nbsp;
            </RadioGroup>
            <input name="item_or_amount" type="hidden" defaultValue={item_amount}/>
          
          </div>
          
          <br/>

          {minQuantitydiv && 
            <div className="input-filters">
              <strong> <span style={{color:'purple'}}>  Minimal Quantity </span> need to buy from any selected product : </strong>
              <input type="number" defaultValue={gift_min_quantity} name="gift_min_quantity"/>
            </div>
          }
          {minAmountdiv && 
            <div className="input-filters">
              <strong> <span style={{color:'purple'}}> Minimul amount </span> need to spent on any selected product : </strong>
              <input type="number" defaultValue={gift_min_amount} name="gift_min_amount"/>
            </div>
          }

        </div>
        <div className="input-filters" style={{border:"0.5px dashed lightgrey", padding:"1%",displsy:'grid'}}>
          
          <strong>  Offer as gift : </strong> &nbsp;

          {/* {JSON.stringify(offer_as_gifts)} <h1></h1> {JSON.stringify(product_optionsH)} */}

          {ops && ops.length > 0 && (
            <Multiselect
              displayValue="label"
              placeholder="+ Pick Gift"
              onRemove={(e) => {
                var gifts = "";
                for (var i of e) { gifts = gifts.concat(i.value).concat("next_gift"); }
                setGiftProduct(JSON.stringify(gifts));
              }}
              onSelect={(e) => {
                var gifts = "";
                for (var i of e) { gifts = gifts.concat(i.value).concat("next_gift"); }
                setGiftProduct(JSON.stringify(gifts));
              }}
              options={ops}
              selectedValues={offer_as_gifts}
              showCheckbox
            />
          )}

          <input name="giftstring111" type="hidden" defaultValue={offer_as_gifts}/>
          {/* <input name="giftstring"    type="hidden" defaultValue={giftproduct} /> */}
        
        </div>
        

        <br/>

        <div className="input-filters" style={{marginBottom:'0px',border:"0.5px dashed lightgrey",borderBottom:'0px', padding:"1%",displsy:'inline-flex'}}>
          <strong> Disable this offer for <span style={{ color: "red" }}> &nbsp; on-sale </span>products : </strong> &nbsp;
          <RadioGroup style={{ display: "inline-block" }} onChange={(e) => { setOnsalerun(e.target.value); }} >
            <Radio value="1" name="onsale_on_off" /> Yes &nbsp;
            <Radio value="0" name="onsale_on_off" /> No &nbsp;
          </RadioGroup>
          <input name="onsalerun" type="hidden" defaultValue={onsalerun} />
        </div>

        

        {/* <div className="input-filters">
          
          <strong>Set Schedule for this offer:</strong>

          <RadioGroup style={{ display: "inline-block" }} onChange={(e) => { setSchedule_type(e.target.value); }} >
            <Radio value="manual" name="schedule" /> Start now and End manually
            <Radio value="tl" name="schedule" /> Set Timeline
          </RadioGroup>

          {schedule_type === "tl" && (
            <>
              <DateRangePicker label="Timeline"value={daterange}onChange={setdrange}oneTap={false}></DateRangePicker>
              <input name="schedule_dr" type={"hidden"} defaultValue={ format(daterange[0], "yyyy-MM-dd") + "To" + format(daterange[1], "yyyy-MM-dd") } />
            </>
          )}

        </div> */}


        {/*  */}

        <div className="input-filters" style={ {border:"0.5px dashed lightgrey",borderBottom:'0px',marginBottom:'0px', display: 'inline-grid' } }>
          
          <div style={{display:'inline-flex'}}>
            <strong> Set Schedule for this offer : </strong> &nbsp;
            <RadioGroup defaultValue={schedule_type} style={ { display: "inline-block" } } onChange={handle_setschedule_type}>
              <Radio checked={schedule_type === "manual"}  value="manual"name="schedule" />Start now and End manually &nbsp;
              <Radio checked={ schedule_type === "tl"  }value="tl" name="schedule" />Set Timeline &nbsp;
            </RadioGroup>
          </div>

          <br />
         
          
          {drflag === false && schedule_type === "tl" && 
              <DateRangePicker label="Timeline" value={daterange} onChange={setdrange} oneTap={false}> </DateRangePicker>
          }

          {drflag === true && schedule_type === "tl" && 
              <DateRangePicker label="Timeline"  value={[start, end]} onChange={setdrange} oneTap={false}></DateRangePicker>
          }

          {/* <input name="schedule_dr" type="hidden" defaultValue={daterange} /> */} 
        
        </div>
          
        {/*  */}

        

        <div className="input-filters" style={{display:'inline-flex',border:"0.5px dashed lightgrey"}}>
          <strong> Set Priority for this rule : </strong> &nbsp;
          <input required={true} name="pr" type="number" defaultValue={pr} />
        </div>
        
        <br />


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
              style={{"width":"-webkit-fill-available","background": "red","color": "white","padding":'1%',"fontWeight":"900"}}> 
              Save 
            </Button>
          )}
        </div>

      </form>

    </Card>

  );

}

export default GiftProduct;
