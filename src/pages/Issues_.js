import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";

function Issues_() {

    var navigate    = useNavigate();
    var navigateRef = useRef(navigate);

    var [table,setTable] = useState();
    
    useEffect(() => {
        var fetchData = async () => {
          try {
            var response = await axios.get('https://server.shopex.io/issue-list.php',{},{withCredentials: true});
            setTable(response.data.issue_table);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    },[]); 


    const Log_Out = (event, index) => {
    
        event.preventDefault();
        axios.post('https://server.shopex.io/logout.php', {} , { withCredentials: true })
        .then(function (response) {
            navigateRef.current('/');
        })
        .catch(function (error) {
            console.log(error);
        })
    };
      
    return (

        <div style={{ left: '25%', position: 'relative' }}>
            
            <button onClick = {Log_Out} style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                        cursor:'pointer',height:'35px',width:'75px',
                                        fontSize:'17px',color:'red',
                                        border:'1px solid green',
                                        background:'white'}}>Logout  
            </button>

            <h3 style={{color:"white"}}> Issue's </h3>
            
            {table && table.map((issue, index) => (
                
                <div key={index} style={{ border: "1px solid #ccc", backgroundColor: "#f9f9f9", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: "10px", marginBottom: "10px", }}  >
                    <p style={{ marginBottom: "5px" }}> <strong> Shop ID : </strong> {issue.shopid}, <strong> Owner ID : </strong>{issue.ownerid} </p>
                    <p style={{ marginTop: "5px" }}>
                        <strong> Issue : </strong> {issue.issue}
                    </p>
                </div>

            ))}

        </div>
    )
}

export default Issues_