import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";

var loadAxios = () => {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'; // Replace with the correct Axios URL
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};


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


function SignUpPage() {

  var [EmailCheck, setEmailCheck]       = useState(false);
  var navigate                          = useNavigate();
  var navigateRef                       = useRef(navigate);
  var [value, setValue]                 = useState('');
  var valid                             = value.trim().length >= 8;

  var [email, setEmail]                     = useState('');
  var [name, setName]                       = useState('');
  var [password, setPassword]               = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [passwordMatch, setPasswordMatch]     = useState(false);

  var handleSubmit = (event) => {
    
    event.preventDefault();
    
    //var data = { email: email, name: name, pcode: password };
    // axios.post('https://server.shopex.io/registration/reg_form_submit.php', data)
    //   .then(function (response) {
    //     if (response.data.res === 'taken') {
    //       setEmailCheck(true);
    //     } else if (response.data.res === 'welcome') {
    //       localStorage.setItem('soid', JSON.stringify(response.data.o));
    //       localStorage.setItem('shopex_strpEmail', JSON.stringify(email));
    //       navigateRef.current('/StripeIndex');
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    
    // Load Axios dynamically before making the request
    loadAxios()
      .then(() => {
        var data = { email: email, name: name, pcode: password };
        axios.post('https://server.shopex.io/registration/reg_form_submit.php', data)
          .then(function (response) {
            if (response.data.res === 'taken') {
              setEmailCheck(true);
            } else if (response.data.res === 'welcome') {
              
              let o = response.data.o;
              localStorage.setItem('soid_after_signup_success', JSON.stringify(o));
              
              //localStorage.setItem('shopex_strpEmail', JSON.stringify(email));
              //navigateRef.current('/StripeIndex');
              
              navigateRef.current('/pick-plan', { state: { email,o } });
            }
          
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error('Failed to load Axios:', error);
      });
  };

  var handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
    setPasswordMatch(event.currentTarget.value === password);
  };

  const [showPassword, setShowPassword] = useState(false);

  const backgroundImageUrl = "./images/back.svg";  

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
    

      <div style={{backgroundImage: `url(${backgroundImageUrl})`,backgroundRepeat: "no-repeat",backgroundPositionX: "28.5vw",backgroundPositionY: "20vh",backgroundSize: "70vh"}}>
      
        <h1>Sign Up</h1>
      
        {/* <form onSubmit={handleSubmit} style={{backgroundImage: url("./images/back.svg")}}> */}
        <form onSubmit={handleSubmit} style={{height: "80vh",margin: "35vh 0% 0% 40vw",}}>

          <div>
            <p>Email : </p>
            <input style={{height: "40px", width: "300px",borderRadius:"0px",border:'1px solid lightgray'}}
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <p>Name : </p>
            <input style={{height: "40px", width: "300px",borderRadius:"0px",border:'1px solid lightgray'}} type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>

          <div>

            <p>Password : </p>
            {/* <input style={{height: "40px", width: "300px", marginBottom: "20px"}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/> */}
            <span style={{display:'inline-flex'}}>
              <input style={{ height: "40px",width: "257px",borderRadius:"0px",border:'1px solid lightgray',borderRight:"0px"}} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} 
                style={{border:'1px solid',borderLeft:"0px",cursor: "pointer",height: "40px","backgroundColor":"white","color":"rgb(76, 110, 245)",fontSize: "12px",fontWeight: "700"}} >
                {showPassword ? "Hide" : "Show"} 
              </button>
            </span>
          
          </div>


          <div>
            <p> Confirm Password : </p>
            <input style={{height: "40px", width: "300px",borderRadius:"0px",border:'1px solid lightgray'}} type="password"  value={confirmPassword} onChange={handleConfirmPasswordChange} required />
          </div>

          {/* {password !== ''  && confirmPassword !== '' && passwordMatch ? null : <p>Passwords do not match</p>} */}
        
          {password !== '' && confirmPassword !== '' && !passwordMatch ? (<p>Passwords do not match</p>) : null}
          
          {EmailCheck ? <p> Email is already taken </p> : null}
          
          <div>
            {/* <button type="submit" style={{fontSize: "20px",border: "0px",marginTop:'20px',width: "150px", height: "40px",  background: "#5e72e4", color: "white"}}>Sign Up</button> */}
            <Button style={{fontSize: "20px",border: "0px",margin:"0px",marginTop:'20px',height: "40px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
              Sign up
            </Button>
          </div>

        </form>

      </div>
  
    </>
  
  );

}

export default SignUpPage;
