import React, { useState } from "react";
import Select from "react-select";

function ProductCount({onChange}) {
  var [ProductCount_bellow, setProductCount_bellow] = useState(true);
  var [ProductCount_above, setProductCount_above] = useState(false);
  var [ProductCount_between, setProductCount_between] = useState(false);

  var handleChange = (e) => {
    setProductCount_between(false);
    setProductCount_above(false);
    setProductCount_bellow(false);

    if (e === "ProductCount_between") setProductCount_between(true);
    if (e === "ProductCount_above") setProductCount_above(true);
    if (e === "ProductCount_bellow") setProductCount_bellow(true);
  };

  const options = [
    { value: "ProductCount_bellow", label: "Less than" },
    { value: "ProductCount_above", label: "More than" },
    { value: "ProductCount_between", label: "In-Between" },
  ];

  return (
    <div className="input-filters">
      <strong> Product Count : </strong>

      <Select className="multi"placeholder="Less than"defaultValue={"ProductCount_bellow"} onChange={(e) => {handleChange(e.value);}}options={options}/>
      
      {ProductCount_bellow && (
        <input defaultValue="0" type="number" id="4" name="order_prod_max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {ProductCount_above && (
        <input defaultValue="0" type="number" id="3" name="order_prod_min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {ProductCount_between && (
        <div id="ProductCount_betwn">
          <input defaultValue="0" type="number" id="1" name="order_prod_minval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
          <input defaultValue="0" type="number" id="2" name="order_prod_maxval" onChange={e => onChange('o_cus_mail', e.target.value)}/>
        </div>
      )}

    </div>

  );

}

export default ProductCount;
