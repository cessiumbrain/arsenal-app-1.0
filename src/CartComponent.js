import { useContext } from "react"
import { AuthContext } from './App'



const Cart = (props) =>{
    
   const currentUser = useContext(AuthContext) 

    if(currentUser.cart){
           return(
        <div>
            <h1>Cart</h1>
            <p>Date: {currentUser.cart.date.toString()}</p>
            <p>First Name: {currentUser.cart.customerFirstName}</p>
            <p>Last Name: {currentUser.cart.customerLastName}</p>
            <p>Number of Lanes: {currentUser.cart.numLanes}</p>
        </div>
        
    )
    } else {
        return(
            <div>
                <h1>Cart is empty</h1>
            </div>
        )
    }
 
}

export default Cart