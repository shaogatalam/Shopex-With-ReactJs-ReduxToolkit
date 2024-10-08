import React, { useState } from "react";
import Select from "react-select";
import { Radio, RadioGroup } from "rsuite";

function Joined_({onChange}) {
  var [r_before, setr_before] = useState(true);
  var [r_after, setr_after] = useState(false);
  var [r_between, setr_between] = useState(false);

  var handleChange = (e) => {
    setr_between(false);
    setr_after(false);
    setr_before(false);

    if (e === "r_between") setr_between(true);
    if (e === "r_before") setr_before(true);
    if (e === "r_after") setr_after(true);
  };

  const options = [
    { value: "r_before", label: "Over" },
    { value: "r_after", label: "In the past" },
    { value: "r_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Registered : </strong>

      <Select className="multi" placeholder="In the past" defaultValue={"r_after"}
        onChange={(e) => { handleChange(e.value);  }} options={options}
      />

      {r_after && (
        <>
          <input type="number" name="ritp"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          <RadioGroup>
            <label> Day <Radio type="radio" name="ritpunit" value="ritpday" /> </label>
            <label> Month <Radio type="radio" name="ritpunit" value="ritpmonth" /> </label>
            <label> Year <Radio type="radio" name="ritpunit" value="ritpyear" /> </label>
          </RadioGroup>
        </>
      )}

      {r_between && (
        <>
          <input type="number" id="rdf" name="rbf"  onChange={e => onChange('o_cus_mail', e.target.value)}/> To
          <input  type="number"  id="rdt"  name="rbt"  style={{ marginLeft: "1rem" }} />
          <RadioGroup>
            <label> Day <Radio type="radio" name="rbunit" value="rbday" />  </label>
            <label> Month <Radio type="radio" name="rbunit" value="rbmonth" /> </label>
            <label>  Year <Radio type="radio" name="rbunit" value="rbyear" /> </label>
          </RadioGroup>
          <strong>Ago</strong>
        </>
      )}

      {r_before && (
        <>
          <input type="number" name="ro"  onChange={e => onChange('o_cus_mail', e.target.value)} />
          <RadioGroup>
            <label> day <Radio type="radio" name="rounit" value="roday" /> </label>
            <label> month <Radio type="radio" name="rounit" value="romonth" /> </label>
            <label> year <Radio type="radio" name="rounit" value="royear" /> </label>
          </RadioGroup>
          <strong>Ago</strong>
        </>
      )}
    </div>
  );
}

export default Joined_;
