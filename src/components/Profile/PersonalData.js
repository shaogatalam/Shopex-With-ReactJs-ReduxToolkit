import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { personaldata_ } from "../../features/profile/PersonalData";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function PersonalData() {

  var rolePower     = useSelector((state) => state.dashTops.rolePower);
  var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);
  var accountType   = useSelector((state) => state.dashTops.accountType);
  
  console.log(accountType);
  var dispatch = useDispatch();
  useEffect(() => {
      // if(accountType === "paid") {
      //   if (!ReactSession.get("personaldata_")) {
      //       ReactSession.set("personaldata_", "1");
      //       dispatch(personaldata_({type:1}));
      //   }
      // }
      if (accountType === "paid") {
        if (!sessionStorage.getItem("personaldata_")) {
          sessionStorage.setItem("personaldata_", "1");
          dispatch(personaldata_({ type: 1 }));
        }
      }
  },[])

  var personal_data = useSelector((state) => state.Profile_personal_data.personal_data);
  
  var personalDataUpdate = (e) => {
    e.preventDefault();
    const fdata = new FormData(e.target);
    const data = Object.fromEntries(fdata.entries());
    if(accountType === "paid") {dispatch(personaldata_(data));}
  };

  return (

    <section className="personal-data">
    
      <form onSubmit={personalDataUpdate}>
    
        <input defaultValue={2} name="type" type="hidden" />

        <Grid container spacing={3} style={{ padding: 0 }}>
          
          <Grid item md={6} sm={12}>
          
            <div>
          
              <strong> Personal Info </strong> <br />
              <br />
              
              <label> Full Name </label> <br /> 
              {personal_data[0] &&  <input name="name" type="text" defaultValue={personal_data[0].name}/>}
              
              <br />
              <br />
              
              <label> Email </label> <br />
              {personal_data[0] &&  <input name="email" type="text" defaultValue={personal_data[0].email}/>}
              
              <br />
              <br />
              
              <label> Contact Number </label> <br />
              {personal_data[0] && ( <input name="phone" type="text" defaultValue={personal_data[0].phone}/>)}
              <br />
              <br />
              
              {rolePower == 1 &&  
                <> 
                  <label> Engage Email </label> <br />
                  {personal_data[0] && ( <input name="engage_email" type="text" defaultValue={personal_data[0].engage_email}/>)}
                </>
              }
              
              <br />
              <br />

            </div>
            
          </Grid>

          
          <Grid item md={6} sm={12}>
          
            <div>
          
              <strong> Location </strong> 
              <br/><br/>
          
              <label>Country</label> <br/>
              {personal_data[0] && ( <input name="country" type="text" defaultValue={personal_data[0].country} /> )}
          
              <br/><br/>
          
              <label>City</label><br/>
              {personal_data[0] && ( <input  name="city"  type="text" defaultValue={personal_data[0].city} /> )}
          
              <br/><br/>
          
              <label>State</label><br/>
              {personal_data[0] && ( <input defaultValue={personal_data[0].state} name="state" type="text" /> )}
          
              <br/><br/>
          
              <label>Zip</label><br/>
              {personal_data[0] && ( <input  defaultValue={personal_data[0].zip} name="zip" type="text" /> )}
              
              <br/><br/>
              
              <label>Joined</label><br/>
              {personal_data[0] && ( <input type="text" placeholder={1641916754} /> )}
              
              <br/><br/>
            
            </div>
          
          </Grid>

        </Grid>

        <Button type="submit" size="large" variant="contained" color="secondary"> Update data </Button>
      
      </form>

    </section>

  );

}
export default PersonalData;
