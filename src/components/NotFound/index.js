
import "./index.css"

const NotFound =()=>{
    return(
        <div className="not-found-main-container">
            <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png" className="not-found-image" alt="not-found"/>
            <h1 className="not-found-heading">Page Not Found</h1>
            <p className="not-found-text">Unable to find your request...!</p>
        </div>
    )
}
export default NotFound