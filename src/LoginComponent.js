

import { useState, useEffect, memo, useContext } from "react"
import { AuthContext } from "./App"
import logo from './assets/logo.png'
const Login = (props) =>{
    return(
            
        <div id="login-component">
            <div class="form-control">
                <img id="login-logo" src={logo}></img>
                <input onBlur={(e)=>{props.onLoginBlur(e)}} id="username"></input>
                <small>{props.loginUsernameError}</small>
                <input onBlur={(e)=>{props.onLoginBlur(e)}} id="password"></input>            
                <small>{props.loginPasswordError}</small>
                <small>{props.loginAuthError}</small>
                <button onClick={()=>{props.validateLogin()}}>Login</button>
            </div>
        </div>

             

       
        
    )
}

export default Login