import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            first: [],
            initial: 0,
            currentPage: 1,
            totalPages: 0
        }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
            console.log(result);
            this.setState({
                data: result.data,
                totalPages: result.data.length / 10,
                first: result.data.slice(0, 10)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    previousItems = () => {
        console.log(this.state.initial)
        const value = this.state.initial - 10
        const pageNumber = this.state.currentPage - 1
        const newArray = [...this.state.data];
        const first = newArray.splice(value, 10);
        console.log(first)
        this.setState({
            first: first,
            initial: value,
            currentPage: pageNumber,
        })
    }

    nextItems = () => {
        console.log(this.state.initial)
        const value = this.state.initial + 10
        const pageNumber = this.state.currentPage + 1
        const newArray = [...this.state.data];
        const first = newArray.splice(value, 10);
        console.log(first)
        this.setState({
            first: first,
            initial: value,
            currentPage: pageNumber,
        })
    }
    loadItems = (index) => {
        const newArray = [...this.state.data];
        const value = index *10 - 10;
        console.log(value)
        const array = newArray.splice(value, 10);
       
         this.setState({
            currentPage: index,
             initial: value,
             first: array
        }) 
    //   1->0
    //   2->10
    //   3->20
    //   i->i*10 -10  
        
    }

    render() {
        return (
            <div className="container">
                <h4>Posts</h4>
                 <p class="float-right" style={{ float :"right"}}>Page: {this.state.currentPage}/{this.state.totalPages}</p>
                <table className="table table-bordered">
                    <caption>
                    </caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.first === undefined ? "" :
                            this.state.first.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
{/* Pagination */}
                <div>
 <ul class="pagination justify-content-end">
{this.state.currentPage === 1 ?
    <li  class="page-item disabled">
    <button class="page-link" href="#" onClick={this.previousItems}>Previous</button>
    </li>
    :
    <li  class= "page-item">
    <button class="page-link" href="#" onClick={this.previousItems}>Previous</button>
    </li>
    }
    <li class={this.state.currentPage === 1 ?"page-item active": "page-item"}>
    <button class="page-link" onClick={()=>this.loadItems(1)}>1</button>
    </li>
    <li class={this.state.currentPage ===  2?"page-item active": "page-item"}>
    <button class="page-link" onClick={()=>this.loadItems(2)}>2</button>
    </li>
    <li class={this.state.currentPage === 3 ?"page-item active": "page-item"}>
    <button class="page-link" onClick={()=>this.loadItems(3)}>3</button>
    </li>

    {this.state.currentPage === this.state.totalPages ?
    <li  class="page-item disabled">
    <button class="page-link"  onClick={this.nextItems}>Next</button>
    </li>
    :
    <li  class= "page-item">
    <button class="page-link" onClick={this.nextItems}>Next</button>
    </li>
    }
  </ul>
                </div>

            </div>
        )
    }
}