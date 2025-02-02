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
      registrationPassword: '',
      registrationEmail: ''
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
    let url = process.env.REACT_APP_BASE_URL + '/api/accounts/create-user';

    let {
      registrationUsername: username,
      registrationPassword: password,
      registrationEmail: email
    } = this.state;

    console.log('email:', email);
    try {
      await axios.post(url, {
        'username': username,
        'password': password,
        'email' : email
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
    let url = process.env.REACT_APP_BASE_URL + '/api/accounts/login';
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
    else if (id === 'registrationEmail') {
      this.setState({ registrationEmail: event.target.value });
    }
  }

  render() {
    return (
      <div className="loginPage">
        <div className="login">
          <h1>Log in</h1>
          <form class="w-25">
            {/* TODO: form stuff, bind to state */}
            <div class="form-group row justify-center">
              <label class= "">Username</label>
              <input
                class="form-control"
                type="text"
                id="loginUsername"
                name="loginUsername"
                value={ this.state.loginUsername }
                onChange={ this.handleChange }>
              </input>
              <br></br><br></br>
              <label>Password</label>
              <input
                class="form-control"
                type="password"
                id="loginPassword"
                name="loginPassword"
                value={ this.state.loginPassword }
                onChange={ this.handleChange }>
              </input>
            </div>
          </form>
        </div>
        <button class="btn btn-success" onClick={ this.loginButtonClicked }>login</button>

        <div className="register">
          <br></br><br></br>
          <h1>Create an Account</h1>
          <br></br>
          {/* TODO: form stuff, bind to state */}
          <form class="w-25">
            <div class="form-group row justify-center">
              <label >Username</label>
              <input
                class="form-control"
                type="text"
                id="registrationUsername"
                name="registrationUsername"
                value={ this.state.registrationUsername }
                onChange={ this.handleChange }>
              </input>
              <br></br><br></br>
              <label>Password</label>
              <input
                class="form-control"
                type="password"
                id="registrationPassword"
                name="registrationPassword"
                value={ this.state.registrationPassword }
                onChange={ this.handleChange }>
              </input>
              <br></br><br></br>
              <label>Email</label>
              <input
                class="form-control"
                type="text"
                id="registrationEmail"
                name="registrationEmail"
                value={ this.state.registrationEmail }
                onChange={ this.handleChange }>
              </input>
            </div>
          </form>
        </div>
        <button class="btn btn-primary" onClick={ this.registerButtonClicked }>create account</button>



      </div>

    );
  }
}

export default LoginPage;
