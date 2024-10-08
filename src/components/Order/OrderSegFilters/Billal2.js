import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Billa2({onChange}) {

  var dispatch      = useDispatch();
  var [ba2, setba1] = useState("");
  var accountType   = useSelector((state) => state.dashTops.accountType);

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

  //var Cus_ba2 = useSelector((state) => state.CusRetSC.ba2);
  var Cus_ba2 = useSelector((state) => state.CusRetSC);
  var Cus_ba2 = Cus_ba2?.ba2 ?? null;

  return (
    
    <>
    
    <div className="input-filters">
    
    <strong>Billing AddressLine 1 : </strong>

    
        {Cus_ba2 ? (
    
        <Multiselect
            isObject={false}
            placeholder=" Billing AddressLine 2"
            onRemove={(e) => {
              setba1(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setba1(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            options={Cus_ba2}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4> No data available </h4>}
      </div>

      <input name="ba2" type={"hidden"} value={ba2} />
    </>
  );
}
export default Billa2;
