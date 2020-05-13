import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import IABsurvey from './components/IABsurvey';
import AlumniSurvey from './components/AlumniSurvey';
import CodeAccess from './components/CodeAccess';
import studentSurvey from './components/studentSurvey';
import thankYou from './components/thankYou';
import login from './components/admin/login';
import dashboard from './components/admin/dashboard';
import questions from './components/admin/questions';
import results from './components/admin/results';
import editStudent from './components/admin/editStudent';
import editAlumni from './components/admin/editAlumni';
import editIAB from './components/admin/editIAB';
import viewStudent from './components/admin/viewStudent';
import viewIAB from './components/admin/viewIAB';
import viewAlumni from './components/admin/viewAlumni';
import ActiveCodes from './components/admin/ActiveCodes';


class App extends Component {
    render() {
        return (
            <body className="App">
                <Router>
                    <Route exact path="/" component={CodeAccess} />
                    <Route path="/IAB" component={IABsurvey} />
                    <Route path="/alumni" component={AlumniSurvey} />
                    <Route path="/senior" component={studentSurvey} />
                    <Route path="/thankyou" component={thankYou} />
                    <Route path="/login" component={login} />
                    <Route exact path="/dashboard" component={dashboard} />
                    <Route exact path="/dashboard/codes" component={ActiveCodes} />
                    <Route exact path="/dashboard/questions" component={questions} />
                    <Route exact path="/dashboard/results" component={results} />
                    <Route exact path="/editSenior" component={editStudent} />
                    <Route exact path="/editAlumni" component={editAlumni} />
                    <Route exact path="/editIAB" component={editIAB} />
                    <Route exact path="/viewSenior" component={viewStudent} />
                    <Route exact path="/viewAlumni" component={viewAlumni} />
                    <Route exact path="/viewIAB" component={viewIAB} />
                </Router>
            </body>
        );
    }
}

export default App;