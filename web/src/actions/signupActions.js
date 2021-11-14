import axios from "axios"

export const userSignupRequest = (userData) => {
    return dispatch => {
        return axios.post("/api/register", userData)
    };
}

export const checkUserExistsRequest = (username) =>{
    return dispatch =>{
        return axios.get(`/api/username/${username}`);
    }
}