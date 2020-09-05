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

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/student/home" component={Home}  />
          <Route path="/" component={SignUp} exact/>
          <Route path="/signin" component={SignIn} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/student/profile" component={Profile} />
          <Route path="/teacher/profile" component={TeacherProfile} />
          <Route path="/success" component={success}/>
          <Route path="/calendar" component={Calendar}/>
          <Route path="/student/progress" component={Progress}/>
          <Route path="/student/exam" component={Exams}/>
          <Route path="/student/:subject/assignment" component={Assignment}/>
          <Route path="/student/:subject/:description/upload" component={UploadAssign}/>
          <Route path="/student/subjects" component={Subjects}/>
          <Route path="/teacher/home" component={HomeTr}  />
          <Route path="/teacher/progress" component={ProgressTr}/>
          <Route path="/teacher/exam" component={ExamsTr}/>
          <Route path="/teacher/:class/:subject/assignment" component={AssignmentTr}/>
          <Route path="/teacher/class" component={ClassTr}/>
          <Route path="/teacher/:class/subjects" component={SubjectsTr}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
