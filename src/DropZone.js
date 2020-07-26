import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './DropZone.css';

const Dropzone = () => {
    const fileInputRef = useRef();
    const progressRef = useRef();
    const uploadRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);

    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (file) => {
        return file.type === 'text/csv';
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = selectedFiles.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        selectedFiles.splice(index2, 1);
        setValidFiles([...validFiles]);
        setSelectedFiles([...selectedFiles]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    const uploadFiles = async () => {
        uploadRef.current.innerHTML = 'File(s) Uploading...';
        for (let i = 0; i < validFiles.length; i++) {
            const formData = new FormData();
            formData.append('image', validFiles[i]);
            formData.append('key', '');

            axios.post('https://api.imgbb.com/1/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                    progressRef.current.innerHTML = `${uploadPercentage}%`;
                    progressRef.current.style.width = `${uploadPercentage}%`;

                    if (uploadPercentage === 100) {
                        uploadRef.current.innerHTML = 'File(s) Uploaded';
                        validFiles.length = 0;
                        setValidFiles([...validFiles]);
                        setSelectedFiles([...validFiles]);
                        setUnsupportedFiles([...validFiles]);
                    }
                },
            })
                .catch(() => {
                    uploadRef.current.innerHTML = `<span class="error">Error Uploading File</span>`;
                    progressRef.current.style.backgroundColor = 'red';
                })
        }
    }

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
                    <div className="upload-icon"></div>
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
                {
                    validFiles.map((data, i) =>
                        <div className="file-status-bar" key={i}>
                            <div>
                                <div className="file-type-logo"></div>
                                <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                            </div>
                            <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                        </div>
                    )
                }
            </div>
            {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button> : ''}
        </div>
    );
}

export default Dropzone;