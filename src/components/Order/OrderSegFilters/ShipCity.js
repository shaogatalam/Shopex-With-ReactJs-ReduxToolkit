import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function ShipCity({onChange}) {

  var dispatch          = useDispatch();
  var [scity, setscity] = useState("");

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
  
  //var Cus_scity = useSelector((state) => state.CusRetSC.scity);
  var Cus_scity = useSelector((state) => state.CusRetSC);
  var Cus_scity = Cus_scity?.scity ?? null;

  return (
    
    <>
    
    <div className="input-filters">
    
    <strong>Shipping city : </strong>
      
    
        {Cus_scity ? (
    
          <Multiselect
            isObject={false}
            placeholder="Shipping-City"
            onRemove={(e) => {
              setscity(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setscity(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            options={Cus_scity}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4> No data available </h4> }

        <input name="s" style={{ display: "none" }} defaultValue={scity} />
      
      </div>

    </>

  );

}

export default ShipCity;
