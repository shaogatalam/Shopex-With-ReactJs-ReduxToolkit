import React, { useState } from "react";
import Select from "react-select";
import { Radio, RadioGroup } from "rsuite";

function Last_Ordered_({onChange}) {
  var [last_order_before, setlast_order_before] = useState(true);
  var [last_order_after, setlast_order_after] = useState(false);
  var [last_order_between, setlast_order_between] = useState(false);

  var handleChange = (e) => {
    setlast_order_between(false);
    setlast_order_after(false);
    setlast_order_before(false);

    if (e === "last_order_between") setlast_order_between(true);
    if (e === "last_order_before") setlast_order_before(true);
    if (e === "last_order_after") setlast_order_after(true);
  };

  const options = [
    { value: "last_order_before", label: "Over" },
    { value: "last_order_after", label: "In the past" },
    { value: "last_order_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Last Purchase : </strong>

      <Select
        className="multi"
        placeholder="In the past"
        defaultValue={"last_order_after"}
        onChange={(e) => {
          handleChange(e.value);
        }}
        options={options}
      />

      {last_order_after && (
        <>
          <input type="number" id="lod_af" name="lod_itp"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          <RadioGroup>
            <label>
              day <Radio type="radio" name="loitp_unit" value="loitp_day" />
            </label>
            <label>
              mont <Radio type="radio" name="loitp_unit" value="loitp_month" />
            </label>
            <label>
              year <Radio type="radio" name="loitp_unit" value="loitp_year" />
            </label>
          </RadioGroup>
        </>
      )}

      {last_order_before && (
        <>
          <input type="number" id="lod_bif" name="lod_over"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          <RadioGroup>
            <label>
              day <Radio type="radio" name="loo_unit" value="loo_day" />
            </label>
            <label>
              mont <Radio type="radio" name="loo_unit" value="loo_month" />
            </label>
            <label>
              year <Radio type="radio" name="loo_unit" value="loo_year" />
            </label>
          </RadioGroup>
          <strong>Ago</strong>
        </>
      )}

      {last_order_between && (
        <>
          <input type="number" id="lod_bitf" name="lod_from"  onChange={e => onChange('o_cus_mail', e.target.value)} /> To &nbsp;&nbsp;
          <input type="number" id="lod_bitt" name="lod_to"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          <RadioGroup>
            <label>  Day   <Radio type="radio" name="lob_unit" value="lob_day" />   </label>
            <label>  Month <Radio type="radio" name="lob_unit" value="lob_month" /> </label>
            <label>  Year  <Radio type="radio" name="lob_unit" value="lob_year" />  </label>
          </RadioGroup>
          <strong>Ago</strong>
        </>
      )}
    </div>
  );
}

export default Last_Ordered_;
