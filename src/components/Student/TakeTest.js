import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Test.css";
import Spinner from "../spinner";
import Question from './Question';

export class TakeTest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            test: props.location.test,
            index:0,
            answers: {},
            fields: {},
            submitted: false,

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
          let {fields} = this.state
            await Fire.getUserData(this.state.user.uid).then( result => {

            
            this.setState({ data: result[0] });
            fields['description'] = this.props.match.params.description
            fields['subject'] = this.props.match.params.subject
            fields['org'] = this.state.data['org']
            fields['class'] = this.state.data['class']
            this.setState({fields})
           
            })
            console.log(this.state.fields)
      };
    
      componentWillUnmount(){
          this.unsubscribe();
        }
    
    

    handleOptionClick = (index) => {
        let answers = this.state.answers;
        answers[this.state.index] = index;
        this.setState({ answers });
      };

      handleNext = () => {
        let index = this.state.index;
        if (index !== [this.props.location.test - 1]) {
          this.setState({
            index: index + 1,
          });
        }
      };

      handleBack = () => {
        let index = this.state.index;
        if (index !== 0) {
          this.setState({
            index: index - 1,
          });
        }
      };

      handleSubmit = async() => {
        let result = 0;
        let {fields} = this.state;
        for (var i in this.props.location.test) {
          if (this.state.answers[i] === this.props.location.test[i].correct) {
            result++;
          }
        }
        fields['marks'] = result;
        await Fire.storeMcqMarks(fields).then(()=>{
          alert('Submitted')
          this.setState({
            submitted:true
          })
        });
   
      };
    
      
    render() {

        console.log(this.state.test)
        if (this.props.location.test === undefined) {
            return <Redirect to="/student/home" />;
          }
        else if(this.state.submitted){
          return <Redirect to="/student/home" />;
        }
      
        return (
            <div className="take-test">
         <div className="take-tests">
          <div className="text-center p-3 heading-take-test">
            <h1>Test</h1>
          </div>
          <Question
            handleOptionClick={this.handleOptionClick}
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleSubmit={this.handleSubmit}
            question={this.props.location.test[this.state.index]["questions"]}
            ops={this.props.location.test[this.state.index]["options"]}
            answered={Object.keys(this.state.answers).length}
            unanswered={
              this.props.location.test.length -
              Object.keys(this.state.answers).length
            }
            total={this.props.location.test.length}
            index={this.state.index}
          />
        </div>
        </div>
        )
    }
}

export default TakeTest
