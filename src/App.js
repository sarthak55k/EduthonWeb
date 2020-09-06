import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Student/Home";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Student/Profile";
import TeacherProfile from "./components/Teacher/TeacherProfile";
import success from "./components/success";
import Calendar from "./components/Calendar";
import Progress from "./components/Student/Progress";
import Exams from "./components/Student/Exams";
import Assignment from "./components/Student/Assignment";
import Subjects from "./components/Student/Subjects";
import HomeTr from "./components/Teacher/HomeTr";
import AssignmentTr from "./components/Teacher/AssignmentTr";
import ClassTr from "./components/Teacher/ClassTr";
import SubjectsTr from "./components/Teacher/SubjectsTr";
import ProgressTr from "./components/Teacher/ProgressTr";
import ExamsTr from "./components/Teacher/ExamsTr";
import UploadAssign from "./components/Student/UploadAssign";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassTr_ from "./components/Teacher/ClassTr_";
import SubjectsTr_ from "./components/Teacher/SubjectsTr_";
import CreateTest from "./components/Teacher/CreateTest";
import Subjects_ from "./components/Student/Subjects_";
import TakeTest from "./components/Student/TakeTest";
import ListAssign from "./components/Teacher/ListAssign";
import Fire from "./config/Fire";



function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark fixed">
          <a href="#" style={{color: "white"}}>Back</a>
          <a href="#" style={{color: "white"}}>Logout</a>
          {/* <button onClick = {() => {Fire.SignoutUser()}}>Logout</button> */}
        </nav>

        <Switch>
          <Route path="/student/home" component={Home} />
          <Route path="/" component={SignUp} exact />
          <Route path="/signin" component={SignIn} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/student/profile" component={Profile} />
          <Route path="/teacher/profile" component={TeacherProfile} />
          <Route path="/success" component={success} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/student/progress" component={Progress} />
          <Route path="/student/:subject/exam" component={Exams} />
          <Route path="/student/:subject/assignment" component={Assignment} />
          <Route path="/student/:subject/:description/upload" component={UploadAssign} />
          <Route path="/student/subjects" component={Subjects} />
          <Route path="/student/subjects2" component={Subjects_} />
          <Route path="/student/:subject/:description/taketest" component={TakeTest} />
          <Route path="/teacher/home" component={HomeTr} />
          <Route path="/teacher/progress" component={ProgressTr} />
          <Route path="/teacher/:class/:subject/exam" component={ExamsTr} />
          <Route path="/teacher/:class/:subject/assignment" component={AssignmentTr} />
          <Route path="/teacher/:class/:subject/:description/list" component={ListAssign} />
          <Route path="/teacher/class" component={ClassTr} />
          <Route path="/teacher/class2" component={ClassTr_} />
          <Route path="/teacher/:class/subjects2" component={SubjectsTr_} />
          <Route path="/teacher/:class/subjects" component={SubjectsTr} />
          <Route path="/teacher/:class/:subject/createTest" component={CreateTest} />

          
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
