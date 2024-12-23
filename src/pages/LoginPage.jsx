import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login as storeLogin } from '../features/authSlice.js';
import { initializeForms } from '../features/formsSlice.js';
import { Input, Button } from '../components/index.js';

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const isLoggedIn = useSelector(state => state.auth.status);

  useEffect(()=>{
    if(isLoggedIn) navigate('/dashboard')
  },[])

  const login = async (data) => {
    setError('');
    if (data.email == '' || data.password == '') {
      return;
    }
    try {
      // backend call is done
      dispatch(storeLogin({ status: true, userData: { email : data.email } }))
      dispatch(initializeForms({ email : data.email }))
      navigate('/dashboard');
    } catch (error) {
      console.log("login form :: login :: error", error);
    }
  }

  return (
    <div className='flex items-center justify-center w-full text-black'>
      <div className={`w-[85%] mx-auto md:w-full md:max-w-lg bg-zinc-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">Don&apos;t have any account?&nbsp;<Link to="#" className="font-medium text-primary transition-all duration-200 hover:underline">Sign Up</Link></p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input label='Email : ' type='email' placeholder='Enter your Email' required {...register('email', { required: true, validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", } })} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <Input label='Password : ' type='password' placeholder='Enter your Password' required {...register('password', { required: true, minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <Button children={'Log in'} type='submit' className={'w-full'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
