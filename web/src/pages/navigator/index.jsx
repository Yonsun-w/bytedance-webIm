import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';

export default  class Navigator extends Component{

render(){
    return(
        <Fragment>
           <nav className="navbar navbar-default">
  <div className="container-fluid">
  
    <div className="navbar-header">

<Link className="navbar-brand" to="">主页 </Link>
    </div>

    <div className="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav ">

        <li className="active"><Link to="/register">注册  </Link></li>
        <li  ><Link to="/login">登录</Link></li>
      
      </ul>
   
       
    </div>
  </div>
</nav>
        </Fragment>
    )
}


}