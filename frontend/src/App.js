import logo from './logo.svg';
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
      userId: ''
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
        {this.state.userId === '' ? <LoginPage userIdHandler={ this.userIdHandler }/> : <HomePage userId={ this.state.userId }/>}
      </div>
    );
  }
}

export default App;
