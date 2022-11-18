import './App.css';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import BlockedUsers from './pages/BlockedUsers';
import Waiting from './pages/Waiting';
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/forgot_password' element={<ForgotPassword/>}/>
        <Route exact path='/events' element={<Events/>}/>
        <Route exact path='/users' element={<Users/>}/>
        <Route exact path='/blocked' element={<BlockedUsers/>}/>
        <Route exact path='/waiting' element={<Waiting/>}/>
        <Route exact path='/admin_profile' element={<AdminProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
