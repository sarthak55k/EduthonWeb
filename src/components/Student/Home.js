import React, { Component } from "react";
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";



let unsubscribe;
export class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null
    };
  }
  
  componentDidMount = () => {
    this.authListener();
    
  };
  
  authListener = () => {
    Fire.fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ user: null });
      } else {
      this.setState({ user });
      this.getData();
      }
      // NO STATE CHANGE FOR USER BEING PRESENT HENCE PAGE WILL CONTINOUSLY RENDER UNTIL NOT USER ... BASICALLY NOT POSSIBLE
      
    });
  
    
  };

getData = () => { 
  console.log(this.state.user)
    Fire.getUserData(this.state.user.uid).then( result => {
      this.setState({ fields: result[0] });
      console.log(this.state.fields)
    })      
};
  
  
  
  
  
  render() {
    
    if(!this.state.fields){
      return <Spinner />;
    }
    else{
    
    
    return (
      
      <div>
        <div className="home">
          <Link to="/student/progress">
            <h1>Progress</h1>
          </Link>
        </div>
        <div className="home">
          <Link to= {{
              pathname : "/student/subjects",
              data: this.state.fields
              }}>
            <h1>Assignments</h1>
          </Link>
        </div>
        <div className="home">
          <Link to="/student/exam">
            <h1>Examinations</h1>
          </Link>
        </div>
        <div className="home">
          <Link to="/calendar">
            <h1>Calendar</h1>
          </Link>
        </div>
      </div>
    );
  }
}
}

export default Home;
