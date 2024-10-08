import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";

function ProductOnSale({onChange}) {
  var [onsale, setOS] = useState(0);

  return (
    <div className="input-filters">
      <strong> Product On-sale </strong>
      <RadioGroup
        style={{ display: "inline-block" }}
        onChange={(e) => {
          setOS(e.target.value);
        }}
      >
        <Radio value="1" name="onsale" /> Yes
        <Radio value="0" name="onsale" /> No
      </RadioGroup>
      <input type="hidden" name="os" value={onsale} onChange={e => onChange('o_cus_mail', e.target.value)}/>
    </div>
  );
}

export default ProductOnSale;
