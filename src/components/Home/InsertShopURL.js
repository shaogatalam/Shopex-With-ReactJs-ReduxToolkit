import React, { useState, useRef , useEffect} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

var inputStyle = {"width":"30vw","height":"50px","fontSize":"20px","color":"orangered"};
var submitButton = {width: "10vw", height: "40px",marginTop:'15px',cursor: "pointer",color: "red",background: "white",border: "1px solid",fontWeight: 'bold'}

function InsertShopURL() {

  var dispatch                = useDispatch();
  var { cus,ownerId }         = useParams();
  var navigate                = useNavigate();
  var navigateRef             = useRef(navigate);
  var [wait, setWait]         = useState(false);
  var [shoptype, setShoptype] = useState("");

  var [subscriptionSuccessful, setSubscriptionSuccessful] = useState(false);
    
  useEffect(() => {
    const fetchData = async () => {
      if (cus !== "profile" && ownerId !== "addmoreshop" && cus !== null && ownerId !== null) {
        const formData = new FormData();
        formData.append("soid", ownerId);
        formData.append("cus", cus);
        try {
          
          //const response = 
          await axios.post("https://server.shopex.io/subscription/get-subscription-data.php", formData)
          .then(function (response) {
            if (response.data === "ok") {
              setSubscriptionSuccessful(true);
            } 
          })
          .catch(function (error) {
            console.log(error);
          });
          // if (response.data === 'ok') {
          //   setSubscriptionSuccessful(true);
          // } else {
          //   console.log('Unexpected response:', response.data);
          // }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
        }
      } else {
      }
    };
    fetchData();

    // localStorage.removeItem("shopex_strpEmail");
    // if(cus!="profile" && ownerId!="addmoreshop"){
    //   const formData = new FormData();
    //   if(cus !== null && ownerId!== null){
    //     formData.append("soid", ownerId);
    //     formData.append("cus", cus);
    //     try {
    //       axios.post("https://server.shopex.io/registration/get_subs_data.php", formData)
    //         .then(function (response) {
    //           setSubscriptionSuccessful(true);
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   }
    // }

  }, [cus, ownerId]);


  var filterSubmit = (event) => {
    
    event.preventDefault();

    setWait(true);

    var fdata = new FormData(event.target);
    var data  = Object.fromEntries(fdata.entries());
    
    //var soid  = JSON.parse(localStorage.getItem("soid_after_signup_success"));
    
    if(cus && ownerId){ // if customar email and package id is available
      data["soid"]  = ownerId;
      data["cus"]   = cus;
    }else{
      data["soid"]  = "notFirstShop";
      data["cus"]   = "notFirstShop";
    }

    if(subscriptionSuccessful){
      
      if(shoptype == 'woo') {

        axios.post("https://server.shopex.io/registration/process_shop_url.php", data)
          .then(function (response) {
            // dispatch(LogIn(1));
            navigateRef.current("/login");
          })
          .catch(function (error) {
            console.log(error);
          });
      
      }else if(shoptype == 'shopify') {

        axios.post("https://server.shopex.io/registration/process_shopify_shop_url.php", data)
        .then(function (response) {
          var fw     = response.data;
          if (fw) {
            window.location.href = fw;
          } else {
            console.error('Authorization URL not found');
          }
          //navigateRef.current("/login");
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }

  };

  //  &scope=read_all_orders,read_products,write_products,read_product_listings,read_price_rules,write_price_rules,read_customers,write_customers,read_inventory,write_inventory,read_returns,write_returns
  //  read_all_orders	
  //  read_products,write_products,read_product_listings
  //  read_price_rules,write_price_rules //
  //  read_customers,write_customers //
  //  read_inventory,write_inventory //
  //  read_returns,write_returns //
  
  return (
    
    <>
    
      <form onSubmit={filterSubmit} style={{marginLeft: "10%",color: "white", marginTop: "2%"}}>
        
        <div style={{background: "white", width :"40vw", padding: "10px", borderRadius: "10px", color: "black", display:"flex"}}>
          <h3 style={{fontFamily:"system-ui"}}> Which platform are you using? </h3>
          <RadioGroup style={{ display:"inline-block",padding:'10px'}} onChange={(e)=>{setShoptype(e.target.value);}}>
            <Radio checked={shoptype === "woo"} value="woo" name="shoptype" />Woo-commerce
            <Radio checked={shoptype === "shopify"} value="shopify" name="shoptype" /> Shopify
          </RadioGroup>
        </div>

        { 
          shoptype === "woo" && 
          
          <div style={{background: "white", width :"40vw", padding: "10px", borderRadius: "10px", color: "black",marginTop: "10px",
                      boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px"}}>

            <h1 style={{background: "seagreen",color: "white", padding: "10px", borderRadius: "10px"}}> Woo-commerce </h1><br/>
            <input type="hidden" name="shoptype" value="woo" />
            <label htmlFor="shoplink"> <p> Shop url </p> </label>
            <input style={inputStyle}  type="url" name="shoplink" required placeholder="https://example.com"/>
            
            <br />
            <br />
            
            <label htmlFor="consumer_secret"> <p> Consumer secret </p> </label>
            <input style={inputStyle} type="text"name="consumer_secret"required placeholder="consumer secret"/>
            
            <br />
            <br />
            
            <label htmlFor="consumer_key"> <p> Consumer key </p> </label>
            <input style={inputStyle} type="text"name="consumer_key" required placeholder="consumer key"/>
            
            
            <button style={submitButton} type="submit">Submit</button>
            
            {wait && <h3> Please Wait, this might take a few minutes .. .. .. </h3>}

          </div>
        
        }

        { 
          shoptype === "shopify" && 
          
          <div style={{background: "white", width :"40vw", padding: "10px", borderRadius: "10px", color: "black",marginTop: "10px",
                      boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px"}}>

            <h1 style={{background: "seagreen",color: "white", padding: "10px", borderRadius: "10px"}}> Shopify </h1><br/>
            <input type="hidden" name="shoptype" value="shopify" />

            <label htmlFor="shoplink"> <p> Shop url </p> </label>
            <input style={inputStyle}  type="url" name="shop" required placeholder="https://example.com"/>
            
            <button style={submitButton} type="submit">Submit</button>
            
            {wait && <h3> Please Wait, this might take a few minutes .. .. .. </h3>}

          </div>
        
        }

      </form>
    
    </>
  
  );

}

export default InsertShopURL;
