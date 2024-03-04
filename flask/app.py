from flask import Flask, jsonify, render_template, request
import requests
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from termcolor import colored

import pickle
app = Flask(__name__)
CORS(app)
# Assuming LRmodel_warm and LRmodel_cold are pre-trained models
# Load your pre-trained models here

@app.route('/')
def server_status():
    return jsonify({"status": "Server is online"})

@app.route('/predict', methods=['POST'])
@cross_origin()  # Import this decorator
def predict():
    # Access data from the incoming JSON payload
    request_data = request.json
    
    # Extracting individual features from the JSON payload
    airt = request_data.get('airt', 0)
    prec = request_data.get('prec', 0)
    slrt = request_data.get('slrt', 0)
    wspd = request_data.get('wspd', 0)

    # Prepare data for prediction
    new_df = pd.DataFrame({'airt': [airt], 'prec': [prec], 'slrt': [slrt], 'wspd': [wspd]})

    with open('LRmodel_warm.pkl', 'rb') as warm_file:
        LRmodel_warm = pickle.load(warm_file)

    with open('LRmodel_cold.pkl', 'rb') as cold_file:
        LRmodel_cold = pickle.load(cold_file)

    soil_temp_warm = LRmodel_warm.predict(new_df)
    soil_temp_cold = LRmodel_cold.predict(new_df)
    soil_temp_warm = soil_temp_warm[0]
    soil_temp_cold = soil_temp_cold[0]

    predictions = {
        'warm_season': {
            'air_temperature': airt,
            'soil_temperature': float(soil_temp_warm)
        },
        'cold_season': {
            'air_temperature': airt,
            'soil_temperature': float(soil_temp_cold)
        }
    }
    
    return jsonify(predictions)


if __name__ == '__main__':
    app.run(debug=True)
