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

    const  checkEmailAndPassword = ()=>{
        if(email===''){
          showDenyPopUp("Email should not be empty.");
        }else if(!email.includes("@")){
          showDenyPopUp("Invalid email.");
        }
        else{
        const body = {
          email: email,
          password: password
      };
      
         axios.post(`${base_url}login`, body)
          .then(function (response) {
            if(response.status===200){
              localStorage.clear();
              secureLocalStorage.clear();
              secureLocalStorage.setItem("token",response.data.access_token);
              const header = {
                headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
            };
                  axios.get(`${base_url}get_barrier_status`,header)
                  .then(function (response) {
                        localStorage.setItem("barrier_status",response.data);
                  })
                  .catch(function (error) {
                    showDenyPopUp("Someting went wrong.");
                  });
      
                   axios.get(`${base_url}get_admin_data`,header)
                  .then(function (response) {
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
}

  
export default Login;