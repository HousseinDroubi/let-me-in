import '../App.css';
import Title from './Title';
import classnames from 'classnames';

const PopupDeny = (props)=>{
    const closePopup=()=>{
        props.setPopupDenyVisible(false);
    }
    
        return (
            <div className={classnames( "popup",props.className)}>
                <div className='popup-password popup-deny'>
                    <div className='popup-title'>  
                        <div className='popup-cancel' onClick={closePopup}>
                            <p>x</p>
                        </div> 
                    </div>
                        <Title title="Attention!"/>
                            <div className='attention-content'>
                                <p>{props.attention}</p>
                            </div>
                </div>
            
        </div>);
        
    }
    export default PopupDeny;