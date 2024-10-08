import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";
import { get_shopify_product_and_sku_and_type } from "../../../features/product/ProductListAndSegment";

function Products({ data,onChange }) {

  var [GiftOnProduct, setGiftOnProduct] = useState([]);
  var dispatch                      = useDispatch();
  var [product, setProduct]         = useState("");
  var [productname, setProductname] = useState("");
  var shoptype                      = useSelector((state) => state.dashTops.shoptype);
  var accountType                   = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {
    if (data && data.length > 0) {
      setGiftOnProduct(data);
    }
    console.log(GiftOnProduct);
    var aa = [];
    if (data && data.length > 0) {
      for (var i of data) {
        aa.push(i.value);
      }
    }
    setProduct(JSON.stringify(aa));
  }, []);


  useEffect(() => {
    
    // if(shoptype==="woo" && accountType ==="paid"){
    //   if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //     ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //     dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //   }
    // }
    // if(shoptype==="shopify" && accountType ==="paid"){
    //   if (!ReactSession.get("get_shopify_product_and_sku_and_type")) {
    //     ReactSession.set("get_shopify_product_and_sku_and_type", "1");
    //     dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
    //   }
    // }

    if (shoptype === "woo" && accountType === "paid") {
      if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
        sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
        dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
      }
    }
    
    if (shoptype === "shopify" && accountType === "paid") {
      if (!sessionStorage.getItem("get_shopify_product_and_sku_and_type")) {
        sessionStorage.setItem("get_shopify_product_and_sku_and_type", "1");
        dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
      }
    }

  }, []);


  // var product_obj = useSelector((state) => state.product_List_And_Segments);
  // var product_obj_ = product_obj?.all_product_object ?? {};
  // var ops = [];
  // if (product_obj_ && product_obj_.length > 0) {
  //   for (var i of product_obj_) {
  //     var label = i.product_name;
  //     var value = i.product_id;
  //     if(label && value){ops.push({ value: value, label: label });}
  //   }
  // }

  var woo_product_obj     = useSelector((state) => state.product_List_And_Segments?.product_table_object) ?? [];
  var shopify_product_obj = useSelector((state) => state.product_List_And_Segments?.shopify_product) ?? [];
  var ops = [];
  var optionBuild = null;
  if(shoptype=="woo"){
    optionBuild = woo_product_obj;
  }else if(shoptype=="shopify"){
    optionBuild = shopify_product_obj;
  }


  if (optionBuild && optionBuild.length > 0) {
    for (var i of optionBuild) {
      var label = i.product_name;
      var value = i.product_id;
      if(label && value){
        ops.push({ value: value, label: label });
      }
    }
  }


  return (

    <div className="input-filters" style={{ display: "block" }}>
      <strong> Products </strong>
    
      {ops && ops.length > 0 ? (
        
        <Multiselect
        
          displayValue="label"
          placeholder="Select-Product"

          onRemove={(e) => {
            var aa = [];
            for (var i of e) {aa.push(i.value);}
            setProduct(JSON.stringify(aa));
            var aa = [];
            for (var i of e) {aa.push(i.label);}
            setProductname(JSON.stringify(aa));
            onChange('productList', e.target.value);
          }}

          onSelect={(e) => {
            var aa = [];
            for (var i of e) {aa.push(i.value);}
            setProduct(JSON.stringify(aa));
            var aa = [];
            for (var i of e) {aa.push(i.label);}
            setProductname(JSON.stringify(aa));
            onChange('productList', e.target.value);
          }}

          options={ops}
          selectedValues={GiftOnProduct}
          showCheckbox
        />
      ) : <p style={{color:"red"}}> No product data available </p>}
      <input name="productList" type={"hidden"} defaultValue={product} />
      <input name="productname" type={"hidden"} defaultValue={productname}/>
    </div>
  );
}
export default Products;
