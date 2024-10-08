import React from "react";

function TransecID({onChange}) {
  return (
    <div className="input-filters">
      <strong> Transection-ID :</strong>
      <input className="multi" defaultValue="" type="text" name="transid" 
      onChange={e => onChange('o_cus_mail', "")}   
      />
    </div>
  );
}

export default TransecID;
