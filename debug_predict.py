import json
import urllib.request
import urllib.error

url = 'http://127.0.0.1:5000/predict'
data = {
    'Age': 82,
    'Education Level': 2,
    'BMI': 29.5,
    'Cognitive Test Score': 40,
    'Physical Activity Level': 'Low',
    'Smoking Status': 'Current',
    'Alcohol Consumption': 'Regularly',
    'Diabetes': 'Yes',
    'Hypertension': 'Yes',
    'Cholesterol Level': 'High',
    'Family History of Alzheimer’s': 'Yes',
    'Depression Level': 'High',
    'Sleep Quality': 'Poor'
}
req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req, timeout=20) as r:
        print('STATUS', r.status)
        print(r.read().decode())
except urllib.error.HTTPError as e:
    print('HTTP', e.code)
    print(e.read().decode())
except urllib.error.URLError as e:
    print('URL ERROR', e)
