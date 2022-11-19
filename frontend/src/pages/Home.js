import React from 'react';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/letmein-logo.png';
import NormalTitle from '../components/NormalTitle';

const Home=()=> {

    const navigate = useNavigate();

    function navigateToLogin(){
      navigate('/login');
    }
    
    return (
      
        <div className='home'>
          <NormalTitle title="Let me in" className='mb-98'/>
          <img src={logo} alt="logo" className='image-logo'/>
          <Button name={"Get Started"} onClick={navigateToLogin}  className='mt-80'></Button>
        </div>
      );
}
  
export default Home;