import React,{useRef,useState} from 'react';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import Title from '../components/Title';
import Label from '../components/Label';
import Checkbox from '../components/Checkbox';
import Text from '../components/Text';
import PopupDeny from '../components/PopupDeny';
import axios from 'axios';  
import  secureLocalStorage  from  "react-secure-storage";

const Login=()=> {
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
    const [isChecked, setIsChecked] = useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [popupDenyVisible,setPopupDenyVisible]=useState(false);
    const [attention,setAttention]=useState('');

    const showDenyPopUp = (att)=>{
        setPopupDenyVisible(true);
        setAttention(att);
      }

    const goToForgotPassword=()=>{
        navigate('/forgot_password');
    }  

    const navigateToEvents=()=>{
        navigate('/events');
    }
}