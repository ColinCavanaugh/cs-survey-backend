import React, { Component } from 'react';
import Question from './Question.js';
import axios from 'axios';
import {Link} from "react-router-dom";

class IABsurvey extends Component {
    state = {
        count: 255,
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        e: '',
        formValid: ''
    };
    //set login as valid
    componentDidMount() {
        this.setState({
            formValid: this.props.location.state
        });
    }
    //input change for radio buttons
    handleQChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //input change for text area comments
    handleInputChange = (event) => {
        this.setState({
            q5: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //check if all questions have are answered
        if (this.state.q1 == '' || this.state.q2 == '' || this.state.q3 == '' || this.state.q4 == '') {
            window.alert('Please answer all questions before submitting.');
        }
        else {
            //define body of survey responses and post to server
            let body = {
                q1: this.state.q1,
                q2: this.state.q2,
                q3: this.state.q3,
                q4: this.state.q4,
                q5: this.state.q5
            };
            axios.post(`http://173.244.1.41:3000/express_backend/submit/IAB/`, body).then(function (response) {
            }).catch(function (error) { console.log(error) });
            //bring the survey taker to a thank you page
            this.props.history.push({
                pathname: '/thankyou',
            });
        }
    }
    //set and update character count next to comments box
    updateCount = (event) => {
        this.setState({
            count: 255 - event.target.value.length
        });
    }

    render() {
        if (this.state.formValid == '1') { 
            return (
                <div>
                <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                    <header class="survey-title">SSU IAB Survey</header>
                </nav>
                <div className="survey">
                    <form onSubmit={this.handleSubmit}>
                        <table class="table table-striped">
                            <col width="90%" />
                            <col width="10%" />
                            <tr>
                                    <th>Please evaluate how appropriate you believe the following Computer Science major Program Educational Objectives are.</th><th>1                  2                  3                  4                  5</th>
                            </tr>
                            <tbody>
                            <tr>
                                <td class="question"><Question ID='3' num='1' /></td>
                                <td className="input">
                                    <input
                                        type="radio"
                                        name="q1"
                                        value="1"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q1"
                                        value="2"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q1"
                                        value="3"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q1"
                                        value="4"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q1"
                                        value="5"
                                        onChange={this.handleQChange} />
                                </td>
                            </tr>
                            <tr>
                                <td class="question"><Question ID='3' num='2' /></td>
                                <td className="input">
                                    <input
                                        type="radio"
                                        name="q2"
                                        value="1"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q2"
                                        value="2"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q2"
                                        value="3"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q2"
                                        value="4"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q2"
                                        value="5"
                                        onChange={this.handleQChange} />
                                </td>
                            </tr>
                            <tr>
                                <td class="question"><Question ID='3' num='3' /></td>
                                <td className="input">
                                    <input
                                        type="radio"
                                        name="q3"
                                        value="1"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q3"
                                        value="2"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q3"
                                        value="3"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q3"
                                        value="4"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q3"
                                        value="5"
                                        onChange={this.handleQChange} />
                                </td>
                            </tr>
                            <tr>
                                <td class="question"><Question ID='3' num='4' /></td>
                                <td className="input">
                                    <input
                                        type="radio"
                                        name="q4"
                                        value="1"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q4"
                                        value="2"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q4"
                                        value="3"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q4"
                                        value="4"
                                        onChange={this.handleQChange} />
                                    <input
                                        type="radio"
                                        name="q4"
                                        value="5"
                                        onChange={this.handleQChange} />
                                </td>
                            </tr>
                                    <tr>
                                        <td class="question"><Question ID='3' num='5' /><br></br><textarea maxlength="255" name="q5" className="textbox" value={this.state.q5} onChange={this.handleInputChange} onKeyUp={this.updateCount} />     Characters remaining: {this.state.count}</td><td></td>
                                    </tr>
                            </tbody>
                        </table>
                            <div class="submitButton"><button class="btn btn-custom" type="submit">Submit</button></div>
                    </form>
                    </div>
                    </div>
            );
        }
        else {
            return (
                <div className="IAB">
                    You do not have a valid access code.<br></br>
                    Please visit <Link to="/">this link</Link> with a valid access code to take a survey.
                </div>
            );
        }
    }
}
export default IABsurvey;