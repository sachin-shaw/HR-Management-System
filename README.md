# 🧠 Candidate & Employee Management System

This is a full-stack MERN (MongoDB, Express, React, Node.js) web application developed as part of the Psquare assessment. It provides a complete platform to manage candidate resumes, transition selected candidates into employees, and track attendance records — all within an intuitive dashboard.

---

## 📦 Features

- ✅ **Login / Register** using JWT-based authentication
- 👤 **Candidate Management** – Add, View, Search, Filter, and Upload resumes
- 🧑‍💼 **Employee Management** – Promote selected candidates to employee list
- 📅 **Attendance Tracking** – View and search attendance records
- 📂 **Resume Upload & Download** – Secure file upload system
- 🔐 **Protected Routes** – Frontend route protection with context + token
- 📊 **Clean Dashboard Interface** – Sidebar navigation and responsive layout

---

## ⚙️ Tech Stack

### Frontend:

- React.js + Vite
- Axios for API calls
- Context API (for auth)
- CSS (custom) + Flexbox/Grid

### Backend:

- Node.js + Express.js
- MongoDB with Mongoose
- Multer (file uploads)
- JWT (authentication)
- CORS, dotenv, nodemon

---

## 🚀 Getting Started

Psquare-Assessment/
├── Backend/ # 🔙 Node.js backend
│ ├── config/ # DB & other configs
│ │ └── db.js
│ ├── controllers/ # All logic for routes
│ │ ├── candidateController.js
│ │ ├── employeeController.js
│ │ └── authController.js
│ ├── middleware/
│ │ └── upload.js # For file uploads
│ ├── models/ # Mongoose schemas
│ │ ├── Candidate.js
│ │ ├── Employee.js
│ │ └── User.js
│ ├── routes/ # Express route handlers
│ │ ├── candidateRoutes.js
│ │ ├── employeeRoutes.js
│ │ └── authRoutes.js
│ ├── uploads/ # Uploaded resume files
│ ├── server.js # Main server entry
│ └── package.json

├── Frontend/ # ⚛️ React frontend
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── assets/ # Images, logos
│ │ ├── components/ # UI components
│ │ │ ├── auth/ # Login/Register
│ │ │ │ ├── LoginForm.jsx
│ │ │ │ ├── RegisterForm.jsx
│ │ │ │ └── AuthWrapper.jsx
│ │ │ ├── layout/ # Header, Sidebar, UserProfile
│ │ │ │ ├── Header.jsx
│ │ │ │ ├── Sidebar.jsx
│ │ │ │ ├── NotificationButton.jsx
│ │ │ │ └── UserProfile.jsx
│ │ │ ├── dashboard/ # Pages inside dashboard
│ │ │ │ ├── Dashboard.jsx
│ │ │ │ ├── CandidateTable.jsx
│ │ │ │ ├── EmployeeTable.jsx
│ │ │ │ ├── AttendanceTable.jsx
│ │ │ │ └── AddCandidateModal.jsx
│ │ ├── context/ # Global states like auth
│ │ │ └── AuthContext.jsx
│ │ ├── hooks/ # Custom hooks
│ │ │ └── useAuth.js
│ │ ├── api/ # Axios API functions
│ │ │ ├── authApi.js
│ │ │ ├── candidateApi.js
│ │ │ └── employeeApi.js
│ │ ├── pages/ # Page-level components
│ │ │ ├── LoginPage.jsx
│ │ │ ├── RegisterPage.jsx
│ │ │ └── NotFound.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── App.css
│ └── package.json

├── README.md
├── .gitignore
└── .env

### 1. Clone the Repository

```bash
git clone https://github.com/sachin-shaw/Psquare-Assessment.git
cd Psquare-Assessment

cd Backend
npm install

### Create .env for Backend
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/HRMS
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## Run the server
npm run dev

## Frontend Setup
cd ../Frontend
npm install
npm run dev

## Create .env file in the Frontend
VITE_API_BASE_URL=http://localhost:5000/api

The frontend should now be running at: http://localhost:5173
Backend runs at: http://localhost:5000

#  📘 Psquare Assessment – API Documentation (Frontend + Backend)

This document explains all the API endpoints used in the **Psquare Assessment Project**. It is structured by frontend usage and backend endpoint logic for easier collaboration and updates.

---

## 🌐 Base URL (Backend Server)

```

http://localhost:5000/api

````

---

## 🔐 Authentication APIs

### 🧾 POST `/auth/register`

**Frontend:** Used on registration form submission.

**Request Body:**

