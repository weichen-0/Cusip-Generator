import DropZone from "./DropZone";
import React, { Component } from "react";
import axios from 'axios';
import './css/FileUpload.css';


class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { file: null, outputList: [] };
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
    }

    handleFileSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);

        axios.post('http://localhost:5000/api/generate-cusip/file', formData, { headers: { 'content-type': 'multipart/form-data' } })
            .then(res => {
                this.setState({ outputList: res.data.results, success: true })
            })
            .catch(error => {
                this.setState({ outputList: error.response.data.errors, success: false })
            })
    };

    render() {
        return (
            <form onSubmit={this.handleFileSubmit} encType="multipart/form-data" action="" method="post">
                <div className="box">
                    <b>CSV File</b><br/>
                    <DropZone onChange={(newFile) => this.setState({ file: newFile })}/>
                </div>
                <div className="separator"/>
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

export default FileUpload;