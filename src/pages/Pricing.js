import React from "react";
import PricingCreate from "../components/Pricing/PricingCreate";
import PricingCreatedList from "../components/Pricing/PricingCreatedList";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

function Pricing() {
  var [div, setDiv] = useState("create");

  return (
    <>
      <RadioGroup
        style={{ display: "inline-block" }}
        onChange={(e) => {
          setDiv(e.target.value);
        }}
      >
        <Radio checked={div === "create"} value="create" name="div" /> Create
        New Rule
        <Radio checked={div === "created"} value="created" name="div" />{" "}
        Available Rule
      </RadioGroup>

      {div === "create" && <PricingCreate />}
      {div === "created" && <PricingCreatedList />}
    </>
  );
}

export default Pricing;
