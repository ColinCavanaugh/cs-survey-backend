import React, { Component } from 'react';

class Question extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        // Call fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    // Fetches GET route from the Express server.
    callBackendAPI = async () => {
        var qNum = this.props.num;
        var sNum = this.props.ID;
        const response = await fetch(`http://173.244.1.41:3000/express_backend/survey${sNum}/q${qNum}`);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };
    //return question text along with leading question number
    render() {
        return this.props.num + ".) " + this.state.data;
    }
}
export default Question;