import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import Fire from "../../config/Fire";
import "../../css/Student/Subjects.css";
import Spinner from "../spinner";



let unsubscribe;
class SubjectsTr_ extends Component {
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
            <div className="teacher-assign"> 
                <div className="teacher-assignment">
                    <div className="text-center p-3 teacher-assign-heading">
                        <h1>Subjects</h1>
                    </div>
                {fields[this.props.match.params.class]?fields[this.props.match.params.class].map(value => {
                return(
                <div className="teachers-assign">
                <Link to={{
                    pathname: `/teacher/${this.props.match.params.class}/${value}/exam`,
                    
                }}>
                    <p className="font-teacher">{value}</p>
                </Link>
              </div>
                )
              }):<div></div>} 
              </div>
            </div>
        )
    }
    }
}

export default SubjectsTr_;
