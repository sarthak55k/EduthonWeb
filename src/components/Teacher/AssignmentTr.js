import React, { Component } from 'react'
import Fire from "../../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../../css/Student/Home.css";
import Spinner from "../spinner";
import "../../css/Teacher/AssignmentTr.css";

let unsubscribe;
export class AssignmentTr extends Component {
    
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
          fields['class'] = this.props.match.params.class;
          fields['subject'] = this.props.match.params.subject;
          fields['org'] = this.state.data['org']
          this.setState({fields})
        })
      Fire.getAssignTr(fields).then(result => {
        this.setState({assigns:result})
        console.log(this.state.assigns)
      })
      
    };

    componentWillUnmount(){
        this.unsubscribe()

    }

    handleFileChange = (e) => {
        let {fields,data} = this.state
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
          Fire.storeAssign(fields,file)
      }
      
      handleChange = (e) => {
        let {fields} = this.state;
        let name = e.target.name;
        let val = e.target.value;
        fields[name] = val;
        this.setState({fields});
      }
    
    
    render() {
      let {assigns} = this.state
        // console.log(this.props.match.params)
        if(this.state.data === undefined && this.state.assigns){
            return <Spinner />;
          }
        else{

        
        return (
            <div className="assign-teacher">
                <div className="ass-teacher">
                <div className="text-center p-3 assign-heading-teacher">
                <h1>Assignments</h1>
                </div>
                
              <form method="post" onSubmit={this.handleSubmit}>
                <input
                    type="file"
                    name="file"
                    className="input-field-tr-upload"
                    required
                    onChange={(e) => {this.handleFileChange(e.target.files)}}  
                />
                <br/>
                <input
                  type= 'text'
                  name= 'description'
                  onChange={this.handleChange}
                  value={this.state.fields['description']}
                  required
                  placeholder="Description"
                  className="input-field-tr-upload"
                />
                <br/>
                <div>
                <label htmlFor="duedate" className="due-date">Due Date:</label>
                <input
                  type= 'date'
                  name= 'duedate'
                  onChange={this.handleChange}
                  value={this.state.fields['duedate']}
                  className="input-field-tr-upload"
                  style={{marginTop: "0"}}
                  required
                  placeholder="Due Date"
                />
                </div>
                <br/>
                <div className="text-center">
                <button type="submit" className="upload-button-tr">Upload</button>  
                </div>  
                </form>



                
                {assigns?assigns.map(value => {
                return(
                <div className="assign-teacher-link">
                {/* <a href={value.url}>{value.description}</a> */}
                <Link
                  to = {{
                    pathname: `/teacher/${this.props.match.params.class}/${this.props.match.params.subject}/${value.description}/list`,
                    url:value.url
                  }}
                >
                <button className="link-assign-tr">{value.description}</button>
                </Link>
                </div>
                )
              }):<div></div>}
            </div>
            </div>



        

        )
        }
    }
}

export default AssignmentTr
