import React, { useState } from "react";
import Select from "react-select";

function Total_dis_({onChange}) {
  var [dis_bellow, setdis_bellow] = useState(true);
  var [dis_above, setdis_above] = useState(false);
  var [dis_between, setdis_between] = useState(false);

  var handleChange = (e) => {
    setdis_between(false);
    setdis_above(false);
    setdis_bellow(false);

    if (e === "dis_between") setdis_between(true);
    if (e === "dis_above") setdis_above(true);
    if (e === "dis_bellow") setdis_bellow(true);
  };

  const options = [
    { value: "dis_bellow", label: "Less than" },
    { value: "dis_above", label: "More than" },
    { value: "dis_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Total Discount : </strong>
      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"dis_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />
      {dis_bellow && (
        <input  type="number" id="pa" name="dis_max"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {dis_above && (
        <input  type="number" id="pa" name="dis_min"  onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {dis_between && (
        <div id="dis_betwn">
          <input
            
            type="number"
            id="dismin"
            name="dis_amount_minval"
            onChange={e => onChange('o_cus_mail', e.target.value)}
          />
          to
          <input
            
            type="number"
            id="dismax"
            name="dis_amount_maxval"
            style={{ marginLeft: "1rem" }}
            onChange={e => onChange('o_cus_mail', e.target.value)}
          />
          $
        </div>
      )}
    </div>
  );
}

export default Total_dis_;
