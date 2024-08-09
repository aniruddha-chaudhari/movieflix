import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/home/Homepage'
import Signuppage from './pages/Signuppage'
import Loginpage from './pages/Loginpage'
import { Toaster } from 'react-hot-toast'
import { useAuthstore } from './store/authUser'
import { Loader } from 'lucide-react'

const App = () => {
  const { user, ischeckingAuth,authCheck } = useAuthstore();
 

  useEffect(() => {
    authCheck();
    
  }, [authCheck]);

if(ischeckingAuth){

return (
  <div className='h-screen'>
    <div className='flex justify-center items-center bg-black h-full'>
    <Loader className='animate-spin text-red-100 size-10' />
    </div>
  </div>
)
}

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={!user? <Loginpage />:<Navigate to={'/'}/> } />
        <Route path="/signup" element={!user? <Signuppage />: <Navigate to={'/'}/>} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App