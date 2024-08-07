import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Signuppage from './pages/Signuppage'
import Loginpage from './pages/Loginpage'

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<Loginpage/>} />
    <Route path="/signup" element={<Signuppage />} />
  </Routes>
  )
}

export default App