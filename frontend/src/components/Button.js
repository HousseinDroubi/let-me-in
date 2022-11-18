import '../App.css';
import classnames from 'classnames';
const Button = (props)=>{
    return <button className={classnames( "button",props.className)} onClick={props.onClick}>{props.name}</button>
    
}
export default Button;