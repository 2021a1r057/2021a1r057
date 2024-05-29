const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let window = [];
const AUTH_TOKEN = "Bearer AUTH_TOKEN";

const numberTypeUrls = {
  'p': 'http://20.244.56.144/test/primes',
  'T': 'http://20.244.56.144/test/fibo',
  'e': 'http://20.244.56.144/test/even',
  'r': 'http://20.244.56.144/test/rand'
};

// Function to fetch numbers from external API
const fetchNumbers = (url) => {
  return axios.get(url, {
    headers: { Authorization: AUTH_TOKEN },
    timeout: 500
  });
};

// Function to handle requests for /numbers/:numberId endpoint
const handleNumberRequest = (req, res) => {
  const numberId = req.params.numberId;

  if (!numberTypeUrls[numberId]) {
    return res.status(400).send({ error: "Invalid number ID. Use 'p' for primes, 'T' for Fibonacci, 'e' for even, 'r' for random." });
  }

  const url = numberTypeUrls[numberId];
  const prevState = [...window];

  fetchNumbers(url)
    .then(response => {
      const fetchedNumbers = response.data.numbers;
      const uniqueNumbers = Array.from(new Set(fetchedNumbers));

      uniqueNumbers.forEach(number => {
        if (!window.includes(number)) {
          if (window.length >= WINDOW_SIZE) {
            window.shift();
          }
          window.push(number);
        }
      });

      const currState = [...window];
      const avg = window.length ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0;

      res.send({
        windowPrevState: prevState,
        windowCurrState: currState,
        numbers: uniqueNumbers,
        avg: avg
      });
    })
    .catch(error => {
      res.status(500).send({
        error: "Failed to fetch numbers",
        windowPrevState: prevState,
        windowCurrState: window,
        numbers: [],
        avg: window.length ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0
      });
    });
};

// Endpoint to handle number requests
app.get('/numbers/:numberId', handleNumberRequest);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
