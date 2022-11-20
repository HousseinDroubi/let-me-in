import '../App.css';
import classnames from 'classnames';
const DrawerButton = (props)=>{

    return (<button className={classnames( "button-drawer",props.className)} onClick={props.onClick}>
        <p>{props.name}</p>
        <div 
        className={classnames( "circle",props.isWaiting?'display-block':'display-none',props.className)}
        ></div>
        </button>
    );
}
export default DrawerButton;