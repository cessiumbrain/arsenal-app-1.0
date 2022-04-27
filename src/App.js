//React Imports------------->
import { Component, useContext, createContext } from "react";
//Components----------->
import Main from './MainComponent'
import Login from './LoginComponent'
import MasterCalendar from "./MasterCalendarComponent";
import Reservation from './ReservationComponent'
import Cart from './CartComponent'
//Data--------------->
import RESERVATIONS from './RESERVATIONS'
import USERS from './USERS'
//Dependencies----------------->
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export const AuthContext = createContext('122')
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users: [...USERS],
      reservations: [...RESERVATIONS],
      // currentUser: {
      //   username: 'joe',
      //   cart:{
      //     firstName: 'Joe',
      //     lastName: 'Iannotta',
      //     date: new Date(),
      //     numLanes: 2
      //   }
      // },
      errors:{
        loginError: null,
        usernameError: null,
        passwordError: null
      },
      loginUsername: '',
      loginUsernameError: null,
      loginPassword: '',
      loginPasswordError: null,
      loginAuthError: null
    }
  }

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

    const ConditionalRoutes = (props) =>{
      if(!this.state.currentUser){
        return(
          <Routes>
            <Route path="" element={
            <Login
              // onLoginBlur={props.onLoginBlur}
              // loginAuthError={this.state.loginAuthError}
              // loginUsernameError={this.state.loginUsernameError}
              // loginPasswordError={this.state.loginPasswordError}
              // validateLogin={this.validateLogin}
            />

          }></Route>
          </Routes>
          
        )
      } else {
        return(
          <Routes>
            <Route path="/" element={
              <MasterCalendar
              reservations={this.state.reservations}
              
              ></MasterCalendar>
            }></Route>
          </Routes>
        )
      }
    }
    return(
      <>
      <AuthContext.Provider value={this.state.currentUser}>
        <BrowserRouter>
          <Main
            onLoginBlur={this.onLoginBlur}
            validateLogin={this.validateLogin}
            loginUsernameError={this.state.loginUsernameError}
            loginPasswordError={this.state.loginPasswordError}
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
