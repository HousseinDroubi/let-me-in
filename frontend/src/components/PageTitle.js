import '../App.css';
import classnames from 'classnames';
const PageTitle = (props)=>{

    // return <button className="button">{props.name}</button>
    return <p className={classnames( "page-title-content",props.className)}>{props.text}</p>
    
}
export default PageTitle;