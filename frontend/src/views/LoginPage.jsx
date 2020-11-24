import React, { Component } from 'react';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // userId: '', // set after registration or login

      loginUsername: '',
      loginPassword: '',
      registrationUsername: '',
      registrationPassword: ''
    };

    this.registerButtonClicked = this.registerButtonClicked.bind(this);
    this.loginButtonClicked = this.loginButtonClicked.bind(this);
    this.loginAndSetUserId = this.loginAndSetUserId.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  // login handler
  loginButtonClicked = async () => {
    console.log('login button clicked')
    this.loginAndSetUserId(this.state.loginUsername, this.state.loginPassword);
  };

  // registration handler
  registerButtonClicked = async () => {
    console.log('register button clicked');
    let url = 'http://localhost:5001/webapp-17d6b/us-central1/api/accounts/create-user';

    let { 
      registrationUsername: username,
      registrationPassword: password
    } = this.state;
    
    try {
      await axios.post(url, {
        'username': username,
        'password': password
      });
      console.log('successfully created user');
      
      this.loginAndSetUserId(username, password);
    } catch (err) {
      let { error: msg } = err.response.data;
      console.log(msg);
      alert(msg);
    }
  };

  // logs in user and sets userId for the app
  loginAndSetUserId = async (username, password) => {
    let url = 'http://localhost:5001/webapp-17d6b/us-central1/api/accounts/login';
    try {
      const {
        data: {
          userId
        }
      } = await axios.get(url, {
        params: {
          'username': username,
          'password': password
        }
      });
      // set userId
      this.props.userIdHandler(userId);
    } catch (err) {
      let { error: msg } = err.response.data;
      console.log(msg);
      alert(msg);
    }    
  }

  // update state with username/password
  handleChange(event) {
    let { id } = event.target;

    if (id === 'loginUsername') {
      this.setState({ loginUsername: event.target.value });
    } 
    else if (id === 'loginPassword') {
      this.setState({ loginPassword: event.target.value });
    } 
    else if (id === 'registrationUsername') {
      this.setState({ registrationUsername: event.target.value });
    } 
    else if (id === 'registrationPassword') {
      this.setState({ registrationPassword: event.target.value });
    }
  }

  render() {
    return (
      <div className="loginPage">
        <div className="login">
          <h1>Log in</h1>
          <form>
            {/* TODO: form stuff, bind to state */}
            <div>
              <label>username</label>
              <input
                type="text"
                id="loginUsername"
                name="loginUsername"
                value={ this.state.loginUsername }
                onChange={ this.handleChange }>
              </input>
              <br></br>
              <label>password</label>
              <input
                type="text"
                id="loginPassword"
                name="loginPassword"
                value={ this.state.loginPassword }
                onChange={ this.handleChange }>
              </input>
            </div>
          </form>
          <button onClick={ this.loginButtonClicked }>login</button>
        </div>
        <div className="register"> 
          <h1>Create an Account</h1>
          {/* TODO: form stuff, bind to state */}
          <form>
            <div>
              <label >username</label>
              <input
                type="text"
                id="registrationUsername"
                name="registrationUsername"
                value={ this.state.registrationUsername }
                onChange={ this.handleChange }>   
              </input>
              <br></br>
              <label>password</label>
              <input
                type="text"
                id="registrationPassword"
                name="registrationPassword"
                value={ this.state.registrationPassword }
                onChange={ this.handleChange }>
              </input>
            </div>
          </form>
          <button onClick={ this.registerButtonClicked }>create account</button>
        </div>
        

        
      </div>
        
    );
  }   
}

export default LoginPage;
