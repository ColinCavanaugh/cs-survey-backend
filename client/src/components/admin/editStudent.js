import React, { Component } from 'react';
import Edit from './Edit.js';
import { Link } from "react-router-dom";

class editStudent extends Component {
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
                            pathname: '/dashboard/questions',
                            state: '1'
                        }}>{this.state.back}</Link>
                        <Link class='active-nav-item' to={{
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

                    <div class="edit">
                        <Edit id='1' num='1' />
                        <Edit id='1' num='2' />
                        <Edit id='1' num='3' />
                        <Edit id='1' num='4' />
                        <Edit id='1' num='5' />
                        <Edit id='1' num='6' />
                        <Edit id='1' num='7' />
                        <Edit id='1' num='8' />
                        <Edit id='1' num='9' />
                        <Edit id='1' num='10' />
                        <Edit id='1' num='11' />
                        <Edit id='1' num='12' />
                        <Edit id='1' num='13' />
                        <Edit id='1' num='14' />
                        <Edit id='1' num='15' />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    NOT LOGGED IN
                </div>
            );
        }
    }
}
export default editStudent;