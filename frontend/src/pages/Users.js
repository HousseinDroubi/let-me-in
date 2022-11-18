import React from 'react';
import Title from '../components/Title';
import Layout from '../components/Layout';
import BoxUser from '../components/BoxUser';
import PopupDeny from '../components/PopupDeny';
import { useEffect, useState } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import PageTitle from '../components/PageTitle';
import AddUserButton from '../components/AddUserButton';
import PopUp from '../components/PopUp';

const Users=()=> {
    const base_url = process.env.REACT_APP_BASE_URL;
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
  
  const [called,setCalled]=useState(false);
  const[users,setUsers]=useState([]);
  const [popUpVisible,setPopupVisible]=useState(false);
  const [id,setId]=useState('');
  const [username,setUsername]= useState('');
  const [carType,setCarType]= useState('');
  const [plateNumber,setPlateNumber]= useState('');
  const [profile,setProfile]=useState(null);
  const [isAddingUser,setIsAddingUser]=useState(false);
  const [defaultt,setDefaultt]=useState(false);
  const [hasPicked,setHasPicked]=useState(false);
  const [popupDenyVisible,setPopupDenyVisible]=useState(false);
  const [attention,setAttention]=useState('');  

  const getUsers = ()=>{

    const header = {
      headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
    };
      if (!called){
           axios.get(`${base_url}users`,header)
           .then(function (response) {
            if(response.data.data.length !==0){
              let array = [];
              response.data.data.forEach(element => {
                const sub_array = [];
                sub_array.push(element.id);
                sub_array.push(element.username);
                if(element.profile_url!==null){
                    let profile_url = element.profile_url.substring(element.profile_url.indexOf("\\let-me-in\\"));
                    profile_url = myIPv4+profile_url;
                    profile_url = profile_url.replace(/\\/g,"/");
                    sub_array.push(profile_url);
                }else{
                    sub_array.push(element.profile_url);
                }
                sub_array.push(element.user_detail.car_type);
                sub_array.push(element.user_detail.car_plate_number);
                array.push(sub_array);
              });
            setUsers(array);
            }
        })
        .catch(function (error) {
          console.log(error);
        });
      
        setCalled(true);
      }
      }
      useEffect( () => {getUsers();});

      const showPopup = ()=>{

        setIsAddingUser(true);
        setUsername('');
        setCarType('');
        setPlateNumber('');
        setProfile(null);
        setPopupVisible(true);
        setDefaultt(true);
        
      }

}
export default Users;