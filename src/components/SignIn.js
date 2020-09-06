import React, { Component } from "react";
import Fire from "../config/Fire";
import { Redirect } from "react-router-dom";
import "../css/SignIn.css";

class SignIn extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       email: "",
       password: "",
       user: null
    }
  }
  
  componentDidMount = () => {
    this.authListener();
    Fire.SignoutUser();
  };
  
  authListener = () => {
    Fire.fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
      
      //NO LOGOUT PROVISION HENCE NOT SETTING user TO null
    });
  };


  
  
  // Fire.db.collection('Org').doc('VIT').collection('Login').doc(this.state.user.uid).get().then( doc => {
  //   console.log(doc.data())
  // })
  
  
  handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({[name]: val});
  }
  
  
  
  
  handleSubmit = (e) => {
    let {email,password,org} = this.state;
    e.preventDefault();
    Fire.LoginUser({email,password,org})
  }


  render() {
    if(this.state.user){
      return <Redirect to='/success'
         />
    }  
    return (
      <div>
        <div className="bg-sign-in">
          <div className="sign-in">
            <form method="post" onSubmit={this.handleSubmit}>
              <div className="text-center p-3 heading-sign-in">
                <h1>
                  <b>Sign In</b>
                </h1>
              </div>

              <div>
                <input 
                  type="email" 
                  name="email"
                  onChange={this.handleChange}
                  value = {this.state.email} 
                  placeholder="Email"
                  className="input-field-sign-in"
                  required
                />
              </div>

              <div>
                <input 
                  type="password"
                  name="password"
                  required 
                  onChange={this.handleChange}
                  value = {this.state.password}  
                  placeholder="Password"
                  className="input-field-sign-in"
                  />
              </div>

              <div className="text-center">
                <button type="submit" className="sign-in-button">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
