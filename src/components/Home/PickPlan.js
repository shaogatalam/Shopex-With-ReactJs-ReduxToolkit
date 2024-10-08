import React, {  useState } from "react";
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

function PickPlan() {

    //var dispatch = useDispatch();
        
    var[Pack1,setPack1] = useState(false);
    var[Pack2,setPack2] = useState(true);
    var[Pack3,setPack3] = useState(false);

    var[Pack1engage,setPack1engage] = useState(false);
    var[Pack2engage,setPack2engage] = useState(true);
    var[Pack3engage,setPack3engage] = useState(false);

    var location  = useLocation();
    var { email } = location.state || {};
    var { o }     = location.state || {}; 

    return (

        <>

            <div style={{"marginLeft":"4vw",background: "rgb(255, 255, 255)",border: "1px solid lightgray",maxWidth: "55vw",
                padding: "20px", borderRadius: "8px",boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",marginBottom: "15px"}}>
                
                <h2 style={{margin: "0px"}}>My shop handles Up to</h2>
                    
                    <Button onClick={(e) => { 
                        setPack1(true);  setPack1engage(true);  setPack2(false); 
                        setPack2engage(false);  setPack3(false); setPack3engage(false); }} 
                        color={Pack1 ? "primary" : "secondary"} >
                        <strong style={{fontSize:"30px"}}>:: 100</strong>
                    </Button>
                    
                    <Button onClick={(e) => { 
                        setPack1(false);  setPack1engage(false);  setPack2(true); 
                        setPack2engage(true);  setPack3(false); setPack3engage(false); }} 
                        color={Pack2 ? "primary" : "secondary"} >
                        <strong style={{fontSize:"30px"}}> :: 500</strong>
                    </Button>
                    
                    <Button onClick={(e) => { 
                        setPack3(true);  setPack3engage(true);  setPack2(false); 
                        setPack2engage(false);  setPack1(false); setPack1engage(false); }} 
                        color={Pack3 ? "primary" : "secondary"} >
                        <strong style={{fontSize:"30px"}}> :: 2500</strong>
                    </Button>
                
                <h2 style={{margin: "0px"}}>Orders Per-Month</h2>
                
            </div>


            <div style={{
                "marginLeft":"4vw",
                "background": "ghostwhite",
                "border": "1px solid lightgray",
                "maxWidth": "55vw",
                "padding": "20px",
                "display":'flex',
                "backgroundColor": "#fff",
                "borderRadius": "8px",
                "backgroundImage": "linear-gradient(135deg, transparent 0%, #fff 25%, #fff 75%, transparent 100%), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIklEQVQoU2N89+7dfwYsQEhIiBEkzDgkFGDzAbIY2Cv4AACvrBgJjYNGfwAAAABJRU5ErkJggg==)",
                "boxShadow": "0 0 10px rgba(0, 0, 0, 0.1)"}}>

                <div style={{fontSize:'20px',width:"60%"}}>
                  
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Historical Data  </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Unlimited team members </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Advanced reports </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Segmenting and filtering </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Dynamic product pricing for targeted segment </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Bulk edit and profit reporting </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Campaign tracking and analysis </p>
                    <p style={{color: "steelblue",textDecoration: "underline", textUnderlineOffset: "6px"}}> :: Multiple shop with single account and unlimited team members</p>
                    
                    { Pack1 && <h2 style={{fontFamily: "monospace","color": "red","textDecoration" : "none"}} > $20 / month</h2>  }
                    { Pack2 && <h2 style={{fontFamily: "monospace","color": "red","textDecoration" : "none"}} > $50 / month</h2>  }
                    { Pack3 && <h2 style={{fontFamily: "monospace","color": "red","textDecoration" : "none"}} > $100 / month</h2> }
                
                </div>
                    
                <div style={{fontSize:'20px',width:"40%"}}>

                    { Pack1 && <input type="checkbox" style={{ width: '25px', height: '25px' }} defaultChecked 
                        onClick={(e) => {setPack1engage(!Pack1engage);}}/>}
            
                    { Pack2 && <input type="checkbox" style={{ width: '25px', height: '25px' }} defaultChecked 
                        onClick={(e) => {setPack2engage(!Pack2engage);}}/>}
                    
                    { Pack3 &&<input type="checkbox" style={{ width: '25px', height: '25px' }} defaultChecked 
                        onClick={(e) => {setPack3engage(!Pack3engage);}}/>}

                    <strong> Add-on : Engage </strong>
                    
                    <p style={{color: "steelblue"}}> :: Automated email campaigns to reach and engage with specific customer segments effectively </p>
                    
                    { Pack1 && <h2 style={{fontFamily: "monospace","color": "red","textDecoration" : "none"}} > $10 / month </h2>}
                    { Pack2 && <h2 style={{fontFamily: "monospace","color": "red","textDecoration" : "none"}} > $20 / month </h2>}
                    { Pack3 && <h2 style={{fontFamily: "monospace","color": "red","textDecoration" : "none"}} > $50 / month </h2>}

                </div>    
                        
            </div>


            <div  style={{
                "marginLeft":"4vw",
                "width": "fit-content",
                "box-shadow": "rgba(0, 0, 0, 0.2) 0px 13px 8px 0px",
                "padding": "5px",
                "border": "1px solid palevioletred",
                "marginTop": "10px",
                "borderRadius": "40px",
                "background": "white"}}>

                <div>
               
                    { Pack1 && !Pack1engage && 
                    <Button> 
                    <a style={{fontFamily: "monospace","fontSize": "15px","color": "red","textDecoration" : "none"}} 
                    href={`https://server.shopex.io/subscription/initiate-subscription-process.php?email=${email}&o=${o}&p=1`}> 
                    Click here to Start with a <span style={{textDecoration:"underline"}}>15-day free trial</span> - without Email-campaign [$20/month after trial]</a>
                    </Button>  
                    }
                    { Pack1 && Pack1engage && 
                    <Button> 
                    <a style={{fontFamily: "monospace","fontSize": "15px","color": "red","textDecoration" : "none"}} 
                    href={`https://server.shopex.io/subscription/initiate-subscription-process.php?email=${email}&o=${o}&p=2`}> 
                        Click here to Start with a <span style={{textDecoration:"underline"}}>15-day free trial</span> - with Email-campaign [$30/month after trial]</a>
                    </Button> 
                    }
                    { Pack2 && !Pack2engage && 
                    <Button> 
                    <a style={{fontFamily: "monospace","fontSize": "15px","color": "red","textDecoration" : "none"}} 
                    href={`https://server.shopex.io/subscription/initiate-subscription-process.php?email=${email}&o=${o}&p=3`}> 
                        Click here to Start with a <span style={{textDecoration:"underline"}}>15-day free trial</span> - without Email-campaign [$50/month after trial]</a>
                    </Button>
                    }
                    { Pack2 && Pack2engage && 
                    <Button>
                    <a style={{fontFamily: "monospace","fontSize": "15px","color": "red","textDecoration" : "none"}} 
                    href={`https://server.shopex.io/subscription/initiate-subscription-process.php?email=${email}&o=${o}&p=4`}> 
                        Click here to Start with a <span style={{textDecoration:"underline"}}>15-day free trial</span> - with Email-campaign [$70/month after trial]</a>
                    </Button>
                    }
                    { Pack3 && !Pack3engage && 
                    <Button> 
                    <a style={{fontFamily: "monospace","fontSize": "15px","color": "red","textDecoration" : "none"}} 
                    href={`https://server.shopex.io/subscription/initiate-subscription-process.php?email=${email}&o=${o}&p=5`}> 
                        Click here to Start with a <span style={{textDecoration:"underline"}}>15-day free trial</span> - without Email-campaign [$100/month after trial]</a>
                    </Button>
                    }

                    { Pack3 && Pack3engage && 
                    <Button>
                    <a style={{fontFamily: "monospace","fontSize": "15px","color": "red","textDecoration" : "none"}} 
                    href={`https://server.shopex.io/subscription/initiate-subscription-process.php?email=${email}&o=${o}&p=6`}> 
                        Click here to Start with a <span style={{textDecoration:"underline"}}>15-day free trial</span> - with Email-campaign [$150/month after trial]</a>
                    </Button>    
                    }

                </div>
            
            </div>

        </>
    )
}

export default PickPlan