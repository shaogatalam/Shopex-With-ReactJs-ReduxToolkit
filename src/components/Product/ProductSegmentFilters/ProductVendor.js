import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";
import { useState } from "react";
//import { Input } from "@mantine/core";
import { get_shopify_product_and_sku_and_type } from "../../../features/product/ProductListAndSegment";


function ProductVendor({onChange}) {
  
    var dispatch              = useDispatch();
    var [vendors, setvendors] = useState("");
    var shoptype      = useSelector((state) => state.dashTops.shoptype);
    var accountType   = useSelector((state) => state.dashTops.accountType);

    
    useEffect(() => {
      
      // if(shoptype==="shopify" && accountType==="paid"){
      //   if (!ReactSession.get("get_shopify_product_and_sku_and_type")) {
      //     ReactSession.set("get_shopify_product_and_sku_and_type", "1");
      //     dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
      //   }
      // }

      if (shoptype === "shopify" && accountType === "paid") {
        if (!sessionStorage.getItem("get_shopify_product_and_sku_and_type")) {
          sessionStorage.setItem("get_shopify_product_and_sku_and_type", "1");
          dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
        }
      }

    }, []);
  
  
    var product_List_And_Segments = useSelector((state) => state.product_List_And_Segments);
    var vendors_ = product_List_And_Segments?.shopify_product_vendor ?? {};
  
  
    return (
  
      <>
        <div className="input-filters" style={{ display: "block" }}>

          {vendors_ && vendors_.length > 0 ? (
            <Multiselect
              isObject={false}
              placeholder="Product vendor"
              onRemove={(e) => {setvendors(JSON.stringify(e));onChange('o_cus_mail', e.target.value)}}
              onSelect={(e) => {setvendors(JSON.stringify(e));onChange('o_cus_mail', e.target.value)}}
              options={vendors_}
              selectedValues={[]}
              showCheckbox
            />
          ) : (
            <p>No vendor-data available.</p>
          )}

          <input name="vendor" type={"hidden"} value={vendors} />

        </div>

      </>
    );
}

export default ProductVendor