import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function ShipPostCode({onChange}) {
  
  var dispatch = useDispatch();
  var [shippostcode, setshippostcode] = useState("");
  var accountType                     = useSelector((state) => state.dashTops.accountType);
  
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
  
  // var shippostcode_ = useSelector((state) => state.CusRetSC.shippostcode);
  // if (!(shippostcode_ && shippostcode_.length > 0)) {
  //   shippostcode_ = [];
  // }
  
  var shippostcode_ = useSelector((state) => state.CusRetSC);
  var shippostcode_ = shippostcode_?.shippostcode ?? null;

  return (
    <div className="input-filters">
      <strong> shiping post code : </strong>
      {shippostcode_ ? (
        <Multiselect
          className="multi"
          isObject={false}
          placeholder="Shipping PostCode"
          onRemove={(e) => {
            setshippostcode(JSON.stringify(e));
            onChange('productList', JSON.stringify(e));
          }}
          onSelect={(e) => {
            setshippostcode(JSON.stringify(e));
            onChange('productList', JSON.stringify(e));
          }}
          options={shippostcode_}
          selectedValues={[]}
          showCheckbox
        />
      ) : <h4> No data available </h4> }
      <input name="spc" type="hidden" value={shippostcode} />
    </div>
  );
}
export default ShipPostCode;
