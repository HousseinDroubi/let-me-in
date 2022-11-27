import '../App.css';
import classnames from 'classnames';

const Form = (props)=>{

  let value='';
    const changeState = (e) => {
        value = e.target.value;
        if(props.defaultt){
          value='';
        }
        props.setText(value);
      }
      
  return (
      <input type={props.type==="password"?'password':'text'} className={classnames('form')} onChange={changeState}  value={props.defaultt?'':props.text}/>
  );  
}
export default Form;