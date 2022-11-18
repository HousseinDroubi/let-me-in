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

    const changePassword = ()=>{
        if(props.oldPassword==='')
          showDenyPopUp("Old password should not be empty.");
        else if(props.newPassword==='')
          showDenyPopUp("Please enter your password.");
        else if(props.confirmPassword==='')
          showDenyPopUp("Please re-enter your password.");
        else if((props.newPassword.length<5 || props.newPassword.length>30) || (props.confirmPassword.length<5 || props.confirmPassword.length>30))
        showDenyPopUp("Password must be between 5 and 30 characters.");
        else if(props.newPassword!==props.confirmPassword) 
          showDenyPopUp("Passwords not match."); 
        else if(props.oldPassword===props.newPassword){
          showDenyPopUp("Already same password!!"); 
        }  
        else{  
        
            const body={
                old_password:props.oldPassword,
                new_password:props.newPassword
            };
            
            const header = {
                headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
            };
                
                    axios.post(`${base_url}change_admin_password`,body,header)
                    .then(function (response) {
                    if(response.data.message==='Wrong Password'){
                        
                        showDenyPopUp("Wrong Password."); 
                    }else{
                        showDenyPopUp("Password changed successfully"); 
                        props.setOldPassword("");
                        props.setNewPassword("");
                        props.setConfirmPassword("");
                    }
                })
                .catch(function (error) {
                    showDenyPopUp("Something went wrong."); 
                });
        }
    }
}
export default PopupPassword;