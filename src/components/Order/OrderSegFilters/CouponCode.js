import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function CouponCode({onChange}) {
  
  var dispatch                    = useDispatch();
  var [couponcode, setCouponcode] = useState("");
  var accountType                 = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusret_getcity")) {
        sessionStorage.setItem("get_cusret_getcity", "1");
        dispatch(get_cusret_getcity({ ajax_call: 2 }));
      }
    }

  }, [])

  var Cus_cc = useSelector((state) => state.CusRetSC);
  var Cus_cc = Cus_cc?.coupon ?? null;


  return (


    <div className="input-filters">
       <strong>Coupon code :</strong>
      {Cus_cc ? (
          <Multiselect
            isObject={false}
            placeholder="Coupon-code"
            onRemove={(e) => {
              setCouponcode(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
              
            }}
            onSelect={(e) => {
              setCouponcode(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            options={Cus_cc}
            selectedValues={[]}
            showCheckbox
          />
        ) : 
          <h4>No coupon code data available</h4>
      }
      
      <input name="cou" type={"hidden"} value={couponcode}/>

    </div>

  );


}
export default CouponCode;
