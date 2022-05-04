import {Calendar} from 'react-calendar';
import { useState } from 'react';

const MasterCalendar = (props) =>{
    const [selectedDate, setDate] = useState()    
    //figure out if other selectedDate matches any in reservations
    let matchingReservationsArr = []
    props.reservations.map(res=>{
        if (res.date.getTime() === selectedDate?.getTime()){
            matchingReservationsArr.push(res)
        }
    })

    const MatchingReservations = (props) =>{
        return(
            matchingReservationsArr.map(res=>{
                return(
                    <tr>
                        <td>{res.customerFirstName}</td>
                        <td>{res.customerLastName}</td>
                        <td>{res.numLanes}</td>
                    </tr>
                )
            })
        )
            

        
    }
    return(
        <div id="master-calendar-component">
            <div id="calendar-div">
                      <h1>Master Calendar</h1>
            <Calendar 
            onChange={(e)=>{setDate(e)}}
            calendarType="US"
            ></Calendar>
            </div>
            <div id="calendar-res-display">
                <h1>Booked Reservations</h1>
                    <h2>Selected Date: {selectedDate ? selectedDate.toDateString() : ''}</h2>
            <table className="table-border">
                <thead>
                    <tr>
                        <th>Customer First Name</th>
                        <th>Customer Last Name</th>
                        <th>Number of Lanes</th>
                    </tr>

                </thead>
                <tbody>
                    <MatchingReservations></MatchingReservations>
                    <tr>{matchingReservationsArr.length === 0 ? 'no reservations' :''}</tr>
                </tbody>
                
            </table>
            
            </div>
        
            
      
            
        </div>
    )
}

export default MasterCalendar