import { AuthContext } from "./App"
import { useEffect } from "react"


const Confirmation = () =>{
    useEffect(()=>{console.log('confirmation effect')})
    return(
        <div>congratulations, you're all set</div>
    )
}

export default Confirmation