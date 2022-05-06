import {Calendar} from 'react-calendar';
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from './App';
import { useNavigate, Navigate } from 'react-router-dom'

const Reservation = (props)=>{

    const currentUser = useContext(AuthContext)
    const navigate = useNavigate('/cart')

    //calculate number of lanes left---------------------------->
    let selectedDateReservations = []
    let totalLanes = 22;
        //if there is a selected date...
    if(props.resFormSelectedDate) {
        //go through all the reservations that were passed in 
        props.reservations.map(res=>{
            console.log('reservation date',res.date)
            //if a reservation matches...
            if(res.date.getTime()===props.resFormSelectedDate.getTime()){
                console.log('the date matches a current reservation')
                selectedDateReservations.push(res)
            }
        })
    }
    
    selectedDateReservations.forEach(res=>{
        totalLanes-=res.numLanes
        console.log(totalLanes)
    })

    const NavigateToCart = ()=>{
        if(props.validCart){
            return(
                <Navigate to="/cart"></Navigate>
            )
        } else {
            return(
                <></>
            )
        }
    }
    //<-------------------------return statement---------------------->
    return(
        <div id="reservation-component">
            <h1>Reservation</h1>
            <Calendar onChange={(e)=>{props.onReservationDateChange(e)}}></Calendar>
            <div class="form-control">
                <p>Username: {currentUser.username}</p>
            <h5>Selected Date: {props.resFormSelectedDate ? props.resFormSelectedDate.toString() : ''}</h5>
            <small className='error-text'>{props.resFormSelectedDateError ? props.resFormSelectedDateError : ''}</small>
            <label>First Name:</label>
            <input onBlur={(e)=>props.onReservationBlur(e)} id="customer-first-name"></input>
            <small className='error-text'>{props.customerFirstNameError ? props.customerFirstNameError : ''}</small>
            <label>Last Name:</label>
            <input onBlur={(e)=>{props.onReservationBlur(e)}} id="customer-last-name"></input>
            <small className="error-text">{props.customerLastNameError ? props.customerLastNameError : ''}</small>
            <p>Number of Lanes Left: {totalLanes}</p>
            <label>Number of Lanes</label>
            <input max={totalLanes} type="number" onChange={(e)=>{props.onReservationBlur(e)}} id="num-lanes" onKeyUp={(e)=>{

                if(e.target.value>totalLanes){e.target.value=null}}}></input>
            <small className="error-text">{props.resFormNumLanesError ? props.resFormNumLanesError : ''}</small>
            <button onClick={()=>{
                //because state update takes too long to call the navigate function based on props passed in- I'm passing it back as a callback into the top level state updater
                props.validateReservation(()=>{
                    navigate('/cart')}); 
            }
                }>Add To Cart</button>
            </div>

            
        </div>
    )
}

export default Reservation