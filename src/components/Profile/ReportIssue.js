import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
function ReportIssue() {

  var accountType   = useSelector((state) => state.dashTops.accountType);

  var Submit = (event) => {
  
    event.preventDefault();
  
    if(accountType === "paid"){

      var fdata = new FormData(event.target);
      var data = Object.fromEntries(fdata.entries());
      //dispatch(profile_personal_data(data));
      axios.post("https://server.shopex.io/profile/profile_submit_issue.php", data, {withCredentials: true,})
        .then((response) => {
            var initdata = response.data;
          },
          (error) => {}
        );
    }
  };

  return (
   
   <div style={{ maxWidth: "800px" }}>
   
      <form onSubmit={Submit}>
   
        <h4 style={{color:"yellowgreen","background": "aliceblue", "padding": "5px"}}> :: If you encounter any issues, please report them here </h4>
        
        <br />
        <br />
   
        <input type="text" name="title" required placeholder="Enter Title Here" style={{ width: "100%" }}/>
        
        <br />
        <br />

        <textarea type="text" rows={5} name="message" required placeholder="Details about the issue" style={{ width: "100%",padding:"10px" }} />
        
        <br />
        <br />

        <Button type="submit" size="large" variant="contained" color="secondary"> Submit Message </Button>
      
      </form>

    </div>

  );

}

export default ReportIssue;
