# Arsenal App Functional Components and Hooks

## Where I left off
- figure out navigation from cart when making reservation

    - add cart contents to reservation state > empty cart
*** 

## To Do
- check individual state values against valid- if one value is invalid pass an error - 
- cart should be reset after reservation is made (i.e. checkout)
- try using useeffect to set html max attribute and clearing input field
- form validation
    - login form
    - reservation component
    - cart component
***

## Done
- [x] create subcomponents to display EULA before submitting submitting reservation
- [x] validate form in app js, pass in a useNavigate callback from cart component that will navigate when button is clicked but after form is done updating state (navigate is based on state update of property validCart:true)
- [x] validate form before it's passed to cart: component state should update on change so that it can be validated
- [x] create main component and create context above it in app.js
    - pass login status by context
***

## Architecture Notes

#### users/login
- if !currentUser route to login
- if currentUser.admin===true show protected routes