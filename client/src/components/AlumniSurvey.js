import React, { Component } from 'react';
import Question from './Question.js';
import axios from 'axios';
import { Link } from "react-router-dom";

class AlumniSurvey extends Component {
    state = {
        count: 255,
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q11: '',
        q12: '',
        q13: '',
        q14: '',
        q15: '',
        e: '',
        formValid: ''
    };
    //input change for radio buttons
    handleQChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //input change for text area comments
    handleInputChange = (event) => {
        this.setState({
            q15: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //check if all questions have are answered
        if (this.state.q1 == '' || this.state.q2 == '' || this.state.q3 == '' || this.state.q4 == '' || this.state.q5 == '' || this.state.q6 == '' || this.state.q7 == '' || this.state.q8 == '' || this.state.q9 == '' || this.state.q10 == '' || this.state.q11 == '' || this.state.q12 == '' || this.state.q13 == '' || this.state.q14 == '') {
            window.alert('Please answer all questions before submitting.');
        }
        else {
            //define body of survey responses and post to server
            let body = {
                q1: this.state.q1,
                q2: this.state.q2,
                q3: this.state.q3,
                q4: this.state.q4,
                q5: this.state.q5,
                q6: this.state.q6,
                q7: this.state.q7,
                q8: this.state.q8,
                q9: this.state.q9,
                q10: this.state.q10,
                q11: this.state.q11,
                q12: this.state.q12,
                q13: this.state.q13,
                q14: this.state.q14,
                q15: this.state.q15
            };
            axios.post(`http://173.244.1.41:3000/express_backend/submit/alumni/`, body).then(function (response) {
            }).catch(function (error) { console.log(error) });
            //bring the survey taker to a thank you page
            this.props.history.push({
                pathname: '/thankyou',
            });
        }
    }
    //set login as valid
    componentDidMount() {
        this.setState({
            formValid: this.props.location.state
        });
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
                    <header class="survey-title">SSU Alumni Survey</header>
                </nav>
                <div className="survey">
                    <form onSubmit={this.handleSubmit}>
                        <table class="table table-striped">
                            <col width="90%" />
                            <col width="10%" />
                            <tr>
                                <th>Please provide feedback regarding how well the SSU Computer Science program helped prepare you in the following areas (from 1 to 5, with 5 being the best).</th><th>1                  2                  3                  4                  5</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td class="question"><Question ID='2' num='1' /></td>
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
                                    <td class="question"><Question ID='2' num='2' /></td>
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
                                    <td class="question"><Question ID='2' num='3' /></td>
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
                                    <td class="question"><Question ID='2' num='4' /></td>
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
                                    <td class="question"><Question ID='2' num='5' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q5"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q5"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q5"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q5"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q5"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='6' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q6"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q6"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q6"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q6"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q6"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='7' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q7"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q7"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q7"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q7"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q7"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='8' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q8"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q8"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q8"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q8"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q8"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='9' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q9"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q9"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q9"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q9"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q9"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='10' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q10"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q10"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q10"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q10"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q10"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='11' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q11"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q11"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q11"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q11"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q11"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='12' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q12"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q12"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q12"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q12"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q12"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='13' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q13"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q13"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q13"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q13"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q13"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="question"><Question ID='2' num='14' /></td>
                                    <td className="input">
                                        <input
                                            type="radio"
                                            name="q14"
                                            value="1"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q14"
                                            value="2"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q14"
                                            value="3"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q14"
                                            value="4"
                                            onChange={this.handleQChange} />
                                        <input
                                            type="radio"
                                            name="q14"
                                            value="5"
                                            onChange={this.handleQChange} />
                                    </td>
                                </tr>
                                <tr>
                                        <td class="question"><Question ID='2' num='15' /><br></br><textarea maxlength="255" name="q15" className="textbox" value={this.state.q15} onChange={this.handleInputChange} onKeyUp={this.updateCount} />     Characters remaining: {this.state.count}</td><td></td>
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
                <div className="alumni">
                    You do not have a valid access code.<br></br>
                    Please visit <Link to="/">this link</Link> with a valid access code to take a survey.
                </div>
            );
        }
    }
}
export default AlumniSurvey;