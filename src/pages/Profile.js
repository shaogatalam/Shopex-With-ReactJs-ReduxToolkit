import React, { useState } from "react";
import PersonalData from "../components/Profile/PersonalData";
import Plan from "../components/Profile/Plan";

import ReportIssue from "../components/Profile/ReportIssue";
import Shops from "../components/Profile/Shops";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Team from "../components/Profile/Team";

import { useSelector } from "react-redux";

function Profile() {

  var rolePower = useSelector((state) => state.dashTops.rolePower);
 
  var [PersonalData1, setPersonalData] = useState(true);
  var [Plan1, setPlan] = useState(false);
  var [Team1, setTeam] = useState(false);

  var [ReportIssue1, setReportIssue] = useState(false);
  var [Shops1, setShops] = useState(false);

  var product_sections = (section) => {
    
    setPersonalData(false);
    setPlan(false);
    setReportIssue(false);
    setShops(false);
    setTeam(false);

    if (section === "PersonalData1") {
      setPersonalData(true);
    }
    if (section === "Team1") {
      setTeam(true);
    } else if (section === "Plan1") {
      setPlan(true);
    } else if (section === "ReportIssue1") {
      setReportIssue(true);
    } else if (section === "Shops1") {
      setShops(true);
    }
  };

  return (
    <Grid container className="profile">
     
      {/* <Grid item md={12} className="top-wrap">
        <div className="notifications">
          <h6>Profile</h6>
          <div className="notify">
            <NavButton />
          </div>
        </div>
      </Grid> */}
      
      <Grid item md={12} sm={12} xs={12}>
      
        <br />
      
        <Grid item md={12} sm={12} xs={12}>
      
          <div className="tabs">
      
            <Button className={PersonalData1 === true ? "active" : null} value="PersonalData1" 
              onClick={(e)=>{product_sections(e.target.value);}}>
              Personal data
            </Button>

            {rolePower == 1 && 
              <Button className={Plan1 === true ? "active" : null} value="Plan1" 
              onClick={(e) => { product_sections(e.target.value);}}>  Plan </Button>
            }

            {rolePower == 1 && 
              <Button className={Team1 === true ? "active" : null} value="Team1" 
              onClick={(e) => { product_sections(e.target.value);}}>  Team </Button>
            }

            <Button className={ReportIssue1 === true ? "active" : null} value="ReportIssue1" 
            onClick={(e) => { product_sections(e.target.value); }}> 
              Report Issue 
            </Button>

            {rolePower == 1 && 
              <Button className={Shops1 === true ? "active" : null} value="Shops1" 
              onClick={(e) => { product_sections(e.target.value); }} >
                Shops
              </Button>
            }

          </div>

        </Grid>

        <div className="overlay">
          {PersonalData1 && <PersonalData />}

          {Plan1 && <Plan />}

          {Team1 && <Team />}

          {ReportIssue1 && <ReportIssue />}

          {Shops1 && <Shops />}
        </div>
      </Grid>
    </Grid>
  );
}

export default Profile;
