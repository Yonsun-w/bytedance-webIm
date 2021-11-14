// axios：携带设置请求头信息
import axios from "axios"

const setAuthorizationToken = (token) =>{
    if(token){
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthorizationToken