import React, { Component } from "react";
import Fire from "../config/Fire";
import { Redirect } from "react-router-dom";
import Spinner from "./spinner";
import "../css/ChangePassword.css";

let unsubscribe;
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fields: {},
      errors: {},
      // data: {},
      // user: null
    };
  }
  
  componentDidMount = () => {
    this.authListener();
  };
   
   
  authListener = () => {
  this.unsubscribe =  Fire.fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user});
      
      }
      this.getData()
      //NO LOGOUT PROVISION HENCE NOT SETTING user TO null
    });
   
  };


  getData = async() => {
   await Fire.getUserData().then( result => {
      this.setState({data: result[0]})
      console.log(result)
    })
  }
  

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // if (typeof fields["password"] !== "undefined") {
    //   if (
    //     !fields["password"].match(
    //       /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    //     )
    //   ) {
    //     formIsValid = false;
    //     errors["password"] = "Please enter a secure and strong password.";
    //   }
    // }
    // if (typeof fields["confirmpassword"] !== "undefined") {
    //   if (
    //     !fields["confirmpassword"].match(
    //       /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    //     )
    //   ) {
    //     formIsValid = false;
    //     errors["confirmpassword"] =
    //       "Please enter a secure and strong password.";
    //   }
    // }
    this.setState({ errors: errors });
    return true;
  }




  contactSubmit = (e) => {
    const { fields,user,data } = this.state;
    e.preventDefault();

    if (this.handleValidation()) {


    data['isChanged'] = true;
    this.setState({data});
    Fire.changePassword(this.state.user,fields['password']);
    Fire.updateLogin(user.uid,this.state.data)

    } else {
      alert("Form has errors.");
    }
  };





  handleChange = (e) => {
    let fields = this.state.fields;
    let name = e.target.name;
    fields[name] = e.target.value;
    this.setState({ fields });
  }



  changeHandler = (event) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value,
        valid: !!event.target.value,
      },
    });
  };




  render() {
    if(this.state.data === undefined ){
      return <Spinner />;
    }

    else if(this.state.data.isStudent === true){
      if(this.state.data.isChanged == true){
        return <Redirect to = "/student/profile"/>
      }
    }
    else if(this.state.data.isTeacher === true){
      if(this.state.data.isChanged == true){
        return <Redirect to = "/teacher/profile"/>
      }
    }    
    return (
      <div>
        <div className="bg-change-password">
          <div className="change-password">
          <form method="post" onSubmit={this.contactSubmit}>
            <div className="text-center p-3 heading-change-password">
              <h1>
                <b>Change Password</b>
              </h1>
            </div>
            <div>
              <input
              type="password" 
              name="oldpass"
              onChange={this.handleChange}
              value={this.state.fields["oldpass"]}
              className="input-field-change-password"
              placeholder="Old Password"
              required 
              
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                ref="password"
                onChange={this.handleChange}
                value={this.state.fields["password"]}
                className="input-field-change-password"
                placeholder="New Password"
                required
              />
              <span style={{ color: "red" }}>
                {this.state.errors["password"]}
              </span>
            </div>

            <div>
              <input
                type="password"
                name="confirmpassword"
                ref="confirmpassword"
                onChange={this.handleChange}
                value={this.state.fields["confirmpassword"]}
                className="input-field-change-password"
                placeholder="Confirm Password"
                required
              />
              <span style={{ color: "red" }}>
                {this.state.errors["confirmpassword"]}
              </span>
            </div>

            <div className="text-center">
              <button type="submit" className="change-password-button">Change</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default ChangePassword;