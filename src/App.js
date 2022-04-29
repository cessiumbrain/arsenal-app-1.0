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
      currentUser: {
        username: 'joe',
        // cart:{
        //   firstName: 'Joe',
        //   lastName: 'Iannotta',
        //   date: new Date(),
        //   numLanes: 2
        // }
      },
      errors:{
        loginError: null,
        usernameError: null,
        passwordError: null
      },
      //Reservation Form--------------------------->
      reservationForm:{

      },
      customerLastNameError: null,
      customerFirstNameError: null,
      resFormSelectedDateError: null,
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
    }, ()=>{console.log(this.state.reservationForm)})
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
      resFormSelectedDate: e
    }    
  }, ()=>{console.log(this.state.reservationForm)})
}
validateReservation=(navigateFunc)=>{
  //reset all current errors before going through and checking again
  this.setState({
    customerFirstNameError: null,
    customerLastNameError: null,
    resFormSelectedDateError: null,
    resFormNumLanesError: null
  })
  //customer first name validation----------------------------->
  if(this.state.reservationForm.customerFirstName===''){
    this.setState({
       customerFirstNameError: 'please enter a first name'
    }, ()=>console.log(this.state.reservationForm))
  } else {
    this.setState({
      customerFirstNameError: null
    })
  }
  //customer last name validation------------------------------>
  if(this.state.reservationForm.customerLastName===''){
    this.setState({
      customerLastNameError: 'please enter a last name'
    }, ()=>{console.log(this.state.reservationForm)})
  } else {
    this.setState({
      customerLastNameError: null
    })
  }
  //date validation--------------------------------->
  if(!this.state.resFormSelectedDate){
    this.setState({
      resFormSelectedDateError: 'please select a date'
    }, ()=>console.log(this.state.resFormSelectedDateError))
  } else {
    this.setState({
      resFormSelectedDateError: null
    })
  }
  //number of lanes validation
  if(!this.state.resFormNumLanes){
    this.setState({
      resFormNumLanesError: 'please enter number of lanes'
    })
  } else {
    this.setState({
      resFormNumLanesError: null
    })
  }
  //if everything is valid 
    if(!this.state.resFormSelectedDateError && !this.state.resFormNumLanesError && !this.state.customerFirstNameError && !this.state.customerLastNameError){
      console.log(this.state.reservationForm.customerFirstName)
      this.setState({
        validCart: true,
        currentUser:{
          ...this.state.currentUser,
          cart: {
            customerFirstName: this.state.reservationForm.customerFirstName,
            customerLastName: this.state.reservationForm.customerLastName,
            date: this.state.reservationForm.resFormSelectedDate,
            numLanes: this.state.reservationForm.resFormNumLanes
          }
        } 
      }, ()=>{console.log('validated res updated state', this.state.reservationForm)})
      navigateFunc()
    }
}

  addToCart = () =>{
 
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
            resFormSelectedDate={this.state.reservationForm.resFormSelectedDate}
            validCart={this.state.validCart}    
                //Errors------------------------------------------->
            customerFirstNameError={this.state.customerFirstNameError}
            customerLastNameError={this.state.customerLastNameError}
            resFormSelectedDateError={this.state.resFormSelectedDateError}
            resFormNumLanesError={this.state.resFormNumLanesError}

          ></Main>
        </BrowserRouter>
      </AuthContext.Provider>
      
      </>
      
    )
  }
}
export default App;
