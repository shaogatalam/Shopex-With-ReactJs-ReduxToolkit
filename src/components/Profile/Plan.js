import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { plan_ } from "../../features/profile/Plan";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

function Plan() {

  var accountType   = useSelector((state) => state.dashTops.accountType);
  var dispatch      = useDispatch();

  useEffect(() => {
    // if(accountType === "paid") {
    //   if (!ReactSession.get("plan_")) {
    //       ReactSession.set("plan_", "1");
    //       dispatch(plan_({ ajax_call: 2 }));
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("plan_")) {
        sessionStorage.setItem("plan_", "1");
        dispatch(plan_({ ajax_call: 2 }));
      }
    }
  }, []);


  var myplan = useSelector((state) => state.Profile_plan?.profile_plan ?? "");

  var handleServiceTermination = (event) => {
    event.preventDefault();
    var confirmDelete = window.confirm(' Do you want to cancel your shopex subscription ? ');
    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());

    if (confirmDelete) {
      if(accountType === "paid"){
        axios.post("https://server.shopex.io/subscription/cancel-subscription.php",data,{ withCredentials: true })
        .then(function (response) {
          //alert('Order segment deleted successfully');
        })
        .catch(function (error) {
          //alert('Error deleting segment:', error);
        });
      }
    }
  }


  
  const [cancelButton, setCancelButton] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    var confirmUpgrade = window.confirm(' Do you want to upgrade your shopex subscription ? ');
    const formData = new FormData();
    formData.append("priceid", selectedPlan);
    if (confirmUpgrade) {
      if(accountType === "paid"){
        axios.post('https://server.shopex.io/subscription/update-subscription.php', formData, {withCredentials: true,})
          .then((response) => {
              alert("plan update successful");
            },
            (error) => {
              alert(error);
            }
          );
      }
    }
  };

  var [radioValue,setRadioValue]=useState("plan");

  return (
    
    <>
    
    
      {/* {JSON.stringify(offer_as_gifts)} <h1></h1> {JSON.stringify(product_optionsH)} */}

      <div>
        <RadioGroup style={{ display:"inline-block",padding:'10px'}} onChange={(e)=>{setRadioValue(e.target.value);}}>
          <Radio style={{"height":"52px!important"}} checked={radioValue === "plan"} value="plan" name="type" />Plan
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Radio style={{"width":"52px!important"}} checked={radioValue === "terminate"} value="terminate" name="type" /> Terminate
        </RadioGroup>
      </div>
      
      { 
        radioValue === "plan" && 
        <div style={{margin:"18px",padding:"20px",backgroundColor:"#fff",borderRadius:"8px",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"}}>
          
          <h4 style={{color:"yellowgreen","background": "aliceblue", "padding": "5px"}}> :: Current Plan </h4>
          <h5> {JSON.stringify(myplan)} </h5>  

          <h4 style={{color:"yellowgreen","background": "aliceblue", "padding": "5px"}}> :: Change Plan </h4>
          <br/>
          <form onSubmit={handleUpdateSubmit}>
              
            <select style={{fontSize:'18px'}} value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} required >
                <option value="" disabled>Select a plan</option>
                <option value="1">up-to 100 order</option>
                <option value="2">up-to 100 order + engage</option>
                <option value="3">up-to 500 order</option>
                <option value="4">up-to 500 order + engage</option>
                <option value="5">up-to 2500 order</option>
                <option value="6">up-to 2500 order + engage</option>
            </select>
            <br/><br/><br/>
            <button type="submit">Update</button>
      
          </form>

        </div>
      }

      {
        radioValue === "terminate" && 
        <div>
          <div style={{margin:"18px",padding:"20px",backgroundColor:"#fff",borderRadius:"8px",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"}}>
            <h2 style={{color:"yellowgreen","background": "aliceblue", "padding": "5px"}}> :: Email and password required to cancel subscription </h2>
            <form onSubmit={handleServiceTermination}>
              <strong>Email:</strong><br/>
              <input style={{height: "30px", width: "300px", fontSize:"18px",border:'1px solid lightgray'}} type="email" required />
              <br/>
              <br/>
              <br/>
              <strong>Password:</strong><br/>
              <input style={{height: "30px", width: "300px", fontSize:"18px",border:'1px solid lightgray'}} type="password"  required />
              <br/>
              <br/>
              <button type="submit">Cancel Subscription</button>
            </form>
          </div>
        </div>
      }

     

    </>

  );

}

export default Plan;
