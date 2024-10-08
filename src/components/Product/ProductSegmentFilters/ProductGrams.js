import React from "react";

function ProductGrams({onChange}) {
  return (
    <div className="input-filters">
      <strong> Product in Gram </strong>
      <input type="number" name="gram_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="gram_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductGrams;
