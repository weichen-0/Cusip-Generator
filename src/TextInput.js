import React, { Component } from "react";
import axios from "axios";
import './css/TextInput.css';

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = { input: '', outputList: [], success: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const body = this.state.input;
        axios.post('http://localhost:5000/api/generate-cusip/list', body, { headers: { 'Content-Type': 'text/plain' } })
            .then(res => {
                this.setState({ outputList: res.data.results, success: true })
            })
            .catch(error => {
                this.setState({ outputList: error.response.data.errors, success: false })
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="box">
                    <b>Bloomberg Tickers</b><br/>
                    <textarea id="tickers" name="tickers" placeholder="AIH8 Index&#10;C Z7 Comdty&#10;LAZ18 Comdty&#10;..." onChange={this.handleChange} value={this.state.input} required/>                </div>
                <button className="submit-btn">Generate &#62;&#62;&#62;</button>
                <div className="box">
                    <b>CUSIPs</b><br/>
                    <div className="output">
                        {
                            this.state.outputList.map(output => (
                                <div key={output}><span className={this.state.success ? "" : "error"}>{output}</span><br/></div>
                                )
                            )
                        }
                    </div>
                </div>
            </form>
        );
    }
}

export default TextInput;
