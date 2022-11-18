import '../App.css';
import classnames from 'classnames';
const SmallText = (props)=>{
    return <p className={classnames( "text",props.className)} onClick={props.onClick}>{props.text}</p>
    
}
export default SmallText;