import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
    } catch (error) {
      setError('Error fetching numbers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = () => {
    if (numberId.trim() !== '') {
      fetchNumbers();
    } else {
      setError('Please enter a valid number ID.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter number ID (p, T, e, r)"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
          />
          <button onClick={handleFetch} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Numbers'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {response && (
          <div className="response">
            <h2>Response</h2>
            <p><strong>Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
            <p><strong>Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
            <p><strong>Fetched Numbers:</strong> {JSON.stringify(response.numbers)}</p>
            <p><strong>Average:</strong> {response.avg}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
