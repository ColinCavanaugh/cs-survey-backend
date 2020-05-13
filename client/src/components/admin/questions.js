import React, { Component } from 'react';
import { Link } from "react-router-dom";

class questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValid: '',
            back: '<'
        };
    }

    componentDidMount() {
        this.setState({
            formValid: this.props.location.state
        });
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
                            <Link class='nav-item' to={{
                                pathname: '/editSenior',
                                state: '1'
                            }}>Senior</Link>
                            <Link class='nav-item' to={{
                                pathname: '/editAlumni',
                                state: '1'
                            }}>Alumni</Link>
                            <Link class='nav-item' to={{
                                pathname: '/editIAB',
                                state: '1'
                            }}>IAB</Link><div class="spacer"></div>
                            <Link class='nav-item' to={{
                                pathname: '/login',
                                state: '1'
                        }}>Logout</Link>
                    </nav>
                    <p className="screen">
                        Choose a survey to start editing.
                    </p>
                </div>
            );
        }
        else {
            return (
                <div className="questions">
                    NOT LOGGED IN
                </div>
            );
        }
    }
}
export default questions;