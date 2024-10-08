import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { get_cusret_getcity } from "../../../features/cus/CusRetSelCity";

function BillCountry({onChange}) {

  var dispatch                = useDispatch();
  var [bcountry, setbcountry] = useState("");
  var accountType             = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_cusret_getcity")) {
    //     ReactSession.set("get_cusret_getcity", "1");
    //     dispatch(get_cusret_getcity({ ajax_call: 2 }));
    //   }
    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cusret_getcity")) {
        sessionStorage.setItem("get_cusret_getcity", "1");
        dispatch(get_cusret_getcity({ ajax_call: 2 }));
      }
    }

  }, [])

  

  //var Cus_bcountry = useSelector((state) => state.CusRetSC.bcountry);
  // if (!(Cus_bcountry !== undefined && Cus_bcountry !== null)) {
  //    dispatch(get_cusret_getcity({ajax_call:2}));
  // }

  var Cus_bcountry = useSelector((state) => state.CusRetSC);
  var Cus_bcountry = Cus_bcountry?.bcountry ?? null;



  return (

    <>
    
    <div className="input-filters">
    
    <strong>Billing country  : </strong>
    
        {Cus_bcountry ? (
    
        <Multiselect
        
          isObject={false}
          
          placeholder="Billing-Country"
          
          onRemove={(e) => {
          
            setbcountry(JSON.stringify(e));
            onChange('cou', JSON.stringify(e));
          }}
          
          onSelect={(e) => {
          
            setbcountry(JSON.stringify(e));
            onChange('cou', JSON.stringify(e));
          }}
          
          options={Cus_bcountry}
          
          selectedValues={[]}
          
          showCheckbox
          
          />
        
        ) : <h4> No data available </h4>}
      
      </div>
      
      <input name="ob_country_list" style={{ display: "none" }} defaultValue={bcountry} />
    
    </>
  
  );

}

export default BillCountry;
