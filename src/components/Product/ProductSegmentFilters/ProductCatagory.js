import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_product_and_catagory_and_sku_data } from "../../../features/product/ProductListAndSegment";

function ProductCatagory({ data,onChange }) {
  
  var dispatch                = useDispatch();
  var [catas, setCatas]       = useState("");
  var [catNames, setCatNames] = useState("");
  var accountType             = useSelector((state) => state.dashTops.accountType);


  useEffect(() => {

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
        sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
        dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
      }
    }

  }, []);


  var [GiftOnCategory, setGiftOnCategory] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setGiftOnCategory(data);
      console.log(GiftOnCategory);
    }
   
    var aa = [];
    if (data && data.length > 0) {
      for (var i of data) {
        aa.push(i.value);
      }
      setCatas(JSON.stringify(aa));
    }
    
  }, []);

  // var cat_obj = useSelector((state) => state.product_List_And_Segments.product_cat_table_object);

  // var ops = [];
  // if (cat_obj && cat_obj.length > 0) {
  //   for (var i of cat_obj) {
  //     var label = i.category_name;
  //     var value = i.category_id;
  //     ops.push({ value: value, label: label });
  //   }
  // }


  var cat_table = useSelector((state) => state.product_List_And_Segments);
  var cat_table_ = cat_table?.product_cat_table_object ?? {};
  var ops = [];
  
  if (cat_table_ && cat_table_.length > 0) {
    for (var i of cat_table_) {
      var label = i.category_name;
      var value = i.category_id;
      if(label && value){
        ops.push({ value: value, label: label });
      }
    }
  }
  

  //setProductname(JSON.stringify(aa));
  return (
    <div className="input-filters" style={{ display: "block" }}>
      <strong> Product category </strong>
      {ops && ops.length > 0 ? (
        <Multiselect
          displayValue="label"
          placeholder="Select-catagory"
          onRemove={(e) => {
            var aa = [];for (var i of e)  {aa.push(i.value);}
            setCatas(JSON.stringify(aa));
            var aa = []; for (var i of e) {aa.push(i.label)};
            setCatNames(JSON.stringify(aa));
            onChange('o_cus_mail', e.target.value);
          }}
          onSelect={(e) => {
            var aa = []; for (var i of e) {aa.push(i.value);}
            setCatas(JSON.stringify(aa));
            var aa = []; for (var i of e) {aa.push(i.label)};
            setCatNames(JSON.stringify(aa));
            onChange('o_cus_mail', e.target.value);
          }}
          options={ops}
          selectedValues={GiftOnCategory}
          showCheckbox
        />
      ) : <p style={{color:"red"}}> No category data available </p> }  
      <input name="productCatList" type={"hidden"} defaultValue={catas} />
      <input name="productCatNames" type={"hidden"} defaultValue={catNames} />
    </div>
  );
}
export default ProductCatagory;
