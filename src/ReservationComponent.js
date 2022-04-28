import {Calendar} from 'react-calendar';
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from './App';

const Reservation = (props)=>{

    const currentUser = useContext(AuthContext)

    console.log(props)

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

    //<-------------------------return statement---------------------->
    return(
        <div>
            <h1>Reservation</h1>
            <Calendar onChange={(e)=>{props.onReservationDateChange(e)}}></Calendar>
            <p>Username: {currentUser.username}</p>
            <h5>Selected Date: {props.resFormSelectedDate ? props.resFormSelectedDate.toDateString() : 'please select a date'}</h5>
            <label>First Name:</label>
            <input onBlur={(e)=>props.onReservationBlur(e)} id="customer-first-name"></input>
            <small>{props.customerFirstNameError ? props.customerFirstNameError : ''}</small>
            <label>Last Name:</label>
            <input onBlur={(e)=>{props.onReservationBlur(e)}} id="customer-last-name"></input>
            <small>{props.customerLastNameError ? props.customerLastNameError : ''}</small>
            <p>Number of Lanes Left: {totalLanes}</p>
            <label>Number of Lanes</label>
            <input max={totalLanes} type="number" onChange={(e)=>{props.onReservationBlur(e)}} id="num-lanes"></input>
            <button onClick={()=>{props.validateReservation()}}>Add To Cart</button>
        </div>
    )
}

export default Reservation