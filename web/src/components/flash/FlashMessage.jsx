import React from "react"
import classnames from "classnames"

export default class FlashMessage extends React.Component {

    clickHandle = () =>{
        this.props.delFlashMessage(this.props.message.id)
    }

    render() {
        const { type, text } = this.props.message;
        return (
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'danger'
            })}>
                <button onClick={ this.clickHandle } className="close">&times;</button>
                { text }
            </div>
        )
    }
}