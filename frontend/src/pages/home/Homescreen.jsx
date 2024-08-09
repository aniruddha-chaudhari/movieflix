import React from 'react'
import { useAuthstore } from '../../store/authUser'
import Navbar from '../../components/Navbar';


const Homescreen = () => {
  return (
    <div>
      <h1>Welcome to the homepage</h1>
      <Navbar />
    </div>
  )
}

export default Homescreen