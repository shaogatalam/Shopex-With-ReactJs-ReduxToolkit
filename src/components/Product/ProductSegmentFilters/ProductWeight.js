import React from "react";

function ProductWeight({onChange}) {
  return (
    <div className="input-filters">
      <strong> Product Weight </strong>
      <input type="number" name="weight_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="weight_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductWeight;
