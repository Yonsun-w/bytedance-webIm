import React from "react"
import classnames from "classnames"
import { connect } from "react-redux"
import { loginRequest } from "../../actions/loginActions"
import { withRouter } from "react-router-dom"
import validatorInput from "../../utils/login"
import { addFlashMessage } from "../../actions/flashActions"

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            pwd: "",
            errors: {},
            isLoading: false
        }
    }

    isValid = () => {
        const { errors, isValid } = validatorInput(this.state);
        if (!isValid) {
            // 发生错误
            this.setState({ errors: errors })
        }
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ isLoading: true })
            this.props.loginRequest(this.state).then(
                (res) => {
                    
                    this.setState({ isLoading: false })
                    this.props.addFlashMessage({
                        type:"success",
                        text:"欢迎回家!"
                    })
                    this.props.history.push("/")
                },
                (err) => {
                    console.log(err)
                    this.setState({ errors: 
                        {
                            msg:"发生了错误"
                        }
                        , isLoading: false })
                    this.props.addFlashMessage({
                        type:"err",
                        text:"用户信息错误"

                    })
                    this.props.history.push("/login")
                }
            )
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { userId, pwd, errors, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                {errors.msg && <div className="alert alert-danger">{errors.msg}</div>}
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        value={userId}
                        onChange={this.onChange}
                        type="text"
                        name="userId"
                        className={classnames('form-control', { 'is-invalid': errors.userId })}
                    />
                    {errors.userId && <span className='form-text text-muted'>{errors.userId}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={pwd}
                        onChange={this.onChange}
                        type="text"
                        name="pwd"
                        className={classnames('form-control', { 'is-invalid': errors.pwd })}
                    />
                    {errors.pwd && <span className='form-text text-muted'>{errors.pwd}</span>}
                </div>

                <div className="form-group">
                    <button disabled={isLoading} className="btn btn-primary btn-lg">Login</button>
                </div>
            </form>
        )
    }
}

export default withRouter(connect(null, { loginRequest,addFlashMessage })(LoginForm))