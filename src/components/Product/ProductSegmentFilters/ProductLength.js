import React from "react";

function ProductLength({onChange}) {
  return (
    <div className="input-filters">
      <strong>Product length : </strong>
      <input type="number" name="length_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="length_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductLength;
