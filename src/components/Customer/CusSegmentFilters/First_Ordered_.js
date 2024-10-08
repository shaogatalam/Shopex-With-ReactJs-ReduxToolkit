import React, { useState } from "react";
import Select from "react-select";
import { Radio, RadioGroup } from "rsuite";

function First_Ordered_({onChange}) {
  var [first_order_before, setfirst_order_before] = useState(true);
  var [first_order_after, setfirst_order_after] = useState(false);
  var [first_order_between, setfirst_order_between] = useState(false);

  var handleChange = (e) => {
    setfirst_order_between(false);
    setfirst_order_after(false);
    setfirst_order_before(false);

    if (e === "first_order_between") setfirst_order_between(true);
    if (e === "first_order_before") setfirst_order_before(true);
    if (e === "first_order_after") setfirst_order_after(true);
  };

  const options = [
    { value: "first_order_before", label: "Over" },
    { value: "first_order_after", label: "In the past" },
    { value: "first_order_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> First Purchase : </strong>

      <Select
        className="multi"
        placeholder="In the past"
        defaultValue={"first_order_after"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />
      {first_order_after && (
        <>
          <input type="number" id="fod_af" name="fod_itp"  onChange={e => onChange('o_cus_mail', e.target.value)} />

          <RadioGroup>
            <label>
              day <Radio type="radio" name="foitp_unit" value="foitp_day" />
            </label>
            <label>
              month <Radio type="radio" name="foitp_unit" value="foitp_month" />
            </label>
            <label>
              year <Radio type="radio" name="foitp_unit" value="foitp_year" />
            </label>
          </RadioGroup>
        </>
      )}

      {first_order_before && (
        <>
          <input type="number" id="fod_bif" name="fod_over"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          <RadioGroup>
            <label>
              day <Radio type="radio" name="foo_unit" value="foo_day" />
            </label>
            <label>
              month <Radio type="radio" name="foo_unit" value="foo_month" />
            </label>
            <label>
              year <Radio type="radio" name="foo_unit" value="foo_year" />
            </label>
          </RadioGroup>
          <strong>Ago</strong>
        </>
      )}

      {first_order_between && (
        <>
          <input type="number" id="fod_bitf" name="fod_from"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          To
          <input type="number" id="fod_bitt" name="fod_to" style={{ marginLeft: "1rem" }} />
          <RadioGroup>
            <label>
              day <Radio type="radio" name="fob_unit" value="fob_day" />
            </label>
            <label>
              month <Radio type="radio" name="fob_unit" value="fob_month" />
            </label>
            <label>
              year <Radio type="radio" name="fob_unit" value="fob_year" />
            </label>
          </RadioGroup>
          <strong>Ago</strong>
        </>
      )}
    </div>
  );
}

export default First_Ordered_;
