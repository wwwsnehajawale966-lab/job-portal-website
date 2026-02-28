const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const SECRET = "job_portal_secret_2024";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ error: "All fields required" });

    const exists = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
    if (exists.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
      [name, email, hash, role]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Registered!", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful!", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
