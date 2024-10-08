import React, { useState } from "react";
import Select from "react-select";

function Total_Profit_({onChange}) {
  var [profit_bellow, setprofit_bellow] = useState(true);
  var [profit_above, setprofit_above] = useState(false);
  var [profit_between, setprofit_between] = useState(false);

  var handleChange = (e) => {
    setprofit_between(false);
    setprofit_above(false);
    setprofit_bellow(false);

    if (e === "profit_between") setprofit_between(true);
    if (e === "profit_above") setprofit_above(true);
    if (e === "profit_bellow") setprofit_bellow(true);
  };

  const options = [
    { value: "profit_bellow", label: "Less than" },
    { value: "profit_above", label: "More than" },
    { value: "profit_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Total Profit : </strong>

      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"profit_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />
      {profit_bellow && (
        <input  type="number" id="pa" name="profit_amount_max"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {profit_above && (
        <input  type="number" id="pa" name="profit_amount_min"   onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {profit_between && (
        <div id="profit_betwn" style={{ display: "inline-flex" }}>
          <input placeholder="From" type="number" id="pmin" name="profit_amount_minval"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input  placeholder="To" type="number"  id="pmax" name="profit_amount_maxval"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </div>
      )}
    </div>
  );
}

export default Total_Profit_;
