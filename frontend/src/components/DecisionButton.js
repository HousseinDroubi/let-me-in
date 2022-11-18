import '../App.css';
import classnames from 'classnames';
import Accept from '../assets/images/accept-icon.png';
import Reject from '../assets/images/reject-icon.png';
const DecisionButton = (props) => {
    return (
        <button onClick={props.onClick}
        className={classnames( "decision-button",props.text==="Accept"?'decision-button-green-background':'decision-button-red-background',props.className)}>
            <img src={props.text==="Accept"?Accept:Reject} alt=''/>
            <p>{props.text}</p>
        </button>
    );
  };
  export default DecisionButton;