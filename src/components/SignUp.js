import React, { Component } from "react";
import Fire from "../config/Fire.js";
import { NavLink, Link, Redirect } from "react-router-dom";
import "../css/SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (typeof fields["orgname"] !== "undefined") {
      
      if (!fields["orgname"].match(/^[a-zA-Z]*$/)){
     
        formIsValid = false;
        errors["orgname"] = "Only letters allowed";
      
      }
    
    }

    if (typeof fields["mobileno"] !== "undefined") {
      if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "Please enter a valid Contact Number ";
      }
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "Please enter a secure and strong password.";
      }
    }
    this.setState({ errors: errors });
    return true;
  }

  contactSubmit = (e) => {
    const { fields } = this.state;
    e.preventDefault();

    if (this.handleValidation()) {
      Fire.SignupOrg(fields);
      alert("Form has created.");
    } else {
      alert("Form has errors.");
    }
  };
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
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
    return (
      <div>
        <div className="bg-sign-up">
          <div className="sign-up">
            <form method="post" onSubmit={this.contactSubmit.bind(this)}>
              <div className="text-center p-3 sign-up-heading">
                <h1>
                  <b>Create Your Account</b>
                </h1>
              </div>

              <div>
                <input
                  type="text"
                  name="orgname"
                  ref="orgname"
                  onChange={this.handleChange.bind(this, "orgname")}
                  value={this.state.fields["orgname"]}
                  placeholder="Organisation Name"
                  className="input-field-sign-up"
                  required
                />
                <span style={{ color: "red", marginLeft: "5%" }}>
                  {this.state.errors["orgname"]}
                </span>
              </div>

              <div>
                <input
                  type="text"
                  name="username"
                  ref="username"
                  onChange={this.handleChange.bind(this, "username")}
                  value={this.state.fields["username"]}
                  placeholder="Username"
                  className="input-field-sign-up"
                  required
                />
                <span style={{ color: "red", marginLeft: "5%" }}>
                  {this.state.errors["username"]}
                </span>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  ref="email"
                  onChange={this.handleChange.bind(this, "email")}
                  value={this.state.fields["email"]}
                  placeholder="Email"
                  className="input-field-sign-up"
                  required
                />
                <span style={{ color: "red", marginLeft: "5%" }}>
                  {this.state.errors["email"]}
                </span>
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  ref="password"
                  onChange={this.handleChange.bind(this, "password")}
                  value={this.state.fields["password"]}
                  placeholder="Password"
                  className="input-field-sign-up"
                  required
                />
                <span style={{ color: "red", marginLeft: "5%" }}>
                  {this.state.errors["password"]}
                </span>
              </div>

              <div>
                <input
                  type="comment"
                  name="address"
                  ref="address"
                  onChange={this.handleChange.bind(this, "address")}
                  value={this.state.fields["address"]}
                  placeholder="Address"
                  className="input-field-sign-up"
                  required
                />
                <span style={{ color: "red", marginLeft: "5%" }}>
                  {this.state.errors["address"]}
                </span>
              </div>

              <div>
                <input
                  type="tel"
                  min={0}
                  name="mobileno"
                  ref="mobileno"
                  onChange={this.handleChange.bind(this, "mobileno")}
                  value={this.state.fields["mobileno"]}
                  placeholder="Contact Number"
                  className="input-field-sign-up"
                  required
                />
                <span style={{ color: "red", marginLeft: "5%" }}>
                  {this.state.errors["mobileno"]}
                </span>
              </div>
              <div className="text-center">
                <button type="submit" className="sign-up-button">Sign Up</button>
              </div>
            </form>
            <div className="text-center">
            <Link
              to = "/signin"
            >
                <button className="sign-up-button">
                  Sign In
                </button>
            </Link>    
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
