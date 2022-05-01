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
        <>
            <h1>Master Calendar</h1>
            <Calendar 
            onChange={(e)=>{setDate(e)}}
            calendarType="US"
            ></Calendar>
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
                </tbody>
                
            </table>
            
        </>
    )
}

export default MasterCalendar