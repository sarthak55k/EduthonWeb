import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";

export class Assignment extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            
            file : null,
            fields: {},
            // data: {},
            assigns : [],
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
    
    getData = async() =>  { 
      let {fields} = this.state
      await Fire.getUserData(this.state.user.uid).then( result => {
          this.setState({ data: result[0] });
          fields['subject'] = this.props.match.params.subject;
          fields['org'] = this.state.data['org']
          fields['class'] = this.state.data['class']
          this.setState({fields})
        })
        Fire.getAssign(this.state.fields).then( result => {
            this.setState({assigns : result})
        })
    };

    componentWillUnmount(){
        this.unsubscribe()

    }


    render() {
        let {assigns,fields} = this.state
        return (
            <div>
                <h1>Assignments</h1>
            <div>
                <p>Teachers assignment</p>

                {assigns.map(value => {
                return(
                <div className="class">
                <Link to={{
                    pathname: `/student/${fields['subject']}/${value.description}/upload`,
                    
                }}>
                    <h1>Assignment Name : {value.description}</h1>
                    <h3>Due Date:  {value.due}</h3>
                </Link>
              </div>
                )
              })}
            </div>
            </div>
        )
    }
}

export default Assignment
