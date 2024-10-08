import React, { useState } from "react";
import Select from "react-select";

function ProductFilter({ productnid ,debounce}) {

  console.log(typeof(debounce));
  var product_name_id = productnid;
  var nid  = product_name_id.split("_SHOPEX_");
  var name = nid[1];
  var id   = nid[0];

  //console.log(nid);

  var [first_order_before, setfirst_order_before] = useState(false);
  var [first_order_after, setfirst_order_after] = useState(true);
  var [first_order_between, setfirst_order_between] = useState(false);

  var handleChange = (e) => {
    setfirst_order_between(false);
    setfirst_order_after(false);
    setfirst_order_before(false);

    if (e === "first_order_between") setfirst_order_between(true);
    if (e === "first_order_before") setfirst_order_before(true);
    if (e === "first_order_after") setfirst_order_after(true);
  };

  const options = [
    { value: "first_order_before", label: "Over" },
    { value: "first_order_after", label: "In the past" },
    { value: "first_order_between", label: "In-Between" },
  ];

  ////
  var [last_order_before, setlast_order_before] = useState(false);
  var [last_order_after, setlast_order_after] = useState(true);
  var [last_order_between, setlast_order_between] = useState(false);

  var handleChange1 = (e) => {
    setlast_order_between(false);
    setlast_order_after(false);
    setlast_order_before(false);

    if (e === "last_order_between") setlast_order_between(true);
    if (e === "last_order_before") setlast_order_before(true);
    if (e === "last_order_after") setlast_order_after(true);
  };

  const options1 = [
    { value: "last_order_before", label: "Over" },
    { value: "last_order_after", label: "In the past" },
    { value: "last_order_between", label: "In-Between" },
  ];

  var title={"fontSize":"20px","padding":"5px","color":"tomato","margin":"5px 5px 5px 0px","boxShadow":"rgba(0, 0, 0, 0.16) 0px 1px 4px","borderRadius":"5px","width":"20vw"};
  
  return (
    
    <>
    
      <div style={{"background":"white","boxShadow":"rgba(3, 102, 214, 0.3) 0px 0px 0px 3px","padding":"10px"}}>
    
        <div style={title} >
          <strong> {name.replace(/_/g, ' ')} </strong>
        </div>

        <div style={{ display: "inline-grid" }}>
          
          <strong> Last-Buy </strong>
  
          <div  style={{ display: "inline-grid" }}>
          
            <Select placeholder="In the past" defaultValue={"last_order_after"} onChange={(e) => {handleChange1(e.value);}} options={options1}/>

            {last_order_after && (
              <>
                <div style={{ display: "inline-grid" }}>
                  <input type="number"  name={"lp_itp" + id} style={{ marginTop: "7px" }} 
                    // onChange={e => onChange('o_cus_mail', e.target.value)}
                    onChange={e => debounce()}
                  />
                  <div style={{ display: "inline-flex" }}>
                    <label> <input  type="radio"  name={"lpunit" + id}  value="day" />  D  </label>
                    <label> <input  type="radio"  name={"lpunit" + id}  value="week" />  W  </label>
                    <label> <input  type="radio"  name={"lpunit" + id}  value="month" />  M </label>
                  </div>
                </div>
              </>
            )}

            {last_order_before && (
              <>
                <div style={{ display: "inline-grid" }}>
                  <input type="number" name={"lp_over" + id}  style={{ marginTop: "7px" }} onChange={e => debounce()}/>
                  <div style={{ display: "inline-flex" }}>
                    <label>  <input type="radio" name={"lpunit" + id} value="day"  />   D  </label>
                    <label>  <input type="radio" name={"lpunit" + id} value="week" />   W </label>
                    <label>  <input type="radio" name={"lpunit" + id} value="month" />  M </label>
                  </div>

                  <strong>Ago</strong>
                </div>
              </>
            )}

            {last_order_between && (
              <>
                <div style={{ display: "inline-grid" }}>
                  <input type="number" name={"lp_from" + id} onChange={e => debounce()}/>

                  <input type="number" name={"lp_to" + id} onChange={e => debounce()}/>

                  <div style={{ display: "inline-flex" }}>
                    <label>  <input type="radio" name={"lpunit" + id} value="day" /> D </label>
                    <label>  <input type="radio" name={"lpunit" + id} value="week" /> W </label>
                    <label>  <input type="radio" name={"lpunit" + id} value="month" /> M </label>
                  </div>

                  <strong>Ago</strong>
                </div>
              </>
            )}

            <div style={{ display: "inline-flex" }}>
              <label>  <input type="radio" name={"fpandor" + id} value="and" /> AND </label>
              <label>  <input type="radio" name={"fpandor" + id} value="or"  /> OR </label>
            </div>
          </div>

        </div>
        
        &nbsp;

        <div style={{ display: "inline-grid" }}>
          
          <strong> First-Buy </strong>

            <div  style={{ display: "inline-grid" }}>
            
              <Select placeholder="In the past" defaultValue={"first_order_after"}  onChange={(e) => { handleChange(e.value); }}  options={options}/>

              {first_order_after && (
                <div style={{ display: "inline-grid" }}>
                  <input style={{ marginTop: "7px" }} type="number" name={"fp_itp" + id} onChange={e => debounce()}/>
                  <div style={{ display: "inline-flex" }}>
                    <label>  <input type="radio" name={"fpunit" + id}  value="day" />  D  </label>
                    <label>  <input type="radio" name={"fpunit" + id}  value="week" /> W </label>
                    <label>  <input type="radio" name={"fpunit" + id}  value="month" /> M </label>
                  </div>
                </div>
              )}

              {first_order_before && (
                <>
                  <div style={{ display: "inline-grid" }}>
                    <input type="number" name={"fp_over" + id} style={{ marginTop: "7px" }} />

                    <div style={{ display: "inline-flex" }}>
                      <label> <input type="radio" name={"fpunit" + id} value="day" /> D </label>
                      <label> <input type="radio" name={"fpunit" + id} value="week" /> W </label>
                      <label> <input type="radio" name={"fpunit" + id} value="month" /> M </label>
                    </div>
                    <strong>Ago</strong>
                  </div>
                </>
              )}

              {first_order_between && (
                <>
                  <div style={{ display: "inline-grid" }}>
                    <input type="number" name={"fp_from" + id} />
                    <input type="number" name={"fp_to" + id} />

                    <div style={{ display: "inline-flex" }}>
                      <label>  <input type="radio" name={"fpunit" + id}  value="day" /> D </label>
                      <label>  <input type="radio" name={"fpunit" + id} value="week" /> W </label>
                      <label>  <input type="radio"  name={"fpunit" + id} value="month" /> M </label>
                    </div>

                    <strong>Ago</strong>
                  </div>
                </>
              )}

              <div style={{ display: "inline-flex" }}>
                <label>  <input type="radio" name={"lpandor" + id} value="and" /> AND </label>
                <label>  <input type="radio" name={"lpandor" + id}  value="or"  /> OR </label>
              </div>

            </div>

        </div>

        &nbsp;

        <div style={{ display: "inline-grid" }}>
          
          <strong> Spend </strong>
          
          <input type="number" name={"spend_min" + id} placeholder="Min" onChange={e => debounce()}/>
          <input type="number" name={"spend_max" + id} placeholder="Max" onChange={e => debounce()}/>

          <div style={{ display: "inline-flex" }}>
            <label>  <input type="radio" name={"spendandor" + id} value="and" /> AND </label>
            <label>  <input type="radio" name={"spendandor" + id} value="or" /> OR </label>
          </div>

        </div>
        
        &nbsp;

        <div style={{ display: "inline-grid" }}>
          <strong> profit </strong>
          <input type="number" name={"profit_min" + id} placeholder="Min" onChange={e => debounce()}/>
          <input type="number" name={"profit_max" + id} placeholder="Max" onChange={e => debounce()}/>

          <div style={{ display: "inline-flex" }}>
            <label>  <input type="radio" name={"profit_andor" + id} value="and" /> AND </label>
            <label>  <input type="radio" name={"profit_andor" + id} value="or" /> OR </label>
          </div>
        </div>

        &nbsp;

        <div style={{ display: "inline-grid" }}>
          <strong> Unit-bought </strong>
          <input type="number" name={"unit_min" + id} placeholder="Min" onChange={e => debounce()}/>
          <input type="number" name={"unit_max" + id} placeholder="Max" onChange={e => debounce()}/>

          <div style={{ display: "inline-flex" }}>
            <label>  <input type="radio" name={"unitandor" + id} value="and" /> AND </label>
            <label>  <input type="radio" name={"unitandor" + id} value="or" /> OR </label>
          </div>
        </div>

        &nbsp;

        <div style={{ display: "inline-grid" }}>
          <strong> Total-order </strong>
          <input type="number" name={"order_min" + id} placeholder="Min" onChange={e => debounce()}/>
          <input type="number" name={"order_max" + id} placeholder="Max" onChange={e => debounce()}/>

          <div style={{ display: "inline-flex" }}>
            <label>  <input type="radio" name={"orderandor" + id} value="and" /> AND </label>
            <label>  <input type="radio" name={"orderandor" + id} value="or" /> OR </label>
          </div>
        </div>
        
        &nbsp;

        <div style={{ display: "inline-grid" }}>
          <strong> On-Discount-order </strong>
          <input type="number" name={"ondis_min" + id} placeholder="Min" onChange={e => debounce()}/>
          <input type="number" name={"ondis_max" + id} placeholder="Max" onChange={e => debounce()}/>

          <div style={{ display: "inline-flex" }}>
            <label>  <input type="radio" name={"ondisandor" + id} value="and" /> AND </label>
            <label>  <input type="radio" name={"ondisandor" + id} value="or" /> OR </label>
          </div>
        </div>
        
        &nbsp;

        <div style={{ display: "inline-grid" }}>
          <strong> Avg-Buy-Gap[day] </strong>
          <input type="number" name={"atg_min" + id} placeholder="Min" onChange={e => debounce()}/>
          <input type="number" name={"atg_max" + id} placeholder="Max" onChange={e => debounce()}/>
        </div>

      </div>
    
      <br/>
    
    </>

  );

}

export default ProductFilter;
