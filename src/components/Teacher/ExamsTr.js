import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import Fire from "../../config/Fire";
import "../../css/Teacher/ExamTr.css";
import Spinner from "../spinner";

export class ExamsTr extends Component {
  constructor(props) {
    super(props)

    this.state = {

      file: null,
      fields: {},
      // data: {},
      assigns: [],
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
      fields['class'] = this.props.match.params.class;
      fields['subject'] = this.props.match.params.subject;
      fields['org'] = this.state.data['org']
      this.setState({ fields })
    })
    Fire.getAssignTr(fields).then(result => {
      this.setState({ assigns: result })
      console.log(this.state.assigns)
    })

  };

  componentWillUnmount() {
    this.unsubscribe()

  }





  render() {
    if (this.state.data === undefined) {
      return <Spinner />;
    }
    return (
      <div className="exam-teacher">
                <div className="exams-teacher">
                <div className="text-center p-3 exam-heading-teacher">
                <h1>Create Exams</h1>
                </div>
        <Link
          to={{
            pathname: `/teacher/${this.props.match.params.class}/${this.props.match.params.subject}/createTest`,
          }}
        >
          <div className="text-center">
          <button className="create-exam-button-tr">Create Mcq Test</button> 
          </div>
        </Link>
          </div>
      </div>
    )
  }
}

export default ExamsTr
