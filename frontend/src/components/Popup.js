import '../App.css';
import classnames from 'classnames';
import AcceptIcon from '../assets/images/accept-icon.png';
import NormalTitle from '../components/NormalTitle';
import CircleImage from '../components/CircleImage';
import DefaultImage from  '../assets/images/default_image.png';
import Label from '../components/Label';
import Form from '../components/Form';  
import BoxButton from '../components/BoxButton';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';  

const PopUp = (props)=>{
    const base_url = process.env.REACT_APP_BASE_URL;  
    const showDenyPopUp = (att)=>{
      props.setPopupDenyVisible(true);
      props.setAttention(att);
    }
    const closePopup = async()=>{
        props.setDefaultt(true);
        props.setPopupVisible(false);
        props.setProfile('');
        props.setHasPicked(false);
    }

    const pickUpImage = ()=>{
        document.getElementById('input').click();
    }

    const imageHandler = (e)=>{
        try{
          const reader = new FileReader();
          reader.onload = () =>{
            if(reader.readyState === 2){
                props.setProfile(reader.result)
            }
          }
          reader.readAsDataURL(e.target.files[0])
          props.setHasPicked(true);
        }
        catch(e){
        }
    }

      const addOrUpdateUser=()=>{
        if(props.isAddingUser){
            if(props.username.length<3 || props.username.length>20){
              showDenyPopUp("Username must be between 3 and 20 characters");
            }else if(props.carType.length<3 || props.carType.length>20){
              showDenyPopUp("Car type must be between 3 and 20 characters");
            }else if(props.plateNumber.length<2 || props.plateNumber.length>7){
              showDenyPopUp("Car plate number must be between 2 and 7 characters");
            }
            else{
              
                const body={
                    username:props.username,
                    car_type:props.carType,
                    car_plate_number:props.plateNumber
                };
                if(props.hasPicked){
                    body.profile_url = props.profile.split(',')[1].replace(/"/g,"/");
                }

                const header = {
                    headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
                };
    
                axios.post(`${base_url}add_user`,body,header)
                .then(function (response) {
                window.location.reload(false); 
                })
                .catch(function (error) {
                showDenyPopUp("Try with another car plate number.");
                });

            }
        }
        
            else{
            if(props.username.length<3 || props.username.length>20){
                showDenyPopUp("Username must be between 3 and 20 characters");
            }else if(props.carType.length<3 || props.carType.length>20){
                showDenyPopUp("Car type must be between 3 and 20 characters");
            }else if(props.plateNumber.length<2 || props.plateNumber.length>7){
                showDenyPopUp("Car plate number must be between 2 and 7 characters");
            }
            else{
                const body={
                    id:props.id,
                    username:props.username,
                    car_type:props.carType,
                    car_plate_number:props.plateNumber
                };
                const header = {
                    headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
                };
                if(props.hasPicked){
                    body.profile_url = props.profile.split(',')[1].replace(/"/g,"/");
                }
          
                axios.post(`${base_url}edit_user`,body,header)
                .then(function (response) {
                window.location.reload(false); 
                })
                .catch(function (error) {
                showDenyPopUp("Something went wrong.");
                });
                }}
            }
            return (
                <div className={classnames( "popup",props.className)}>
                    <div className='popup-content'>
                      
                        <div className='popup-title'>  
                            <div className='popup-cancel' onClick={closePopup}>
                                <p>x</p>
                            </div> 
                        </div>
                        <NormalTitle title="Edit User"/> 
                        
                        <CircleImage source={props.profile===null?DefaultImage:props.profile} className='wid-40 cursor-pointer' onClick={pickUpImage}/>
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} className='display-none'/>
                        <div>
                            <Label title={"Username"} />
                            <Form value={props.username} setText={props.setUsername} text={props.username} defaultt={props.defaultt}/>
                            <Label title={"Car Type"} className='mt-33'/>
                            <Form value={props.carType} setText={props.setCarType} text={props.carType} defaultt={props.defaultt}/>
                            <Label  title={"Plate Number"} className='mt-33'/>
                            <Form value={props.plateNumber} setText={props.setPlateNumber} text={props.plateNumber} defaultt={props.defaultt}/>
                        </div>
                        
                        <BoxButton  color='blue' text = {props.isAddingUser?'Add':'Edit'} icon={AcceptIcon} className='mt-33'onClick={addOrUpdateUser}/>
                    </div>
                </div>
            );        
}
export default PopUp;