import io
import csv
from flask import Flask, request, jsonify
from cusip_generator_api.controller import get_cusip, get_cusips

app = Flask(__name__)


@app.route('/api/generate-cusip/ticker/<string:ticker>', methods=['GET'])
def generate_cusip(ticker):
    generator_response = get_cusip(ticker)
    if not generator_response.success:
        return jsonify(error=generator_response.error), 400
    else:
        return jsonify(result=generator_response.result), 200


def generate_cusips(tickers):
    generator_responses = get_cusips(tickers)
    if not generator_responses.success:
        return jsonify(errors=generator_responses.errors), 400
    else:
        return jsonify(results=generator_responses.results), 200


@app.route('/api/generate-cusip/list', methods=['POST'])
def generate_cusips_from_list():
    tickers = request.data.decode('utf-8').splitlines()
    return generate_cusips(tickers)


@app.route('/api/generate-cusip/file', methods=['POST'])
def generate_cusips_from_file():
    # if POST request does not have the file part, or file is empty
    if 'file' not in request.files or not request.files['file']:
        return jsonify(errors=['Missing file in the file parameter.']), 400

    file = request.files['file']
    # if file is of wrong extension type
    if not file.filename.endswith('.csv'):
        return jsonify(errors=['Invalid file type. CSV required.']), 400

    stream = io.StringIO(file.stream.read().decode('utf-8'))
    tickers = [line[0] for line in csv.reader(stream)]
    return generate_cusips(tickers)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
