import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

export default class Posts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            limit:10,
        }
    }
    componentDidMount(){
      axios.get('https://jsonplaceholder.typicode.com/posts').then((result)=>{
          console.log(result);
          this.setState({
              data:result.data
          })
      }).catch((err)=>{
        console.log(err)
      })
    }
    loadItems=()=>{
        this.setState({
            limit : this.state.limit + 10
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
                        {this.state.data === undefined? "":
                        this.state.data.slice(0,this.state.limit).map((item,i)=>(
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