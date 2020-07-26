# Cusip Generator

This project includes a RESTful web service along with a web frontend to generate unique CUSIPs based on the Bloomberg tickers passed in as parameters. The inspiration behind this project was due to the fact that  a financial security may be defined by different identifiers across multiple data vendors, exchanges and order management systems. 
- Bloomberg ticker: a string of characters used to identify a financial security in Bloomberg
- CUSIP: nine-character alphanumeric code used to define a North American financial security, consisting of 8 alphanumeric characters and a [check digit](https://en.wikipedia.org/wiki/CUSIP#Check_digit_pseudocode) (0-9)

## How to run it
1) Install Docker on your local machine.
2) From the root directory, run `docker-compose up` in your command line.
3) App is now running in development mode.

### Web frontend endpoint

You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Web service endpoint

You can send a request to 
1) GET `/api/generate-cusip/ticker/:ticker` for a single ticker
2) POST `/api/generate-cusip/list` for multiple tickers (raw text with tickers separated by newline)
3) POST `/api/generate-cusip/file` for tickers stored in a CSV file (1-column with tickers separated by newline)
