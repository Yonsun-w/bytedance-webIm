import React from "react"
import FlashMessage from "./FlashMessage"
import { connect } from "react-redux"
import { delFlashMessage } from "../../actions/flashActions"

class FlashMessageList extends React.Component{
    

    render(){

        // const messages = this.props.messages.map((element,index) =>{
        //     return <FlashMessage key={index} message={ element }/>
        // })

        const messages = this.props.messages.map((element) =>
            <FlashMessage delFlashMessage={ this.props.delFlashMessage } key={element.id} message={ element }/>
        )

        return(
            <div>
                { messages }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        messages:state.flash
    }
}


export default connect(mapStateToProps,{ delFlashMessage })(FlashMessageList)