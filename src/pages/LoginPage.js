import React, { useEffect,useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from '../features/dash/DashTopsSlice';
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

//import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

//import { messaging } from '../firebase';

  const headerStyle = {
      background: '#f8f9fa',
      height: '80px',
      position: 'fixed',
      top: '0',
      width: '100%',
      zIndex: '100',
  };
      
  const headerContentStyle = {
      display: 'flex',
  };
  
  const lnkStyle = {
      color: 'white',
      textDecoration: 'none',
  };
  
  const navLinksStyle = {
      marginLeft: '20%',
      padding: '33px',
  };

  const navLinkStyle = {
      fontFamily: 'system-ui',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      textDecoration: 'none',
      color: 'rgb(0, 0, 0)',
      textTransform: 'uppercase',
  };

  const logoStyle = {
      padding: '23px',
      marginLeft: '9vw',
  };

  const openLoginModalStyle = {
      background: 'slateblue',
      borderRadius: '5px',
      boxShadow: '0 6px 30px -10px #4a74c9',
      transform: 'translateX(0)',
      padding: '8px',
      color: 'white',
      border: "0px",
      cursor: "pointer"
  };

  const openRegisterModalStyle = {
      marginLeft: '15px',
      background: '#1462ff',
      borderRadius: '5px',
      boxShadow: '0 6px 30px -10px #4a74c9',
      transform: 'translateX(0)',
      padding: '8px',
      color: 'white',
      border: "0px",
      cursor: "pointer"
  };

  
function LoginPage() {

    var dispatch                                  = useDispatch();
    var navigate                                  = useNavigate();
    var navigateRef                               = useRef(navigate);
    var [flag, setFlag]                           = useState(false);
    var [email, setEmail]                         = useState('');
    var [recoverwithemail, setRecoverwithemail]   = useState('');
    var [password, setPassword]                   = useState('');
    var [forgotpassword, setForgotpassword]       = useState(false);
    var [RecoverymailSent,setRecoverymailSent]    = useState(false);


    var status   = useSelector((state) => state.dashTops.status);
    var shoptype = useSelector((state) => state.dashTops.shoptype);

    var handleSubmit = (event) => {

        event.preventDefault();

        localStorage.clear();
        sessionStorage.clear();
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        
        var data = { email: email, password: password };
        axios.post('https://server.shopex.io/login_form_submit.php', data, {
            withCredentials: true,
        })
        .then(function (response) {
            if(response.data.includes("_TYPE_")) {
                var res      = response.data;
                var res_splt = res.split("_TYPE_");
                var role     = res_splt[0];
                var shoptype = res_splt[1];
                dispatch(LogIn({role: role,shoptype: shoptype,accountType:"paid"})); // dispatch(LogIn(role,shoptype));
                navigateRef.current('/dashboard');
            }
            else if (response.data === 'invalidCreds') {
                setFlag(true);
            
            }   
            else if (response.data === 'admin') {
                navigateRef.current('/issues');
            
            }   
            else if(response.data.includes("RegisteredButNotSubscribed")) {
                    
                var res             = response.data;
                var res_splt        = res.split("_shopex_");
                var o               = res_splt[1];
                navigateRef.current('/pick-plan', { state: { email,o } });
            
            }   
            else if(response.data === "NoUserFound") {
                alert("No user found, Please check your email if it's correct");
                
            }   
            else if(response.data === "Error") {
                alert("Please try again a few moments later");
            
            }   
            else if(response.data.includes("_SubscribedButNoShopAdded_")){
                var res     = response.data;
                var ar      = res.split('_SubscribedButNoShopAdded_');
                var cus     = ar[0];
                var ownerid = ar[1];
                navigateRef.current(`/InsertShopURL/${cus}/${ownerid}`);
            }
          
      })
      .catch(function (error) {
          console.log(error);
      });
  };


    var handleIdRecover = (event) => {

        event.preventDefault();
        var data = { email: recoverwithemail};
        axios.post('https://server.shopex.io/recover/recoverId.php', data, {
            withCredentials: true,
        })
        .then(function (response) {
            setRecoverymailSent(true);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    var backgroundImageUrl = "./images/back.svg"; 

    return (

        <>

            <div className="header" style={headerStyle}>
                <div className="header-content" style={headerContentStyle}>
                    <a href="https://shopex.io" className="logo" style={logoStyle}>
                        <img src="/images/logo.png" alt="Shopex Logo" style={{ width: "8vw" }} />
                    </a>
                    <nav className="nav-links" style={navLinksStyle}>
                        <a className="navLink" href="https://shopex.io#features" style={navLinkStyle}> Features</a>
                        <a className="navLink" href="https://shopex.io/pricing.html" style={navLinkStyle}>Pricing</a>
                        <a className="navLink" href="https://shopex.io/blog" style={navLinkStyle}>Blog</a>
                    </nav>
                    <div style={{marginTop: "1.4%"}}>
                        <a className="lnk" href="https://app.shopex.io/login">
                        <button id="openLoginModal" className="sign-in-button" style={openLoginModalStyle}>
                            Sign In &nbsp;<span> › </span>
                        </button>
                        </a>
                        <a href="https://app.shopex.io/signup">
                        <button id="openRegisterModal" className="sign-up-button" style={openRegisterModalStyle}>
                            Start for free  &nbsp;<span> › </span>
                        </button>
                        </a>
                    </div>
                </div>
            </div>
            
            <div style={{backgroundImage: `url(${backgroundImageUrl})`,backgroundRepeat: "no-repeat",backgroundPositionX: "29vw",backgroundPositionY: "20vh",backgroundSize: "70vh"}}>
        
                <h2>Login</h2>
                
                <div style={{height: "80vh",margin: "35vh 0% 0% 40vw",}} >

                    <form onSubmit={handleSubmit} >
                    
                        <h4>Email:</h4>
                        <input style={{height: "40px", width: "300px", fontSize:"18px",border:'1px solid lightgray'}} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                        <div>
                            <h4>Password:</h4>
                            <input style={{height: "40px", width: "300px", fontSize:"18px",border:'1px solid lightgray'}} type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    
                        <Button style={{fontSize: "20px",border: "0px",margin:'0px',marginTop:'20px',height: "40px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
                            Login 
                        </Button>

                        {flag && <p style={{color:'red'}}>Invalid credentials</p>}
                    </form>

                    <p>
                    <Button className="period-btn" variant="contained"  style={{color: "red", fontSize: "10px", border: "0px", margin: "20px 0px 0px", background: "whitesmoke"}} 
                        onClick={()=>{setForgotpassword(!forgotpassword)}} 
                        // href="/recoverId"
                    > 
                        Forgot Password ? 
                    </Button>
                    </p>

                    { 
                    forgotpassword && 
                    
                    <form onSubmit={handleIdRecover} style={{display:"grid"}}>
                    
                        <h4>Email:</h4>
                        <input style={{height: "40px", width: "300px",fontSize:"18px"}} type="email" value={recoverwithemail} onChange={(e) => setRecoverwithemail(e.target.value)} required />

                        <Button style={{width:'fit-content',fontSize: "20px",border: "0px",margin:'0px',marginTop:'20px',height: "40px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
                            Send recovery email 
                        </Button>

                        {
                            RecoverymailSent && 
                            <p style={{color:'green'}}>
                                Your password reset email should arrive shortly. 
                                <br/>
                                If you don't see it, please check your spam folder, sometimes it can end up there!
                            </p>
                        }

                    </form>
                    }

                </div>
                
            </div>

        </>

    );

}

export default LoginPage;
