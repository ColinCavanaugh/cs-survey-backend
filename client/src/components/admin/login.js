import React, { Component } from 'react';
import axios from 'axios';
import ssulogo from '../../images/ssulogo.png';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            formValid: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //set values of username and password from input
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //post credentials to db to check if valid
    handleSubmit = (event) => {
        event.preventDefault();
        let body = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post(`http://173.244.1.41:3000/express_backend/submit/login/`, body).then((response) => {
            this.setState({
                formValid: response.data.reply,
            });
            //if valid go to dashboard
            if (this.state.formValid == '1') {
                this.props.history.push({
                    pathname: '/dashboard',
                    state: '1'
                });
            }
            //alert if incorrect admin credentials entered
            else {
                window.alert('Invalid username or password');
            }
        }).catch(function (error) { console.log(error) });

    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                    <img src={ssulogo} /><header class="title">Welcome to the Computer Science Department Survey Admin</header>
                </nav>
                <div class="title-2">
                    <header>Admin Login</header>
                </div>
                <div class="login-form-custom">
                    <form onSubmit={this.handleSubmit}>
                        <input type="password" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} /><br />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} /><br />
                        <button class=" btn btn-custom" type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default login;