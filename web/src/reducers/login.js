import { CURRENT_USER } from "../constants" 
import isEmpty from "lodash/isEmpty"

const initState = {
    isAuthenticated:false,
    user:{}
}
const login = (state = initState,action) =>{
    switch(action.type){
        case CURRENT_USER:
            return{
                isAuthenticated:!isEmpty(action.user),
                user:action.user
            }
        default:
            return state;
    }
}

export default login