import { AuthContext } from "./App"
import { useEffect, Component } from "react"


class Confirmation extends Component{
    constructor(props){
        super(props)
    }
    
    componentWillUnmount=()=>{
        this.props.resetCartAndConfirmation()
    }
    render(){
        return(
        <div>congratulations, you're all set</div>
    )
    }
    
}

export default Confirmation