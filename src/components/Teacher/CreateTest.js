import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import Fire from "../../config/Fire";
import "../../css/Teacher/CreateTest.css";
import Spinner from "../spinner";

export class CreateTest extends Component {

    constructor(props) {
        super(props)

        this.state = {

            fields: {},
            test: [{ questions: "", options: [{ option: "" }], correct: "" }],
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

    getData = async () => {
        let { fields } = this.state
        await Fire.getUserData(this.state.user.uid).then(result => {
            this.setState({ data: result[0] });
            console.log(this.state.data)
        })

    };

    componentWillUnmount() {
        this.unsubscribe()

    }

    handleSubmit = (e) => {
        let {fields,test,data} = this.state;
        e.preventDefault();
        
        fields['org'] = data['org'];
        fields['class'] = this.props.match.params.class;
        fields['subject'] = this.props.match.params.subject;
        this.setState({fields})

        Fire.storeMcqTest(fields,test)
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        let name = e.target.name;
        fields[name] = e.target.value;
        this.setState({ fields });
    }

    changeHandlerQues = (e) => {
        let test = this.state.test;
        test[e.target.id][e.target.name] = e.target.value;
        this.setState({ test });
    };

    changeHandlerOptions = (e, index) => {
        let test = this.state.test;
        test[index][e.target.name][e.target.id]["option"] = e.target.value;
        // test [QuestionNo] ["options"] [OptionNo] ['option']
        this.setState({ test });
    };




    addQues = () => {
        this.setState((prevState) => ({
            test: [...prevState.test, { questions: "", options: [{ option: "" }] }],
        }));
    };

    addOption = (index) => {
        let test = this.state.test;
        test[index]["options"].push({ option: "" });
        this.setState({ test });
    };


    render() {
        return (
            <div className="create-test">
            <div className="create-tests">
              <div className="create-test-heading-teacher text-center p-3">
                <h1>Create MCQ Test</h1>
              </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name='description'
                        placeholder="Test Name"
                        value={this.state.fields['description']}
                        onChange={this.handleChange}
                        className="input-field-tr-create-test"
                        required
                    />
                    <div>
                    <label htmlFor="duedate" className="due-date">Due Date:</label>
                  <input
                        type= 'date'
                        name= 'duedate'
                        onChange={this.handleChange}
                        value={this.state.fields['duedate']}
                        className="input-field-tr-create-test"
                        style={{marginTop: "0"}}
                        required
                        placeholder="Due Date"
                    />
                    </div>
                <br/>
                    <div>
                    {this.state.test.map((val, index) => {
              return (
                <div id="{index}" key={index}>
                    <input
                        type="comment"
                        placeholder="Question"
                        name="questions"
                        type="text"
                        id={index}
                        onChange={this.changeHandlerQues}
                        value={val.questions}
                        className="input-field-tr-create-test"
                    />
                    
                  {val.options.map((val2, ind) => {
                    return (
                      <div>
                        <ul>
                          <input
                            type="radio"
                            value={[ind + 1]}
                            name={["ANSWER:" + index]}
                            checked={
                              this.state.test[index]["correct"] === ind
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              let test = this.state.test;
                              test[index]["correct"] = ind;
                              this.setState({ test });
                            }}
                            required
                            onInvalid={(e) => {
                              e.currentTarget.setCustomValidity(
                                "Choose Correct Answer"
                              );
                            }}
                          />

                          <input
                               type="comment"
                               className="input-field-tr-create-test-1"
                            key={index + "Options" + ind}
                            placeholder={"Option " + [ind + 1]}
                            name="options"
                            id={ind}
                            onChange={(e) =>
                              this.changeHandlerOptions(e, index)
                            }
                            value={val2.options}
                          />
                        </ul>
                      </div>
                    );
                  })}
                  <button
                    className="add-button-tr"
                    type="button"
                    onClick={(e) => this.addOption(index)}
                  >
                    Add Option
                  </button>
                  <button
                        className="add-button-tr"
                        type="button"
                        onClick={this.addQues}
                        style={{marginLeft:"0px"}}
                    >
                        Add Question 
                    </button>
                </div>
              );
            })}
              
             
            <div className="text-center">
            <button
            type="submit"
            className="add-button-tr"
            style={{marginTop:"0px", width: "40%"}}
          >
            Create Test
          </button>
            </div>
                    </div>
                   
                </form>
            </div>
            </div>
        )
    }
}

export default CreateTest
