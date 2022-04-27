const Cart = (props) =>{
    

    if(props.cart){
           return(
        <div>
            <h1>Cart</h1>
            <p>Date: {props.cart.date.toString()}</p>
            <p>First Name: {props.cart.firstName}</p>
            <p>Last Name: {props.cart.lastName}</p>
            <p>Number of Lanes: {props.cart.numLanes}</p>
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