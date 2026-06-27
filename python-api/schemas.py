from typing import Optional

from pydantic import BaseModel, Field


class LoanApplicationInput(BaseModel):
    Applicant_Income: float = Field(..., gt=0, description="Monthly/annual applicant income")
    Coapplicant_Income: float = Field(0, ge=0)
    Employment_Status: str = Field(..., description="Salaried | Self-employed | Contract | Unemployed")
    Age: float = Field(..., gt=0)
    Marital_Status: str = Field(..., description="Married | Single")
    Dependents: float = Field(0, ge=0)
    Credit_Score: float = Field(..., gt=0)
    Existing_Loans: float = Field(0, ge=0)
    DTI_Ratio: float = Field(..., ge=0, description="Debt-to-income ratio, e.g. 0.35")
    Savings: float = Field(0, ge=0)
    Collateral_Value: float = Field(0, ge=0)
    Loan_Amount: float = Field(..., gt=0)
    Loan_Term: float = Field(..., gt=0, description="In months")
    Loan_Purpose: str = Field(..., description="Personal | Car | Business | Home | Education")
    Property_Area: str = Field(..., description="Urban | Semiurban | Rural")
    Education_Level: str = Field(..., description="Graduate | Not Graduate")
    Gender: str = Field(..., description="Male | Female")
    Employer_Category: str = Field(..., description="Private | Government | Unemployed | MNC | Business")

    class Config:
        json_schema_extra = {
            "example": {
                "Applicant_Income": 12000,
                "Coapplicant_Income": 3000,
                "Employment_Status": "Salaried",
                "Age": 34,
                "Marital_Status": "Married",
                "Dependents": 1,
                "Credit_Score": 720,
                "Existing_Loans": 1,
                "DTI_Ratio": 0.32,
                "Savings": 15000,
                "Collateral_Value": 25000,
                "Loan_Amount": 20000,
                "Loan_Term": 48,
                "Loan_Purpose": "Home",
                "Property_Area": "Urban",
                "Education_Level": "Graduate",
                "Gender": "Female",
                "Employer_Category": "Private",
            }
        }


class ModelPrediction(BaseModel):
    model: str
    prediction: str
    probabilities: Optional[dict] = None


class PredictionResponse(BaseModel):
    predictions: dict[str, ModelPrediction]
    recommended_model: str
    final_decision: str
    selection_criterion: str
