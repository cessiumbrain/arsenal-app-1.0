import {  useContext } from "react";
import { NavLink, Routes, Route } from 'react-router-dom';
import { AuthContext } from "./App";
//Components---------------------------------------------->
import Login from './LoginComponent';
import MasterCalendar from "./MasterCalendarComponent";
import Reservation from './ReservationComponent'
import Cart from './CartComponent'
import Confirmation from "./ConfirmationComponent";
import Profile from "./ProfileComponent"


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
                <NavLink to="/profile">My Profile</NavLink>
            </nav>
            
            <Routes>
                <Route path="/" element={
                    <MasterCalendar
                        reservations={props.reservations}    
                    ></MasterCalendar>
                }></Route>
                <Route path="/reservation" element={
                    <Reservation
                    //Data---------------------------->
                    reservations={props.reservations}
                    validCart={props.validCart}
                    resFormSelectedDate={props.resFormSelectedDate}
                    //Methods-------------------------->
                    validateReservation={props.validateReservation}
                    addToCart={props.addToCart}
                    onReservationBlur={props.onReservationBlur}
                    onReservationDateChange={props.onReservationDateChange}
                    //Errors--------------------------->
                    customerFirstNameError={props.customerFirstNameError}
                    customerLastNameError={props.customerLastNameError}
                    resFormSelectedDateError={props.resFormSelectedDateError}
                    resFormNumLanesError={props.resFormNumLanesError}
                    ></Reservation>
                }></Route>
                <Route path="/cart" element={
                    <Cart
                    makeReservation={props.makeReservation}
                    ></Cart>
                }></Route>
                <Route path="/confirmation" element={
                    <Confirmation
                    resetCartAndConfirmation={props.resetCartAndConfirmation}
                    ></Confirmation>
                }></Route>
                <Route path="/profile" element={
                    <Profile
                    reservations={props.reservations}
                    ></Profile>
                }
                />
            </Routes>
            </>
            
        )
    }
    
}

export default Main