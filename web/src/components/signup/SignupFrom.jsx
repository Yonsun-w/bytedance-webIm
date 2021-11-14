import React from "react"
import classNames from "classnames"
import { withRouter } from "react-router-dom"

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: "",
            password:"",
            passwordConfirmation:"",
            errors:{},
            isLoading:false,
        }
    }

    submitHandle = (e) => {
        e.preventDefault();
        this.setState({ errors:{},isLoading:true })
        // 发送网络请求
        this.props.signupActions.userSignupRequest(this.state).then(
            (res) =>{
                this.setState({isLoading:false}) 
                if(res.data.success){
                    this.props.flashActions.addFlashMessage({
                        type:"success",
                        text:'注册成功，欢迎加入我们的大家庭!!!'
                    })
                    this.props.history.push("/");
                }
            },
            ({ response }) =>{ this.setState({ errors:response.data,isLoading:false }) }
        )
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkUserExists = (e) =>{
        const filed = e.target.name;
        const value = e.target.value;
        let isLoading = false;
        this.props.signupActions.checkUserExistsRequest(value).then(res =>{
            let errors = this.state.errors;
            if(res.data.length>0){
                errors[filed] = '用户名已被占用~';
                isLoading = true;
            }else{
                errors[filed]="";
                isLoading = false;
            }
            this.setState({
                errors:errors,
                isLoading:isLoading
            })
        })
    }

    render() {
        const { errors,isLoading } = this.state;
        return (
            <form onSubmit={this.submitHandle}>
                <h1>Join our community</h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        onBlur={ this.checkUserExists }
                        className={ classNames('form-control',{'is-invalid':errors.username}) }
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                    { errors.username && <span className="form-text text-muted">{ errors.username }</span> }
                </div>

                <div className="form-group">
                    <label className="control-label">email</label>
                    <input
                        type="text"
                        name="email"
                        className={ classNames('form-control',{'is-invalid':errors.email}) }
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    { errors.email && <span className="form-text text-muted">{ errors.email }</span> }
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        className={ classNames('form-control',{'is-invalid':errors.password}) }
                    />
                    { errors.password && <span className="form-text text-muted">{ errors.password }</span> }
                </div>

                <div className="form-group">
                    <label className="control-label">passwordConfirmation</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        className={ classNames('form-control',{'is-invalid':errors.passwordConfirmation}) }
                    />
                    { errors.passwordConfirmation && <span className="form-text text-muted">{ errors.passwordConfirmation }</span> }
                </div>

                <div className="form-group">
                    <button disabled={ isLoading } className="btn btn-primary btn-lg">注册</button>
                </div>
            </form>
        )
    }
}

export default withRouter(SignupForm)