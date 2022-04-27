import {Calendar} from 'react-calendar';
import { useState } from 'react';

const MasterCalendar = (props) =>{
    const [selectedDate, setDate] = useState(new Date())

    const onDateChange = (e) =>{
        setDate(e)

    }
    
    
    return(
        <>
            <h1>Master Calendar</h1>
            <Calendar onChange={(e)=>{onDateChange(e)}}></Calendar>
        </>
    )
}

export default MasterCalendar