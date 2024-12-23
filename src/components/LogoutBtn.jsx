import React from 'react'
import { logout } from '../features/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { formCreationUtils } from '../util';

function LogoutBtn() {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.userData?.email);
  
  const logoutHandler = ()=>{
   try {
    // clear the details about status in the local storage
    dispatch(logout());

    // clear the temp form which is left un finished before logout
    formCreationUtils.clearTempForm(userEmail);
    
   } catch (error) {
    console.log("Logout button :: error",error);
   }
  }
  return (
    <>
    <button className='block px-4 py-[7px] font-semibold text-sm sm:text-base text-white bg-zinc-700 rounded-full hover:bg-zinc-800 transition duration-200 ease-in-out' onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default LogoutBtn