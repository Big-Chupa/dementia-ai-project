from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# 1. Load the exported pipeline artifacts and Champion Model
try:
    model = joblib.load('../models/Random_Forest.pkl')
    scaler = joblib.load('../models/scaler.pkl')
    pca = joblib.load('../models/pca.pkl')
    expected_columns = joblib.load('../models/expected_columns.pkl')
    print("✅ Pipeline loaded successfully.")
except Exception as e:
    print(f"❌ Error loading pipeline: {e}")

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Dementia AI API is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        patient_data = request.json
        df_raw = pd.DataFrame([patient_data])
        df_encoded = pd.get_dummies(df_raw)

        for col in expected_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0

        df_final = df_encoded[expected_columns]
        scaled_data = scaler.transform(df_final)
        pca_data = pca.transform(scaled_data)

        prediction = model.predict(pca_data)[0]
        probabilities = model.predict_proba(pca_data)[0]
        risk_score = round(float(probabilities[1]) * 100, 2)

        result = {
            "prediction": int(prediction),
            "diagnosis": "High Risk of Dementia" if prediction == 1 else "Low Risk",
            "confidence_score": f"{risk_score}%" if prediction == 1 else f"{100 - risk_score}%"
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
