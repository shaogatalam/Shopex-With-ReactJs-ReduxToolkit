import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { get_cussegs_List } from "../../../features/cus/CusListAndSeg";

function CusSegment({onChange}) {

  var dispatch    = useDispatch();
  var accountType = useSelector((state) => state.dashTops.accountType);

  useEffect(() => {

    // if(accountType==="paid") {
    //   if (!ReactSession.get("get_cussegs_List")) {
    //     ReactSession.set("get_cussegs_List", "1");
    //     dispatch(get_cussegs_List({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_cussegs_List")) {
        sessionStorage.setItem("get_cussegs_List", "1");
        dispatch(get_cussegs_List({ ajax_call: 2 }));
      }
    }

  }, [])



  // var Seglist = useSelector((state) => state.cusListAndSegs.segs);
  // var Seglist = structuredClone(Seglist);

  // let ops = [];
  // if (Seglist && Seglist.length > 0) {
  //   for (var i of Seglist) {
  //     var lbl = i.name;
  //     var vlu = i.id;
  //     ops.push({ value: vlu, label: lbl });
  //   }
  // }


  var ops = [];
  var Seglist = useSelector((state) => state.cusListAndSegs);
  var Seglist = Seglist?.segs ?? {};
  if(Seglist){
    Seglist = structuredClone(Seglist);
  }
  if (Seglist && Seglist.length > 0) {
    for (var i of Seglist) {
      var label = i.name;
      var value = i.id;
      if(label && value){ops.push({ value: value, label: label });}
    }
  }



  var [seg, setSeg] = useState("");

  return (

    <div className="input-filters">
     
      <strong> Customer Segment : </strong>
     
      {ops && (
     
        <Select 
          className="multi" placeholder="Select segment"  
          defaultValue={""} 
          onChange={(e) => { 
            setSeg(e.value); 
            onChange('cou', JSON.stringify(e));
          }}  
          options={ops} 
        />
      
      )}
      
      <input type="hidden" name="seg" value={seg} />
    
    </div>

  );

}

export default CusSegment;
