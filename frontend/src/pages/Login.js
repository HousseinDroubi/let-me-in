import React,{useState} from 'react';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import NormalTitle from '../components/NormalTitle';
import Label from '../components/Label';
import SamllText from '../components/SamllText';
import PopupDeny from '../components/PopupDeny';
import axios from 'axios';  
import  secureLocalStorage  from  "react-secure-storage";

const Login=()=> {

    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [popupDenyVisible,setPopupDenyVisible]=useState(false);
    const [attention,setAttention]=useState('');

    const showDenyPopUp = (att)=>{
        setPopupDenyVisible(true);
        setAttention(att);
      }

    const navigateToForgotPassword=()=>{
        navigate('/forgot_password');
    }  

    const navigateToEvents=()=>{
        navigate('/events');
    }

    // Here we are checking email and password of the admin.
    const  checkEmailAndPassword = ()=>{
        if(email===''){
          showDenyPopUp("Email should not be empty.");
        }else if(!email.includes("@")){
          showDenyPopUp("Invalid email.");
        }else if(password===''){
            showDenyPopUp("Password should not be empty.");
        }
        else{
          const body = {
            email: email,
            password: password
          };
      
          // Send the request using axios
         axios.post(`${base_url}login`, body)
          .then(function (response) {
            if(response.status===200){

              // Clear the memory first, then, save the token
              localStorage.clear();
              secureLocalStorage.clear();
              secureLocalStorage.setItem("token",response.data.access_token);
              const header = {
                headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
            };
                  axios.get(`${base_url}get_barrier_status`,header)
                  .then(function (response) {
                    
                      // Save the barrier status in the memory
                        localStorage.setItem("barrier_status",response.data);
                  })
                  .catch(function (error) {
                    showDenyPopUp("Someting went wrong.");
                  });
      
                   axios.get(`${base_url}get_admin_data`,header)
                  .then(function (response) {
      
                    // Save the email, username and profile url of the admin in the memory
                    secureLocalStorage.setItem("email",response.data.email);
                    secureLocalStorage.setItem("username",response.data.user.username);
                    let profile_url = response.data.user.profile_url.substring(response.data.user.profile_url.indexOf("\\let-me-in\\"));
                    profile_url = myIPv4+profile_url;
                    profile_url = profile_url.replace(/\\/g,"/");
                    localStorage.setItem("profile_url",profile_url);
                  })
                  .catch(function (error) {
                    showDenyPopUp("Someting went wrong.");
                  });
                  navigateToEvents();
            }
      
          })
          .catch(function (error) {
            showDenyPopUp("Wrong email or password.");
          });
      }}
      return (
            <>
            <div className='home'>
                <NormalTitle title="Here you can login :)"/>
                
                <div className='login-contents'>
                  <Label title={"Email"} />
                  <Form value={email} setText={setEmail}/>
                  <Label  title={"Password"} className='mt-33'/>
                  <Form setText={setPassword} value = {password}  type="password"/>
                </div>
                <Button name={"Login"} className='mt-53' onClick={checkEmailAndPassword}/>
                <div className='login-forgot-password'>
                  <SamllText className='text-decoration-underline cursor-pointer mt-13' text="Forgot password?" onClick={navigateToForgotPassword}/>
                </div>
                <PopupDeny className={popupDenyVisible?'visiblity-visible':'visiblity-hidden'} setPopupDenyVisible={setPopupDenyVisible} attention={attention}/>
            </div>
            </>
      );
}

  
export default Login;