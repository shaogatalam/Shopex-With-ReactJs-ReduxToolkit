import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
//import { Input } from "@mantine/core";
import { get_shopify_product_and_sku_and_type } from "../../../features/product/ProductListAndSegment";

function ProductTypeShopify({onChange}) {
  
    var dispatch          = useDispatch();
    var [ptype, setPtype] = useState("");
    var shoptype          = useSelector((state) => state.dashTops.shoptype);
    var accountType       = useSelector((state) => state.dashTops.accountType);
  
    useEffect(() => {
     
      // if(shoptype==="shopify" && accountType ==="paid"){
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
    var types = product_List_And_Segments?.shopify_product_type ?? {};
  
  
    return (
  
      <>
        <div className="input-filters" style={{ display: "block" }}>

          {types && types.length > 0 ? (
            <Multiselect
              isObject={false}
              placeholder="Product Type"
              onRemove={(e) => {setPtype(JSON.stringify(e));onChange('o_cus_mail', e.target.value)}}
              onSelect={(e) => {setPtype(JSON.stringify(e));onChange('o_cus_mail', e.target.value)}}
              options={types}
              selectedValues={[]}
              showCheckbox
            />
          ) : (
            <p>No product-type-data available.</p>
          )}

          <input name="type" type={"hidden"} value={ptype}/>

        </div>

      </>
    );
}

export default ProductTypeShopify