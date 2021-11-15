import { CURRENT_USER } from "../constants" 
import isEmpty from "lodash/isEmpty"

const initState = {
    isAuthenticated:false,
    user:{},
    value:'测试一下'
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