import React from "react";

function ProductCurrentPrice({onChange}) {
  return (
    <div className="input-filters">
      <strong>Current Price : </strong>
      <input type="number" name="price_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="price_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductCurrentPrice;
