import { Component } from 'react';
import axios from 'axios';


export default class SignUpForm extends Component{


state ={
userName:"",
pwd:"",
}

 


   //受控组件
   onSubmit = (e) =>{
      console.log('onSubmit 触发 state是'+this.state)
      let  data= {
         userId:this.state.userName,
         pwd:this.state.pwd
      }
      axios.post('http://101.34.221.238:8080/login',data).then((response) => {
         console.log('响应');
         console.log(response);
         this.mySource = response;
       }).catch(function (err) {
         console.log('失败');
         console.log(err);    //捕获异常
       });
   };
     
    
changeHandle = (e) =>{
  this.setState(
     {
    [e.target.name]:e.target.value
     }
  )
};


 render(){
   const {userName,pwd} = this.state;
 return(
   <div>我是表单
 {/* <form onSubmit={this.onSubmit }>   这种写法不知道为什么不可以触发*/}
  <form >
     <h1> 欢迎来到 吴彦组聊天室</h1>
     <div className ="form-group">
        <label className="control-label"> 
        userName
        </label>
        <input 
        className="form-control" 
        type="text"
         name ="userName"
         value = {userName}
         onChange = {this.changeHandle}/>
        <label className="control-label"> 密码</label>
        <input
         className="form-control" 
         type="text" 
         name ="pwd"
         onChange = {this.changeHandle}
         value = {pwd}/>
 
<button className="btn btn-primary" type="button" onClick={this.onSubmit}>
  登录 
</button>
        </div>


  </form>


   </div>
   
 
   
 )
      

 }    
}