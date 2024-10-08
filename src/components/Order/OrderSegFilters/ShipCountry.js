import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function ShipCity({onChange}) {
  
  var dispatch                = useDispatch();
  var [scountry, setScountry] = useState("");
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

  //var Cus_country = useSelector((state) => state.CusRetSC.scountry);
  var Cus_country = useSelector((state) => state.CusRetSC);
  var Cus_country = Cus_country?.scountry ?? null;

  return (
    
    <>
    
    <div className="input-filters">
    
    <strong>Shipping country : </strong>
        {Cus_country ? (
          <Multiselect
            isObject={false}
            placeholder="Shipping-Country"
            onRemove={(e) => {
              setScountry(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setScountry(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            options={Cus_country}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4> No data available </h4> }
      </div>

      <input name="os_country_list" style={{ display: "none" }} defaultValue={scountry}/>

    </>

  );

}
export default ShipCity;
