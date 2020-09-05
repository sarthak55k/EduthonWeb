import React, { Component } from 'react'
import Fire from "../config/Fire";
import { Redirect } from "react-router-dom";

let unsubscribe;
class success extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      user: {},
      fields: {}
    }
  }

    
  componentDidMount = () => {
        this.authListener();
        
      };
    
      authListener = () => {
        this.unsubscribe =Fire.fire.auth().onAuthStateChanged((user) => {
          if (!user) {
            this.setState({ user: null });
          } else {
          this.setState({ user });
          
          }
          // NO STATE CHANGE FOR USER BEING PRESENT HENCE PAGE WILL CONTINOUSLY RENDER UNTIL NOT USER ... BASICALLY NOT POSSIBLE
          this.getData();
        });

        
      };

  getData = () => { 
        Fire.getUserData(this.state.user.uid).then( result => {
          this.setState({ fields: result[0] });
          console.log(this.state.fields)
        })      
  };

  componentWillUnmount(){
    this.unsubscribe();
  }
    
    
    

    render() {
      if(this.state.fields.isStudent === true){
        if(this.state.fields['isChanged'] === true && this.state.fields['isProfile'] === true){
          return <Redirect to='/student/home' />
        }
      }
      else if(this.state.fields.isTeacher === true){
        if(this.state.fields['isChanged'] === true && this.state.fields['isProfile'] === true){
          return <Redirect to='/teacher/home'/>
        }
      }
      else{
        return <Redirect to='/changepassword'/>
      
      }      
  
    }
}

export default success
