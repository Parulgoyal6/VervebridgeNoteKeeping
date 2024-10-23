import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../assets/images/wings.png'

const Home = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () =>{
        navigate('/signup')
    }
  return (
    <div style={{   backgroundImage: `url(${assets})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Set height to 100% of the viewport
    width: '80vw',  // Ensure it takes the full width
    display: 'flex',  // Use flexbox for centering
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
     }}>
    
    <div>
        <button className='flex items-center justify-center bg-slate-500 w-26 border rounded px-8 py-4 w-64'  onClick={handleSignUpClick}>Click here</button>
    </div>
    </div>
  )
}

export default Home