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

yaml
Copy code

---

## Database & ORM

- **MySQL** is used as a relational database
- **Sequelize ORM** is used to:
  - Define models (tables)
  - Manage relationships
  - Perform CRUD operations
  - Handle migrations and synchronization

### Example Models Relationship

```js
User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(Document);
Document.belongsTo(User);
Backend Setup
1. Navigate to backend folder
bash
Copy code
cd backend
2. Install dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file:

env
Copy code
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
JWT_SECRET=your_secret_key
4. Configure Sequelize (config/db.js)
js
Copy code
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

arduino
Copy code
http://localhost:4000
Frontend Setup
1. Navigate to frontend folder
bash
Copy code
cd frontend
2. Install dependencies
bash
Copy code
npm install
3. Start React App
bash
Copy code
npm run dev
Frontend will run at:

arduino
Copy code
http://localhost:5173
Features
User Authentication (JWT)

Task Management (CRUD)

Document Upload & Listing

Role-based access (Admin/User)

Responsive UI

Secure API handling

Scalable database design

API Communication Flow
User interacts with React UI

Axios sends request to Express API

Express validates request & JWT

Sequelize queries MySQL

Response sent back to frontend

Why Sequelize + MySQL?
Structured relational data

Strong data integrity

Easy model relationships

Production-ready ORM

Widely used in enterprise applications

Future Improvements
Pagination & search

Cloud storage for documents

Role-based dashboards

API rate limiting

Docker support

Author
Veer
Full Stack Developer (MERN)

License
This project is for learning and demonstration purposes.

markdown
Copy code

---

### Next (optional)
If you want, I can:
- Generate **ER Diagram**
- Create **API documentation**
- Improve README for **resume / interview**
- Add **Docker setup**
- Create **.gitignore**

Just tell me.





