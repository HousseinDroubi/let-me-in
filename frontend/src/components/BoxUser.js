import '../App.css';
import classnames from 'classnames';
import BoxContent from './BoxContent';
import CircleImage from './CircleImage';
import BoxButton from './BoxButton';
import DefaultImage from '../assets/images/default_image.png';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import EditIcon from '../assets/images/edit_icon.png';
import BlockedImage from '../assets/images/blocked_icon.png';

const BoxUser = (props)=>{
    //  props.setPopupVisible(true);
const EditUser =()=>{
    props.setDefaultt(false);
    props.setIsAddingUser(false);
    props.setId(props.id);
    props.setUsername(props.username);
    props.setCarType(props.car_type);
    props.setPlateNumber(props.car_plate_number);
    props.setProfile(props.source);
    props.setPopupVisible(true);
}

const blockUser =()=>{
    const header = {
        headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
    };
  
    const body = {
        id: props.id
    };
  
    axios.post(`${props.base_url}block_user`,body,header)
        .then(function (response) {
          console.log(response);
          window.location.reload(false); 
        })
        .catch(function (error) {
          console.log(error);
        });
}


}
export default BoxUser;