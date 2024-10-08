import React, { useState } from "react";
import Select from "react-select";
import { Radio, RadioGroup } from "rsuite";

function OrderFromNC({onChange}) {
  
  var [Order_between, setOrder_between] = useState(true);
  var [Order_itp, setOrder_itp] = useState(false);
  var [Order_before, setOrder_before] = useState(false);

  var handleChange = (e) => {
    setOrder_between(false);
    setOrder_itp(false);
    setOrder_before(false);

    if (e === "orders_from_between") setOrder_between(true);
    if (e === "orders_from_itp") setOrder_itp(true);
    if (e === "orders_from_over") setOrder_before(true);
  };

  const options = [
    { value: "orders_from_over", label: "Over" },
    { value: "orders_from_itp", label: "Past" },
    { value: "orders_from_between", label: "In-Between" },
  ];

  return (

    <div className="input-filters">
      
      <strong> Order Created : </strong>
      
      <Select className="multi" placeholder="Past" defaultValue={"orders_from_itp"} onChange={(e) => { handleChange(e.value); }}options={options}/>
      
      {Order_between && (
        <>
          <input type="number" name="lod_from" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input type="number" name="lod_to" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <RadioGroup>
            <Radio type="radio" name="lob_unit" value="lob_day" /> D
            <Radio type="radio" name="lob_unit" value="lob_month" /> M
            <Radio type="radio" name="lob_unit" value="lob_year" /> Y
          </RadioGroup>{" "}
          <span style={{ paddingLeft: "1rem" }}>Ago</span>
        </>
      )}
      {Order_itp && (
        <>
          <input type="number" name="lod_itp" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <RadioGroup>
            <Radio type="radio" name="loitp_unit" value="loitp_day" />D
            <Radio type="radio" name="loitp_unit" value="loitp_month" />M
            <Radio type="radio" name="loitp_unit" value="loitp_year" />Y
          </RadioGroup>
        </>
      )}
      {Order_before && (
        <>
          <input type="number" name="lod_over" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <RadioGroup>
            <Radio type="radio" name="loo_unit" value="loo_day" />D
            <Radio type="radio" name="loo_unit" value="loo_month" />M
            <Radio type="radio" name="loo_unit" value="loo_year" />Y
          </RadioGroup>
        </>
      )}
    </div>
  );
}

export default OrderFromNC;
