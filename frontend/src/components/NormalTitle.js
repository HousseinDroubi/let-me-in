import '../App.css';
import classnames from 'classnames';
const NormalTitle = (props)=>{
    let title = props.title;
    return <p className={classnames( "title",props.className)}>{title}</p>
}
export default NormalTitle;