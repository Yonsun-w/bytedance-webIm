import { Fragment } from "react";
import React from "react";
import  ReactDOM   from 'react-dom'

//第一个抽离文件
class Hello extends React.Component{
     constructor(props){
         super(props);
     }

     state = {
        test:'传家宝',
        money:''
     }
     //回掉函数
     getMoney(num){
     this.setState({
         money:num
     })

     }

    render() {
        return (
        <Fragment>
        <h1>Hello, {this.props.name}</h1>
        <div>
            父亲持有的：{this.state.test}
        </div>
        <div>
        父亲收到孩子的养老金 ：{this.state.money}

        </div>
        <MyButton name = '按钮定义' sonTest = {this.state.test} send ={this.getMoney.bind(this)}></MyButton>
  
        </Fragment>
        );
      }

};


//按钮
class MyButton extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            test:this.props.sonTest
        }
    };

 

   render() {
       return (
        
       <Fragment>
        
       <button onClick={this.sayHi}>给{this.props.name} 打招呼吧</button> 
       <div>
       儿子这里 父亲传来的： {this.state.test}
       <button onClick={this.tick.bind(this)}> 加工</button>
       <button onClick={this.send.bind(this)}>调用回掉函数给父亲送钱</button>
       </div>
    
       </Fragment>
       );
     } 
        //这里没绑定却不报错的原因是因为这个方法没有调用this 
       sayHi(){
        console.log('hi,my THIS name'+this);
      };
      //这个方法必须绑定
      tick() {
          console.log("hi"+this.state.test)
        this.setState({
        test:'改编后'
        });
      };
      send(){
        this.props.send(500)
      }




};


ReactDOM.render(<Hello></Hello>,document.getElementById('root'))


export default  Hello