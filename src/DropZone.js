import React, { useRef, useState, useEffect } from 'react';
import './css/DropZone.css';

const Dropzone = (props) => {

    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);

    useEffect(() => {
        if (selectedFiles.length > 0) {
            const newFile = selectedFiles[0];
            setValidFiles([newFile]);
        }
    }, [selectedFiles]);

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
    };

    const dragLeave = (e) => {
        e.preventDefault();
    };

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            updateFiles([files[0]]);
        }
    };

    const filesSelected = () => {
        if (fileInputRef.current.files.length > 0) {
            updateFiles([fileInputRef.current.files[0]]);
        }
    };

    const fileInputClicked = () => {
        fileInputRef.current.click();
    };

    const updateFiles = (files) => {
        const file = files[0];
        if (validateFile(file)) {
            setSelectedFiles([file]);
            props.onChange(file);
        } else {
            file['invalid'] = true;
            setSelectedFiles([file]);
            setUnsupportedFiles([file]);
        }
    };

    const validateFile = (file) => {
        return file.type === 'text/csv';
    };

    const removeFile = () => {
        setSelectedFiles([]);
        setValidFiles([]);
        setUnsupportedFiles([]);
    };

    return (
        <div>
            <div className="drop-container"
                 onDragOver={dragOver}
                 onDragEnter={dragEnter}
                 onDragLeave={dragLeave}
                 onDrop={fileDrop}
                 onClick={fileInputClicked}
            >
                <div className="drop-message">
                    <div className="upload-icon"/>
                    Drag & drop here or click to select file
                </div>
                <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    multiple
                    onChange={filesSelected}
                />
            </div>
            <div className="file-display-container">
                { validFiles.length > 0 && validFiles[0] &&
                <div className="file-status-bar">
                    <div>
                        <div className="file-type-logo"/>
                        <span className={`file-name ${validFiles[0].invalid ? 'file-error' : ''}`}>{validFiles[0].name}</span>
                    </div>
                    <div className="file-remove" onClick={() => removeFile()}>X</div>
                </div>
                }
            </div>
            {
                unsupportedFiles.length === 0 && validFiles.length > 0
                    ? <button className="file-upload-btn">Upload File</button>
                    : ''
            }
        </div>
    );
}

export default Dropzone;