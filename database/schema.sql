-- Run: CREATE DATABASE job_portal;  (if not already created)

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('jobseeker', 'employer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    employer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    job_type VARCHAR(30) NOT NULL,
    salary VARCHAR(50),
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (password = password123)
INSERT INTO users (name, email, password, role) VALUES
('Tech Corp HR', 'employer@test.com', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC', 'employer'),
('Rahul Sharma', 'rahul@test.com', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC', 'jobseeker')
ON CONFLICT (email) DO NOTHING;

INSERT INTO jobs (employer_id, title, company, location, job_type, salary, description) VALUES
(1, 'Full Stack Developer', 'Tech Corp', 'Mumbai', 'Full-time', '12-18 LPA', 'Looking for a Full Stack Developer with 2+ years experience in React and Node.js.'),
(1, 'UI/UX Designer', 'Tech Corp', 'Pune', 'Full-time', '8-14 LPA', 'Creative UI/UX Designer needed with Figma and Adobe XD skills.'),
(1, 'Backend Developer', 'Tech Corp', 'Bangalore', 'Remote', '10-20 LPA', 'Node.js Backend Developer for building scalable APIs and microservices.'),
(1, 'Data Analyst Intern', 'Tech Corp', 'Delhi', 'Internship', '15-25K/month', 'Great opportunity for freshers to learn data analysis with Python and SQL.')
ON CONFLICT DO NOTHING;
