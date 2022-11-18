import '../App.css';
import classnames from 'classnames';
const NormalTitle = (props)=>{
    let title = props.title;
    return <p className={classnames( "normal-title",props.className)}>{title}</p>
}
export default NormalTitle;