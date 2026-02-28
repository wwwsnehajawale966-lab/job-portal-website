const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const SECRET = "job_portal_secret_2024";

// Auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

// GET ALL JOBS (public)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = "SELECT * FROM jobs ORDER BY created_at DESC";
    let params = [];

    if (search) {
      query = "SELECT * FROM jobs WHERE title ILIKE $1 OR company ILIKE $1 OR location ILIKE $1 ORDER BY created_at DESC";
      params = [`%${search}%`];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST A JOB (employer only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "employer")
      return res.status(403).json({ error: "Only employers can post jobs" });

    const { title, company, location, job_type, salary, description } = req.body;
    if (!title || !company || !location || !job_type || !description)
      return res.status(400).json({ error: "All fields required" });

    const result = await pool.query(
      "INSERT INTO jobs (employer_id, title, company, location, job_type, salary, description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [req.user.id, title, company, location, job_type, salary || null, description]
    );

    res.status(201).json({ message: "Job posted!", job: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE A JOB (employer only)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "employer")
      return res.status(403).json({ error: "Only employers can delete jobs" });

    await pool.query("DELETE FROM jobs WHERE id=$1 AND employer_id=$2", [req.params.id, req.user.id]);
    res.json({ message: "Job deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
