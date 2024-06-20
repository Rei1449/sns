import './App.css'
import Home from './home_and_profile/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import Login from './login_and_register/Login.tsx'
import Register from './login_and_register/Register.tsx'
import Profile from './home_and_profile/Profile.tsx'
import Notfound from './Notfound.tsx'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/profile/:userId" element={ <Profile /> } />
        <Route path="/*" element={ <Notfound /> } />
      </Routes>
    </div>
  )
}

export default App
