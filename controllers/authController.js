const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// REGISTER
exports.register = async (req, res) => {
    const { username, password, age, gender } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (username, password, age, gender) VALUES ($1, $2, $3, $4)',
            [username, hashedPassword, age, gender]
        );

        res.json({ message: "User registered" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username=$1',
            [username]
        );

        if (result.rows.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = result.rows[0];

        const valid = await bcrypt.compare(password, user.password);

        if (!valid)
            return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};