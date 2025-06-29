Healthcare Appointment System – Backend Setup Guide
📁 Project Structure

backend/
│
├── .env                         # Environment variables (PORT, DB URI, JWT_SECRET)
├── index.js                     # Server entry point
├── package.json                 # Dependencies and scripts
├── config/                      # DB connection (not shown but typically here)
├── controllers/                # Request handlers
│   ├── adminC.js               # Admin-related operations
│   ├── doctorC.js              # Doctor operations
│   └── userC.js                # User-related operations
├── middlewares/
│   └── authMiddleware.js       # JWT auth protection middleware
├── routes/
│   ├── adminRoutes.js          # Admin routes (manage users, doctors)
│   ├── doctorRoutes.js         # Doctor-specific endpoints
│   └── userRoutes.js           # User-facing routes (register, login, apply)
├── schemas/
│   ├── appointmentModel.js     # Mongoose schema for appointments
│   ├── docModel.js             # Mongoose schema for doctors
│   └── userModel.js            # Mongoose schema for users
├── uploads/                    # File upload directory (e.g., profile photos)
└── .gitignore

🚀 Key Features
•	• User Management: Registration, login, role-based access
•	• Doctor Applications: Users can apply; Admin can approve/reject
•	• Appointments: Users can book appointments, Doctors can respond
•	• Protected APIs: Middleware-based JWT auth checks
•	• Admin Controls: Manage all users and doctors


▶️ Steps to Run the Backend
1.	Go to the backend folder:
cd backend
2.	Install dependencies:
npm install
3.	Set environment variables

Update your credentials in `.env` file (already present) :

        PORT=8001
        MONGO_URI=mongodb://localhost:27017/your_database_name
        JWT_SECRET=your_jwt_secret_key

4.	Run the server:
        node index.js


             
