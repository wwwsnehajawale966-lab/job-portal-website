# Job Portal Pro - Mini Project

A simple Job Portal System built with **HTML, CSS, JavaScript, Node.js & PostgreSQL**.

---

## Project Structure

```
Job Portal Pr/
├── server.js              # Express server (entry point)
├── package.json           # Project dependencies
├── config/
│   └── db.js              # PostgreSQL database connection
├── routes/
│   ├── auth.js            # Register & Login APIs
│   └── jobs.js            # Jobs CRUD APIs (Get, Post, Delete)
├── database/
│   └── schema.sql         # Database tables & sample data
└── public/
    ├── index.html         # Homepage - job listings, search, post job form
    ├── login.html         # Login page
    ├── register.html      # Registration page
    └── style.css          # All styles in one CSS file
```

**Total: 10 files only**

---

## Technologies Used

| Technology   | Purpose                  |
|-------------|--------------------------|
| HTML         | Frontend pages           |
| CSS          | Styling & responsiveness |
| JavaScript   | Frontend logic & API calls |
| Node.js      | Backend server           |
| Express.js   | API routes & middleware   |
| PostgreSQL   | Database                 |
| JWT          | Authentication tokens    |
| bcryptjs     | Password hashing         |

---

## Prerequisites

Make sure these are installed on your system before starting:

### 1. Node.js (v16 or above)
- Download from: https://nodejs.org/
- After installing, verify by opening terminal and running:
```bash
node --version
```
- You should see something like `v18.20.3`

