import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Quantity from "./PricingType/Quantity";
import GiftProduct from "./PricingType/GiftProduct";
import DiscountOnEntireShop from "./PricingType/DiscountOnEntireShop";
import CategoryDiscount from "./PricingType/CategoryDiscount";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import moment from "moment";

//import store,{injectAsyncReducer} from "../../app/NewStore";
//import { Pricing_Current_Rules_Slice } from "../../features/DynamicPricing/CurrentRules";
//import { pricing_rule_List_Slice }  from "../../features/DynamicPricing/CreatedRules";
import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../features/product/ProductPurchaseBasedCusSeg";


function PricingCreate() {

  var rolePower   = useSelector((state) => state.dashTops.rolePower);
  var accountType = useSelector((state) => state.dashTops.accountType);

  if (rolePower == 3) {
    window.location.href = "/dashboard";
  }

  var dispatch = useDispatch();

  useEffect(() => {

    // var dynamic_pricing_Reducer = () => {
    //   if (ReactSession.get("dynamic_pricing_Reducer")) {
    //     return true;
    //   } else {
    //     ReactSession.set("dynamic_pricing_Reducer", "1");
    //     return false;
    //   }
    // }

    // if(!(dynamic_pricing_Reducer())) {

    //   injectAsyncReducer('Pricing_rule_list', pricing_rule_List_Slice.reducer);
    //   injectAsyncReducer('Pricing_current_rules', Pricing_Current_Rules_Slice.reducer);
       
    //   console.log(store.getState());

    //   store.subscribe(() => {
    //     const newState = store.getState();
    //     if ( newState.order_List_And_Segs && newState.order_numrev_shipLoc_ChartTable){
    //       console.log('Dynamic reducers injected successfully!');
    //     }
    //   });
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
        sessionStorage.setItem("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
        dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
      }
    }

  }, []);

  var [filterList, setfilterList] = useState();

  var discount_type_change = (e) => {
    var distype = e.target.value;
    if (distype == "Quantity")
      setfilterList(
        <Quantity
          key={"Quantity"}
          target_segment_name={""}
          target_segment_id={""}
          offername={""}
          schedule={""}
          osrun={""}
          status={""}
          pr={""}
          qt={""}
          for_category={""}
          for_product={""}
          offer_on_pro_or_cat={""}
        />
      );
    else if (distype == "GiftProduct")
      setfilterList(<GiftProduct key={"GiftProduct"} />);
    else if (distype == "DiscountOnEntireShop")
      setfilterList(<DiscountOnEntireShop key={"DiscountOnEntireShop"} />);
    else if (distype == "CategoryDiscount")
      setfilterList(<CategoryDiscount key={"CategoryDiscount"} />);
  };

  var [daterange, setdrange] = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);
  var [schudule, setschedule] = useState("manual");

  //var Cus_Purchase_based_segment = useSelector( (state) => state.Product_Purchase_Based_Customer_List_and_Segment.Product_Purchase_Based_Cus_Segment_Obj);
  //Cus_Purchase_based_segment = structuredClone(Cus_Purchase_based_segment);

  var Cus_Purchase_based_segment = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment);
  var Cus_Purchase_based_segment = Cus_Purchase_based_segment?.Product_Purchase_Based_Cus_Segment_Obj ?? [];
  // var Cus_Purchase_based_segment = structuredClone(Cus_Purchase_based_segment);

  var ops = [];
  if (Cus_Purchase_based_segment && Cus_Purchase_based_segment.length > 0) {
    for (var i of Cus_Purchase_based_segment) {
      var label = i.name;
      var value = i.id;
      if(label && value){ops.push({ value: value, label: label });}
    }
  }

  return (
    <>
    <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
      <div className="notifications">
        <h6>Pricing : Create  </h6>
      </div>
    </Grid>

    <Grid container spacing={3} className="pricing" >
    
      <Grid item md={12} className="top-wrap" style={{marginBottom:"2%"}}>
        <div className="notifications">
          <h6>Select Discount type</h6>
        </div>
      </Grid>

      <Grid item md={12}>
        <div className="date-period">
          <RadioGroup style={{display: "inline-block",fontSize: "13px",color: "white  ",fontWeight: "500",}}onChange={discount_type_change}>
            <Radio value="Quantity" name="Discount" /> Quantity
            <Radio value="GiftProduct" name="Discount" /> Gift-Product
            <Radio value="CategoryDiscount" name="Discount" /> Category-Discount
            <Radio value="DiscountOnEntireShop" name="Discount" />{" "}
            Discount-On-Entire-Shop
          </RadioGroup>
        </div>
        <br />
        {filterList}
      </Grid>
    </Grid>
    </>
  );
}

export default PricingCreate;
