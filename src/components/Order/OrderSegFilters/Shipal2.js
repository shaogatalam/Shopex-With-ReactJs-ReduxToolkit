import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Shipal2({onChange}) {
  
  var dispatch = useDispatch();
  var [Sa2, setSa2] = useState("");
 
  // useEffect(() => {
  //   var is_dispatched = (dispatch_function) => {
  //     ReactSession.get("get_cusret_getcity");
  //     if (ReactSession.get("get_cusret_getcity")) {
  //       return true;
  //     } else {
  //       ReactSession.set("get_cusret_getcity", "1");
  //       return false;
  //     }
  //   };
  
  //   if (!is_dispatched("get_cusret_getcity")) {
  //     dispatch(get_cusret_getcity({ ajax_call: 2 }));
  //   }
  // },[]);

  var accountType = useSelector((state) => state.dashTops.accountType);
  
  useEffect(() => {
    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_cusret_getcity")) {
    //     ReactSession.set("get_cusret_getcity", "1");
    //     dispatch(get_cusret_getcity({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusret_getcity")) {
        sessionStorage.setItem("get_cusret_getcity", "1");
        dispatch(get_cusret_getcity({ ajax_call: 2 }));
      }
    }
  }, [])

  

  //var Cus_Sa2 = useSelector((state) => state.CusRetSC.sa2);

  var Cus_Sa2 = useSelector((state) => state.CusRetSC);
  var Sa2     = Cus_Sa2?.sa2 ?? null;


  return (
    <>
       <div className="input-filters">
    
    <strong>Shipping AddressLine 2 : </strong>
        {Sa2 ? (
          <Multiselect
            isObject={false}
            placeholder="Ship-Address Line 2"
            onRemove={(e) => {
              setSa2(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setSa2(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            options={Sa2}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4>No data available</h4> } 
      </div>

      <input name="sa2" type={"hidden"} value={Sa2} />
    </>
  );
}
export default Shipal2;
