import {  useContext } from "react";
import { NavLink, Routes, Route } from 'react-router-dom';
import { AuthContext } from "./App";
import Login from './LoginComponent';
import MasterCalendar from "./MasterCalendarComponent";
import Reservation from './ReservationComponent'
import Cart from './CartComponent'


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
            <>
            <nav>
                <NavLink to="/">Calendar</NavLink>
                <NavLink to="/reservation">Make a Reservation</NavLink>
                <NavLink to="/cart">My Cart</NavLink>
            </nav>
            
            <Routes>
                <Route path="/" element={
                    <MasterCalendar
                        reservations={props.reservations}    
                    ></MasterCalendar>
                }></Route>
                <Route path="/reservation" element={
                    <Reservation></Reservation>
                }></Route>
                <Route path="/cart" element={
                    <Cart></Cart>
                }></Route>
            </Routes>
            </>
            
        )
    }
    
}

export default Main