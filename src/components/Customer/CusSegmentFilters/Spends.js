import React, { useState } from "react";
import Select from "react-select";

function Spends({onChange}) {
  var [spend_bellow, setspend_bellow] = useState(true);
  var [spend_above, setspend_above] = useState(false);
  var [spend_between, setspend_between] = useState(false);

  var handleChange = (e) => {
    setspend_between(false);
    setspend_above(false);
    setspend_bellow(false);

    if (e === "spend_between") setspend_between(true);
    if (e === "spend_above") setspend_above(true);
    if (e === "spend_bellow") setspend_bellow(true);
  };

  const options = [
    { value: "spend_bellow", label: "Less than" },
    { value: "spend_above", label: "More than" },
    { value: "spend_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Spent : </strong>
      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"spend_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />

      {spend_bellow && (
        <input  type="number" id="4" name="order_amount_max"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {spend_above && (
        <input  type="number" id="3" name="order_amount_min"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {spend_between && (
        <div id="spend_betwn" style={{ display: "inline-flex" }}>
          <input type="number" id="1" name="order_amount_minval"  onChange={e => onChange('o_cus_mail', e.target.value)}
          />
          <input type="number" id="2" name="order_amount_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default Spends;
