import React, { useState } from "react";
import Select from "react-select";

function Coupon_Use_({onChange}) {
  var [coupon_bellow, setcoupon_bellow] = useState(true);
  var [coupon_above, setcoupon_above] = useState(false);
  var [coupon_between, setcoupon_between] = useState(false);

  var handleChange = (e) => {
    setcoupon_between(false);
    setcoupon_above(false);
    setcoupon_bellow(false);

    if (e === "coupon_between") setcoupon_between(true);
    if (e === "coupon_above") setcoupon_above(true);
    if (e === "coupon_bellow") setcoupon_bellow(true);
  };

  const options = [
    { value: "coupon_bellow", label: "Less than" },
    { value: "coupon_above", label: "More than" },
    { value: "coupon_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong>Coupon Used : </strong>
      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"coupon_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />

      {coupon_bellow && (
        <input  type="number" id="coupon_b" name="coupon_max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {coupon_above && (
        <input  type="number" id="coupon_a" name="coupon_min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {coupon_between && (
        <div id="coupon_betwn" style={{ display: "inline-flex" }}>
          <input   type="number" id="coupon_min"  name="coupon_minval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input   type="number" id="coupon_max"  name="coupon_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </div>
      )}
    </div>
  );
}

export default Coupon_Use_;
