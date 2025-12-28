# Task Management System (MERN + MySQL)

This project is a **full-stack task management application** built with a modern frontend and a scalable backend architecture.  
The backend uses **Sequelize ORM with MySQL** for structured data management.

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL Database
- JWT Authentication
- Multer (File Uploads)

---

## Project Structure

root/
│
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── middleware/
│ ├── uploads/
│ └── server.js
│
└── README.md

yaml
Copy code

---

## Architecture Overview

┌──────────────┐
│ Frontend │
│ (React UI) │
└──────┬───────┘
│ Axios (HTTP Requests)
▼
┌──────────────┐
│ Backend │
│ (Express.js) │
└──────┬───────┘
│ Sequelize ORM
▼
┌──────────────┐
│ MySQL DB │
│ (Relational)│
└──────────────┘
 

---

## Database & ORM

- **MySQL** is used as a relational database
- **Sequelize ORM** is used to:
  - Define models (tables)
  - Manage relationships
  - Perform CRUD operations
  - Handle migrations and synchronization

### Example Models Relationship

``` js
User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(Document);
Document.belongsTo(User);
Backend Setup
1. Navigate to backend folder
 
cd backend
2. Install dependencies
 
npm install
3. Configure Environment Variables
Create a .env file:

 
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
JWT_SECRET=your_secret_key
4. Configure Sequelize (config/db.js)
js
    
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export default sequelize;
5. Run Backend Server
bash
Copy code
npm start
Backend will run at:

  
http://localhost:4000
Frontend Setup
-1. Navigate to frontend folder
 
cd frontend
2. Install dependencies

npm install
3. Start React App
 
npm run dev
Frontend will run at:

 
http://localhost:5173
Features
User Authentication (JWT)

 

Author
Veer 
Full Stack Developer (MERN)
```
 
# Passkey-Based Authentication (WebAuthn)

## Overview
Passkeys are a modern, phishing-resistant authentication mechanism based on the **Web Authentication (WebAuthn)** standard.  
They replace traditional passwords with **public–private key cryptography**, providing stronger security for users and administrators.

This project uses **passkeys during user registration and login** to protect:
- User data
- Admin panel access
- Sensitive application resources

---

## Why Use Passkeys?
Traditional passwords are vulnerable to:
- Phishing attacks
- Credential stuffing
- Database leaks
- Weak password reuse

Passkeys solve these problems by:
- Eliminating passwords entirely
- Using device-based cryptographic keys
- Requiring biometric or device-level authentication
- Ensuring credentials never leave the user's device

---

## How Passkeys Work (High-Level Flow)

1. User registers with email/username
2. Server generates a **WebAuthn challenge**
3. Browser creates a **public–private key pair**
4. Public key is stored in the database
5. Private key remains securely on the user’s device
6. During login, the server verifies cryptographic proof

---

 