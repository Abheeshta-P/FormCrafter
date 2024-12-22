import React from 'react'
import { logout } from '../features/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
  const dispacth = useDispatch();
  const logoutHandler = ()=>{
   try {
    // clear the details about status in the local storage
    dispacth(logout())
   } catch (error) {
    console.log("Logout button :: error",error);
   }
  }
  return (
    <>
    <button className='block px-4 py-[7px] font-semibold text-sm sm:text-base text-white bg-zinc-700 rounded-full hover:bg-zinc-900 transition duration-200 ease-in-out' onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default LogoutBtn