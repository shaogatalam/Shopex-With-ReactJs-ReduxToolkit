import React, { useState } from "react";
import Select from "react-select";

function NthOrder({onChange}) {

  var [NthOrder_bellow, setNthOrder_bellow] = useState(true);
  var [NthOrder_above, setNthOrder_above] = useState(false);
  var [NthOrder_between, setNthOrder_between] = useState(false);

  var handleChange = (e) => {
    setNthOrder_between(false);
    setNthOrder_above(false);
    setNthOrder_bellow(false);

    if (e === "NthOrder_between") setNthOrder_between(true);
    if (e === "NthOrder_above") setNthOrder_above(true);
    if (e === "NthOrder_bellow") setNthOrder_bellow(true);
  };

  const options = [
    { value: "NthOrder_bellow", label: "Less than" },
    { value: "NthOrder_above", label: "More than" },
    { value: "NthOrder_between", label: "In-Between" },
  ];

  return (
   
    <div className="input-filters">
    
      <strong> Nth-Order : </strong>
    
      {options && (
        <Select className="multi" placeholder="Less than" defaultValue={"NthOrder_bellow"} onChange={(e) => { handleChange(e.value);}} options={options}/>
      )}

      {NthOrder_bellow && ( <input defaultValue="0" type="number" id="4" name="nth_order_max" onChange={e => onChange('o_cus_mail', e.target.value)}   /> )}

      {NthOrder_above && ( <input defaultValue="0" type="number" id="3" name="nth_order_min" onChange={e => onChange('o_cus_mail', e.target.value)}   /> )}
      
      {NthOrder_between && (
        
        <div id="NthOrder_betwn"> 
          <input defaultValue="0" type="number" id="1" name="nth_order_minval" onChange={e => onChange('o_cus_mail', e.target.value)}   />
          <input defaultValue="0" type="number" id="2" name="nth_order_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}   />
        </div>
      )}

    </div>

  );

}

export default NthOrder;
