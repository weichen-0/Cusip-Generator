import React from 'react';
import './css/App.css';
import Tabs from './Tabs'
import FileUpload from "./FileUpload";
import TextInput from "./TextInput";

function App() {

  return (
    <div className="App">
      <h1>CUSIP GENERATOR</h1>
        <Tabs>
            <div label="Text Input">
                <TextInput/>
            </div>
            <div label="File Upload">
                <FileUpload/>
            </div>
        </Tabs>
    </div>
  );
}

export default App;
