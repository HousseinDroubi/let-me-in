import '../App.css';
import NormalTitle from './NormalTitle';
import Form from './Form';
import Label from './Label';
import Button from './Button';
import classnames from 'classnames';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const PopupPassword = (props)=>{
    const base_url = process.env.REACT_APP_BASE_URL;
    const myIPv4  = process.env.REACT_APP_MY_IPV4;

    const showDenyPopUp = (att)=>{
    props.setPopupDenyVisible(true);
    props.setAttention(att);
    }
    
    const closePopup=()=>{
        props.setPopupVisible(false);
    }
}
export default PopupPassword;