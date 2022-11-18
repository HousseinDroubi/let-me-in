import '../App.css';
import NormalTitle from '../components/NormalTitle';
import Label from '../components/Label';
import Form from '../components/Form';
import Button from '../components/Button';
import PopupDeny from '../components/PopupDeny';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const ForgotPassword=()=> {
    const navigate = useNavigate();
    const [text,setText]=useState("Send code");
    const [email,setEmail]=useState('');
    const [code,setCode]=useState('');
    const [password,setPassword]=useState('');
    const [rePassword,setRePassword]=useState('');
    const [isEmailVerified,setIsEmailVerified]=useState(false);
    const [isCodeVerified,setIsCodeVerified]=useState(false);
    const [popupDenyVisible,setPopupDenyVisible]=useState(false);
    const [attention,setAttention]=useState('');
    const base_url =process.env.REACT_APP_BASE_URL;
    
    const showDenyPopUp = (att)=>{
        setPopupDenyVisible(true);
        setAttention(att);
      }
}