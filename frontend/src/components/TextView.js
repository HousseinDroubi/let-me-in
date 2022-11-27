import '../App.css';
import classnames from 'classnames';

const TextView = (props)=>{

    return (
        <p className={classnames( "form text-view",props.className)}>{props.text}</p>
    );     
   
}
export default TextView;