import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";

function OrderStatus({onChange}) {

  var [os, setOs]     = useState("");
  var [osop, setOsop] = useState([]);
  var shoptype        = useSelector((state) => state.dashTops.shoptype);
    
  useEffect(() => {
    if (shoptype === "woo") {
      setOsop(["processing", "cancelled", "pending", "completed", "failed"]);
    }
    if (shoptype === "shopify") {
      setOsop(["Authorized", "Paid", "Partially paid", "Partially refunded", "Pending", "Refunded", "Voided"]);
    }
  }, [shoptype]);


  return (
    <div className="input-filters">
      <strong> Order Status :</strong>
      <Multiselect
        isObject={false}
        style={{}}
        placeholder="Select Status"
        onRemove={(e) => {
          setOs(JSON.stringify(e));
          onChange('productList', JSON.stringify(e));
        }}
        onSelect={(e) => {
          setOs(JSON.stringify(e));
          onChange('productList', JSON.stringify(e));
        }}
        options={osop}
        selectedValues={[]}
        showCheckbox
      />
      <input name="o_status_list" type="hidden" value={os} />
    </div>
  );
}
export default OrderStatus;
