import '../App.css';
import classnames from 'classnames';
const Label = (props)=>{
    let title = props.title;
    return <p  className={classnames( "label",props.className)}>{title}</p>
}
export default Label;