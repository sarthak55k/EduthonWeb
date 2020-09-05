import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import Fire from "../../config/Fire";
import "../../css/Student/Subjects.css";
import Spinner from "../spinner";



let unsubscribe;
class Subjects extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            sub: [],
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

  getData = async() => { 
      
        await Fire.getUserData(this.state.user.uid).then( result => {
          this.setState({ fields: result[0] });
          console.log(this.state.fields)
        })
        Fire.getSubject(this.state.fields).then(result => {
            this.setState({sub : result.sub})
            // console.log(this.state.sub)
        })
  };

  componentWillUnmount(){
      this.unsubscribe();
    }



    render() {
        let {fields,sub} = this.state;
        if(!fields && sub.length === 0){
            return <Spinner />;
        }
        else{
        return (
            <div>
                <h1>Subjects</h1>
                {sub.map(value => {
                return(
                <div className="class">
                <Link to={{
                    pathname: `/student/${value}/assignment`,
                    
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

export default Subjects;