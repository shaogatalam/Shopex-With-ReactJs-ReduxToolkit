import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function Paymeth({onChange}) {

  var dispatch              = useDispatch();
  var [paymeth, setPaymeth] = useState("");
  var accountType           = useSelector((state) => state.dashTops.accountType);

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

  //var Cus_paymeth = useSelector((state) => state.CusRetSC.paymeth);
  var Cus_paymeth = useSelector((state) => state.CusRetSC);
  var Cus_paymeth = Cus_paymeth?.paymeth ?? null;


  return (
    <>
      <div className="input-filters">
        <strong>Order Source :</strong>
        {Cus_paymeth ? (
          <Multiselect
            isObject={false}
            placeholder="Paymeth-Method"
            onRemove={(e) => {
              setPaymeth(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            onSelect={(e) => {
              setPaymeth(JSON.stringify(e));
              onChange('productList', JSON.stringify(e));
            }}
            options={Cus_paymeth}
            selectedValues={[]}
            showCheckbox
          />
        ):<h4>No payment method data available</h4>}
      </div>

      <input name="pm" type={"hidden"} value={paymeth} />
    </>
  );
}
export default Paymeth;
