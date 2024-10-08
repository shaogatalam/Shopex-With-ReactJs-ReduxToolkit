import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Shipping_City_({onChange}) {

  var dispatch          = useDispatch();
  var [scity, setscity] = useState("");

  var accountType       = useSelector((state) => state.dashTops.accountType);
  
  useEffect(() => {

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

    <div className="input-filters" style={{ display: "block" }}>
    
      {Cus_scity && (<Multiselect
        isObject={false}
        placeholder="Shipping-City"
        onRemove={(e) => {
          setscity(JSON.stringify(e));
          onChange('cou', JSON.stringify(e));
        }}
        onSelect={(e) => {
          setscity(JSON.stringify(e));
          onChange('cou', JSON.stringify(e));
        }}
        options={Cus_scity}
        selectedValues={[]}
        showCheckbox
      />)}

      <input name="scitylist" type="hidden"  value={scity} />

    </div>

  );

}

export default Shipping_City_;
