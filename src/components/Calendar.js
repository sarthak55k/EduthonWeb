import React, { Component } from 'react';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Agenda, Month, EventSettingsModel } from "@syncfusion/ej2-react-schedule";

class Calendar extends Component {
 render() {
    return (
      <div>
      <h1>Calendar</h1>
        <ScheduleComponent currentView='Month'>
          <Inject services={[ Day, Week, WorkWeek, Agenda, Month]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Calendar;