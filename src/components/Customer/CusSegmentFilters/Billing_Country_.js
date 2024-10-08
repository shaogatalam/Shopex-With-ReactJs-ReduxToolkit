import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Billing_Country_({onChange}) {

  var dispatch                = useDispatch();
  var [bcountry, setbcountry] = useState("");
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

  //var Cus_bcountry = useSelector((state) => state.CusRetSC.bcountry);
  var Cus_bcountry = useSelector((state) => state.CusRetSC);
  var Cus_bcountry = Cus_bcountry?.bcountry ?? null;

  return (

    <div className="input-filters" style={{ display: "block" }}>
     
      {Cus_bcountry && 
      
        <>

          <Multiselect
            isObject={false}
            placeholder="Billing-Country"
            onRemove={(e) => {
              setbcountry(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setbcountry(JSON.stringify(e));
              onChange('cou', JSON.stringify(e));
            }}
            options={Cus_bcountry}
            selectedValues={[]}
            showCheckbox
          />
          <Input name="bcountrylist" type={"hidden"} value={bcountry} />
        </>
      
      }

    </div>
  );

}

export default Billing_Country_;
