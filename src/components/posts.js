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
            totalPages: 0,
            showPageStart:0,
            showPageEnd:3,
            showPages:3,
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

    incrementPage=()=>{
        this.setState({
            showPageStart : this.state.showPageStart + this.state.showPages,
            showPageEnd : this.state.showPageEnd + this.state.showPages,
        })
    }
    decrementPage=()=>{
        this.setState({
            showPageStart : this.state.showPageStart - this.state.showPages,
            showPageEnd : this.state.showPageEnd - this.state.showPages,
        })
    }
    previousItems = () => {
        if((this.state.currentPage -1)%this.state.showPages === 0 ){
            this.setState({showPageEnd: this.state.showPageEnd - this.state.showPages});
            this.setState({showPageStart: this.state.showPageStart - this.state.showPages});
        }
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
        if((this.state.currentPage +1) > this.state.showPageEnd ){
            this.setState({showPageEnd: this.state.showPageEnd + this.state.showPages});
            this.setState({showPageStart: this.state.showPageStart + this.state.showPages});
        }
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

        console.log("start",this.state.showPageStart);
        console.log("end",this.state.showPageEnd);

        const pageNumbers = [];
        for (let i = 1; i <= this.state.totalPages; i++) {
          pageNumbers.push(i);
        }
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
    {this.state.showPageStart === 0 ?
        <li  class="page-item disabled">
        <button class="page-link" href="#" onClick={this.decrementPage}>..</button>
        </li>:
        <li  class= "page-item">
        <button class="page-link" href="#" onClick={this.decrementPage}>..</button>
        </li>
    }


{this.state.totalPages > 0 ?
 pageNumbers.map((page)=>(
    page === 0 && this.state.currentPage === 1?
     <li class={this.state.currentPage === page ?"page-item active": "page-item"}>
     <button class="page-link" onClick={()=>this.loadItems(page)}>{page}</button>
     </li>:
   page < this.state.showPageEnd + 1 && page > this.state.showPageStart  ?
   <li class={this.state.currentPage === page ?"page-item active": "page-item"}>
   <button class="page-link" onClick={()=>this.loadItems(page)}>{page}</button>
   </li>:""

)) :""}

        {pageNumbers.length < this.state.showPageEnd ?
        <li  class="page-item disabled">
        <button class="page-link" href="#" onClick={this.incrementPage}>..</button>
        </li>:
        <li  class= "page-item">
        <button class="page-link" href="#" onClick={this.incrementPage}>..</button>
        </li>
      }

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