import React,{ Component } from "react";
import{BrowserRouter as Router, Switch,Route } from 'react-router-dom'
 

import Navigator from "./pages/navigator";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
export default class App extends Component{
 render(){

    return(
      
       <Router>
        <Navigator>
        <Switch>
            <Route path='/'  exact  component={Home}></Route>
            <Route path='/login'   component={Login}></Route>
            <Route path='/register'   component={Register}></Route>   
        </Switch>  
        </Navigator>
        </Router>
      
    )
 }




}