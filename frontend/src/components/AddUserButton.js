import '../App.css';
import classnames from 'classnames';
import Add from '../assets/images/add_user_icon.png';
const AddUserButton = (props)=>{
    return (
        <button className={classnames( "add-user-button-content",props.className)} onClick={props.onClick}>
                <img src={Add} alt=''/>
                <p>Add</p>
        </button>
        
        );
}
export default AddUserButton;