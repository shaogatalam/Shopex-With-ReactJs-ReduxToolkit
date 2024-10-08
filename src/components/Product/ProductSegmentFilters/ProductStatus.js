import React from 'react'
import { useState } from "react";
//import { Input } from "@mantine/core";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";

function ProductStatus({onChange}) {

    var [status, setStatus] = useState("");
    var shoptype = useSelector((state) => state.dashTops.shoptype);
    var status_ = ["active","archived","draft"];
  
    return (
      
      <div className="input-filters" style={{ display: "block" }}>
  
        {status_ && status_.length > 0 ? (
          <Multiselect
            isObject={false}
            placeholder="Product status"
            onRemove={(e) => {setStatus(JSON.stringify(e)); onChange('o_cus_mail', e.target.value)}}
            onSelect={(e) => {setStatus(JSON.stringify(e)); onChange('o_cus_mail', e.target.value)}}
            options={status_}
            selectedValues={[]}
            showCheckbox
          />
        ) : (
          <p> No product-status data available </p>
        )}
  
        <input name="status" type={"hidden"} value={status} />
  
      </div>
  
    );
}

export default ProductStatus