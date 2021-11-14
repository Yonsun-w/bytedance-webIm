import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { addFlashMessage } from "../actions/flashActions"

export default function (ComposedComponent) {
    class Authenticate extends React.Component {

        componentWillMount() {
            if (!this.props.login.isAuthenticated) {
                this.props.addFlashMessage({
                    type: "danger",
                    text: "请先去登陆"
                })
                this.props.history.push("/login");
            }
        }

        componentWillUpdate(prevProps) {
            if (!prevProps.login.isAuthenticated) {
                this.props.history.push("/login");
            }
        }

        render() {
            return (
                <div>
                    <ComposedComponent {...this.props} />
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            login: state.login
        }
    }

    return withRouter(connect(mapStateToProps, { addFlashMessage })(Authenticate))
}