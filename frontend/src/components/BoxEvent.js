import '../App.css';
import classnames from 'classnames';
import BoxContent from './BoxContent';
import CircleImage from './CircleImage';
import DefaultImage from '../assets/images/default_image.png';

const BoxEvent = (props)=>{

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
            <div className='box-details space-between'>
                <BoxContent name = {props.arrival_time}/>
                <BoxContent name = {props.departure_time===null?"NA":props.departure_time}/>
                <BoxContent name = {props.difference_time===''?"NA":props.difference_time}/>
            </div>
        </div>
    );
    
}
export default BoxEvent;