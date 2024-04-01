from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import joblib
from datetime import datetime
import requests
import os

app = Flask(__name__)
CORS(app)

# Load your pre-trained models here
with open('LRmodel_warm.pkl', 'rb') as warm_file:
    LRmodel_warm = pickle.load(warm_file)

with open('LRmodel_cold.pkl', 'rb') as cold_file:
    LRmodel_cold = pickle.load(cold_file)

# Assuming NNModel_Daily.pkl is a pickled neural network model
with open('NNModel_Daily.pkl', 'rb') as nn_file:
    NNModel_Daily = pickle.load(nn_file)

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
    Y_scaler_NN = joblib.load('Y_scaler_NN')
    X_scaler_NN = joblib.load('X_scaler_NN')

    X_new_df_scaled = X_scaler_NN.transform(new_df)

    # Linear Regression Model Predictions
    soil_temp_warm = LRmodel_warm.predict(new_df)
    soil_temp_cold = LRmodel_cold.predict(new_df)
    soil_temp_warm = soil_temp_warm[0]
    soil_temp_cold = soil_temp_cold[0]
    # API URL
    url = "https://api.ecowitt.net/api/v3/device/history"
    ecowitt_key = '0bc4e178-29b5-4208-9147-2c8725b9bea2'
    # Parameters for the API request
    
    now = str(datetime.now())
    begin = now[:10] + ' 00:00:00'
    end = now[:10] + ' 23:59:59'
    params = {
        'application_key': '189DFA99311E08E814B19574C3AEE44F',
        'api_key': ecowitt_key,
        'start_date': begin, 
        'end_date': end,
        'mac': '7C:87:CE:BE:A8:3F',
        'call_back': 'temp_ch1'
    } #need to update date

    # Make the request
    response = requests.get(url, params=params)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()

        # Get the temperature data
        temperature_data = data['data']['temp_ch1']['temperature']['list']
        
        # Find the most recent temperature report
        most_recent_timestamp = max(temperature_data.keys())
        most_recent_temperature = temperature_data[most_recent_timestamp]
        
        # Print the result
        print(f"Most recent temperature report:")
        print(f"Timestamp: {most_recent_timestamp}")
        print(f"Temperature: {most_recent_temperature} °F")
        #print(type(most_recent_temperature))
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        # Neural Network Model Prediction

    nn_predictions = NNModel_Daily.predict(X_new_df_scaled)
    soil_temp_nn = Y_scaler_NN.inverse_transform(nn_predictions[0].reshape(-1, 1))
    print('\n\n\n', soil_temp_nn, '\n\n\n\n')
    current_month = datetime.now().month

    print(datetime.now())
    if current_month in [1,2,3,10,11,12]:
        predictions = {
            'season': {
                'season_type': 'Cold',
                'air_temperature': int(airt),
                'soil_temperature_lr': int(soil_temp_cold),
                'actual_temp': int(float(most_recent_temperature))
            
            },
            'nn_prediction': {
                'air_temperature': int(airt),
                'soil_temperature_nn': int(soil_temp_nn)
            }
        }
    elif current_month in [4,5,6,7,8,9]:
        predictions = {
            'season': {
                'season_type': 'Warm',
                'air_temperature': int(airt),
                'soil_temperature_lr': int(soil_temp_warm),
                'actual_temp': int(float(most_recent_temperature))
            
            },
            'nn_prediction': {
                'air_temperature': int(airt),
                'soil_temperature_nn': int(soil_temp_nn)
            }
        }
    else:
        print('\n\nWOAH\n\n\n\n\nnAHHHHHHHHHHHHHHHHHH\n\n\n')
    
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
