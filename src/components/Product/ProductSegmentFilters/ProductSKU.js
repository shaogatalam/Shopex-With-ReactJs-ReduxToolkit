import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { get_shopify_product_and_sku_and_type } from "../../../features/product/ProductListAndSegment";

function ProductSKU({onChange}) {
  
  var dispatch      = useDispatch();
  var [sku, setSku] = useState("");
  var shoptype      = useSelector((state) => state.dashTops.shoptype);
  var accountType   = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    // if(accountType ==="paid"){
    //   if(shoptype==="woo"){
    //     if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //       ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //       dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //     }
    //   }

    //   if(shoptype==="shopify"){
    //     if (!ReactSession.get("get_shopify_product_and_sku_and_type")) {
    //       ReactSession.set("get_shopify_product_and_sku_and_type", "1");
    //       dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
    //     }
    //   }
    // }

    if (accountType === "paid") {
      if (shoptype === "woo") {
        if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
          sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
          dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
        }
      }
    
      if (shoptype === "shopify") {
        if (!sessionStorage.getItem("get_shopify_product_and_sku_and_type")) {
          sessionStorage.setItem("get_shopify_product_and_sku_and_type", "1");
          dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
        }
      }
    }

  }, []);

  var product_List_And_Segments = useSelector((state) => state.product_List_And_Segments);
  if(shoptype === "woo"){
    var skus = product_List_And_Segments?.product_sku ?? {};
  } 
  if(shoptype==="shopify"){
    var skus = product_List_And_Segments?.shopify_sku ?? {};
  }

  return (
    
    <div className="input-filters" style={{ display: "block" }}>
      <strong> Product SKU </strong>
      {/* <Multiselect
        placeholder="Select-SKU"
        onRemove={(e) => {setSku(JSON.stringify(e));}}
        onSelect={(e) => {setSku(JSON.stringify(e));}}
        options={skus}
        selectedValues={[]}
        showCheckbox
      /> */}

      {skus && skus.length > 0 ? (
        <Multiselect
          isObject={false}
          placeholder="Product SKU"
          onRemove={(e) => {setSku(JSON.stringify(e));onChange('o_cus_mail', e.target.value)}}
          onSelect={(e) => {setSku(JSON.stringify(e));onChange('o_cus_mail', e.target.value)}}
          options={skus}
          selectedValues={[]}
          showCheckbox
        />
      ) : (
        <p style={{color:"red"}}> No SKU-data available </p>
      )}

      <input name="sku" type={"hidden"} value={sku} />

    </div>

  );

}

export default ProductSKU;
