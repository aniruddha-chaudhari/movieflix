import React from 'react'


import Homescreen from './Homescreen';
import Authscreen from './Authscreen';
import { useAuthstore } from '../../store/authUser';



const Homepage = () => {
  const {user} = useAuthstore();
  return (
    <>
      {user ? <Homescreen /> : <Authscreen />}
    </>
  )
}

export default Homepage;