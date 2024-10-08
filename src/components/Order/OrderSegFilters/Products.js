import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { get_shopify_product_and_sku_and_type } from "../../../features/product/ProductListAndSegment";


function Products({onChange}) {
  
  var dispatch                      = useDispatch();
  var [product, setProduct]         = useState("");
  var [productname, setProductname] = useState("");
  var shoptype                      = useSelector((state) => state.dashTops.shoptype);
  var accountType                   = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    console.log((onChange));
    // if(accountType==="paid") {

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

  },[]);


  // var product_obj = useSelector((state) => state.product_List_And_Segments.all_product_object);
  // var ops = [];
  // if (product_obj && product_obj.length > 0) {
  //   for (var i of product_obj) {
  //     var label = i.product_name;
  //     var value = i.product_id;
  //     ops.push({ value: value, label: label });
  //   }
  // }

  var product_obj = useSelector((state) => state.product_List_And_Segments);
  var product_obj_ = product_obj?.all_product_object ?? {};
  var ops = [];


  if (product_obj_ && product_obj_.length > 0) {
    for (var i of product_obj_) {
      var label = i.product_name;
      var value = i.product_id;
      if(label && value){ops.push({ value: value, label: label });}
    }
  }

  return (
    <>
       <div className="input-filters">
       <strong>Product : </strong>
        {ops && ops.length > 0 ? (
          <Multiselect
            displayValue="label"
            placeholder="Select-Product"
            onRemove={(e) => {
              var aa = [];
              for (var i of e) {
                aa.push(i.value);
              }
              setProduct(JSON.stringify(aa));

              var aa = [];
              for (var i of e) {
                aa.push(i.label);
              }
              setProductname(JSON.stringify(aa));
              onChange('productList', JSON.stringify(aa));
            }}
            onSelect={(e) => {
              var aa = [];
              for (var i of e) {
                aa.push(i.value);
              }
              setProduct(JSON.stringify(aa));

              var aa = [];
              for (var i of e) {
                aa.push(i.label);
              }
              setProductname(JSON.stringify(aa));
              onChange('productList', JSON.stringify(aa));
            }}
            options={ops}
            selectedValues={[]}
            showCheckbox
          />
        ) : <h4> No product data available </h4>}
      </div>
      <input name="productList" type={"hidden"} value={product}/>
      <input name="productname" type={"hidden"} value={productname} />
    </>
  );
}
export default Products;
