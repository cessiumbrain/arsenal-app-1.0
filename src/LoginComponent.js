

import { useState, useEffect, memo, useContext } from "react"
import { AuthContext } from "./App"

const Login = (props) =>{
    return(
            
            <div>
            <input onBlur={(e)=>{props.onLoginBlur(e)}} id="username"></input>
            <small>{props.loginUsernameError}</small>
            <input onBlur={(e)=>{props.onLoginBlur(e)}} id="password"></input>
            <small>{props.loginPasswordError}</small>
            <div>
                <small>{props.loginAuthError}</small>
            </div>
            <button onClick={()=>{props.validateLogin()}}>Login</button>
        </div>

             

       
        
    )
}

export default Login