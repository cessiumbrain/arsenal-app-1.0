import { Component, useContext } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthContext } from "./App";
import Login from './LoginComponent';
import MasterCalendar from "./MasterCalendarComponent";


const Main = (props) =>{

    const currentUser = useContext(AuthContext);

    if(!currentUser){
       return(
        <Routes>
            <Route path="/" element={
                <Login
                    onLoginBlur={props.onLoginBlur}
                    validateLogin={props.validateLogin}
                    loginUsernameError={props.loginUsernameError} 
                    loginPasswordError={props.loginPasswordError}   
                ></Login>}></Route>
        </Routes>
    ) 
    } else {
        return(
            <Routes>
                <Route path="/" element={
                    <MasterCalendar></MasterCalendar>
                }></Route>
            </Routes>
        )
    }
    
}

export default Main