import '../App.css';
import classnames from 'classnames';
import DrawerButton from '../components/DrawerButton';
import Circle from './Circle';
import CircleImage from './CircleImage';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import secureLocalStorage from 'react-secure-storage';
import ModeTitle from './ModeTitle';

const Layout = (props)=>{

    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    const [isTurnedOnBlue,setIsTurnedOnBlue] = useState(false);
    const [isTurnedOnGreen,setIsTurnedOnGreen] = useState(false);
    const [isTurnedOnRed,setIsTurnedOnRed] = useState(false);

    const getBarrierStatus= ()=>{
        const barrier_status= localStorage.getItem("barrier_status");
            if(barrier_status==='normal'){
                setIsTurnedOnBlue(true);
            }
            else if(barrier_status==='opened'){
                setIsTurnedOnGreen(true);
            }
            else if(barrier_status==='closed'){
                setIsTurnedOnRed(true);
            }
    }
    useEffect(() => {getBarrierStatus();
      });
}
export default Layout;