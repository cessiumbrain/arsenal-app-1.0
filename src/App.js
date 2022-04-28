//React Imports------------->
import { Component, createContext } from "react";
//Components----------->
import Main from './MainComponent'
//Data--------------->
import RESERVATIONS from './RESERVATIONS'
import USERS from './USERS'
//Dependencies----------------->
import { BrowserRouter } from 'react-router-dom';

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
      reservationForm: {
        customerFirstName: '',
        customerLastName: '',
      },
      //Reservation Form--------------------------->
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
      reservationForm: {
        ...this.state.reservationForm,
        numLanes: e.target.value
      }
    }, ()=>{console.log(this.state.reservationForm)})
  }
  }

onReservationDateChange=(e)=>{
  this.setState({
      resFormSelectedDate: e
  }, ()=>{console.log(this.state.reservationForm)})
}
validateReservation=()=>{
  //customer first name validation----------------------------->
  if(this.state.reservationForm.customerFirstName===''){
    console.log('no first name')
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
  console.log(this.state.resFormSelectedDate)
  if(!this.state.resFormSelectedDate){
    console.log('no date')
  }
}

  addToCart = (firstName, lastName, numLanes, date) =>{
    console.log('addToCart')
    this.setState({
      currentUser: {...this.state.currentUser, 
        cart: {
          firstName: firstName,
          lastName: lastName,
          numLanes: numLanes,
          date: date
        }}
    }, ()=>{console.log(this.state.currentUser.cart)})
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
            addToCart={this.addToCart}
            onReservationBlur={this.onReservationBlur}
            onReservationDateChange={this.onReservationDateChange}
            reservationForm={this.state.reservationForm}
            validateReservation={this.validateReservation}
            customerFirstNameError={this.state.customerFirstNameError}
            customerLastNameError={this.state.customerLastNameError}
            resFormSelectedDate={this.state.resFormSelectedDate}

          ></Main>
        </BrowserRouter>
      </AuthContext.Provider>
      
      {/*<BrowserRouter>
       
        <ConditionalRoutes
          onLoginBlur={this.onLoginBlur}
          loginAuthError={this.state.loginAuthError}
          loginUsernameError={this.state.loginUsernameError}
          loginPasswordError={this.state.loginPasswordError}
          validateLogin={this.validateLogin}></ConditionalRoutes>
       
        
        <Reservation
          currentUser={this.state.currentUser}
          reservations={this.state.reservations}
          addToCart={this.addToCart}
          ></Reservation>
          <Cart
            cart={this.state.currentUser.cart}></Cart> 
      </BrowserRouter>
     */}
      </>
      
    )
  }
}
export default App;
