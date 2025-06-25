# JuaShule

A peer-to-peer learning platform for students to share study resources, ask academic questions, and connect for group study.

## Project Structure
```
juashule/
├── client/          # React frontend
├── server/          # Flask backend
├── .gitignore
├── LICENSE
└── README.md
```

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
   ```

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



## License
MIT License