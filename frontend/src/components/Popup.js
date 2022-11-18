import '../App.css';
import classnames from 'classnames';
import AcceptIcon from '../assets/images/accept.png';
import NormalTitle from '../components/NormalTitle';
import CircleImage from '../components/CircleImage';
import DefaultImage from  '../assets/images/default_image.png';
import Label from '../components/Label';
import Form from '../components/Form';  
import BoxButton from '../components/BoxButton';
import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';  

const PopUp = (props)=>{
    const base_url = process.env.REACT_APP_BASE_URL;  
    const showDenyPopUp = (att)=>{
      props.setPopupDenyVisible(true);
      props.setAttention(att);
    }
    const closePopup = async()=>{
        props.setDefaultt(true);
        props.setPopupVisible(false);
        props.setProfile('');
        props.setHasPicked(false);
    }

    const pickUpImage = ()=>{

        document.getElementById('input').click();
    }

    const imageHandler = (e)=>{
        try{
          const reader = new FileReader();
          reader.onload = () =>{
            if(reader.readyState === 2){
                props.setProfile(reader.result)
            }
          }
          reader.readAsDataURL(e.target.files[0])
          props.setHasPicked(true);
        }
        catch(e){
        }
      }
}
export default PopUp;