### 2. PostgreSQL (v14 or above)
- Download from: https://www.postgresql.org/download/
- During installation, **remember the password** you set for the `postgres` user
- Default port is `5432` (don't change it)
- After installing, verify PostgreSQL is running by opening **pgAdmin** (it gets installed with PostgreSQL)

---

## Database Credentials (config/db.js)

The database connection is configured in `config/db.js`:

```javascript
const pool = new Pool({
  user: "postgres",          // PostgreSQL username (default: postgres)
  password: "738552",        // Your PostgreSQL password (set during installation)
  host: "localhost",         // Keep localhost for local development
  port: 5432,               // Default PostgreSQL port
  database: "job_portal",   // Database name (we create this in Step 4)
});
```

**IMPORTANT:** If your PostgreSQL password is different, open `config/db.js` and change the `password` field to your actual password.

---

## How to Run (Step by Step)

### Step 1: Open Terminal

Open **Command Prompt**, **PowerShell**, or **Git Bash**.

> **PowerShell Users:** If you get a script execution error, run this first:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

Navigate to the project folder:

```bash
cd "C:\personal\Job Portal Pr"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install these packages automatically:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `pg` - PostgreSQL client for Node.js
- `jsonwebtoken` - JWT token for authentication
- `bcryptjs` - Password hashing

You should see output like:
```
added 99 packages, and audited 100 packages in 10s
found 0 vulnerabilities
```

### Step 3: Open pgAdmin

- Open **pgAdmin 4** from Start Menu (installed with PostgreSQL)
- Enter your master password when prompted
- In the left panel, expand **Servers > PostgreSQL**
- Enter your PostgreSQL password when asked

### Step 4: Create the Database

**Option A: Using pgAdmin (Easy)**
1. Right-click on **Databases** in pgAdmin
2. Click **Create > Database**
3. Enter name: `job_portal`
4. Click **Save**

**Option B: Using psql Command**
```bash
psql -U postgres -h localhost -c "CREATE DATABASE job_portal;"
```
Enter your PostgreSQL password when prompted.

### Step 5: Create Tables & Insert Sample Data

**Option A: Using pgAdmin (Easy)**
1. In pgAdmin, click on `job_portal` database
2. Click **Tools > Query Tool** (or press Alt+Shift+Q)
3. Open the file `database/schema.sql` and copy-paste all its content
4. Click **Execute** (play button) or press F5
5. You should see:
   ```
   CREATE TABLE
   CREATE TABLE
   INSERT 0 2
   INSERT 0 4
   ```

**Option B: Using psql Command**
```bash
psql -U postgres -h localhost -d job_portal -f database/schema.sql
```

This creates:
- `users` table - 2 sample users (1 employer + 1 jobseeker)
- `jobs` table - 4 sample job listings

### Step 6: Verify Database Password

Open `config/db.js` and make sure the password matches YOUR PostgreSQL password:

```javascript
password: "738552",   // <-- Change this to YOUR password
```

### Step 7: Start the Server

```bash
node server.js
```

You should see:

```
Server running on 5000
```

If you see this, everything is working!

> **If you see an error:**
> - `EADDRINUSE` - Port 5000 is busy. Run `npx kill-port 5000` then try again
> - `password authentication failed` - Wrong password in `config/db.js`
> - `database "job_portal" does not exist` - Go back to Step 4

### Step 8: Open in Browser

Open your browser (Chrome, Edge, Firefox) and go to:

**http://localhost:5000**

You should see the Job Portal homepage with:
- Purple-teal gradient hero section
- Search bar
- 4 job listings loaded from database

### Step 9: Test Login

Click **Login** and use these demo credentials:

| Role       | Email             | Password    |
|-----------|-------------------|-------------|
| Employer   | employer@test.com | password123 |
| Job Seeker | rahul@test.com    | password123 |

- **Login as Employer** → You'll see "Post a New Job" form + Delete buttons on jobs
- **Login as Job Seeker** → You can view jobs (posting/deleting not allowed)

### Step 10: Stop the Server

Press `Ctrl + C` in the terminal to stop the server.

---

## Pages

| Page        | URL                              | Description              |
|------------|----------------------------------|--------------------------|
| Homepage    | http://localhost:5000             | Job listings + search + post job |
| Login       | http://localhost:5000/login.html  | User login               |
| Register    | http://localhost:5000/register.html | New user registration  |

---

## Demo Accounts

| Role       | Email             | Password    |
|-----------|-------------------|-------------|
| Employer   | employer@test.com | password123 |
| Job Seeker | rahul@test.com    | password123 |

---

## API Endpoints

| Method | Endpoint         | Auth | Description          |
|--------|-----------------|------|----------------------|
| POST   | /api/auth/register | No  | Register new user    |
| POST   | /api/auth/login    | No  | Login & get token    |
| GET    | /api/jobs          | No  | Get all jobs         |
| GET    | /api/jobs?search=keyword | No | Search jobs    |
| POST   | /api/jobs          | Yes (Employer) | Post a new job |
| DELETE | /api/jobs/:id      | Yes (Employer) | Delete a job   |

---

## Features

- **Job Listings** - View all jobs on homepage with company, location, type, salary
- **Search** - Search jobs by title, company, or location
- **Register** - Create account as Job Seeker or Employer
- **Login/Logout** - JWT based authentication
- **Post Job** - Employers can post new jobs (form appears after login)
- **Delete Job** - Employers can delete their own jobs
- **Responsive** - Works on mobile and desktop
- **Toast Notifications** - Success/error messages

---

## Database Schema

### users table

| Column     | Type          | Description        |
|-----------|---------------|--------------------|
| id         | SERIAL (PK)   | Auto-increment ID  |
| name       | VARCHAR(100)   | Full name          |
| email      | VARCHAR(100)   | Unique email       |
| password   | VARCHAR(255)   | Hashed password    |
| role       | VARCHAR(20)    | jobseeker/employer |
| created_at | TIMESTAMP      | Registration date  |

### jobs table

| Column      | Type          | Description        |
|------------|---------------|--------------------|
| id          | SERIAL (PK)   | Auto-increment ID  |
| employer_id | INTEGER (FK)   | References users   |
| title       | VARCHAR(200)   | Job title          |
| company     | VARCHAR(100)   | Company name       |
| location    | VARCHAR(100)   | Job location       |
| job_type    | VARCHAR(30)    | Full-time/Part-time/Remote/Internship |
| salary      | VARCHAR(50)    | Salary range       |
| description | TEXT           | Job description    |
| created_at  | TIMESTAMP      | Post date          |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm` command not found | Install Node.js from nodejs.org |
| `npm` script error on PowerShell | Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| Database connection failed | Check password in `config/db.js` |
| Port 5000 already in use | Kill the process: `npx kill-port 5000` then restart |
| Cannot GET / | Make sure `public/index.html` exists |

---

## Author

Mini Job Portal Project - Built with Node.js & PostgreSQL
