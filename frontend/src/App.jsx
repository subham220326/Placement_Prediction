import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    cgpa: '',
    iq: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cgpa: parseFloat(formData.cgpa),
          iq: parseFloat(formData.iq)
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          status: data.placement_status,
          probability: (data.probability * 100).toFixed(1)
        });
      } else {
        setError(data.error || 'Something went wrong on the server.');
      }
    } catch (err) {
      setError('Failed to connect to backend server. Make sure FastAPI is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎓 Student Placement Predictor</h2>
        <p style={styles.subtitle}>Enter student metrics to check placement eligibility</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>CGPA (0 - 10)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="e.g., 8.25"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>IQ Score</label>
            <input
              type="number"
              step="any"
              name="iq"
              value={formData.iq}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="e.g., 115"
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Analyzing Profile...' : 'Predict Placement'}
          </button>
        </form>

        {result !== null && (
          <div style={{
            ...styles.resultBox, 
            backgroundColor: result.status.includes('Placed 🎉') ? '#ecfdf5' : '#fef2f2',
            borderColor: result.status.includes('Placed 🎉') ? '#a7f3d0' : '#fecaca',
            color: result.status.includes('Placed 🎉') ? '#065f46' : '#991b1b'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{result.status}</div>
            <div style={{ fontSize: '14px', marginTop: '5px' }}>
              Confidence / Probability: <strong>{result.probability}%</strong>
            </div>
          </div>
        )}

        {error && <div style={styles.errorBox}>{error}</div>}
      </div>
    </div>
  );
}

// Clean inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '35px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '420px',
    boxSizing: 'border-box',
  },
  title: {
    margin: '0 0 5px 0',
    color: '#0f172a',
    fontSize: '22px',
  },
  subtitle: {
    margin: '0 0 25px 0',
    color: '#64748b',
    fontSize: '13px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#334155',
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  resultBox: {
    marginTop: '25px',
    padding: '16px',
    border: '1px solid',
    borderRadius: '8px',
    textAlign: 'center',
  },
  errorBox: {
    marginTop: '25px',
    padding: '15px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#991b1b',
    fontSize: '14px',
  },
};

export default App;