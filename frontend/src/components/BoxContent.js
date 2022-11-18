import '../App.css';
import classnames from 'classnames';
const BoxContent = (props)=>{
    return <p className={classnames( "box-content",props.className)}>{props.name}</p>
    
}
export default BoxContent;