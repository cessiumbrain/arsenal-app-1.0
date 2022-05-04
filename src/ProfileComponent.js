import { AuthContext } from './App'
import { useContext } from 'react'
import RESERVATIONS from './RESERVATIONS'



const Profile = (props) =>{
    
    const currentUser = useContext(AuthContext)

    const myReservationsArr = null
    
    const MyReservations = () =>{
        return(
            props.reservations.map(res=>{
                if(res.userID===currentUser.id){
                return(
                    <tr>
                         <td>{res.date.toString()}</td>
                        <td>{res.numLanes}</td>
                    </tr>
                   
                )
                } else {
                    return null
                }
            })
        )
    }
    
    
    
    return(
        <div id="profile-component">
            <div id="profile-background">
                  <h1>My Profile</h1>
            <h2>My Info</h2>
            <p>First Name: {currentUser.firstName}</p>
            <p>Last Name: {currentUser.lastName}</p>
            <p>Username: {currentUser.username}</p>
            <h2>My Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Number of Lanes</td>
                    </tr>
                </thead>
                <tbody>
                    {MyReservations===null ? <p>No Reservations</p> : <MyReservations></MyReservations>} 
                </tbody>
            </table>
            </div>
          
            

        </div>
    )
}
export default Profile