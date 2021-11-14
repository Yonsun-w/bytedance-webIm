import axios from "axios"
import setAuthorizationToken from "../utils/setAuthorizationToken"
import { CURRENT_USER } from "../constants"
 
export const setCurrentInfo = (user) =>{
    return{
        type:CURRENT_USER,
        user
     // wjh  
    }
}

export const logoutAction = () =>{
    return dispatch => {
        // 删除本地
        localStorage.removeItem("token")
        // redux置空
        dispatch(setCurrentInfo({}))
    }
}




export const loginRequest = (user) => {
    return dispatch =>{
        // return axios.post("http://101.34.221.238:8080/login",user).then(res =>{
        //     const token = res.data;
        //     localStorage.setItem("token",token)
        //     setAuthorizationToken(token)
        //     dispatch(setCurrentInfo(jwtDecode(token)))
        // })
     return   axios({
            method: "post",
            url: "http://101.34.221.238:8080/login",
            data: {
                userId: user.userId,
                pwd: user.pwd
            }
        }).then((res) => {
            if(res.data.code=='1'||res.data.msg=="用户名或密码错误"){
                throw new Error(res.data.msg);
            }
            console.log(res.data);
            const token  = res.data.data.token;
        //    console.log("断点");
            console.log(res.data.data.token);
            localStorage.setItem("token",token)
            setAuthorizationToken(token)
            dispatch(setCurrentInfo(user))
        }).catch((error) => {
            throw error; 
        })



    }
}