```json
{
  "username": "sachin",
  "email": "sachin@example.com",
  "password": "password123"
}
````

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### 🔐 POST `/auth/login`

**Frontend:** Used on login form submission.

**Request Body:**

```json
{
  "email": "sachin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "...",
    "email": "...",
    "username": "..."
  }
}
```

---

## 👤 Candidate Management

### 📥 POST `/candidates/create`

**Frontend:** Triggered on candidate form submission.

**Form Data:**

- `name`
- `email`
- `phone`
- `resume` (File upload)

**Headers:** `multipart/form-data`

**Response:**

```json
{
  "message": "Candidate added successfully",
  "candidate": { ... }
}
```

---

### 📄 GET `/candidates`

**Frontend:** Called on dashboard to list candidates.

**Response:**

```json
[
  {
    "_id": "...",
    "name": "...",
    "email": "...",
    "resume": "...",
    ...
  }
]
```

---

### ❌ DELETE `/candidates/:id`

**Frontend:** Used when deleting a candidate.

**Response:**

```json
{
  "message": "Candidate deleted successfully"
}
```

---

## 🧑‍💼 Employee Management

### 📥 POST `/employees/create`

**Frontend:** Converts selected candidate into an employee.

**Request Body:**

```json
{
  "name": "...",
  "email": "...",
  "phone": "..."
}
```

**Response:**

```json
{
  "message": "Employee added successfully",
  "employee": { ... }
}
```

---

### 📄 GET `/employees`

**Frontend:** Display employee list.

**Response:**

```json
[
  {
    "_id": "...",
    "name": "...",
    "email": "...",
    ...
  }
]
```

---

### ❌ DELETE `/employees/:id`

**Frontend:** Triggered on delete button in EmployeeTable.

**Response:**

```json
{
  "message": "Employee deleted successfully"
}
```

---

## 📅 Attendance Records

### 📄 GET `/attendance`

**Frontend:** (Optional Feature) View all employee attendance logs.

**Response:**

```json
[
  {
    "_id": "...",
    "employeeId": "...",
    "status": "Present",
    "date": "..."
  }
]
```

---

## ☁️ Cloudinary Integration (Resume Upload)

**Backend:** Resumes are uploaded to Cloudinary using the Node.js SDK.

**Steps:**

1. Resume is received via `POST /candidates/create`
2. Resume file is uploaded to Cloudinary using:

```js
cloudinary.uploader.upload(req.file.path, options);
```

3. The resulting secure URL is saved in the database under `candidate.resume`

**Example Response:**

```json
{
  "resume": "https://res.cloudinary.com/your-cloud-name/raw/upload/v171xxxx/resume.pdf"
}
```

**Cloudinary Config (usually in backend config):**

```js
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

> Be sure to set these credentials in `.env` file of backend.

---

## 🔐 Protected Routes Note

All `POST`, `DELETE` and some `GET` endpoints are JWT-protected.
Use in frontend:

```js
axios.get("/api/employees", {
  headers: { Authorization: `Bearer ${token}` },
});
```

---

## 🧪 Testing the API (Postman / Thunder Client)

- Register and Login to get the token
- Add Authorization header: `Bearer <your_token>`
- Test file uploads using form-data

---

## 📁 Upload Folder (Backup)

Uploaded resumes are saved temporarily in:

```
/Backend/uploads/
```

---

## 🧑‍💻 Contributors


---

## 📌 To Do (Enhancements)

- ✅ Add validation feedback for failed uploads
- ⏳ Add search/filter for candidates/employees
- ⏳ Add employee attendance recording feature
- ✅ Separate API response error logging in frontend

---

> This file is editable and meant to evolve as your project grows.

## 🛠️ Possible Enhancements

Here are some additional enhancements that could improve the project:

- ⏳ **Role-Based Access Control (RBAC):** Implement user roles (e.g., Admin, Manager, Employee) to restrict access to certain features.
- ⏳ **Pagination:** Add pagination for candidate and employee lists to improve performance with large datasets.
- ⏳ **Export Data:** Allow exporting candidate and employee data to CSV or Excel for reporting purposes.
- ⏳ **Email Notifications:** Send email notifications to candidates upon successful registration or status updates.
- ⏳ **Dark Mode:** Add a toggle for dark mode to enhance user experience.
- ⏳ **Unit Testing:** Add unit and integration tests for both frontend and backend to ensure reliability.
- ⏳ **Error Monitoring:** Integrate tools like Sentry for real-time error tracking and debugging.
- ⏳ **Multi-Language Support:** Add support for multiple languages to make the platform accessible to a wider audience.
- ⏳ **Attendance Analytics:** Provide visual analytics (charts/graphs) for attendance trends.

These enhancements can be prioritized based on project requirements and user feedback.

📝 License
This project is licensed under the MIT License.
Copyright (c) 2025 Sachin Shaw
