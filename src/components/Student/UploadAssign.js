import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";
import "../../css/Student/UploadAssign.css";

export class UploadAssign extends Component {

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
          fields['description'] = this.props.match.params.description;
          fields['subject'] = this.props.match.params.subject;
          fields['org'] = this.state.data['org']
          fields['class'] = this.state.data['class']
          fields['firstname'] = this.state.data['firstname']
          fields['lastname'] = this.state.data['lastname']
          this.setState({fields})
        })
      
    };

    componentWillUnmount(){
        this.unsubscribe()

    }



    handleFileChange = (e) => {
        let {fields} = this.state
        this.setState({file:e[0]})
        
        
        fields['filename'] = e[0].name;
        // fields['class'] = this.props.match.params.class;
        // fields['subject'] = this.props.match.params.subject;
        // fields['org'] = data['org']
        
        this.setState({
            fields,
        })
      }; 

      handleSubmit = (e) => {
        e.preventDefault();
          let {fields,file} = this.state
          console.log('submitted')

          console.log(fields)
        Fire.studentsAssign(fields,file).then(() => {
              alert('Submitted')
          })
      }

    render() {
    let {fields} = this.state
    if(this.state.data === undefined){
        return <Spinner />;
    }
    else{
        return (
            <div className="upload-assignment">
              <div className="upload-assign">
                <div className="text-center p-3 heading-upload">
                  <h1>Upload Assignment</h1>
                </div>
                <form method="post" onSubmit={this.handleSubmit}>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => {this.handleFileChange(e.target.files)}}  
                    className="input-field-student-upload"
                />
                <br/>
                <div className="text-center">
                  <button type="submit" className="upload-button">Upload</button> 
                </div> 
                </form>
              </div>
            </div>
        )
    }
    
    }
}

export default UploadAssign
