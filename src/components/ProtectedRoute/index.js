
import Cookies from "js-cookie";
import { Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = ()=>{
    const cookie = Cookies.get('jwt_token', {path:"/"})
    if(cookie === undefined){
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}

export default ProtectedRoutes