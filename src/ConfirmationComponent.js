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
        <div id="confirmation-component">
            <div id="confirmation-background">
                <p>congratulations, you're all set</p>
            </div>
            
        </div>
    )
    }
    
}

export default Confirmation