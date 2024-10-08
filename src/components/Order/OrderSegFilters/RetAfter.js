import React, { useState } from "react";
import Select from "react-select";

function RetAfter({onChange}) {

  var [RetAfter_bellow, setRetAfter_bellow] = useState(true);
  var [RetAfter_above, setRetAfter_above] = useState(false);
  var [RetAfter_between, setRetAfter_between] = useState(false);

  var handleChange = (e) => {
    setRetAfter_between(false);
    setRetAfter_above(false);
    setRetAfter_bellow(false);

    if (e === "RetAfter_between") setRetAfter_between(true);
    if (e === "RetAfter_above") setRetAfter_above(true);
    if (e === "RetAfter_bellow") setRetAfter_bellow(true);
  };

  var options = [
    { value: "RetAfter_bellow", label: "Less than" },
    { value: "RetAfter_above", label: "More than" },
    { value: "RetAfter_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Returned After </strong>
      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"RetAfter_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />
      {RetAfter_bellow && (
        <input defaultValue="0" type="number" name="ret_after_max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}
      {RetAfter_above && (
        <input defaultValue="0" type="number" name="ret_after_min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}
      {RetAfter_between && (
        <div id="RetAfter_betwn">
          <input defaultValue="0" type="number" name="ret_after_minval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input defaultValue="0" type="number" name="ret_after_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </div>
      )}
    </div>
  );
}

export default RetAfter;
