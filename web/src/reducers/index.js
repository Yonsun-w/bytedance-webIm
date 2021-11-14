import { combineReducers } from "redux"
import login from "./login"
import flash from "./flash"

const rootReducer = combineReducers({
    login,
    flash
})

export default rootReducer