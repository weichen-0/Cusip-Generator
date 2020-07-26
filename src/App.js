import React from 'react';
import './App.css';
import Tabs from './Tabs'
import DropZone from './DropZone';

function App() {
  return (
    <div className="App">
      <h1>CUSIP GENERATOR</h1>
        <Tabs>
            <div label="Text Input">
                <form className="form-area">
                    <div className="box">
                        <b>Bloomberg Tickers</b><br/>
                        <textarea id="tickers" name="tickers" placeholder="AIH8 Index, C Z7 Comdty, LAZ18 Comdty..." required></textarea>
                    </div>
                    <button className="submit-btn">Generate &#62;&#62;&#62;</button>
                    <div className="box">
                        <b>CUSIPs</b><br/>
                        <div className="output"></div>
                    </div>
                </form>
            </div>
            <div label="File Upload">
                <form className="form-area" encType="multipart/form-data" action="" method="post">
                    <div className="box">
                        <b>CSV File</b><br/>
                        {/*<input id="ticker-file" type="file"/><br/>*/}
                        <DropZone/>
                    </div>
                    {/*<button className="submit-btn">Generate &#62;&#62;&#62;</button>*/}
                    <div className="box">
                        <b>CUSIPs</b><br/>
                        <div className="output"></div>
                    </div>
                </form>
            </div>
        </Tabs>
    </div>
  );
}

export default App;
