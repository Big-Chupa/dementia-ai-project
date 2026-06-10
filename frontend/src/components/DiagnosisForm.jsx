import { useState } from 'react';
import './DiagnosisForm.css';

const DiagnosisForm = () => {
  const [formData, setFormData] = useState({
    "Age": "",
    "Education Level": "",
    "BMI": "",
    "Cognitive Test Score": "",
    "Physical Activity Level": "Medium",
    "Smoking Status": "Never",
    "Alcohol Consumption": "Occasional",
    "Diabetes": "No",
    "Hypertension": "No",
    "Cholesterol Level": "Normal",
    "Family History of Alzheimer’s": "No",
    "Depression Level": "Low",
    "Sleep Quality": "Good"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ["Age", "Education Level", "BMI", "Cognitive Test Score"].includes(name)
      ? Number(value)
      : value;

    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to connect to the prediction server.');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Patient Screening Details</h2>
      
      <form onSubmit={handleSubmit} className="clinical-form">
        <div className="form-grid">
          <div className="input-group">
            <label>Age</label>
            <input type="number" name="Age" value={formData["Age"]} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Education Level (Years)</label>
            <input type="number" name="Education Level" value={formData["Education Level"]} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>BMI</label>
            <input type="number" step="0.1" name="BMI" value={formData["BMI"]} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Cognitive Test Score</label>
            <input type="number" name="Cognitive Test Score" value={formData["Cognitive Test Score"]} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Physical Activity</label>
            <select name="Physical Activity Level" value={formData["Physical Activity Level"]} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="input-group">
            <label>Smoking Status</label>
            <select name="Smoking Status" value={formData["Smoking Status"]} onChange={handleChange}>
              <option value="Never">Never</option>
              <option value="Former">Former</option>
              <option value="Current">Current</option>
            </select>
          </div>
          <div className="input-group">
            <label>Alcohol Consumption</label>
            <select name="Alcohol Consumption" value={formData["Alcohol Consumption"]} onChange={handleChange}>
              <option value="Never">Never</option>
              <option value="Occasional">Occasional</option>
              <option value="Regularly">Regularly</option>
            </select>
          </div>
          <div className="input-group">
            <label>Diabetes</label>
            <select name="Diabetes" value={formData["Diabetes"]} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="input-group">
            <label>Hypertension</label>
            <select name="Hypertension" value={formData["Hypertension"]} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="input-group">
            <label>Cholesterol Level</label>
            <select name="Cholesterol Level" value={formData["Cholesterol Level"]} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="input-group">
            <label>Family History of Alzheimer’s</label>
            <select name="Family History of Alzheimer’s" value={formData["Family History of Alzheimer’s"]} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="input-group">
            <label>Depression Level</label>
            <select name="Depression Level" value={formData["Depression Level"]} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="input-group">
            <label>Sleep Quality</label>
            <select name="Sleep Quality" value={formData["Sleep Quality"]} onChange={handleChange}>
              <option value="Poor">Poor</option>
              <option value="Average">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Run Diagnostics'}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {result && (
        <div className={`result-box ${result.prediction === 1 ? 'risk-high' : 'risk-low'}`}>
          <h3>Diagnostic Result</h3>
          <p><strong>Status:</strong> {result.diagnosis}</p>
          <p><strong>AI Confidence Score:</strong> {result.confidence_score}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisForm;
