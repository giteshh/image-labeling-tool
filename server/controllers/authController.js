const db = require('../config/db');
const bcrypt = require('bcryptjs');

// register
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    // If user already exists
    if (results.length > 0) {
      const existingUser = results[0];
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        // Same password — treat as login
        return res.status(200).json({
          message: 'Already registered. Redirecting...',
          user: { id: existingUser.id, name: existingUser.name, email: existingUser.email }
        });
      } else {
        // Email exists, but wrong password
        return res.status(400).json({ message: 'Incorrect password' });
      }
    }

    // New user registration
    const hashedPassword = await bcrypt.hash(password, 6);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Registration failed' });

        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};

// login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
};
