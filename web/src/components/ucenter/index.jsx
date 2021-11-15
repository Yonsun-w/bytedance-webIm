import React from "react"
import store from '../../store'

export default class UCenter extends React.Component{
   
    

    

    render(){
        const { isAuthenticated,user } = this.props.login
        return(
            <div>
                Hello,
                {user.userId}
            </div>
        )
    }
}