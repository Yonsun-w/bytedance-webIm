import React from 'react';
import SignupForm from "./SignupFrom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as signupActions from "../../actions/signupActions"
import * as flashActions from "../../actions/flashActions"

class SignupPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {/* <SignupForm history={ this.props.history } signupActions={ this.props.signupActions }/> */}
          <SignupForm signupActions={ this.props.signupActions } flashActions={ this.props.flashActions }/>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupActions: bindActionCreators(signupActions, dispatch),
    flashActions:bindActionCreators(flashActions,dispatch)
  }
}

export default connect(null,mapDispatchToProps)(SignupPage);
