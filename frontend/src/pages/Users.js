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


}
export default Users;