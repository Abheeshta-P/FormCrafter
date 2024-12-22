import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Protected({
  children,
}) {
  const authorized = true;
  const storeAuthStatus = useSelector(state => state.authSliceReducer.status);
  const navigate  = useNavigate();
  const [loader,setLoader] = useState(true);
  useEffect(()=>{
    // If not logged in
    if(storeAuthStatus!==authorized){
      navigate('/login');
    }
    setLoader(false);
  },[storeAuthStatus,navigate]);
  return loader?<h1>Loading...</h1> : <>{children}</>
}

export default Protected;
