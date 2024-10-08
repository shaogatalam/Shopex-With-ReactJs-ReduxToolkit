import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import axios from "axios";

function TeamForm() {
  
  const navigate      = useNavigate();
  const navigateRef   = useRef(navigate);

  var TeamFormSubmit  = (event) => {
    
    event.preventDefault();

    var fdata = new FormData(event.target);
    var data  = Object.fromEntries(fdata.entries());

    axios.post("https://server.shopex.io/profile/profile_member_form_process.php", data,{ withCredentials: true })
    .then(function (response) {
      if (response.data === "success") {
        navigateRef.current("/login");
      } else if (response.data === "Not") {
        alert("No Invitetion Sent to you");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (

    <Grid container>
      
      <form onSubmit={TeamFormSubmit} style={{ margin: "16%" }}>
        
        <Grid item sm={10} style={{ display: "grid" }}>
          
          <h3>Sign-up</h3>

          <h5 style={{"marginTop":"10px"}}>Name</h5>

          <input type="text" name="name" required placeholder="" />

          <h5 style={{"marginTop":"10px"}}> Enter the email address to which the invitation was sent : </h5>
          <input type="email" name="email" required placeholder="" />

          <h5 style={{"marginTop":"10px"}}> Set Password : </h5>
          <input type="password" name="pcode" required />

          <button style={{"background":"steelblue","color":"white","height":"40px","marginTop":"10px"}} type="submit">Sign Up</button>

        </Grid>

      </form>

    </Grid>

  );

}

export default TeamForm;
