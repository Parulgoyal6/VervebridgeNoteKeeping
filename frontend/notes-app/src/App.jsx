import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Home from './pages/Home/Home.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App