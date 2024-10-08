import React from "react";

function ProductStock({onChange}) {
  return (
    <div className="input-filters">
      <strong> Product Stock </strong>
      <input type="number" name="stock_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="stock_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductStock;
