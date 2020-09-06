import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";
import "../../css/Student/Assignment.css";

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
        await Fire.getAssign(this.state.fields).then( result => {
            // this.setState({assigns:result})
            let {assigns} = this.state;
            result.map(val => {
              let temp = {};
              var date = val.due.toDate()
              temp = {
                'description' : val.description,
                'url' : val.url,
                'due' : `${date.getDate()}/${date.getMonth()}`
              }
              assigns.push(temp)
            })

            this.setState({assigns})
        })
    };

    componentWillUnmount(){
        this.unsubscribe()

    }


    render() {
        let {assigns,fields} = this.state
        return (
            <div className="assign-student">
              <div className="ass-student">
                <div className="text-center p-3 assign-heading">
                <h1>Assignments</h1> 
                </div>
                
                <div>
                    <p className="assign-font"><u>Teachers assignment:</u></p>

                    {assigns.map(value => {
                    return(
                    <div className="assign-student-link">
                    <Link to={{
                        pathname: `/student/${fields['subject']}/${value.description}/upload`,
                        
                    }}>
                        <h4 className="link-assign">Assignment Name : {value.description}</h4>
                        <h5 className="link-assign">Due Date:{value.due} </h5>
                    </Link>
                  </div>
                    )
                  })}
                </div>
              </div>
            </div>
        )
    }
}

export default Assignment
