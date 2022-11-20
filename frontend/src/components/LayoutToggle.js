import '../App.css';
import classnames from 'classnames';
import layoutToggleIcon from '../assets/images/layout-toggle-icon.png';
const LayoutToggle = (props)=>{

    return (
    <div className={classnames( "layout-toggle",props.className)}>
    <img src={layoutToggleIcon}  onClick={props.onClick} alt=""/>
    </div>);
}
export default LayoutToggle;