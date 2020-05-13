import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class ActiveCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            validate: '',
            student: '',
            alumni: '',
            iab: '',
            studentState: '',
            alumniState: '',
            iabState: '',
            formValid: '',
            back: '<'
        };
    }

    componentDidMount() {
        axios.get(`http://173.244.1.41:3000/express_backend/getActiveCodes/`).then((response) => {
            this.setState({
                student: response.data.student,
                alumni: response.data.alumni,
                iab: response.data.iab,
                studentState: response.data.studentState,
                alumniState: response.data.alumniState,
                iabState: response.data.iabState,
                formValid: this.props.location.state
            });
        }).catch(function (error) { console.log(error) });
    }

    generateCode = (event) => {
        event.preventDefault();
        let body = {
            surveyID: event.target.value
        };
        axios.post(`http://173.244.1.41:3000/express_backend/deleteCode/`, body).then((response) => {

        }).catch(function (error) { console.log(error) });
        //generate 7 character alphanumeric string
        var str = '';
        var survey = event.target.value;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 7; i++) {
            str += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.setState({
            code: str
        });
        //check if code is valid
        body = {
            survey: survey
        };
        axios.post(`http://173.244.1.41:3000/express_backend/validateCode/`, body).then((response) => {
            this.setState({
                validate: response.data.valid
            });
            if (this.state.validate == '1') {
                body = {
                    code: str,
                    survey: survey
                };
                axios.post(`http://173.244.1.41:3000/express_backend/code/`, body).then((response) => {
                }).catch(function (error) { console.log(error) });
                window.location.reload();
            }
            else {
                window.alert('There is already an active code for this survey.');
            }
        }).catch(function (error) { console.log(error) });
    }

    toggleCode = (event) => {
        event.preventDefault();
        let body = {
            surveyID: event.target.value
        };
        axios.post(`http://173.244.1.41:3000/express_backend/toggleCode/`, body).then((response) => {
            window.alert(this.response.alert);
        }).catch(function (error) { console.log(error) });
        window.location.reload();
    }

    render() {
        if (this.state.formValid == '1') {
            return (
                <div>
                    <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                        <Link class='nav-item' to={{
                            pathname: '/dashboard',
                            state: '1'
                        }}>{this.state.back}</Link>
                        <div class="spacer"></div>
                        <Link class='nav-item' to={{
                                pathname: '/login',
                                state: '1'
                        }}>Logout</Link>
                    </nav>
                    <div class="active-codes">
                        <p class="active-codes-p">Current Survey Codes</p>
                        <table class="codes">
                            <col width="30%" />
                            <col width="5%" />
                            <col width="30%" />
                            <col width="5%" />
                            <col width="30%" />
                            <tr class="codes-head">
                                <td>Senior</td><td></td><td>Alumni</td><td></td><td>IAB</td>
                            </tr>
                            <tr>
                                <td><input type="text" class="form-control" readOnly value={this.state.student} /></td><td></td><td><input type="text" class="form-control" readOnly value={this.state.alumni} /></td><td></td><td><input type="text" class="form-control" readOnly value={this.state.iab} /></td>
                            </tr>
                            <tr>
                                <td><button class="btn btn-custom btn-lg btn-block" type="submit" value="1" onClick={this.toggleCode}>{this.state.studentState}</button></td><td></td><td><button class="btn btn-custom btn-lg btn-block" type="submit" value="2" onClick={this.toggleCode}>{this.state.alumniState}</button></td><td></td><td><button class="btn btn-custom btn-lg btn-block" type="submit" value="3" onClick={this.toggleCode}>{this.state.iabState}</button></td>
                            </tr>
                            <tr>
                                <td><button class="btn btn-primary btn-lg btn-block" type="submit" value="1" onClick={this.generateCode}>Generate Code</button></td><td></td><td><button class="btn btn-primary btn-lg btn-block" type="submit" value="2" onClick={this.generateCode}>Generate Code</button></td><td></td><td><button class="btn btn-primary btn-lg btn-block" type="submit" value="3" onClick={this.generateCode}>Generate Code</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="dashboard">
                    NOT LOGGED IN
                </div>
            );
        }
    }
}
export default ActiveCodes;