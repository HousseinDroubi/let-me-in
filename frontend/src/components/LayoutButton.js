import '../App.css';
import classnames from 'classnames';

const DrawerButton = (props)=>{

    return (
        <button className={classnames( "button-drawer",props.className)} onClick={props.onClick}>
            <p>{props.name}</p>
        </button>
    );

}
export default DrawerButton;