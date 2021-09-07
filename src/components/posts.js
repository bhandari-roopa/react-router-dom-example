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
    loadItems = () => {
        console.log(this.state.initial)
        const value = this.state.initial + 10
        const newArray = [...this.state.data];
        const first = newArray.splice(value, 10);
        console.log(first)
        this.setState({
            first: first,
            initial: value
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

                <div class="row justify-content-center">
                    <div class="col-3 text-center">
                        <button className="btn btn-primary" style={{ marginRight : "10px"}} disabled={this.state.currentPage === 1 ? true : false} onClick={this.previousItems}>Previous</button>
                        <button className="btn btn-primary" disabled={this.state.currentPage === this.state.totalPages ? true : false} onClick={this.nextItems}>Next</button>
                        
                    </div>
                </div>

            </div>
        )
    }
}