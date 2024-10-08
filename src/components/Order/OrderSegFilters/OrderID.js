import React from "react";

function OrderID({onChange}) {
  return (
    <div className="input-filters">
      <strong> Order-ID :</strong>
      <input className="multi" type="text" name="o_id" 
        onChange={e => onChange('o_cus_mail', e.target.value)}
      />
    </div>
  );
}

export default OrderID;
