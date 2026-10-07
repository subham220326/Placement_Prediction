from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np

# 1. Initialize FastAPI app
app = FastAPI(title="Student Placement Prediction API", version="1.0")

# Enable CORS so your React frontend can talk to it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load your trained model and scaler once when the server starts
# (Make sure 'placement_model.pkl' is in the same folder as app.py)
model = joblib.load('placement_model.pkl')
# scaler = joblib.load('scaler.pkl') # Uncomment if you used a scaler during training

# 3. Define the incoming data structure for CGPA and IQ
class PlacementInput(BaseModel):
    cgpa: float = Field(..., ge=0.0, le=10.0, description="CGPA between 0 and 10")
    iq: float = Field(..., ge=0.0, description="IQ score")

@app.get("/")
def home():
    return {"message": "Student Placement Prediction API is running!"}

@app.post("/predict")
def predict_placement(data: PlacementInput):
    print("RECEIVED DATA:", data) # <-- Add this line
    try:
        # Extract features into the 2D array shape your model expects
        input_data = np.array([[data.cgpa, data.iq]])
        
        # If you used a scaler during training, transform your inputs:
        # input_data = scaler.transform(input_data)
        
        # Make real predictions using your loaded model
        prediction = int(model.predict(input_data)[0]) # 1 for Placed, 0 for Not Placed
        probability = float(model.predict_proba(input_data)[0][1]) # Probability of being placed
        
        # Format the result nicely for your frontend
        placement_text = "Placed 🎉" if prediction == 1 else "Not Placed ❌"

        return {
            "success": True,
            "placement_status": placement_text,
            "probability": probability
        }
        
    except Exception as e:
        return {"success": False, "error": str(e)}