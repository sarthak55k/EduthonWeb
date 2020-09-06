import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";
import FileViewer from 'react-file-viewer';
import { ThemeProvider } from 'react-bootstrap';

export class ListAssign extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
            file : null,
            fields: {},
            // data: {},
            assigns : [],
            user: null,
            marks:[],

             
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
          fields['class'] = this.props.match.params.class;
          fields['subject'] = this.props.match.params.subject;
          fields['description'] = this.props.match.params.description;
          fields['org'] = this.state.data['org']
          this.setState({fields})
        })
     await Fire.getSubAssign(fields).then(result => {
        this.setState({assigns:result})
        // console.log(this.state.assigns)
      })
    };

    componentWillUnmount(){
        this.unsubscribe()

    }

    handleChange =(index,e) =>{
      let marks = this.state.marks
      marks.push(e.target.value)
      this.setState({
        marks
      })
      console.log(this.state.marks)
    }

    handleSubmit = (id,e) => {
      let {fields,marks} = this.state;
      fields['marks'] = this.state.marks[0];
      fields['id'] = id;
      e.preventDefault();
      Fire.storeAssignSub(fields)
      marks = [];
      this.setState({marks})
    }

    render() {
    let {assigns} = this.state
    console.log(assigns)
    if(this.props.location.url === undefined){
        return <Redirect to = {`/teacher/${this.props.match.params.class}/${this.props.match.params.subject}/assignment`} />
    }
    else if(this.state.data === undefined){
        return <Spinner/>
    }
        
       
        return (
            <div>
                <h2>Students Submission</h2>
                {assigns.map((value,index) => {

                return(
                    <div key ={index}>
                    <a href={value.url}>{value.name}</a>
                    <form onSubmit={this.handleSubmit.bind(this,value.id)} >
                    <input 
                  
                      type='text'
                      name='marks'
                      value={this.state.mark}
                      onChange={this.handleChange.bind(this,index)}
                    />
                    <button type='submit'>Add</button>
                  </form>
                  </div>
                )
              })

                }
            </div>
        )
    }
}

export default ListAssign
