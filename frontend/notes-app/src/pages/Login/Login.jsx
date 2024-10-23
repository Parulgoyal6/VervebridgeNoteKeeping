import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import assets from '../../assets/images/login.svg'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [error, setError] =useState(null);

  const handleLogin = async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");
    
    //Login API call

    try{
      const response = await axiosInstance.post("/login",{
        email: email,
        password: password,
      });

      //handle successful login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }

    }catch(error){
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
        }
        else{
          setError("An Unexpected error occurred. Please try again !!!");
        }
    }
  }

  return (
    <>
    <Navbar/>

    <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className="flex w-full max-w-6xl">
          
          {/* Left Side with Image */}
          <div
            className="w-1/2 flex items-center justify-center"
          >
            <img src={assets} alt="Login Illustration" className="max-w-sm h-auto" />
          </div>
           <div className='w-1/2 flex items-center justify-center'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type='text' placeholder='Email' className='input-box' value={email} onChange={(e)=> setEmail(e.target.value)}/>
          
          
          <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>

          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button type='submit' className='btn-primary'>Login now</button>

          </form>
          <p className='text-sm text-center mt-4'>
            Not registered Yet?{" "}<Link to="/signup" className="font-medium text-primary underline">Create an Account</Link>
          </p>
        </div>
        </div>
       </div>
       </div>
    </>


    
   
  )
}

export default Login