import React, { useState } from "react";
import Select from "react-select";

function ProductUnit({onChange}) {
  var [ProductUnit_bellow, setProductUnit_bellow] = useState(true);
  var [ProductUnit_above, setProductUnit_above] = useState(false);
  var [ProductUnit_between, setProductUnit_between] = useState(false);

  var handleChange = (e) => {
    setProductUnit_between(false);
    setProductUnit_above(false);
    setProductUnit_bellow(false);

    if (e === "ProductUnit_between") setProductUnit_between(true);
    if (e === "ProductUnit_above") setProductUnit_above(true);
    if (e === "ProductUnit_bellow") setProductUnit_bellow(true);
  };

  const options = [
    { value: "ProductUnit_bellow", label: "Less than" },
    { value: "ProductUnit_above", label: "More than" },
    { value: "ProductUnit_between", label: "In-Between" },
  ];

  return (
    
    <div className="input-filters">
      
      <strong> Product Unit : </strong>
      
      <Select className="multi" placeholder="Less than"  defaultValue={"ProductUnit_bellow"}
        onChange={(e) => {  handleChange(e.value); }} options={options} />

      {ProductUnit_bellow && (
        <input defaultValue="0" type="number" id="4" name="order_unit_max" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}
      
      {ProductUnit_above && (
        <input defaultValue="0" type="number" id="3" name="order_unit_min" onChange={e => onChange('o_cus_mail', e.target.value)}/>
      )}

      {ProductUnit_between && (
      
        <div id="ProductUnit_betwn">
          <input defaultValue="0" type="number"  id="1"  name="order_unit_minval" onChange={e => onChange('o_cus_mail', e.target.value)} />
          <input defaultValue="0" type="number" id="2" name="order_unit_maxval" onChange={e => onChange('o_cus_mail', e.target.value)} />
        </div>
      
      )}

    </div>

  );
  
}

export default ProductUnit;

// '<div id="nth_order_unit_bellow_div"  style="display:none;" >' +
// '<input form = "order_filter" type="number" id="110" name="nth_order_max" value="" style="width:122px;" />' +
// '<button onclick="nth_remove_ounit()" class="btn"><i class="fa fa-close"></i></button>' +
// '</div>' +

// '<div id="nth_order_unit_above_div" style="display:none;">' +
// '<input form = "order_filter" type="number" id="109" name="nth_order_min" value="" style="width:122px;" />' +
// '<button onclick="nth_remove_ounit()" class="btn"><i class="fa fa-close"></i></button>' +
// '</div>' +

// '<div id="nth_order_unit_between_div" style="display:inline-grid">' +
// '<input form = "order_filter" type="number" id="108" name="nth_order_minval" value="" style="width:122px;" />' +  ' to ' +
// '<input form = "order_filter" type="number" id="107" name="nth_order_maxval" value="" style="width:122px;" />'  +
// '<button onclick="nth_remove_ounit()" class="btn"><i class="fa fa-close"></i></button>' +

// '</div>';
