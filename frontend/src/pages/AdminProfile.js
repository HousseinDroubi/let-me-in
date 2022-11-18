import React, { useState } from 'react';
import Button from '../components/Button';
import Label from '../components/Label';
import Form from '../components/Form';
import { useNavigate } from "react-router-dom";
import Title from '../components/Title';
import Layout from '../components/Layout';
import LargeImage from '../components/LargeImage';
import secureLocalStorage from 'react-secure-storage';
import DefaultImage from '../assets/images/default_image.png';
import PopupPassword from '../components/PopupPassword';
import PopupDeny from '../components/PopupDeny';
import axios from 'axios';

const AdminProfile=()=> {
    const base_url = process.env.REACT_APP_BASE_URL;
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
    const [profileImg,setProfileImg]=useState(localStorage.getItem("profile_url"));
    const [hasPicked,setHasPicked]=useState(false)
    const [email,setEmail]=useState(secureLocalStorage.getItem("email"));
    const [username,setUsername]=useState(secureLocalStorage.getItem("username"));
    const [popupVisible,setPopupVisible]=useState(false);
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [popupDenyVisible,setPopupDenyVisible]=useState(false);
    const [attention,setAttention]=useState('');
    const navigate = useNavigate();

    const showDenyPopUp = (att)=>{
        setPopupDenyVisible(true);
        setAttention(att);
      }

    const showImage = ()=>{
        document.getElementById('input').click();
    }  

    const imageHandler = (e)=>{
        try{
          const reader = new FileReader();
          reader.onload = () =>{
            if(reader.readyState === 2){
              setProfileImg(reader.result)
            }
          }
          reader.readAsDataURL(e.target.files[0])
          setHasPicked(true);
        }
        catch(e){
        }
      }  

}
  
export default AdminProfile;