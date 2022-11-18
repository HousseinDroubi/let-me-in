import React,{useEffect, useState} from 'react';
import NormalTitle from '../components/NormalTitle';
import DrawerButton from '../components/DrawerButton';
import Layout from '../components/Layout';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import waitingProfile from '../assets/images/waiting_profile.png';
import Label from '../components/Label';
import Form from '../components/Form';
import TextView from '../components/TextView';
import DecisionButton from '../components/DecisionButton';
import LargeImage from '../components/LargeImage';
import PopupDeny from '../components/PopupDeny';

const Waiting=()=> {
    const [isSomeoneWaiting,setIsSomeoneWaiting]= useState(false);
    const [id,setId]=useState('');
    const [username,setUsername]=useState('Unkown');
    const [carType,setCarType]=useState('Unkown');
    const [carPlateNumber,setCarPlateNumber]=useState('');
    const [arrivalTime,setArrivalTime]=useState('');
    const [decisionUser,setDecisionUser] = useState(2);
    const [profileImg,setProfileImg]= useState(waitingProfile);
    const[called,setCalled]=useState(false);
    const [hasPicked,setHasPicked]=useState(false);
    const base_url = process.env.REACT_APP_BASE_URL;
    const [popupDenyVisible,setPopupDenyVisible]=useState(false);
    const [attention,setAttention]=useState('');

    const showDenyPopUp = (att)=>{
        setPopupDenyVisible(true);
        setAttention(att);
      }


    const UpdateUser=(decision)=>{
        if(username.length<3 || username.length>20)
          showDenyPopUp("Username must be between 3 and 20 characters.");
        else if(carType<3 || carType.length>20)  
          showDenyPopUp("Car type must be between 3 and 20 characters.");
        else if(carPlateNumber.length<2 || carPlateNumber.length>7)
          showDenyPopUp("Car pate number must be between 2 and 7 characters.");
        else {
        
        const body={
          id:id,
          username:username,
          car_type:carType,
          car_plate_number:carPlateNumber,
          decision:decision
        };
        if(hasPicked){
          body.profile_url = profileImg.split(',')[1].replace(/"/g,"/");
        }
      
        const header = {
          headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };
          
              axios.post(`${base_url}edit_user`,body,header)
              .then(function (response) {
              setIsSomeoneWaiting(false);
              showDenyPopUp("User updated successfully");
            })
            .catch(function (error) {
            });
          
          }
       } 

    const rejectWaitingUser=()=>{
    UpdateUser(1);
    }

    const acceptWaitingUser=()=>{
    UpdateUser(0);
    }  

    const formatter = new Intl.DateTimeFormat("en-GB", {
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12: true
    });

    const getWaitingUser = async()=>{

        const header = {
          headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };
          
      if(!called){
            await axios.get(`${base_url}waiting_user`,header)
            .then(function (response) {

              setIsSomeoneWaiting(response.data.data===null?false:true);
              if(isSomeoneWaiting){
                setId(response.data.data.id);
                setUsername(response.data.data.username);
                setCarType(response.data.data.user_detail.car_type);
                setCarPlateNumber(response.data.data.user_detail.car_plate_number);
                const time = formatter.format(Date.parse(response.data.data.created_at))
                setArrivalTime(time);
                setCalled(true);
              }
            })
            .catch(function (error) {
              showDenyPopUp("Something went wrong.");
            });
          }
      }

      useEffect(() => {getWaitingUser();});
    
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

    const showImage = ()=>{
    document.getElementById('input').click();
    }  
}
  
export default Waiting;