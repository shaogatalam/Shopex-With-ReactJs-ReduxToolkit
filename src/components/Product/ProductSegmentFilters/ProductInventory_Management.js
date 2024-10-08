import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_shopify_product_and_sku_and_type } from "../../../features/product/ProductListAndSegment";

function ProductInventory_Management({onChange}) {

    var dispatch      = useDispatch();
    var [inv,setInv]  = useState("");
    var shoptype      = useSelector((state) => state.dashTops.shoptype);
    var accountType   = useSelector((state) => state.dashTops.accountType);
    
    useEffect(() => {

      // if(accountType === "paid") {
      //   if(shoptype==="shopify"){
      //     if (!ReactSession.get("get_shopify_product_and_sku_and_type")) {
      //       ReactSession.set("get_shopify_product_and_sku_and_type", "1");
      //       dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
      //     }
      //   }
      // }
      if (accountType === "paid") {
        if (shoptype === "shopify") {
          if (!sessionStorage.getItem("get_shopify_product_and_sku_and_type")) {
            sessionStorage.setItem("get_shopify_product_and_sku_and_type", "1");
            dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
          }
        }
      }

     
    }, []);

   
  
  
    var product_List_And_Segments = useSelector((state) => state.product_List_And_Segments);
    var inv_ = product_List_And_Segments?.shopify_product_inv ?? {};
  
  
    return (
  
      <>
        <div className="input-filters" style={{ display: "block" }}>

          {inv_ && inv_.length > 0 ? (
            <Multiselect
              isObject={false}
              placeholder="Product inv-management"
              onRemove={(e) => {setInv(JSON.stringify(e));}}
              onSelect={(e) => {setInv(JSON.stringify(e));}}
              options={inv_}
              selectedValues={[]}
              showCheckbox
            />
          ) : (
            <p>No inv_ available.</p>
          )}

          <input name="inv" type={"hidden"} value={inv} onChange={e => onChange('o_cus_mail', e.target.value)}/>

        </div>

      </>
    );
}

export default ProductInventory_Management