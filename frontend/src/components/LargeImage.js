import '../App.css';

const largeImage = (props)=>{
    return (
        <img src={props.source} alt = '' className='waiting-profile' onClick={props.onClick}/>
    );
}
export default largeImage;  