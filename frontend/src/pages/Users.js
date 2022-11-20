import React from 'react';
import NormalTitle from '../components/NormalTitle';
import Layout from '../components/Layout';
import BoxUser from '../components/BoxUser';
import PopupDeny from '../components/PopupDeny';
import { useEffect, useState } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import PageTitle from '../components/PageTitle';
import AddUserButton from '../components/AddUserButton';
import Popup from '../components/Popup';
import LayoutToggle from '../components/LayoutToggle';

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
  const [isDrawerVisible,setIsDrawerVisible]=useState(true);
    // Here, we are getting the users who aren't blocked (has status = '0')
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

      const togglelayoutVisibility =()=>{
        if(isDrawerVisible){
            setIsDrawerVisible(false);
        }else{
            setIsDrawerVisible(true);
        }
    }

      if(users.length!==0){
        return (
          <> 

            <Popup className={popUpVisible?'visiblity-visible':'visiblity-hidden'} setPopupVisible={setPopupVisible} id={id} username={username} carType={carType} plateNumber={plateNumber} profile={profile} hasPicked={hasPicked} setUsername={setUsername} setCarType={setCarType} setPlateNumber={setPlateNumber} setProfile={setProfile} isAddingUser={isAddingUser} setIsAddingUser={setIsAddingUser} setDefaultt={setDefaultt} setHasPicked={setHasPicked} setPopupDenyVisible={setPopupDenyVisible} attention={attention} setAttention={setAttention}/>
            <PopupDeny className={popupDenyVisible?'visiblity-visible':'visiblity-hidden'} setPopupDenyVisible={setPopupDenyVisible} attention={attention}/>
        
            <div className='land display-none'>
                <Layout pageName='users' isDrawerVisible={isDrawerVisible} setIsDrawerVisible={setIsDrawerVisible}/>
                <div className='land-content'>
                <LayoutToggle onClick={togglelayoutVisibility} className='position-static'/>
                    <div className='page-title page-title-users'>
                        <PageTitle text='All Users'/>
                        <AddUserButton onClick={showPopup}/>
                    </div>

                    {users.map((element,index)=>{
                        return (
                            <div className='box-container' key={index}>
                            <BoxUser id = {element[0]} username={element[1]} source ={element[2]} car_type={element[3]} status='block' car_plate_number={element[4]} base_url={base_url} element={element} setPopupVisible={setPopupVisible} setUsername={setUsername} setCarType={setCarType} setPlateNumber={setPlateNumber} setProfile={setProfile} setIsAddingUser={setIsAddingUser} setDefaultt={setDefaultt} defaultt={defaultt} setId={setId}/>
                            </div> 
                            );
                    })}

                </div>
            </div>
        
          </>
        );
      }else{
        return(
          <>
            <Popup className={popUpVisible?'visiblity-visible':'visiblity-hidden'} setPopupVisible={setPopupVisible} username={username} carType={carType} plateNumber={plateNumber} profile={profile} hasPicked={hasPicked} setUsername={setUsername} setCarType={setCarType} setPlateNumber={setPlateNumber} setProfile={setProfile} isAddingUser={isAddingUser} setIsAddingUser={setIsAddingUser} setDefaultt={setDefaultt} setHasPicked={setHasPicked}  setPopupDenyVisible={setPopupDenyVisible} attention={attention} setAttention={setAttention}/>
            <PopupDeny className={popupDenyVisible?'visiblity-visible':'visiblity-hidden'} setPopupDenyVisible={setPopupDenyVisible} attention={attention}/>
            <div className='land'>
                <Layout pageName='users'/>
                <div className='add-users-button'>
                    <AddUserButton onClick={showPopup}/>
                </div> 
                <div className='land-content empty'>
                    <NormalTitle title="Start adding your users now" className='title-opacity'/>
                </div>
            </div>
         </>
         );
      }
}
export default Users;