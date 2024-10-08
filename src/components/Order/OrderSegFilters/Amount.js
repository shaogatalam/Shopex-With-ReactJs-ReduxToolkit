import React, { useState } from "react";
import Select from "react-select";

function Amount({onChange}) {
  var [amount_bellow, setamount_bellow] = useState(true);
  var [amount_above, setamount_above] = useState(false);
  var [amount_between, setamount_between] = useState(false);

  var handleChange = (e) => {
    setamount_between(false);
    setamount_above(false);
    setamount_bellow(false);

    if (e === "amount_between") setamount_between(true);
    if (e === "amount_above") setamount_above(true);
    if (e === "amount_bellow") setamount_bellow(true);
  };

  const options = [
    { value: "amount_bellow", label: "Less than" },
    { value: "amount_above", label: "More than" },
    { value: "amount_between", label: "In-Between" },
  ];

  return (

    <div className="input-filters">
    
      <strong> Amount : </strong>

      <Select className="multi"  placeholder="Less than"  defaultValue={"amount_bellow"}
        onChange={(e) => { handleChange(e.value);  }}  options={options} />
      
      {amount_bellow && (
        <input style={{ marginTop: "7px" }} defaultValue="0" type="number" id="4" name="order_amount_max"  
        onChange={e => onChange('o_cus_mail', e.target.value)}
        />
      )}
      
      {amount_above && (
        <input style={{ marginTop: "7px" }} defaultValue="0" type="number" id="3"  name="order_amount_min" 
        onChange={e => onChange('o_cus_mail', e.target.value)}
        />
      )}
      
      {amount_between && (
        <div id="amount_betwn" style={{ display: "inline-flex" }}>
          <input style={{ marginTop: "7px" }} defaultValue="0" type="number" id="1" name="order_amount_minval" 
            onChange={e => onChange('o_cus_mail', e.target.value)}
          />
          <input style={{ marginTop: "7px" }} defaultValue="0" type="number" id="2" name="order_amount_maxval" 
            onChange={e => onChange('o_cus_mail', e.target.value)}
          />
        </div>
      )}

    </div>

  );

}

export default Amount;
