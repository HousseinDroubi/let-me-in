import React, { useState } from 'react';
import Button from '../components/Button';
import Label from '../components/Label';
import Form from '../components/Form';
import { useNavigate } from "react-router-dom";
import NormalTitle from '../components/NormalTitle';
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

    const showPopup = ()=>{
    setPopupVisible(true);
    } 
    
    const logoutFromWebsite = ()=>{
        localStorage.clear();
        secureLocalStorage.clear();
        navigate('/login');
      }

      const editData = ()=>{
        if(email==secureLocalStorage.getItem("email") && username==secureLocalStorage.getItem("username") &&!hasPicked){
          showDenyPopUp("Update at least one element.");
        }else if(email===''){
          showDenyPopUp("Email should not be empty.");
        }else if(!email.includes("@")){
          showDenyPopUp("Invalid email.");
        }else if(username===''){
          showDenyPopUp("Usenrame should not be empty.");
        }else if(username.length<3 || username.length>20){
          showDenyPopUp("Username must be between 3 and 20 characters.");
        }else{
      
        const body={};
        
        if(hasPicked){
          body.profile_url = profileImg.split(',')[1].replace(/"/g,"/");
        }
        if(email!=secureLocalStorage.getItem("email")){
          body.email=email
        }
        if(username!=secureLocalStorage.getItem("username")){
          body.username=username
        }
        const header = {
          headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };
          
              axios.post(`${base_url}update_admin_data`,body,header)
              .then(function (response) {
                secureLocalStorage.setItem("email",response.data.data.email);
                secureLocalStorage.setItem("username",response.data.data.user.username);
                let profile_url = response.data.data.user.profile_url.substring(response.data.data.user.profile_url.indexOf("\\let-me-in\\"));
                profile_url = myIPv4+profile_url;
                profile_url = profile_url.replace(/\\/g,"/");
                localStorage.setItem("profile_url",profile_url);
                showDenyPopUp("Data updated successfully.");
              })
            .catch(function (error) {
              showDenyPopUp("Something went wrong.");
            });
          }
      }

      return (
        <>
          <PopupPassword className={popupVisible?'visiblity-visible':'visiblity-hidden'}  setPopupVisible={setPopupVisible} oldPassword={oldPassword} newPassword={newPassword} confirmPassword={confirmPassword} setOldPassword={setOldPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} setPopupDenyVisible={setPopupDenyVisible} setAttention={setAttention}/>
          <PopupDeny className={popupDenyVisible?'visiblity-visible':'visiblity-hidden'} setPopupDenyVisible={setPopupDenyVisible} attention={attention}/>
          <div className='land'>
            <Layout pageName='profile'/>
            <div className='land-content'>
                <NormalTitle title="Edit Profile"/>
                <LargeImage source={profileImg===null?DefaultImage:profileImg} onClick={showImage}/>
                <div className='admin-profile-fields'>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} className='display-none'/>
                    <Label  title={"Email"} />
                    <Form setText={setEmail} value = {email} text = {email}/>
                    <Label  title={"Username"} />
                    <Form setText={setUsername} value = {username} text = {username}/> 
                    <Button name={"Change Password"} className='mt-33' onClick={showPopup}/>
                    <Button name={"Edit Data"} className='mt-33 mb-20' onClick={editData}/>
                    <Button name={"Logout"} className='mt-33 mb-20 decision-button-red-background' onClick={logoutFromWebsite}/>
                </div>
            </div>
  
        </div>
        </>
      );

}
  
export default AdminProfile;