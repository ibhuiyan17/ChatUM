import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


import React, { Component } from 'react';

import './components/Button'
import Button from './components/Button';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '' // TODO: change this to ''
    };

    this.userIdHandler = this.userIdHandler.bind(this);
  }

  // passed into LoginPage component to set userId
  userIdHandler = (userId) => {
    this.setState({ userId }, () => console.log('userId set to', userId));
  };

  render () {
    return(
      <div className="App">
        <div className="header">
          <h1>ChatUM</h1>
          <h2>Meet your peers</h2>
        </div>
        {this.state.userId === '' ? <LoginPage userIdHandler={ this.userIdHandler }/> : <HomePage userId={ this.state.userId }/>}
      </div>
    );
  }
}

export default App;
