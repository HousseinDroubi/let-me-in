import '../App.css';
import classnames from 'classnames';
const SmallText = (props)=>{
    return <p className={classnames( "samll-text",props.className)} onClick={props.onClick}>{props.text}</p>
    
}
export default SmallText;