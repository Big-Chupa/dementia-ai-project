import DiagnosisForm from './components/DiagnosisForm';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50' }}>Dementia AI Clinical Assistant</h1>
        <p style={{ color: '#7f8c8d' }}>Powered by Random Forest Predictive Modeling</p>
      </header>
      
      <main>
        <DiagnosisForm />
      </main>
    </div>
  );
}

export default App;
