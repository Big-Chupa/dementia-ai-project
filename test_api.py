import requests

url = 'http://127.0.0.1:5000/predict'

# Fake patient data matching our dataset's features
patient_data = {
    "Age": 82,
    "Education Level": 2,
    "BMI": 29.5,
    "Cognitive Test Score": 40,
    "Physical Activity Level": "Low",
    "Smoking Status": "Current",
    "Alcohol Consumption": "Regularly",
    "Diabetes": "Yes",
    "Hypertension": "Yes",
    "Cholesterol Level": "High",
    "Family History of Alzheimer’s": "Yes",
    "Depression Level": "High",
    "Sleep Quality": "Poor"
}

print("Sending patient data to the API...")

try:
    response = requests.post(url, json=patient_data, timeout=10)
    print("\n--- API Response ---")
    try:
        print(response.json())
    except ValueError:
        print(f"Non-JSON response (status {response.status_code}):\n{response.text}")
except Exception as e:
    print(f"Error connecting to server: {e}")
