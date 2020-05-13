import React, { Component } from 'react';
import ssulogo from '../../images/ssulogo.png';
import { Link } from "react-router-dom";

class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValid: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //set login as valid
    componentDidMount() {
        this.setState({
            formValid: this.props.location.state
        });
    }
    //take user to desired admin function (questions, results, active codes)
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push({
            pathname: `/dashboard/${event.target.value}`,
            state: '1'
        });

    }

    render() {
        if (this.state.formValid == '1') {
            return (
                <div>
                    <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                        <img src={ssulogo} /><div class="spacer"></div>
                        <Link class='nav-item' to={{
                                pathname: '/login',
                                state: '1'
                        }}>Logout</Link>
                    </nav>
                    <div className="dashboard">
                        <button class="dashButton" value="codes" onClick={this.handleSubmit} >Manage Access Codes</button>
                        <button class="dashButton" value="questions" onClick={this.handleSubmit} >Modify Questions</button>
                        <button class="dashButton" value="results" onClick={this.handleSubmit} >View Results</button>
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
export default dashboard;