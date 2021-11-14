import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutAction } from "../actions/loginActions"

class Nav extends React.Component {

    logoutHandle = () =>{
        this.props.logoutAction();
    }

    render() {
        const { isAuthenticated,user } = this.props.login

        const userLink = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    { user.userId }
                    <button className="btn" onClick={ this.logoutHandle }>退出</button>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/ucenter">个人中心</Link>
                </li>
            </ul>
        )

        const guestLink = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">注册</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">登陆</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/ucenter">个人中心</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">首页</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        { isAuthenticated ? userLink : guestLink }
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        login:state.login
    }
}

export default connect(mapStateToProps,{ logoutAction })(Nav)