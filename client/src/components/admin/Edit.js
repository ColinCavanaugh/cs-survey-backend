import React, { Component } from 'react';
import '../../App.css';
import Question from '../Question.js';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({
            data: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let body = {
            question: this.state.data,
            num: this.props.num,
            survey: this.props.id
        };
        axios.post(`http://173.244.1.41:3000/express_backend/editQuestion/`, body).then((response) => {

        }).catch(function (error) { console.log(error) });
        window.location.reload();
    }

    render() {
        return (
            <table class="modQuestion">
                <tr><td class="questionText"><Question ID={this.props.id} num={this.props.num} /></td></tr>
                <tr><td><form onSubmit={this.handleSubmit}>
                    <input type="text" name="q" maxlength="255" placeholder="Enter new question here" value={this.state.data} onChange={this.handleInputChange}/><br></br>
                    <button class="btn btn-custom" type="submit">Submit</button>
                    </form></td></tr>
            </table>
        );
    }
}
export default Edit;