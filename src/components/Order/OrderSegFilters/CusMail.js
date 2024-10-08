import React from "react";

function CusMail({onChange}) {
  return (
    <div className="input-filters">
      <strong>Customer Email :</strong>
      <input className="multi" type="mail" name="o_cus_mail" 
       onChange={e => onChange('o_cus_mail', e.target.value)}   
      />
    </div>
  );
}

export default CusMail;
