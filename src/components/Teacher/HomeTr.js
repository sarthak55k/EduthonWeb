import React, { Component } from "react";
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import Spinner from "../spinner";
import "../../css/Teacher/HomeTr.css";


let unsubscribe;
export class HomeTr extends Component {
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
      
      <div className="home-page">
       {/* <div className="home">
          <Link to="/teacher/progress">
            <h1>Progress</h1>
          </Link>
    </div> */}
        <div className="tr-home-box-1">
          <Link to= {{
              pathname : "/teacher/class",
              data: this.state.fields
              }}>
            <h1 className="links-home">Assignments</h1>
          </Link>
        </div>
        <div className="tr-home-box-2">
          <Link to="/teacher/class2">
            <h1 className="links-home">Examinations</h1>
          </Link>
        </div>
        <div className="tr-home-box-3">
          <Link to="/calendar">
            <h1 className="links-home">Calendar</h1>
          </Link>
        </div>
      </div>
    );
  }
}
}

export default HomeTr;
