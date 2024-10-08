import React, { useState } from "react";
import Select from "react-select";

function Order_Count_({onChange}) {
  var [order_bellow, setorder_bellow] = useState(true);
  var [order_above, setorder_above] = useState(false);
  var [order_between, setorder_between] = useState(false);

  var handleChange = (e) => {
    setorder_between(false);
    setorder_above(false);
    setorder_bellow(false);

    if (e === "order_between") setorder_between(true);
    if (e === "order_above") setorder_above(true);
    if (e === "order_bellow") setorder_bellow(true);
  };

  const options = [
    { value: "order_bellow", label: "Less than" },
    { value: "order_above", label: "More than" },
    { value: "order_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Total Order : </strong>

      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"order_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />
      
      {order_bellow && (
        <input  type="number" id="8" name="maximum_num_order"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}
      
      {order_above && (
        <input  type="number" id="7" name="minimum_num_order"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}
      
      {order_between && (
        <>
          <input  type="number" id="5" name="order_num_minval"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input  type="number" id="6" name="order_num_maxval"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </>
      )}
    </div>
  );
}

export default Order_Count_;
