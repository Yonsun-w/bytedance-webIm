import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import img from '../../static/logo192.png'

export default class Nav extends Component{
    render(){
        return (
       
<nav className="navbar navbar-default ">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link className="navbar-brand" to = '/'>
        <img alt="首页" src='{img}'/>
      </Link>
    </div>
  </div>

    <div className="navbar-header">
      <Link className="navbar-brand" to = '/login'>
        <img alt="登录" src='{img}'/>
      </Link>
  </div>
</nav>
 
       
        )
    }
}
 