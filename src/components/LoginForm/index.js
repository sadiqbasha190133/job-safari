
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import "./index.css"

function LoginForm(){
    
    const[userLoginState, setUserLoginState] = useState({
        userName:"",
        password:""
    })

    const[status, setResultStatus] = useState({
        isFailure:false,
        isLoading:false
    })

    const navigate = useNavigate()

    useEffect(()=>{
        const cookie = Cookies.get('jwt_token', {path:"/"})
        if(cookie !== undefined){
            navigate("/")
        }
    },[navigate])

    

    const onSuccessLogin = (userToken)=>{
        const cookieValue = userToken
        Cookies.set("jwt_token", cookieValue, {path:"/", expires:30})
        navigate("/")
    }

    const onLoginFailure = ()=>{
       setResultStatus((prevState)=>({
        isFailure:!prevState.isFailure
       }))
    }


    const onSubmitForm = async (event) =>{
        event.preventDefault()
        setResultStatus(prevState=>({
            ...prevState,
            isLoading:!prevState.isLoading
        }))
        const url = "https://apis.ccbp.in/login"
        const options = {
            method:'POST',
            body:JSON.stringify({
                username:userLoginState.userName,
                password:userLoginState.password
            })
        }
        try{
            const response = await fetch(url, options)
            const data = await response.json()
            setResultStatus(prevState=>({
                ...prevState,
                isLoading:!prevState.isLoading
            }))
            console.log(response)
            if(response.status===200){
                onSuccessLogin(data.jwt_token)
            }
            else if(response.status===400){
               onLoginFailure()
            }

        }
        catch(error){
            console.error(error)
        }

    }
    

    function renderUserNameField(){
        return(
            <div className="lable-username-flex">
                <label htmlFor="userName" className="lable-title">USERNAME</label>
                <input 
                    type="text" 
                    id="userName" 
                    className="input-field" 
                    placeholder="Username" 
                    value={userLoginState.userName}
                    onChange={event=>setUserLoginState({
                        ...userLoginState,
                        userName:event.target.value
                    })}
                />
            </div>
        )
    }

    function renderPasswordField(){
        return(
            <div className="lable-username-flex">
                <label htmlFor="password" className="lable-title">PASSWORD</label>
                <input 
                    type="password" 
                    id="password"  
                    className="input-field" 
                    placeholder="Password" 
                    value={userLoginState.password}
                    onChange={event=>setUserLoginState({
                        ...userLoginState,
                        password:event.target.value
                    })}
                />
            </div>
        )
    }

    return(
        <div className="loginForm-main-container">
            <form className="login-form-container" onSubmit={onSubmitForm}>
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website-logo" className="website-logo-mobile"/>
                <div>
                    {renderUserNameField()}
                    {renderPasswordField()}
                    {status.isFailure&&<p className="error-message">Username and Password did not matched</p>}
                    <button type="submit" className="submit-button">submit</button>
                    {status.isLoading&&<Loader type="TailSpin" color="#00BFFF" height={50} width={50} className="spinner"/>}
                </div>
            </form>
        </div>
    )

}

export default LoginForm