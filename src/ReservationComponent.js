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
    console.log(props)
    return(
        <div id="reservation-component">
            <h1>Reservation</h1>
            <Calendar onChange={(e)=>{props.onReservationDateChange(e)}}></Calendar>
            <div class="form-control">
                <p>Username: {currentUser.username}</p>
            <h5>Selected Date: {props.selectedDate ? props.selectedDate.toString() : ''}</h5>
            <small className='error-text'>{props.errors.selectedDate ? props.errors.selectedDate : ''}</small>
            <label>First Name:</label>
            <input onBlur={(e)=>props.onReservationBlur(e)} id="customer-first-name"></input>
            <small className='error-text'>{props.errors.firstName ? props.errors.firstName : ''}</small>
            <label>Last Name:</label>
            <input onBlur={(e)=>{props.onReservationBlur(e)}} id="customer-last-name"></input>
            <small className="error-text">{props.errors.lastName ? props.errors.lastName : ''}</small>
            <p>Number of Lanes Left: {totalLanes}</p>
            <label>Number of Lanes</label>
            <input max={totalLanes} 
                type="number"
                onChange={(e)=>{
                    document.querySelector("#num-lanes-error").innerText = ''
                    props.onReservationBlur(e)}} id="num-lanes" 
                onKeyUp={(e)=>{
                    if(e.target.value>totalLanes){
                        e.target.value=null
                        document.querySelector("#num-lanes-error").innerText = `we don't have enough lanes available for that`
                    }
                    }
            }>
                </input>
            <small id="num-lanes-error" className="error-text">{props.errors.numLanes ? props.errors.numLanes : ''}</small>
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