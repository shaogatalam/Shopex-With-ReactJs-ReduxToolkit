import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Shipping_Country_({onChange}) {

  var dispatch                  = useDispatch();
  const [scountry, setscountry] = useState("");
  var accountType               = useSelector((state) => state.dashTops.accountType);
  
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

  //var Cus_scountry = useSelector((state) => state.CusRetSC.scountry);

  var Cus_scountry = useSelector((state) => state.CusRetSC);
  var Cus_scountry = Cus_scountry?.scountry ?? null;


  return (

    <div className="input-filters" style={{ display: "block" }}>
      
      {Cus_scountry && 
      
        <Multiselect
        
          isObject={false}
          
          placeholder="Shipping-Country"
          
          onRemove={(e) => { setscountry(JSON.stringify(e));onChange('cou', JSON.stringify(e));  }}
          
          onSelect={(e) => { setscountry(JSON.stringify(e));onChange('cou', JSON.stringify(e)); }}
          
          options={Cus_scountry}
          
          selectedValues={[]}
          
          showCheckbox
        
        />

      }

      <input type="hidden" name="bcountrylist" value={scountry}/>

    </div>

  );

}
export default Shipping_Country_;
