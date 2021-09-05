import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

export default class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            first: [],
            limit: 10,
        }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/comments').then((result) => {
            console.log(result);
            this.setState({
                comments: result.data,
                first: result.data.slice(0, this.state.limit)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    loadItems = () => {
        const value = this.state.limit + 10;
        const newArray = [...this.state.comments];
        const first = newArray.slice(0,value);
        console.log(first)
        this.setState({
            first: first,
            limit: value,
        })     
    }
    render() {
        return (
            <div className="container">
                <h4>Comments</h4>
                <table className="table table-bordered">
                    <caption> <button className="btn btn-primary" onClick={this.loadItems}>Next</button></caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.first === undefined ? "" :
                            this.state.first.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tr>

                    </tr>
                </table>

            </div>
        )
    }
}