import '../App.css';
import classnames from 'classnames';

const NormalTitle = (props)=>{

    return (
         <p className={classnames( "normal-title",props.className)}>{props.title}</p>
    );

}
export default NormalTitle;