import '../App.css';
import classnames from 'classnames';
const Label = (props)=>{
    return <p  className={classnames( "label",props.className)}>{props.title}</p>
}
export default Label;