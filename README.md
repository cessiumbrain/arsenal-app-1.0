# Arsenal App Functional Components and Hooks

## Where I left off
- tested for errors before navigating in res form, now set the cart component first then call the navigate function after set state synchronously 

## Bugs
- navigation from reservation booking requires two clicks
- you can still enter a value higher than the max value for number of lanes input

*** 

## To Do
- basic reservation list
- switch booking data to match first and last names from user's profile rather than input form
- add phone number, group name to booking
- try using useeffect to set html max attribute and clearing input field
- set color range border based on how many reservations for a given day

***

## Done
- [x] fixed bug where you could key in a number larger than max in res input form with onkeyup function
- [x] fixed bug with setting state in reservation form validation and navigating synchronously
- [x] created profile page
- [x] navigation and state management between reservation> cart > confirmation
- [x] create subcomponents to display EULA before submitting submitting reservation
- [x] validate form in app js, pass in a useNavigate callback from cart component that will navigate when button is clicked but after form is done updating state (navigate is based on state update of property validCart:true)
- [x] validate form before it's passed to cart: component state should update on change so that it can be validated
- [x] create main component and create context above it in app.js
    - pass login status by context
***

## Architecture Notes
### reservation > cart > confirmation
- navigation from cart to EULA to Confirmation: valid reservation `{navigate to cart}`=> confirm checkout `{pass currentUser.confirmationPage: true to trigger navigation to confirmation component}`=> on componentWillUnmount (i.e. any navigation away from page) `{reset cart and confirmation state}`

#### users/login
- if !currentUser route to login
- if currentUser.admin===true show protected routes