import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from './App'
import Confirmation from './ConfirmationComponent'


const Cart = (props) =>{
    useEffect(()=>{console.log('s')})
    const currentUser = useContext(AuthContext)
    const navigate = useNavigate()
    const [nonrefundableCheck, setNonrefundable] = useState(false); 
    const [numberOfPeopleCheck, setNumberOfPeople] = useState(false);
    const [twentyOneCheck, setTwentyOneCheck] = useState(false)
    
//when the makeReservation method fires, set the current user confirmation object as the reservation just made and navigate to the confirmation page.  When that component unmounts, reset the confirmation object to null
    if(currentUser.confirmationPage){ 
        navigate('/confirmation')
    } else if(currentUser.cart){
           return(
        <div>
            <div id="EULA">
                <div id="nonrefundable">
                <p>This is an upfront nonrefundable deposit</p>
                <input type="checkbox" onClick={()=>{setNonrefundable(!nonrefundableCheck)}}></input>
                <small className={nonrefundableCheck ? 'checked-text' : 'unchecked-text'}>{nonrefundableCheck ? 'I agree' : 'check to agree'}</small>
            </div>
            <div id="number-of-people">
                <p>This reservation is good for {currentUser.cart.numLanes * 6} people in the door</p>
                <input type="checkbox" onClick={()=>{setNumberOfPeople(!numberOfPeopleCheck)}}></input>
                <small className={numberOfPeopleCheck ? "checked-text" : "unchecked-text"}>{numberOfPeopleCheck ? 'I agree' : 'check to agree'}</small>
            </div>
            <div id="twenty-one">
                <p>Everyone must be twenty-one.  Everyone must have a valid ID.  Anyone without a valid ID will be turned away at the door.</p>
                <input type="checkbox" onClick={()=>{setTwentyOneCheck(!twentyOneCheck)}}></input>
                <small class={twentyOneCheck ? 'checked-text' : 'unchecked-text'}>{twentyOneCheck ? 'I agree' : 'check to agree'}</small>
            </div>
   
            </div>
            <h1>Cart</h1>
            <p>Date: {currentUser.cart.date.toString()}</p>
            <p>First Name: {currentUser.cart.customerFirstName}</p>
            <p>Last Name: {currentUser.cart.customerLastName}</p>
            <p>Number of Lanes: {currentUser.cart.numLanes}</p>

            <small class="unchecked-text">{twentyOneCheck && numberOfPeopleCheck && nonrefundableCheck ? '' : 'you must agree to the terms above'}</small>
            {nonrefundableCheck && twentyOneCheck && numberOfPeopleCheck ? <button onClick={()=>{props.makeReservation(()=>{navigate('/')})}}>Make Reservation</button> : ''}

            
        </div>
        
    )
    } else if(!currentUser.cart) {
        return(
            <div>
                <h1>Cart is empty</h1>
            </div>
        )
    }
 
}

export default Cart