import {Calendar} from 'react-calendar';
import { useState } from 'react';

const MasterCalendar = (props) =>{
    const [selectedDate, setDate] = useState(new Date())    
    //figure out if other selectedDate matches any in reservations
    let matchingReservationsArr = []
    props.reservations.map(res=>{
        if (res.selectedDate.getTime() === selectedDate?.getTime()){
            matchingReservationsArr.push(res)
        }
    })

    const AllReservations =()=>{
        const TableContents = props.reservations.map(res=>{
            return(
                <tr>
                    <td>{res.selectedDate.toString()}</td>    
                    <td>{res.customerFirstName}</td>
                    <td>{res.customerLastName}</td>
                    <td>{res.numLanes}</td>
                </tr>
                
                )
        })

        return TableContents
    }
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
                <h1>Reservations By Date</h1>
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
        
            <div>
                <h1>All Reservations</h1>
                <table>
                <thead>
                    <tr>
                    <th>Date</th>
                        <th>Customer First Name</th>
                        <th>Customer Last Name</th>
                        <th>Number of Lanes</th>
                    </tr>

                </thead>
                <tbody>
                    <AllReservations></AllReservations>
                </tbody>
                    
                </table>

                
            </div>
      
            
        </div>
    )
}

export default MasterCalendar