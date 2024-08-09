import React from 'react'
import { useAuthstore } from '../../store/authUser'
import Navbar from '../../components/Navbar';


const Homescreen = () => {
  return (
    <div>
      <Navbar/>
      <img src="/extraction.jpg" alt="Hero img" 
      className='absolute top-0 left-0 w-full h-full object-cover -z-50'
      />
    </div>
  )
}

export default Homescreen