import React, { useState } from "react";
import Select from "react-select";

function OrderDiscount({onChange}) {
  var [OrderDiscount_bellow, setOrderDiscount_bellow] = useState(true);
  var [OrderDiscount_above, setOrderDiscount_above] = useState(false);
  var [OrderDiscount_between, setOrderDiscount_between] = useState(false);

  var handleChange = (e) => {
    setOrderDiscount_between(false);
    setOrderDiscount_above(false);
    setOrderDiscount_bellow(false);

    if (e === "OrderDiscount_between") setOrderDiscount_between(true);
    if (e === "OrderDiscount_above") setOrderDiscount_above(true);
    if (e === "OrderDiscount_bellow") setOrderDiscount_bellow(true);
  };

  const options = [
    { value: "OrderDiscount_bellow", label: "Less than" },
    { value: "OrderDiscount_above", label: "More than" },
    { value: "OrderDiscount_between", label: "In-Between" },
  ];

  return (
    
    <div className="input-filters">
    
      <strong> Order-Discount : </strong>
    
      {options && (
    
        <Select
          className="multi"
          placeholder="Less than"
          defaultValue={"OrderDiscount_bellow"}
          onChange={(e) => {
            handleChange(e.value);
          }}
          options={options}
        />
        
      )}
      
      {OrderDiscount_bellow && (<input defaultValue="0" type="number" id="4" name="order_dis_max" onChange={e => onChange('o_cus_mail', e.target.value)}   />)}
      
      {OrderDiscount_above && ( <input defaultValue="0" type="number" id="3" name="order_dis_min" onChange={e => onChange('o_cus_mail', e.target.value)}   />)}
      
      {OrderDiscount_between && (
        <div id="OrderDiscount_betwn">
          <input defaultValue="0" type="number" id="1" name="order_dis_minval" onChange={e => onChange('o_cus_mail', e.target.value)}   />
          <input defaultValue="0" type="number" id="2" name="order_dis_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}   />
        </div>
      )}

    </div>
  
  );

}
export default OrderDiscount;

