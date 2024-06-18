const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Token cứng
const hardcodedToken = 'hardcoded-token-example';

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra thông tin đăng nhập
  if (email === 'user@example.com' && password === 'password123') {
    // Trả về token cứng
    res.json({ token: hardcodedToken });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  // Kiểm tra token
  if (token === `Bearer ${hardcodedToken}`) {
    res.json({ message: 'You have accessed protected data!' });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

app.listen(port, () => {
  console.log(`Mock API is running on http://localhost:${port}`);
});
