//React Imports------------->
import { Component, createContext } from "react";
//Components----------->
import Main from './MainComponent'
//Data--------------->
import RESERVATIONS from './RESERVATIONS'
import USERS from './USERS'
//Dependencies----------------->
import { BrowserRouter, Navigate } from 'react-router-dom';
import { createHashHistory } from "history";

export const AuthContext = createContext(undefined)
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      //Backend Data--------------------------->
      users: [...USERS],
      reservations: [...RESERVATIONS],
      //--------------------------------------->
      currentUser: {
        // cart:{
        //   firstName: 'Joe',
        //   lastName: 'Iannotta',
        //   date: new Date(),
        //   numLanes: 2
        // },
        username: 'myUsername',
        password: 'password',
        userId: 1,
        cart: null,
        admin: true,
        firstName: 'Joe',
        lastName: 'Iannotta',
        confirmationPage: false
      },
      errors:{
        loginError: null,
        usernameError: null,
        passwordError: null
      },
      //Reservation Form--------------------------->
      reservationForm:{
        selectedDate: null,
        customerFirstName: null,
        customerLastName: null,
        numLanes: null,

        errors:{
          numLanes: null,
          customerFirstName: null,
          customerLastName: null,
          selectedDate: null
        }
      },
      //Login Form------------------------------>     
      loginUsername: '',
      loginUsernameError: null,
      loginPassword: '',
      loginPasswordError: null,
      loginAuthError: null
    }
  }

  //Login Methods-------------------->
  onLoginBlur = (e) =>{
    if(e.target.id==='username'){
      this.setState({
        loginUsername: e.target.value
      }, ()=>console.log(this.state.loginUsername))
    } 
    if(e.target.id==='password'){
      this.setState({
        loginPassword: e.target.value
      }, ()=>console.log(this.state.loginPassword))
    }
  }
  validateLogin=()=>{

    //clear any current errors
    this.setState({
      loginUsernameError: null,
      loginPasswordError: null
    })
    if(this.state.loginUsername===''){
      this.setState({
        loginUsernameError: 'please enter a username'
      })

    } else {
      this.setState({
        loginUsernameError: null
      })
    }
    if(this.state.loginPassword===''){
      this.setState({
        loginPasswordError: 'please enter a password'
      })
    } else {
      this.setState({
        loginPasswordError: null
      })
    }
    //If no errors call the login method
    console.log(this.state.loginUsernameError, this.state.loginPasswordError)
    if(!this.state.loginUsernameError && !this.state.loginPasswordError){

      this.login(this.state.loginUsername, this.state.loginPassword)
    }
    
  }
  login = (username, password) =>{
    console.log('login called')
    //reset any login errors
    this.setState({
      loginAuthError: null
    })
    //find the user obj trying to login
    let loggingUser = this.state.users.find(user=>{
      return user.username === username
    })
    console.log(loggingUser)
    //if that user does not exist, set the login error accordingly
    this.setState({
      loginError: 'no such user'
    })
    //if that user exists check if their password is correct
    if(loggingUser){
      if(loggingUser.password===password){
      this.setState({
        currentUser: loggingUser
      }, ()=>{console.log(this.state.currentUser)})
    } 
    //otherwise passback the login error wrong password
    else{
      this.setState({
        loginAuthError: 'incorrect password'
      })
    }
  }
  }
//Reservation Methods--------------->
  onReservationBlur=(e)=>{
  if(e.target.id==='customer-first-name'){
    this.setState({
      reservationForm: {
        ...this.state.reservationForm,
        customerFirstName: e.target.value
      }
    }, ()=>{console.log(this.state.reservationForm.customerFirstName)})
  }
  if(e.target.id==='customer-last-name'){
    this.setState({
      reservationForm:{
        ...this.state.reservationForm,
        customerLastName: e.target.value
      }
    })
  }
  if(e.target.id ==='num-lanes'){
    this.setState({
        reservationForm:{
          ...this.state.reservationForm,
          resFormNumLanes: e.target.value
        }
        
    }, ()=>{console.log(this.state.reservationForm)})
  }
  }
  onReservationDateChange=(e)=>{
  this.setState({
    reservationForm: {
      ...this.state.reservationForm,
      selectedDate: e
    }    
  }, ()=>{console.log(this.state.reservationForm.resFormSelectedDate)})
  }
  validateReservation=(navigateFunction)=>{

  //reset all errors to start
  this.setState({
    reservationForm:{
      errors:{
        numLanes: null,
        customerFirstName: null,
        customerLastName: null,
        selectedDate: null
      }
    }
  })
  // create a new error object variable
  let errorObj = {}
  //run if checks and set errorObj values accordingly
  if(!this.state.reservationForm.selectedDate){
    errorObj.selectedDate = 'please select a date ';
  }
   if(!this.state.reservationForm.customerFirstName){
    errorObj.firstName = 'no first name'
   } else {
     errorObj.firstName = null
   }
   if(!this.state.reservationForm.customerLastName){
     errorObj.lastName = 'please enter last name'
   } else {
     errorObj.lastName = null
   }
   if(!this.state.reservationForm.numLanes){
     errorObj.numLanes = "please enter a number of lanes"
   }


   this.setState({
    reservationForm: {
      ...this.state.reservationForm,
      errors: {
        ...errorObj
      }
    }
   }, ()=>{
     if(!errorObj.firstName){
       navigateFunction()
     }
   })
  }


//Cart Method----------------------------->
  makeReservation = () =>{
 this.setState({
  reservations: this.state.reservations.concat(this.state.currentUser.cart),
  currentUser: {
    ...this.state.currentUser,
    confirmationPage: true
  }
 })

  }
//Confirmation Method---------------------->
  resetCartAndConfirmation=()=>{
    this.setState({
      currentUser:{
        ...this.state.currentUser,
        confirmationPage: false,
        cart: null
      }
    })
  }

  render(){
    return(
      <>
      <AuthContext.Provider value={this.state.currentUser}>
        <BrowserRouter>
          <Main
            //Login Props----------------------------------------->
            onLoginBlur={this.onLoginBlur}
            validateLogin={this.validateLogin}
            loginUsernameError={this.state.loginUsernameError}
            loginPasswordError={this.state.loginPasswordError}
            reservations={this.state.reservations}
            //Reservation Props----------------------------------->
                //Methods----------------------------------------->
            addToCart={this.addToCart}
            onReservationBlur={this.onReservationBlur}
            onReservationDateChange={this.onReservationDateChange}
            validateReservation={this.validateReservation}
                //Data--------------------------------------------->
            selectedDate={this.state.reservationForm.selectedDate}
            validCart={this.state.validCart}    
                //Errors------------------------------------------->
            errors={this.state.reservationForm.errors}
            //Cart Props------------------------------------------->
            makeReservation={this.makeReservation}
            //Confirmation Props
            resetCartAndConfirmation={this.resetCartAndConfirmation}
          ></Main>
        </BrowserRouter>
      </AuthContext.Provider>
      
      </>
      
    )
  }
}
export default App;
