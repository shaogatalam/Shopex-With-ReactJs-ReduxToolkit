import React, { useState, useRef} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogIn } from '../features/dash/DashTopsSlice';
import { useParams } from "react-router-dom";

var SetNewPassword = () => {

    var dispatch = useDispatch();

    var navigate = useNavigate();

    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');
    var [passwordMatch, setPasswordMatch] = useState(false);
    var navigateRef = useRef(navigate);

    var handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.currentTarget.value);
        setPasswordMatch(event.currentTarget.value === password);
    };

    var { id } = useParams();

    var handleSubmit = (event) => {
  
        event.preventDefault();

        var data = { id : id, password: password };

        axios.post('https://server.shopex.io/recover/set-new-password.php', data, {
            withCredentials: true,
        })
        .then(function (response) {
            //if (response.data === 1 || response.data === 2 || response.data === 3) {
                //dispatch(LogIn(response.data));
                navigateRef.current('/login');
            //} 
        })
        .catch(function (error) {
            console.log(error);
        });
    };
 

    return (
    
        <div style={{margin: "40vh"}}>
    
            <h3>Set new password</h3>
            
            <form onSubmit={handleSubmit}>
            
                <div>
                    <h6>Password:</h6>
                    <input style={{height: "40px", width: "300px", marginBottom: "20px"}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                
                <div>
                    <h6>Confirm Password:</h6>
                    <input style={{height: "40px", width: "300px", marginBottom: "20px"}} type="password"  value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                </div>

                {passwordMatch ? null : <p>Passwords do not match</p>}

                <p> <button type="submit"> Set new password </button> </p>
                
            </form>
        
        </div>
    
    )
}

export default SetNewPassword