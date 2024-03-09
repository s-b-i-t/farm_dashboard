from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
from datetime import datetime
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

    # Linear Regression Model Predictions
    soil_temp_warm = LRmodel_warm.predict(new_df)
    soil_temp_cold = LRmodel_cold.predict(new_df)
    soil_temp_warm = soil_temp_warm[0]
    soil_temp_cold = soil_temp_cold[0]

    # Neural Network Model Prediction
    nn_predictions = NNModel_Daily.predict(new_df)
    soil_temp_nn = nn_predictions[0]
    
    current_month = datetime.now().month

    if current_month in [1,2,3,10,11,12]:
        predictions = {
            'season': {
                'season_type': 'Cold',
                'air_temperature': int(airt),
                'soil_temperature_lr': int(soil_temp_cold)
            
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
                'soil_temperature_lr': int(soil_temp_warm)
            
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
