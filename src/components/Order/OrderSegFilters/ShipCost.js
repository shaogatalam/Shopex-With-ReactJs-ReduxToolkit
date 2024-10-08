import React, { useState } from "react";
import Select from "react-select";

function ShipCost({onChange}) {
  var [ShipCost_bellow, setShipCost_bellow] = useState(true);
  var [ShipCost_above, setShipCost_above] = useState(false);
  var [ShipCost_between, setShipCost_between] = useState(false);

  var handleChange = (e) => {
    setShipCost_between(false);
    setShipCost_above(false);
    setShipCost_bellow(false);

    if (e === "ShipCost_between") setShipCost_between(true);
    if (e === "ShipCost_above") setShipCost_above(true);
    if (e === "ShipCost_bellow") setShipCost_bellow(true);
  };

  const options = [
    { value: "ShipCost_bellow", label: "Less than" },
    { value: "ShipCost_above", label: "More than" },
    { value: "ShipCost_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Shipping-Cost : </strong>
      <Select
        className="multi"
        placeholder="Less than"
        defaultValue={"ShipCost_bellow"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />

      {ShipCost_bellow && (
        <input defaultValue="0" type="number" id="4"  name="order_shipcost_max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {ShipCost_above && (
        <input  defaultValue="0" type="number" id="3" name="order_shipcost_min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {ShipCost_between && (
        <div id="ShipCost_betwn">
          <input defaultValue="0" type="number" id="1" name="order_shipcost_minval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input defaultValue="0" type="number" id="2" name="order_shipcost_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </div>
      )}
    </div>
  );
}

export default ShipCost;
