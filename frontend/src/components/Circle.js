import '../App.css';
import classnames from 'classnames';

const Circle = (props) => {
 
    return (
        <>
            <div className='circle-content'>
                <button 
                    className={classnames( "circle-mode",props.isTurnedOn?props.turnedOnStyle:props.turnedOffStyle)}
                    onClick={props.onClick}>      
                </button>
                <p>
                    {props.title}
                </p>
            </div>
        </>
    );
  };
  export default Circle;