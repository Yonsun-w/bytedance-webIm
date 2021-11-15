import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import initStore from "./store"
import routes from "./routes"
import { BrowserRouter as Router } from "react-router-dom"

import Nav from "./components/Nav"
import FlashMessageList from "./components/flash/FlashMessageList"
import setAuthorizationToken from "./utils/setAuthorizationToken"
import { setCurrentInfo } from "./actions/loginActions"

const store = initStore();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user")

if(token&user){
   store.dispatch(setCurrentInfo(user))
   setAuthorizationToken(token)
}

ReactDOM.render(
    <Provider store={store}>
        <Router routes={ routes }>
            <Nav />
            <FlashMessageList />
            { routes }
        </Router>
    </Provider>,
    document.getElementById('root'));