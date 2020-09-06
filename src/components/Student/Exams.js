import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import Fire from "../../config/Fire";
import "../../css/Student/Exam.css";
import Spinner from "../spinner";

export class Exams extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          
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
        console.log(this.state.fields)
        await Fire.getMcq(this.state.fields).then( result => {
            if(result !== undefined){ 
            let {assigns} = this.state;
            result.map(val => {
              let temp = {};
              var date = val.due.toDate()
              temp = {
                'description' : val.description,
                'test': val.test,
                'due' : `${date.getDate()}/${date.getMonth()}`
              }
              assigns.push(temp)
            })
            
            this.setState({assigns})
          }   
        })
        
        console.log(this.state.assigns)
    };

    componentWillUnmount(){
        this.unsubscribe()

    }

    render() {
        let {assigns,fields} = this.state
        return (
            <div className="exam-student">
            <div className="exams-student">
            <div className="exam-heading text-center p-3">
            <h1>Examinations</h1>
            </div>
                
                {/* <Link
                    to = {{
                        pathname : `/student/${this.props.match.params.subject}/taketest`,
                    }}
                >
                    <button >Take Test</button>
                </Link> */}

                {assigns?assigns.map(value => {
                return(
                <div className="exam-student-link">
                <Link to={{
                    pathname: `/student/${fields['subject']}/${value.description}/taketest`,
                    test: value.test
                    
                }}>
                    <h4 className="link-exam">Assignment Name : {value.description}</h4>
                    <h5 className="link-exam">Due Date:{value.due} </h5>
                </Link>
              </div>
                )
              }):<div></div>}
            </div>
            </div>
        )
    }
}

export default Exams
