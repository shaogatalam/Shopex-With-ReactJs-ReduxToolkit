import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogIn } from '../features/dash/DashTopsSlice';
import './loading.css'; 
import Loader from './Loader';
import { demo } from '../features/profile/PersonalData';
import { useParams } from "react-router-dom";

function Demo() {

  var dispatch = useDispatch();
  var navigate = useNavigate();
  var navigateRef = useRef(navigate);
  var [isLoading, setIsLoading] = useState(true);

  var { type } = useParams();

  useEffect(() => {

    dispatch(demo());
    if (type === "woo") {
      dispatch(LogIn({ role: 1, shoptype: "woo",accountType:"demo" }));
      navigateRef.current('/dashboard');
    } else if (type === "shopify") {
      dispatch(LogIn({ role: 1, shoptype: "shopify",accountType:"demo" }));
      navigateRef.current('/dashboard');
    }
    setIsLoading(false);
  }, [type, dispatch]);

  return (

    <div>
      {isLoading ? (
        <Loader/>
      ) : (
        <></>
      )}
    </div>

  );
}

export default Demo;
