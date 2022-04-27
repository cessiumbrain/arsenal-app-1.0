# Arsenal App Functional Components and Hooks

## Where I left off
- create main component and create context above it in app.js
    - pass login status by context
- login form validation
*** 

## To Do

- [] validate form before it's passed to cart: component state should update on change so that it can be validated
    - check individual state values against valid- if one value is invalid pass an error - 
    - cart should be reset after reservation is made (i.e. checkout)
- try using useeffect to set html max attribute and clearing input field
- form validation
    - login form
    - reservation component
    - cart component
***

### Architecture Notes

#### users/login
- if !currentUser route to login
- if currentUser.admin===true show protected routes