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

    const getBlockedUsers = ()=>{

        const header = {
          headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };
        if (!called){
            axios.get(`${base_url}blocked_users`,header)
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

                setBlockedUsers(array);
            }
        })
        .catch(function (error) {
            
        });
        
        setCalled(true);
          }
         
          }
          useEffect( () => {getBlockedUsers();});

}
export default BlockedUsers;