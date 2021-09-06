import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

export default class Posts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            first:[],
            initial:0
        }
    }
    componentDidMount(){
      axios.get('https://jsonplaceholder.typicode.com/posts').then((result)=>{
          console.log(result);
          this.setState({
              data:result.data,
              first:result.data.slice(0,10)
          })
      }).catch((err)=>{
        console.log(err)
      })
    }
    loadItems=()=>{
        console.log(this.state.initial)
        const value = this.state.initial +10 
        const newArray = [...this.state.data];
        const first = newArray.splice(value,10);
        console.log(first)
        this.setState({
            first :first,
            initial : value
        })
    }
    render(){
        return(
            <div className="container">
                <h4>Posts</h4>
                <table className ="table table-bordered">
                <caption> <button className="btn btn-primary" onClick={this.loadItems}>Next</button></caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.first === undefined? "":
                        this.state.first.map((item,i)=>(
                            <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                         </tr>
                        ))
                        }
                    </tbody>
                </table>
                
            </div>
        )
    }
}