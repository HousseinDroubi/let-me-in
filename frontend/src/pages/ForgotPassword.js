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

      const checkEmail = ()=>{
        
        if(email===''){
            showDenyPopUp("Email cannot be empty.");
        }else if(!email.includes("@")){
            showDenyPopUp("Invalid email.");
        }
        else{
        const body = {
            email: email
        };
        
        axios.post(`${base_url}send_code`, body)
            .then(function (response) {
                if(response.data.message==="done"){
                    showDenyPopUp("Code sent.. Please check your email.");
                    setText("Verify code");
                    setIsEmailVerified(true);
                }else{
                    showDenyPopUp("This email isn't exist.");
                }
            })
            .catch(function (error) {
                showDenyPopUp("Someting went wrong.");
            });
        }
    }
    
    
    const checkCode = ()=>{
        if(code.length<6){
            showDenyPopUp("Code must be 6 characters.");
        }
        else{
        const body = {
            email: email,
            code:code
        };
        
        axios.post(`${base_url}verify_code`, body)
            .then(function (response) {

                if(response.data.message==="Email not exist."){
                    showDenyPopUp("Email changed.");
                }else if(response.data.message==="wrong code"){
                    showDenyPopUp("Wrong code.");
                }else if(response.data.message==="correct code"){
                    showDenyPopUp("Done, please change your password.");
                    setIsCodeVerified(true);
                    setText("Change Password");

                }
            })
            .catch(function (error) {
                showDenyPopUp("Something went wrong");
            });
        }
    }
    
    const changePassword = ()=>{
        if(password!==rePassword){
            showDenyPopUp("Passwords don't match.")
        }else if(password.length<5 || password.length>30){
            showDenyPopUp("Password must be between 5 and 30 characters.")
        }
        else{
        const body = {
            email: email,
            code:code,
            password:password
        };

        axios.post(`${base_url}change_forgotten_password`, body)
            .then(function (response) {
                if(response.data.message==="Email not exist."){
                    showDenyPopUp("Email changed.");
                }else if(response.data.message==="Password changed."){
                    navigate('/login');
                }else{
                    showDenyPopUp("Something went wrong");
                    

                }
            })
            .catch(function (error) {
                showDenyPopUp("Something went wrong");
            });
        }
    }


}