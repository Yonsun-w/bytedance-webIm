import React,{Component} from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import App from "../pages/App"
import SignUpPage from "../pages/SignUp/SignUpPage"
import Nav from "../pages/Nav"
export default class index extends Component{
 render(){
     return (
         <Router>
            <Nav/>
             <Switch>
                 <Route path="/" exact component={App}></Route>
                 <Route path="/login" exact component={SignUpPage}></Route>
             </Switch>
            
         </Router>
     )
 }

}