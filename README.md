<div align="center">

# 🎓 Student Placement Prediction App

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Python](https://img.shields.io/badge/Python-3D84B8?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

*An end-to-end Machine Learning web application that predicts student placement status based on academic and cognitive metrics.*



</div>

---

## 🚀 About the Project

This project bridges the gap between data science experimentation and full-stack deployment. It takes a machine learning model trained in a Jupyter Notebook, serves it via a high-performance **FastAPI** backend, and provides a modern, responsive user interface built with **React (Vite)**.

Given a student's **CGPA** and **IQ score**, the model instantly classifies whether the student is likely to secure a placement or not, alongside the prediction confidence probability.

---

## 🛠️ Tech Stack

* **Machine Learning:** Python, Scikit-Learn, NumPy, Joblib, Jupyter Notebook
* **Backend API:** FastAPI, Uvicorn, Pydantic
* **Frontend UI:** React, JavaScript (ES6+), Modern CSS
* **Development Tools:** VS Code, Git & GitHub

---

## 📂 Project Structure

```text
PlacementPrediction/
├── frontend/               # React Vite Frontend Application
│   ├── src/
│   │   ├── App.jsx         # Main UI component & API integration
│   │   └── ...
│   └── package.json
├── app.py                  # FastAPI Backend Server
├── placement_model.pkl     # Trained Machine Learning Model
└── README.md               # Project Documentation
```

---

## ⚙️ Getting Started & Installation

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/PlacementPrediction.git
cd PlacementPrediction
```

### 2. Set Up the Backend (FastAPI)
Install the required Python dependencies:
```bash
pip install fastapi uvicorn pydantic joblib numpy scikit-learn
```

Make sure your trained model (`placement_model.pkl`) is in the root directory, then start the FastAPI server:
```bash
uvicorn app:app --reload
```
*The backend API will run at `http://localhost:8000` (Interactive docs available at `/docs`).*

### 3. Set Up the Frontend (React)
Open a new terminal window, navigate to the frontend folder, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
*The React app will open at `http://localhost:5173`.*

---

## 🧠 How It Works

1. **Model Training:** Data is processed and trained inside a Jupyter Notebook using classification algorithms (e.g., Logistic Regression / Random Forest). The trained model is serialized using `joblib`.
2. **API Endpoint:** FastAPI receives JSON payloads containing `cgpa` and `iq`, validates them using Pydantic, passes them through the pipeline, and returns prediction metrics.
3. **Frontend Dashboard:** React captures user input, communicates asynchronously via the Fetch API, and dynamically renders styled success/failure state cards with confidence scores.

---

## 👤 Author

**Subham**
* GitHub: [@Subham220326](https://github.com/subham220326)

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
