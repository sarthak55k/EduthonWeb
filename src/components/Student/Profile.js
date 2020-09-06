import React, { Component } from "react";
import Fire from "../../config/Fire";
import { Redirect } from "react-router-dom";
import "../../css/Student/Profile.css";
import Spinner from "../spinner";

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
      
      console.log(this.state.fields)
      this.state.data['isProfile'] = true;
      this.setState({data});

      let temp = Object.assign(data,this.state.fields)
      console.log(temp)
      Fire.updateLogin(temp)  
      console.log(temp)
    
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
    if(this.state.data === undefined){
      return <Spinner/>
    }
    if(this.state.data.isProfile){
      return <Redirect to ={'/student/home'}/>
    }
    return (
      <div>
        <div className="bg-student-profile">
          <div className="student-profile">
            <form method="post" onSubmit={this.handleSubmit}>
              <div className="text-center p-3 student-profile-heading">
                <h1>
                  <b>Profile</b>
                </h1> 
              </div>

              <div>
                <input
                  type="text"
                  name="firstname"
                  ref="firstname"
                  onChange={this.handleChange}
                  value={this.state.fields["firstname"]}
                  placeholder="First Name"
                  className="input-field-student-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["firstname"]}
                </span>
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  ref="lastname"
                  onChange={this.handleChange}
                  value={this.state.fields["lastname"]}
                  placeholder="Last Name"
                  className="input-field-student-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["lastname"]}
                </span>
              </div>


              <div>
                <input
                  type="text"
                  name="age"
                  ref="age"
                  onChange={this.handleChange}
                  value={this.state.fields["age"]}
                  placeholder="Age"
                  className="input-field-student-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["age"]}
                </span>
              </div>
              

              <div>
                <input 
                  type="text" 
                  name="class" 
                  onChange={this.handleChange}
                  value = {this.state.fields['class']}
                  placeholder="Class"
                  className="input-field-student-profile"
                  required />
              </div>

 

              <div>
                <input 
                  type="date" 
                  name="dob"
                  onChange={this.handleChange}
                  value = {this.state.fields['date']} 
                  placeholder="Date Of Birth"
                  className="input-field-student-profile"
                  required />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  ref="email"
                  onChange={this.handleChange}
                  value={this.state.fields["email"]}
                  placeholder="Email"
                  className="input-field-student-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["email"]}
                </span>
              </div>

              <div>
                <input
                  type="tel"
                  min={0}
                  name="phone"
                  ref="phone"
                  onChange={this.handleChange}
                  value={this.state.fields["phone"]}
                  placeholder="Contact Number"
                  className="input-field-student-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["phone"]}
                </span>
              </div>
              <div className="text-center">
                <button type="submit" className="student-profile-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
