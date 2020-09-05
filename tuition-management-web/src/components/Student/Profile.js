import React, { Component } from "react";
import Fire from "../../config/Fire";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      user: null
    };
  }

  componentDidMount = () => {
    this.authListener();
  };


   authListener = () => {
    Fire.fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      }
      this.getData()
      //NO LOGOUT PROVISION HENCE NOT SETTING user TO null
    });
   
  };

  getData = () => { 
    Fire.getUserData(this.state.user.uid).then( result => {
      this.setState({ data: result[0] });
      console.log(this.state.data)
    })      
};



  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    this.setState({ errors: errors });
    return true;
  }

  handleSubmit = (e) => {
    const { fields,user,data } = this.state;
    e.preventDefault();

    if (this.handleValidation()) {

      data['isProfile'] = true;
      this.setState({data});
      Fire.updateLogin(user.uid,this.state.data)  
    
    } else {
      alert("Form has errors.");
    }
  };


  handleChange = (e) => {
    let {fields} = this.state;
    let name = e.target.name;
    let val = e.target.value;
    fields[name] = val
    this.setState({fields});
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
        <div>
          <div>
            <form method="post" onSubmit={this.handleSubmit}>
              <h1>
                <b>Profile</b>
              </h1>

              <div>
                <label for name="firstname">
                  First Name:{" "}
                </label>{" "}
                <br />
                <input
                  type="text"
                  name="firstname"
                  ref="firstname"
                  onChange={this.handleChange}
                  value={this.state.fields["firstname"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["firstname"]}
                </span>
              </div>
              <div>
                <label for name="lastname">
                  Last Name:{" "}
                </label>{" "}
                <br />
                <input
                  type="text"
                  name="lastname"
                  ref="lastname"
                  onChange={this.handleChange}
                  value={this.state.fields["lastname"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["lastname"]}
                </span>
              </div>


              <div>
                <label for name="age">
                  Age:{" "}
                </label>{" "}
                <br />
                <input
                  type="text"
                  name="age"
                  ref="age"
                  onChange={this.handleChange}
                  value={this.state.fields["age"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["age"]}
                </span>
              </div>
              

              <div>
                <label htmlFor="class">Class:</label>
                <br />
                <input 
                  type="text" 
                  name="class" 
                  onChange={this.handleChange}
                  value = {this.state.fields['class']}
                  required />
              </div>

 

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <br />
                <input 
                  type="date" 
                  name="dob"
                  onChange={this.handleChange}
                  value = {this.state.fields['date']} 
                  required />
              </div>
              
              <div>
                <label for name="email">
                  Email:{" "}
                </label>{" "}
                <br />
                <input
                  type="email"
                  name="email"
                  ref="email"
                  onChange={this.handleChange}
                  value={this.state.fields["email"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["email"]}
                </span>
              </div>

              <div>
                <label for name="phone">
                  Contact No:{" "}
                </label>{" "}
                <br />
                <input
                  type="tel"
                  min={0}
                  name="phone"
                  ref="phone"
                  onChange={this.handleChange}
                  value={this.state.fields["phone"]}
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["phone"]}
                </span>
              </div>
              <div className="row">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
