import React from "react";

function ProductHeight({onChange}) {
  return (
    <div className="input-filters">
      <strong> Product height : </strong>
      <input type="number" name="height_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="height_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductHeight;
