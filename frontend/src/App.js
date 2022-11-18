import './App.css';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
// require('dotenv').config()
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/forgot_password' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
