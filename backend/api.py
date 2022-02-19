from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return 'Web App with Python Flask!'

@app.route('/data')
def data():
    with open('data/sample.json') as f:
        data = json.load(f)
    response = app.response_class(
        response=json.dumps(data, indent=4),
        status=200,
        mimetype='application/json'
    )

    return response

app.run(host='0.0.0.0', port=81)