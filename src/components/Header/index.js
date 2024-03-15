
import "./index.css"
import { AiFillHome } from "react-icons/ai";
import { PiSuitcaseSimple } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header(){

    const navigate = useNavigate()

    function logoutUser(){
        Cookies.remove('jwt_token', {path:"/"})
        console.log("i am in here")
        return navigate("/login")
        
    }

    return(
        <div className="header-main-container">
             <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className="navbar-logo" alt="website-logo" />
             <div className="header-icons-container-small">
                <Link to="/"><AiFillHome className="header-icons"/></Link>
                <Link to="/jobs"><PiSuitcaseSimple className="header-icons"/></Link>
                <MdLogout className="header-icon-last" onClick={logoutUser}/>
             </div>
             <div className="header-titles-large">
                <Link to="/" className="header-link"><h1 className="header-title">Home</h1></Link>
                <Link to="/jobs" className="header-link"><h1 className="header-title">Jobs</h1></Link>
             </div>
             <button className="logout-button" onClick={logoutUser}>Logout</button>
        </div>
    )
}

export default Header