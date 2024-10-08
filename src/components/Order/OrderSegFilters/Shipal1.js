import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Shipal1({onChange}) {
 
  var dispatch      = useDispatch();
  var [Sa1, setSa1] = useState("");
  var shoptype    = useSelector((state) => state.dashTops.shoptype);
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

  
  

  //var Cus_Sa1 = useSelector((state) => state.CusRetSC.sa1);

  var Cus_Sa1 = useSelector((state) => state.CusRetSC);
  var Sa1 = Cus_Sa1?.sa1 ?? null;


  return (
    <>
       <div className="input-filters">
    
    <strong>Shipping AddressLine 1 : </strong>
        {Sa1 ? (
          <Multiselect
            isObject={false}
            placeholder="Ship-Address Line 1"
            onRemove={(e) => {
              setSa1(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setSa1(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            options={Sa1}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4> No data available </h4>}
      </div>

      <input name="sa1" type={"hidden"} value={Sa1} />
    </>
  );
}
export default Shipal1;
