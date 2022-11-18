import '../App.css';
import classnames from 'classnames';
import BoxContent from './BoxContent';
import CircleImage from './CircleImage';
import BoxButton from './BoxButton';
import DefaultImage from '../assets/images/default_image.png';
const Box = (props)=>{

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
            <div className='box-details'>
                <BoxButton onClick={props.onClick} icon={props.icon} text='Unblock'/>
            </div>
        </div>
    );   
}
export default Box;