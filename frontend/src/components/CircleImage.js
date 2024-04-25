import '../App.css';
import classnames from 'classnames';

const CircleImage = (props) => {

    return (
        <img src={props.source} alt="name" className={classnames( "circle-image",props.className)} onClick={props.onClick}/>
    );
    
  };
export default CircleImage;