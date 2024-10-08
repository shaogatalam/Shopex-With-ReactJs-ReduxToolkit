import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";
function Billing_City_({onChange}) {

  var dispatch          = useDispatch();
  var [bcity, setbcity] = useState("");
  var accountType       = useSelector((state) => state.dashTops.accountType);
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

  
  //var Cus_bcity = useSelector((state) => state.CusRetSC.bcity);
  var Cus_bcity = useSelector((state) => state.CusRetSC);
  var Cus_bcity = Cus_bcity?.bcity ?? null;

  return (
    
    <div className="input-filters" style={{ display: "block" }}>
    
      {Cus_bcity && 
        <>
          <Multiselect
            isObject={false}
            placeholder="Billing-City"
            onRemove={(e) => {
              setbcity(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setbcity(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            options={Cus_bcity}
            selectedValues={[]}
            showCheckbox
          />
        </>
      }
    
      <Input name="bcitylist" type={"hidden"} value={bcity} />
    
    </div>
  
  );

}
export default Billing_City_;
