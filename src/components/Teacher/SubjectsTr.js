import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import Fire from "../../config/Fire";
import "../../css/Student/Subjects.css";
import Spinner from "../spinner";



let unsubscribe;
class SubjectsTr extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: null,

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
                <h1>Subjects</h1>
                {fields[this.props.match.params.class].map(value => {
                return(
                <div className="class">
                <Link to={{
                    pathname: `/teacher/${this.props.match.params.class}/${value}/assignment`,
                    
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

export default SubjectsTr;
