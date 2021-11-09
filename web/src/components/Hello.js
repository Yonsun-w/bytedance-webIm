import { Fragment } from "react";
import React from "react";
//第一个抽离文件
class Hello extends React.Component{
     constructor(props){
         super(props);
     }

    render() {
        return (
        <Fragment>
        <h1>Hello, {this.props.name}</h1>
        <MyButton>给{this.props.name} 打招呼吧</MyButton>
        </Fragment>
        );
      }

};


//按钮
class MyButton extends React.Component{
    constructor(props){
        super(props);
    }

   render() {
       return (
       <Fragment>
       <button onClick="a">给{this.props.name} 打招呼吧</button>
       </Fragment>
       );
     }

};
     var a = function sayHi(){
    console.log('hi');
  }




export default  Hello