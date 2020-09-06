import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Fire from "../../config/Fire";
import Spinner from "../spinner";
import "../../css/Teacher/ClassTr.css";


export class ClassTr_ extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            user: null
             
        }
    }
    
componentDidMount = () => {
  this.authListener();
  
};
  
authListener = () => {
 this.unsubscribe = Fire.fire.auth().onAuthStateChanged((user) => {
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
        let {fields} = this.state;
        if(!fields){
          
          return <Spinner />;
        }
        else{

        
        return (
          <div className="teacher-class">
          <div className="teacher-classes">
            <div className="text-center p-3 teacher-class-heading">
              <h1>Classes</h1>
            </div>
              {fields.class.map(value => {
                return(
                <div className="teachers-class">
                <Link to={{
                    pathname: `/teacher/${value}/subjects2`,
                    data: fields.fields
                }}>
                    <p className="font-teacher-class">Standard {value}</p>
                </Link>
              </div>
                )
              })} 
              </div>
            </div>
        )
      }
    }
}

export default ClassTr_


