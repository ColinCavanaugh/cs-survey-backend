import React, { Component } from 'react';
import ViewResult from './ViewResult';
import { Link } from "react-router-dom";
import axios from 'axios';

class viewIAB extends Component {
    constructor(props) {
        super(props);
        this.graph1 = React.createRef();
        this.graph2 = React.createRef();
        this.graph3 = React.createRef();
        this.graph4 = React.createRef();
        this.state = {
            resultStat: 'All time',
            formValid: '',
            back: '<',
            start: '',
            end: '',
            comments: []
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setYear = (event) => {
        event.preventDefault();
        if (this.state.start > this.state.end) {
            window.alert('Start year must be less than or equal to end year')
        }
        if (this.state.start == '' || this.state.end == '') {
            window.alert('Please enter a year range')
        }
        else {
            //set graph results to show year range
            this.setState({
                resultStat: `${this.state.start} - ${this.state.end}`
            });
            this.graph1.current.updateGraph(this.state.start, this.state.end);
            this.graph2.current.updateGraph(this.state.start, this.state.end);
            this.graph3.current.updateGraph(this.state.start, this.state.end);
            this.graph4.current.updateGraph(this.state.start, this.state.end);

            let body = {
                survey: 'IAB',
                start: this.state.start,
                end: this.state.end
            }
            axios.post(`http://173.244.1.41:3000/express_backend/getModComments/`, body).then((response) => {
                this.setState({
                    comments: response.data.comments
                });
            }).catch(function (error) { console.log(error) });
        }
    }

    componentDidMount() {
        this.setState({
            formValid: this.props.location.state
        });
        
        let body = {
            survey: 'IAB'
        }
        axios.post(`http://173.244.1.41:3000/express_backend/getComments/`, body).then((response) => {
            this.setState({
                comments: response.data.comments
            });
        }).catch(function (error) { console.log(error) });
    }

    render() {
        if (this.state.formValid == '1') {
            const items = this.state.comments.map(comment => <li>{comment}</li>);
            return (
                <div className="results">
                    <nav class="navbar navbar-expand-sm relative-top navbar-custom">
                            <Link class='nav-item' to={{
                                pathname: '/dashboard/results',
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
                            <Link class='active-nav-item' to={{
                                pathname: '/viewIAB',
                                state: '1'
                        }}>IAB</Link><div class="spacer"></div>
                        <Link class='nav-item' to={{
                            pathname: '/login',
                            state: '1'
                        }}>Logout</Link>
                    </nav>
                    <div class="graph-tbl">
                        <p class='resultStat'>Showing results for: {this.state.resultStat}</p>
                        <form onSubmit={this.setYear}>
                            <input placeholder='Start year' type='number' name='start' onChange={this.handleChange} value={this.state.start} />
                            <input placeholder='End year' type='number' name='end' onChange={this.handleChange} value={this.state.end} />
                            <button type='submit'>View</button>
                        </form>
                        <table>
                            <col width="45%" />
                            <col width="10%" />
                            <col width="45%" />
                            <tr><td><ViewResult num='1' survType='IAB' ref={this.graph1} /></td><td></td><td><ViewResult num='2' survType='IAB' ref={this.graph2} /></td></tr>
                            <tr><td><ViewResult num='3' survType='IAB' ref={this.graph3} /></td><td></td><td><ViewResult num='4' survType='IAB' ref={this.graph4} /></td></tr>
                        </table>
                    </div>
                    <div class="comments">
                        <header>Comments</header>
                        <ul>
                            {items}
                        </ul>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="reults">
                    NOT LOGGED IN
                </div>
            );
        }
    }
}
export default viewIAB;