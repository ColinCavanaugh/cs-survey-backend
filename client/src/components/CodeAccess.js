import React, { Component } from 'react';
import axios from 'axios';
import ssulogo from '../images/ssulogo.png';

class CodeAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            formValid: '',
            survey: ''
        };
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //set value of code as input
    handleKeyChange = (event) => {
        this.setState({
            key: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //set body equal to key entered
        //post to db and check if a valid access
        let body = {
            key: this.state.key
        };
        axios.post(`http://173.244.1.41:3000/express_backend/submit/accessCode/`, body).then((response) => {
            this.setState({
                formValid: response.data.reply,
                survey: response.data.survey
            });
            //if valid go to proper survey
            if (this.state.formValid == '1') {
                if (this.state.survey == '1') {
                    this.props.history.push({
                        pathname: '/senior',
                        state: '1'
                    });
                }
                if (this.state.survey == '2') {
                    this.props.history.push({
                        pathname: '/alumni',
                        state: '1'
                    });
                }
                if (this.state.survey == '3') {
                    this.props.history.push({
                        pathname: '/IAB',
                        state: '1'
                    });
                }
            }
            //alert if incorrect code is entered
            else {
                window.alert('Invalid access code.');
            }
        }).catch(function (error) { console.log(error) });
    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                    <img src={ssulogo} /><header class="title">Welcome to the Computer Science Department Survey</header>
                </nav>
                <div class="title-2">
                    <header>Enter the given survey code below:</header>
                </div>
                <div class="login-form">
                    <form onSubmit={this.handleSubmit}>
                        <input type="password" name="key" placeholder="Enter code" value={this.state.key} onChange={this.handleKeyChange} />
                        <button type="submit">Go</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default CodeAccess;