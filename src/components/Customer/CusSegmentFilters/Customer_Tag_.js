import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";
function Customer_Tag_({onChange}) {
  
  var dispatch      = useDispatch();
  var [tag, settag] = useState("");

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

  //var Cus_tag = useSelector((state) => state.CusRetSC.tag);

  var Cus_tag = useSelector((state) => state.CusRetSC);
  var Cus_tag = Cus_tag?.tag ?? null;

  return (

    <div className="input-filters" style={{ display: "block" }}>
      
      {Cus_tag && (<Multiselect
        isObject={false}
        placeholder="Customer tag"
        onRemove={(e) => {
          settag(JSON.stringify(e));
          onChange('cou', JSON.stringify(e));
        }}
        onSelect={(e) => {
          settag(JSON.stringify(e));
          onChange('cou', JSON.stringify(e));
        }}
        options={Cus_tag}
        selectedValues={[]}
        showCheckbox
      />)}
      
      <input name="cus_tag" type="hidden" value={tag} />
     

    </div>

  );

}

export default Customer_Tag_;
