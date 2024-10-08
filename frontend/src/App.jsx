import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/home/Homepage'
import Signuppage from './pages/Signuppage'
import Loginpage from './pages/Loginpage'
import WatchPage from './pages/WatchPage'
import { Toaster } from 'react-hot-toast'
import { useAuthstore } from './store/authUser'
import { Loader } from 'lucide-react'
import SearchPage from './pages/SearchPage'
import SearchHistorypage from './pages/SearchHistorypage'
import SearchHistoryPage from './pages/SearchHistorypage'

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
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <SearchHistoryPage/> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App