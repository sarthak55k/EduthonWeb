import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";

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
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => {this.handleFileChange(e.target.files)}}  
                />
                <br/>
                <button type="submit">Upload</button>    
                </form>
            </div>
        )
    }
    
    }
}

export default UploadAssign
