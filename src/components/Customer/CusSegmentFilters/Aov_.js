import React, { useEffect, useState } from "react";
import Select from "react-select";

function Aov_({onChange}) {
  var [aov_bellow, setaov_bellow] = useState(true);
  var [aov_above, setaov_above] = useState(false);
  var [aov_between, setaov_between] = useState(false);

  var handleChange = (e) => {
    setaov_between(false);
    setaov_above(false);
    setaov_bellow(false);

    if (e === "aov_between") setaov_between(true);
    if (e === "aov_above") setaov_above(true);
    if (e === "aov_bellow") setaov_bellow(true);
  };

  const options = [
    { value: "aov_bellow", label: "Less than" },
    { value: "aov_above", label: "More than" },
    { value: "aov_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Avg. Order Value: </strong>
      <Select
        className="multi"
        placeholder="Less Than"
        defaultValue={"aov_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />

      {aov_bellow && (
        <input type="number" id="11" name="aov_bellow" defaultValue="0"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {aov_above && (
        <input type="number" id="12" name="aov_above" defaultValue="0"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {aov_between && (
        <div style={{ display: "inline-flex" }}>
          <input type="number" id="9" name="aov_from" defaultValue="0"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input type="number" id="10" name="aov_to" defaultValue="0"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </div>
      )}
    </div>
  );
}

export default Aov_;
