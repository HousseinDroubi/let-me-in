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
}
export default BoxUser;