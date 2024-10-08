import React from "react";

function ProductWidth({onChange}) {
  return (
    <div className="input-filters">
      <strong> Product Width </strong>
      <input type="number" name="width_f" placeholder="Min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      <input type="number" name="width_t" placeholder="Max" onChange={e => onChange('o_cus_mail', e.target.value)}
      
      />
    </div>
  );
}

export default ProductWidth;
