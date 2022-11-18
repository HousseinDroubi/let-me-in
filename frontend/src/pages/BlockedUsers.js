import React,{useState,useEffect} from 'react';
import NormalTitle from '../components/NormalTitle';
import Layout from '../components/Layout';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Box from '../components/Box';
import PageTitle from '../components/PageTitle';
import BlockedIcon from '../assets/images/blocked_icon.png';

const BlockedUsers= ()=> {
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
    const base_url = process.env.REACT_APP_BASE_URL;
    const[called,setCalled]=useState(false);
    const [blockedUsers,setBlockedUsers]=useState([]);

}
export default BlockedUsers;