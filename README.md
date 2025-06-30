# JuaShule

A peer-to-peer learning platform for students to share study resources, ask academic questions, and connect for group study.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Team & Collaboration](#team--collaboration)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Development Workflow](#development-workflow)
- [Major Issues & How We Solved Them](#major-issues--how-we-solved-them)
- [Key Features](#key-features)
- [Branching & Collaboration History](#branching--collaboration-history)
- [License](#license)

---

## Project Overview

### Problem Statement
Many secondary and college students, especially in rural areas, face challenges accessing affordable tutoring and quality study materials. Limited internet access, high costs of private tutors, and scarcity of resources like past papers or revision notes hinder academic success. Students often rely on informal peer networks to share knowledge, but these lack structure and accessibility, leaving many without adequate support. There's a need for a student-driven platform that facilitates peer-to-peer learning, resource sharing, and collaborative study in a way that's accessible and tailored to Kenya's education system.

### Solution
JuaShule is a peer-to-peer learning platform for secondary and college students to share study resources, ask academic questions, and connect with peers for group study. It tackles the challenge of limited access to affordable tutoring and study materials, especially in rural areas, by creating a student-driven knowledge-sharing community tailored to Kenya's education system.

The platform consists of a React frontend and a Flask backend, with PostgreSQL for data storage.

---

## Technologies Used

### Backend (API)
- **Python 3.10+**
- **Flask** – Web framework for building the REST API
- **Flask-JWT-Extended** – JWT-based authentication for secure endpoints
- **Flask-Mail** – Sending password reset and notification emails
- **Flask-Migrate / Alembic** – Database migrations
- **SQLAlchemy** – ORM for database models and queries
- **PostgreSQL** – Relational database for persistent storage
- **Werkzeug** – Password hashing and security utilities
- **Gunicorn** – WSGI HTTP server for production deployment

### Frontend (Client)
- **React** – JavaScript library for building user interfaces
- **Vite** – Fast development server and build tool for React
- **React Router** – Client-side routing for SPA navigation
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Radix UI** – Accessible UI primitives (e.g., dropdowns, toasts)
- **Axios** – HTTP client for making API requests

### DevOps & Tooling
- **Git & GitHub** – Version control and collaboration
- **Vercel** – Frontend deployment (React app)
- **Render** – Backend deployment (Flask API)
- **Postman** – API testing and documentation
- **dotenv** – Environment variable management

### Other
- **JWT (JSON Web Tokens)** – For secure authentication and session management
- **Email (SMTP)** – For password reset and notifications

---

## Team & Collaboration
**Contributors:**
- David Amedi (Backend, Frontend, DevOps)
- Rochelle Owor (Frontend, Backend, UI/UX)

We worked in parallel on different features, regularly merging our work and resolving conflicts together. Our collaboration was tracked via feature branches and pull requests.

---

## Project Structure
```
juashule/
├── client/          # React frontend
├── server/          # Flask backend
├── docummentation/  # Documentation and API collections
├── LICENSE
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL
- Git

### Backend Setup
1. Clone the repo: `git clone https://github.com/AmedDavid/JuaShule.git`
2. Navigate to server: `cd server`
3. Create a virtual environment: `python -m venv venv`
4. Activate it: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
5. Install dependencies: `pip install -r requirements.txt`
6. Set up environment variables as needed.
7. Initialize the database: `flask db upgrade`
8. Run the server: `flask run`

### Frontend Setup
1. Navigate to client: `cd client`
2. Install dependencies: `npm install`
3. Set up environment variables in `client/.env`:
   ```
   VITE_API_URL=https://juashule.onrender.com/api
   ```
4. Run the app: `npm run dev`

---

## Development Workflow
- We used feature branches for all major features and bug fixes (e.g., `feature-david-server`, `feature-rochelle-server`, `ui-rochelle`, `feature-david-ui-enhancements`).
- Pull requests were used for code review and merging.
- Regular merges from `main` to feature branches to minimize conflicts.

---

## Major Issues & How We Solved Them

### 1. Password Reset Flow (404 Error)
- **Issue:** Clicking the password reset link in the email led to a 404 error.
- **Solution:** 
  - Added a dedicated `/reset-password` route in the frontend to handle token-based password resets.
  - Implemented a backend endpoint `/api/profile/reset-password/confirm` to accept the token and new password, validate, and update the user's password.
  - Ensured the email link matches the frontend route.

### 2. Frontend/Backend Integration
- **Issue:** API endpoints and frontend routes were sometimes mismatched (e.g., `/resetpassword` vs `/reset-password`).
- **Solution:** Standardized route naming and updated both frontend and backend to use consistent paths.

### 3. Database Configuration
- **Issue:** Switching between local and production databases caused confusion.
- **Solution:** Updated configuration files to clearly separate local and production settings, and documented the process in the README.

### 4. UI/UX Consistency
- **Issue:** Different team members had different UI styles.
- **Solution:** Refactored components to use shared UI libraries (Radix UI, Tailwind CSS), and reviewed each other's PRs for consistency.

### 5. Token Storage for Password Reset
- **Issue:** Securely storing and invalidating password reset tokens.
- **Solution:** Used an in-memory store for tokens during development, with a note to use a persistent store (DB or cache) in production.

---

## Key Features
- User authentication (signup, login, JWT-based sessions)
- Password reset via email with secure token
- Profile management
- Resource sharing (upload, edit, delete)
- Question and answer forum
- Study group creation and management
- Responsive, modern UI with dark mode

---

## Branching & Collaboration History
- **David Amedi:** Focused on backend API, authentication, password reset, and initial frontend integration.
- **Rochelle Owor:** Led UI/UX improvements, resource and group pages, and contributed to backend features.
- **Feature branches:** 
  - `feature-david-server`, `feature-rochelle-server`, `feature-david-ui-enhancements`, `ui-rochelle`, `ui-rochelle-auth`, `setup-postgres-rochelle`, etc.
- **Merges:** Regularly merged feature branches into `main` after code review and testing.

---

## License
MIT License

---

**This README reflects our journey, the issues we faced, and how we solved them together as a team.**