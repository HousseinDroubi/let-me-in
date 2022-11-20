import React,{useState,useEffect} from 'react';
import NormalTitle from '../components/NormalTitle';
import Layout from '../components/Layout';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Box from '../components/Box';
import PageTitle from '../components/PageTitle';
import BlockedIcon from '../assets/images/blocked_icon.png';
import LayoutToggle from '../components/LayoutToggle';

const BlockedUsers= ()=> {
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
    const base_url = process.env.REACT_APP_BASE_URL;
    const[called,setCalled]=useState(false);
    const [blockedUsers,setBlockedUsers]=useState([]);
    const [isDrawerVisible,setIsDrawerVisible]=useState(false);
    
    // Here, we are asking from the server the blocked users (has status ='1')
    const getBlockedUsers = ()=>{

        const header = {
          headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };
        if (!called){
            axios.get(`${base_url}blocked_users`,header)
            .then(function (response) {
            if(response.data.data.length !==0){

                // Defining this array to push other sub arrays, then display them using map
                let array = [];
                response.data.data.forEach(element => {
                const sub_array = [];
                sub_array.push(element.id);
                sub_array.push(element.username);

                // Here, we are replacing the image path at the first by our IPv4
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


    const togglelayoutVisibility =()=>{
        if(isDrawerVisible){
            setIsDrawerVisible(false);
        }else{
            setIsDrawerVisible(true);
        }
    }


        if(blockedUsers.length!==0){
    
        return(
            <div className='land'>
                <Layout pageName='blocked' isDrawerVisible={isDrawerVisible} setIsDrawerVisible={setIsDrawerVisible}/>
                <div className='land-content'>
                    <LayoutToggle onClick={togglelayoutVisibility} className='position-static'/>
                    <div className='page-title'>
                        <PageTitle text='Blocked List'/>
                    </div>
    
                    {blockedUsers.map(( element,index) => {
                    const blockUser=()=>{
                        const header = {
                        headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
                        };
                    
                        const body = {
                        id: element[0]
                    };
    
                    axios.post(`${base_url}unblock_user`,body,header)
                    .then(function (response) {
                        console.log(response);
                        window.location.reload(false); 
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
    
    
                    }
        
                    return (
                    <div className='box-container' key={index}>
                    <Box  id={element[0]} username={element[1]} source={element[2]} car_type={element[3]} car_plate_number={element[4]} icon={BlockedIcon} onClick={blockUser}/>
                    </div> 
                    )
                } 
            )}
    
                </div>
            </div>
        );
        }
        
        else{
        
        return(
            <div className='land'>
                <Layout pageName='blocked'/>
                <div className='land-content empty'>
                    <NormalTitle title="No one is blocked yet" className='title-opacity'/>
                </div>
            
            </div>
            );
        }      

}
export default BlockedUsers;