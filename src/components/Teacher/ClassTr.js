import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Fire from "../../config/Fire";
import Spinner from "../spinner";



export class ClassTr extends Component {

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
            <div>
              {fields.class.map(value => {
                return(
                <div className="class">
                <Link to={{
                    pathname: `/teacher/${value}/subjects`,
                    data: fields.fields
                }}>
                    <h1>{value}</h1>
                </Link>
              </div>
                )
              })} 
            </div>
        )
      }
    }
}

export default ClassTr


