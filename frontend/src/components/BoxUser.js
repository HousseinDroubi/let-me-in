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
            window.location.reload(false); 
            })
            .catch(function (error) {
            });
    }

    return (
        <div className={classnames( "box",props.className)}>
            <div className='box-image'>
                <CircleImage source={props.source===null?DefaultImage:props.source}/>
                <BoxContent name = {props.username}/>
            </div>
            <div className='box-details'>
                <BoxContent name = {props.car_type}/>
                <BoxContent name = {props.car_plate_number}/>
            </div>
            <div className='box-details media-space-between'>
                <BoxButton onClick={EditUser} text = 'Edit' icon={EditIcon}/>
                <BoxButton onClick={blockUser} status = 'block' color='red' text = 'Block' icon = {BlockedImage}/>
            </div>
        </div>
    );

}
export default BoxUser;