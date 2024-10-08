import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function OrderSrc({onChange}) {

  var dispatch      = useDispatch();
  var [src, setsrc] = useState("");
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

  var Cus_src = useSelector((state) => state.CusRetSC);
  var Cus_src = Cus_src?.src ?? null;

  return (
    <div className="input-filters">
      <strong>Order Source :</strong>
      {Cus_src ? (
        <Multiselect
          className="multi"
          isObject={false}
          placeholder="Order source"
          onRemove={(e) => {
            setsrc(JSON.stringify(e));
            onChange('productList', JSON.stringify(e));
          }}
          onSelect={(e) => {
            setsrc(JSON.stringify(e));
            onChange('productList', JSON.stringify(e));
          }}
          options={Cus_src}
          selectedValues={[]}
          showCheckbox
        />
      ): <h4>No order-source data available</h4>
      }
      <input name="src" type="hidden" value={src} />
    </div>
  );
}
export default OrderSrc;
