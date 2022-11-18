import React,{useEffect, useState} from 'react';
import NormalTitle from '../components/NormalTitle';
import DrawerButton from '../components/DrawerButton';
import Layout from '../components/Layout';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import waitingProfile from '../assets/images/waiting_profile.png';
import Label from '../components/Label';
import Form from '../components/Form';
import TextView from '../components/TextView';
import DecisionButton from '../components/DecisionButton';
import LargeImage from '../components/LargeImage';
import PopupDeny from '../components/PopupDeny';

const Waiting=()=> {
    const [isSomeoneWaiting,setIsSomeoneWaiting]= useState(false);
    const [id,setId]=useState('');
    const [username,setUsername]=useState('Unkown');
    const [carType,setCarType]=useState('Unkown');
    const [carPlateNumber,setCarPlateNumber]=useState('');
    const [arrivalTime,setArrivalTime]=useState('');
    const [decisionUser,setDecisionUser] = useState(2);
    const [profileImg,setProfileImg]= useState(waitingProfile);
    const[called,setCalled]=useState(false);
    const [hasPicked,setHasPicked]=useState(false);
    const base_url = process.env.REACT_APP_BASE_URL;
    const [popupDenyVisible,setPopupDenyVisible]=useState(false);
    const [attention,setAttention]=useState('');
}
  
export default Waiting;