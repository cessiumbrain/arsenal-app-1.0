import {Calendar} from 'react-calendar';
import {useState, useEffect} from 'react'

const Reservation = (props)=>{

    const [selectedDate, selectDate] = useState(null)
    const [customerFirstName, changeFirstName] = useState(null)
    const [customerLastName, changeLastName] = useState(null)
    const [numLanes, changeNumLanes] = useState(null)

    const onDateChange = (e) =>{
        selectDate(e)
    }

    const onNumLanesChange = (e) =>{
        changeNumLanes(e.target.value)
        console.log('change')
    }

    const onFirstNameChange = (e) =>{
        changeFirstName(e.target.value)
        console.log(customerFirstName)
    }

    const onLastNameChange = (e) =>{
        changeLastName(e.target.value)
    }

    //calculate number of lanes left---------------------------->
    let selectedDateReservations = []
    let totalLanes = 22;
        //if there is a selected date...
    if(selectedDate) {
        //log that date
        console.log('you selected a date', selectedDate)
        //go through all the reservations that were passed in 
        props.reservations.map(res=>{
            console.log('reservation date',res.date)
            //if a reservation matches...
            if(res.date.getTime()===selectedDate.getTime()){
                console.log('the date matches a current reservation')
                selectedDateReservations.push(res)
                console.log(selectedDateReservations)
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
            <Calendar onChange={(e)=>{onDateChange(e)}}></Calendar>
            <p>Username: {props.currentUser.username}</p>
            <h5>Selected Date: {selectedDate ? selectedDate.toDateString() : 'please select a date'}</h5>
            <label>First Name:</label>
            <input onChange={(e)=>{onFirstNameChange(e)}}id="customer-name"></input>
            <label>Last Name:</label>
            <input onChange={(e)=>{onLastNameChange(e)}}></input>
            <p>Number of Lanes Left: {totalLanes}</p>
            <label>Number of Lanes</label>
            <input max={totalLanes} type="number" onChange={(e)=>{onNumLanesChange(e)}}></input>
            <button onClick={()=>{props.addToCart(customerFirstName, customerLastName, numLanes, selectedDate)}}>Add To Cart</button>
        </div>
    )
}

export default Reservation