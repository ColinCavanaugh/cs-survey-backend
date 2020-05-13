import React, { Component } from 'react';
import {Link} from "react-router-dom";

class results extends Component {
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
                <div className="results">
                    <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                            <Link class='nav-item' to={{
                                pathname: '/dashboard',
                                state: '1'
                            }}>{this.state.back}</Link>
                            <Link class='nav-item' to={{
                                pathname: '/viewSenior',
                                state: '1'
                            }}>Senior</Link>
                            <Link class='nav-item' to={{
                                pathname: '/viewAlumni',
                                state: '1'
                            }}>Alumni</Link>
                            <Link class='nav-item' to={{
                                pathname: '/viewIAB',
                                state: '1'
                            }}>IAB</Link><div class="spacer"></div>
                            <Link class='nav-item' to={{
                                pathname: '/login',
                                state: '1'
                        }}>Logout</Link>
                    </nav>
                    <p className="screen">
                        Choose a survey to view results.
                    </p>
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
export default results;