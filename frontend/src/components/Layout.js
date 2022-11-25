import '../App.css';
import LayoutButton from './LayoutButton';
import Circle from './Circle';
import CircleImage from './CircleImage';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import secureLocalStorage from 'react-secure-storage';
import ModeTitle from './ModeTitle';
import LayoutToggle from './LayoutToggle';

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

      const changeBarrierStatus=(status)=>{

        const header = {
            headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };

        const body={
            status:status
        };

        axios.post(`${base_url}change_barrier_status`,body,header)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }   

    const turnOfCircles = ()=>{
        setIsTurnedOnBlue(false);
        setIsTurnedOnGreen(false);
        setIsTurnedOnRed(false);
    }
    const blueToggeled= ()=>{

        if(!isTurnedOnBlue){
            changeBarrierStatus(2);
            localStorage.setItem("barrier_status","normal");
            turnOfCircles();
            setIsTurnedOnBlue(true);
        }

    }
    const greenToggeled= ()=>{

        if(!isTurnedOnGreen){
            changeBarrierStatus(1);
            localStorage.setItem("barrier_status","opened");
            turnOfCircles();
            setIsTurnedOnGreen(true);
        }

    }
    const redToggeled= ()=>{

        if(!isTurnedOnRed){
            changeBarrierStatus(0);
            localStorage.setItem("barrier_status","closed");
            turnOfCircles();
            setIsTurnedOnRed(true);
        }

    }

    const navigateToEvents = ()=>{
        navigate('/events');
    }

    const navigateToUsers = ()=>{
        navigate('/users');
    }

    const navigateToBlocked = ()=>{
        navigate('/blocked');
    }

    const navigateToWaiting = ()=>{
        navigate('/waiting');
    }

    const navigateToProfile=()=>{
        navigate('/admin_profile');
    }

    const togglelayoutVisibility =()=>{

        if(props.isDrawerVisible){
            props.setIsDrawerVisible(false);
        }else{
            props.setIsDrawerVisible(true);
        }

    }

    return (
        <div className={props.isDrawerVisible?'display-block':'display-none'}>
            <div className='drawer'>
                <LayoutToggle onClick={togglelayoutVisibility}/>
                <ModeTitle title= {'Modes'}/>
                <div className='modes-circles'>
                    <Circle isTurnedOn={isTurnedOnBlue} turnedOnStyle='backgorund-mode-blue' turnedOffStyle='backgorund-border-mode-blue' onClick={blueToggeled} title="Normal"/>
                    <Circle isTurnedOn={isTurnedOnGreen} turnedOnStyle='backgorund-mode-green' turnedOffStyle='backgorund-border-mode-green' onClick={greenToggeled} title="Open"/>
                    <Circle isTurnedOn={isTurnedOnRed} turnedOnStyle='backgorund-mode-red' turnedOffStyle='backgorund-border-mode-red' onClick={redToggeled} title="Close"/>
                </div>
                <div className='layout-buttons'>
                    <LayoutButton name={"Home"} onClick={navigateToEvents} className={props.pageName==='events'?'button-drawer-background-blue':'button-drawer-background-navy'}/>
                    <LayoutButton name={"All Users"} onClick={navigateToUsers} className={props.pageName==='users'?'button-drawer-background-blue':'button-drawer-background-navy'}/>
                    <LayoutButton name={"Blocked List"} onClick={navigateToBlocked} className={props.pageName==='blocked'?'button-drawer-background-blue':'button-drawer-background-navy'}/>
                    <LayoutButton name={"Waiting"} onClick={navigateToWaiting} className={props.pageName==='waiting'?'button-drawer-background-blue':'button-drawer-background-navy'}/>
                </div>
                <div className='layout-info' onClick = {navigateToProfile}>
                    <CircleImage source={localStorage.getItem("profile_url")}/>
                    <ModeTitle title={secureLocalStorage.getItem("username")}/>
                </div>
            </div>
        </div>
        );

}
export default Layout;