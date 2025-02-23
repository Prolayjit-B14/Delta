const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

const users = []; // In-memory storage (use a database like MongoDB in production)
const SECRET_KEY = 'your_secret_key'; // JWT secret

app.use(bodyParser.json());

// Registration Route
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user (replace with database logic)
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ success: true, message: 'Registration successful' });
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    // Create a JWT token (expiry time: 1 hour)
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
