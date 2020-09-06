import React, { Component } from 'react';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Agenda, Month, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import Fire from "../config/Fire";
import { Redirect, Link } from "react-router-dom";
import "../css/Student/Calendar.css";
import Spinner from "./spinner";

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
        
        file : null,
        fields: {},
        // data: {},
        assigns : [],
        cal: [],
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
  let {fields,assigns} = this.state
  let {cal} = this.state;
  await Fire.getUserData(this.state.user.uid).then( result => {
      this.setState({ data: result[0] });
      // console.log(this.state.data)
    })
  await  Fire.getCalenderAssign(this.state.data).then( result => {
      this.setState({assigns: result})
    })

    this.state.assigns.map((obj,ind) => {
      Object.entries(obj).map((entry,index) => {
      let key = entry[0];
      let val =entry[1];
      let temp ={};
      // let event = Object.getOwnPropertyNames(val)
      val.map(assign => {
       var y = assign.due.toDate()
        temp = {
          Id: index,
          Subject: `${key}</br>${assign.description}`,
          StartTime: y,
          EndTime: y,
          IsAllDay: false,
          IsReadonly: true
        }
        cal.push(temp)
      })
    })
      
    })

    this.setState({cal})
    console.log(this.state.scheduleData)
    console.log(this.state.cal)



};

componentWillUnmount(){
    this.unsubscribe()

}
 render() {
    return (
      <div>
      <div className="text-center p-3 calendar-ui"><h1>Calendar</h1></div>
        <ScheduleComponent height='800px'  currentView='Month' selectedDate={new Date(2020, 8, 1)} eventSettings={{ dataSource: this.state.cal  }}>
          <Inject services={[ Day, Week, WorkWeek, Agenda, Month]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Calendar;