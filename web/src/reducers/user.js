const userState = {
  user:{
    userId:"",
    pwd:"",
    token:""
  }
}

const user = (state = userState,action) =>{
   switch(action.type){
    case "setUser":
        return {

        };    
    default :
        return state;    

   }

}

export default user