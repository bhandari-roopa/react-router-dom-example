import logo from './logo.svg';
import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Posts = lazy(() => import('./components/posts'));
const Home = lazy(() => import('./components/home'));
const Navbar = lazy(() => import('./navbar'));
const Users = lazy(() => import('./components/users'));
const Comments = lazy(() => import('./components/comments'));

function App() {
  return (
    <div>
 <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/posts" component={Posts}/>
        <Route path="/users" component={Users}/>
        <Route path="/comments" component={Comments}/>
      </Switch>
    </Suspense>
  </Router>
    </div>
     
  );
}

export default App;
