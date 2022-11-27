import '../App.css';

const LargeImage = (props)=>{

    return (
        <img src={props.source} alt = '' className='waiting-profile' onClick={props.onClick}/>
    );
    
}
export default LargeImage;  