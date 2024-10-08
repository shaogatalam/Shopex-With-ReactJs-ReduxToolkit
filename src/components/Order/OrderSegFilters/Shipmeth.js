import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Shipmeth({onChange}) {
  
  var dispatch = useDispatch();
  var [shipmeth, setShipmeth] = useState("");
  var accountType             = useSelector((state) => state.dashTops.accountType);
  
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
  
  //var Cus_Shipmeth = useSelector((state) => state.CusRetSC.shipmeth);
  var Cus_Shipmeth = useSelector((state) => state.CusRetSC);
  var Cus_Shipmeth = Cus_Shipmeth?.shipmeth ?? null;


  return (
    <>
       <div className="input-filters">
    
        <strong>Shipping method : </strong>
        {Cus_Shipmeth ? (
          <Multiselect
            isObject={false}
            placeholder="Shipping-Method"
            onRemove={(e) => {
              setShipmeth(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setShipmeth(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            options={Cus_Shipmeth}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4> No data available </h4>}

        <input name="sm" type={"hidden"} value={shipmeth} />
      </div>
    </>
  );
}
export default Shipmeth;
