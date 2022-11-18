import '../App.css';
import classnames from 'classnames';

const BoxButton = (props)=>{

    return <button className={classnames( "box-button",props.color==='red'?'box-button-background-red':'box-button-background-blue',props.className)} onClick={props.onClick}>
                <img src = {props.icon} alt=''/>
                <p>{props.text}</p>
            </button>
    
}
export default BoxButton;