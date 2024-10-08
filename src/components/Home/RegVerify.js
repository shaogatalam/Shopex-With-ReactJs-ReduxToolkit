import React from "react";
import axios from "axios";
import { useRef,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";

function Reg_verify() {


  var navigate = useNavigate();
  var { email, code } = useParams();

  useEffect(() => {

    var data = { emai:email, code:code };

    axios.post("https://server.shopex.io/registration/reg_process_vericode.php", data)
      .then(function (response) {
        if (response.data === "welcome") {
          alert(" account verification susseccful ");
          navigate("/dashboard");
        } else if (response.data === "Not") {
          alert("Verification Failed");
        } else if (response.data === "Not") {
          alert("No Invitation Sent to You");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [email, code, navigate]);

  ///////OLD//////////
  // const navigate      = useNavigate();
  // const navigateRef   = useRef(navigate);

  // var { email,code }  = useParams();

  // //var filterSubmit = (event) => {

   
  //   var data  = Object.fromEntries(fdata.entries());

  //   axios.post("https://server.shopex.io/registration/reg_process_vericode.php",data)
  //   .then(function (response) {
  //       if (response.data === "welcome") {
  //         navigateRef.current("/StripeIndex");
  //       } else if (response.data === "Not") {
  //         alert("Verification Failled");
  //       } else if (response.data === "Not") {
  //         alert("No Invitetion Sent to you");
  //       }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //};

  return (
    
    <Grid container>
      
      <h1>Loading...</h1>
      
          {/* <strong>Inser the email you registered with </strong>
          <input type="email" name="email" autoComplete="off" required placeholder=""/>

          <strong>Insert the confirmation code sent to your email address [ also check the spam box ]</strong>
          
          <input type="text" name="verification_code" autoComplete="off" required placeholder=""/>
          <button type="submit">Submit</button> */}
    </Grid>

  );

}

export default Reg_verify;
