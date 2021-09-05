import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

export default class Users extends React.Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
        }
    }
    componentDidMount(){
      axios.get('https://jsonplaceholder.typicode.com/users').then((result)=>{
          console.log(result);
          this.setState({
            users:result.data
          })
      }).catch((err)=>{
        console.log(err)
      })
    }
    removeUser(userId){
        const users = [...this.state.users];
        const userList= users.filter(item => item.id !== userId);
        this.setState({
          users:userList,
        });
      
      }
    render(){
        return(
            <div className="container">
                <h4>Users</h4>
                <table className ="table table-bordered">
                
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users === undefined? "":
                        this.state.users.map((item,i)=>(
                            <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td><button className="btn btn-primary" onClick={()=>this.removeUser(item.id)}>Remove</button></td>
                         </tr>
                        ))
                        }
                    </tbody>
                </table>
                
            </div>
        )
    }
}