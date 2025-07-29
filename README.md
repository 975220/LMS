
# 📚 Learning Management System (LMS)

This is a **full-featured MERN Stack-based Learning Management System (LMS)** 
That allows educators to publish courses and students to enroll, learn, and track their progress. It includes video previews, ratings, pricing, and a modern user dashboard.

---

## 🚀 Features

- 👨‍🏫 Educator Course Creation
- 🎓 Student Enrollment & Progress Tracking
- 🎥 Course Video Preview & Chapter-wise Content
- ⭐ Ratings & Reviews
- 💳 Pricing, Discounts, and Free Courses
- 🔐 Authentication with Clerk
- ⚙️ Admin & Dashboard Views
- 📱 Fully Responsive UI

---

## 🛠️ Tech Stack

### 🧠 Frontend

- **React.js** (with Hooks)
- **React Router DOM** (routing)
- **Tailwind CSS** (styling)
- **Axios** (API requests)
- **Clerk** (authentication)

### 🔧 Backend

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** (if Clerk not used for auth)
- **Multer / Cloudinary** (for file upload)

---

## 📁 Folder Structure

```
LMS-Project/
│
├── backend/                      # Backend server
│   ├── configs/                 # DB config, cloud storage, etc.
│   ├── controllers/            # Route handlers
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes
│   ├── middlewares/           # Auth & error handling
│   ├── utils/                  # Helper functions
│   ├── server.js               # App entry point
│   └── .env                    # Environment variables
│
├── frontend/                    # React frontend
│   ├── public/                 # Static assets
│   └── src/
│       ├── assets/             # Images, icons, dummy data
│       ├── components/         # Reusable UI components
│       ├── pages/              # Pages (Home, CourseDetails, etc.)
│       ├── context/            # Global context (AppContext)
│       ├── services/           # Axios API utilities
│       ├── App.js              # Root component
│       └── main.jsx            # Entry point
│
├── .gitignore
├── README.md
├── package.json (for root or monorepo)
└── LICENSE
```

---

## 💾 Environment Setup

### Backend `.env` example:

```
MONGODB_URI=mongodb://127.0.0.1:27017/lms
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

---

## ⚙️ Installation & Running the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/lms-project.git
cd lms-project
```

### 2️⃣ Start the Backend

```bash
npm install
npm run server 
# Runs on http://localhost:5000
```

### 3️⃣ Start the Frontend

```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 🧪 Dummy Data & Testing

You can use the `dummyCourses.js`, `dummyEducatorData.js`, and `dummyDashboardData.js` inside `/src/assets/` to simulate real data during development.

---

## 🌐 Deployment (Optional)

Coming soon... You can deploy:

- **Frontend** on [Vercel](https://vercel.com/)
- **Backend** on [Render](https://render.com/) or [Railway](https://railway.app/)
- **MongoDB** on [MongoDB Atlas](https://cloud.mongodb.com/)

--- 


---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙋‍♂️ Contributing

Pull requests are welcome! Please open issues for major changes.

---

## 📫 Contact

- **Developer**: Aditya Tiwari  
- **GitHub**: [@975220](https://github.com/975220)

---

## ✅ Ready to Publish

1. Save this file as `README.md` in your root folder.
2. Commit and push:

```bash
git add README.md
git commit -m "docs: add LMS README"
git push origin main
```
