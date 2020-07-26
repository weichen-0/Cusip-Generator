from flask import Flask, request, jsonify
from ticker import Ticker

app = Flask(__name__)

@app.route('/generate/<string:name>') # spaces in ticker name needs to be encoded as %20
def generate_cusip(name):
    cusip = Ticker(name).generate_cusip()
    return cusip

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5300, debug=True)