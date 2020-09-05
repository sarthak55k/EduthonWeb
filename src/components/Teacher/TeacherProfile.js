import React, { Component,useState,useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import "../../css/Teacher/TeacherProfile.css";

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fields: {},
      errors: {},
      avatar: "",
      progress: 0,
      avatarURL: "",
      suboptions: [{subject: 'History'},{subject: 'Geography'},{subject: 'Maths'},{subject: 'Science'},{subject: 'English'},{subject: 'Hindi'}],      
      classOption: "",
      subjectsOpt: [],
      classSub: []
    };
  }
  
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["name"] = "Only letters allowed";
      }
    }

    if (typeof fields["mobileno"] !== "undefined") {
      if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "Please enter a valid Contact Number ";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "This field cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return true;
  }

  contactSubmit = (e) => {
    const { fields } = this.state;
    e.preventDefault();

    if (this.handleValidation()) {
    
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

  handleClassChange = (e) => {
    this.setState({
      classOption: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      classSub: [...this.state.classSub, { classNo:this.state.classOption, subjects: this.state.subjectsOpt }]
    });
    this.setState({
      classOption:"",
      subjectOpts:[]
    });
    alert("Response Added!");
  }  

  onSelect(selectedList, selectedItem) {
    this.setState({
      subjectsOpt:selectedList
    });
  } 

  onRemove(selectedList, removedItem) {
    this.setState({
      subjectsOpt:selectedList
    });
  }

  render() {
    return (
      <div>
        <div className="bg-teacher-profile">
          <div className="teacher-profile">
            <form onSubmit={this.contactSubmit.bind(this)}>
              <div className="text-center p-3 teacher-profile-heading">
                <h1>
                  <b>Profile</b>
                </h1> 
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  ref="name"
                  onChange={this.handleChange.bind(this, "name")}
                  value={this.state.fields["name"]}
                  placeholder="Name"
                  className="input-field-teacher-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["name"]}
                </span>
              </div>

              <div>
                <input 
                  type="date" 
                  name="dob" 
                  ref="dob"
                  onChange={this.handleChange.bind(this, "dob")}
                  value={this.state.fields["dob"]}
                  className="input-field-teacher-profile"
                  placeholder="Date Of Birth"
                  required 
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  ref="email"
                  onChange={this.handleChange.bind(this, "email")}
                  value={this.state.fields["email"]}
                  placeholder="Email"
                  className="input-field-teacher-profile"
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
                  name="mobileno"
                  ref="mobileno"
                  onChange={this.handleChange.bind(this, "mobileno")}
                  value={this.state.fields["mobileno"]}
                  placeholder="Contact Number"
                  className="input-field-teacher-profile"
                  required
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["mobileno"]}
                </span>
              </div>

                <div>
                  <select name="classes" id="classes" onChange={this.handleClassChange} className="input-field-teacher-profile" required>
                    <option value="Select">Select Class</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>

                <div>
                  <Multiselect
                    options={this.state.suboptions}
                    displayValue="subject"
                    showCheckbox={true}
                    closeIcon="close"
                    onSelect={this.onSelect.bind(this)}
                    onRemove={this.onRemove.bind(this)}
                    placeholder="Subjects"
                    required
                  />
                </div>

                <div>
                  <button onClick={this.handleSubmit.bind(this)} className="add-classes">Add</button>
                </div>

                <div>
                  <p>Selected Class</p>
                  {this.state.classSub.length>0 && this.state.classSub.map(classes => (
                    JSON.stringify(classes)
                  ))}
                </div>

              <div className="text-center">
                <button type="submit" className="teacher-profile-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherProfile;
