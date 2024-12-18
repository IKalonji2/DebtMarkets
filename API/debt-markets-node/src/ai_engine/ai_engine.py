import json
import os
import sys
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import camelot # type: ignore


# Preprocess lender-submitted portfolio CSV
def preprocess_portfolio_csv(file_path):
    data = pd.read_csv(file_path)
    data = data.fillna(0)

    required_columns = ['loan_amount', 'repayment_rate', 'default_history', 'income_level', 'credit_score']
    for col in required_columns:
        if col not in data.columns:
            raise ValueError(f"Missing required column: {col}")

    # Ensure numeric
    for col in required_columns:
        data[col] = pd.to_numeric(data[col], errors='coerce').fillna(0)

    features = data[required_columns]
    target = data['repayment_probability'] if 'repayment_probability' in data else None
    return features, target


# Preprocess recovery statement PDF using Camelot
def preprocess_recovery_pdf(file_path):
    try:
        # Extract tables using Camelot
        tables = camelot.read_pdf(file_path, pages="all", flavor="stream")
        if not tables:
            raise ValueError("No tables found in the PDF.")

        pdf_data = tables[0].df  # Assuming first table contains relevant data
        pdf_data.columns = ["Portfolio", "Recovered Amount", "Target Amount", 
                            "Collection Effort", "Time Taken", "Status"]

        # Clean the dataframe
        pdf_data = pdf_data.fillna(0)
        numeric_columns = ["Recovered Amount", "Target Amount", "Collection Effort", "Time Taken"]
        for col in numeric_columns:
            pdf_data[col] = pd.to_numeric(pdf_data[col], errors='coerce').fillna(0)

        return pdf_data

    except Exception as e:
        raise ValueError(f"Failed to parse recovery PDF: {e}") from e


# Train model for lender portfolios
def train_portfolio_model(training_data_path):
    features, target = preprocess_portfolio_csv(training_data_path)
    if target is None:
        raise ValueError("Training data must include 'repayment_probability' column as the target.")

    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)

    # Save metrics and models
    metrics = {"accuracy": accuracy, "model_version": "1.0"}
    with open("training_metrics.json", "w") as metrics_file:
        json.dump(metrics, metrics_file)

    joblib.dump(model, 'loan_evaluation_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')

    print("Model trained successfully. Accuracy:", accuracy)


# Evaluate lender portfolio
def evaluate_portfolio(file_path, file_type="csv"):
    try:
        if file_type.lower() != "csv":
            raise ValueError("Only CSV supported for portfolio evaluation.")

        features, _ = preprocess_portfolio_csv(file_path)
        data = pd.read_csv(file_path)
        # Risk and token value calculations
        predictions = [1 if rate > 0.5 else 0 for rate in data['repayment_rate']]
        probabilities = [0.6 if pred == 1 else 0.4 for pred in predictions]

        risk_categories = {'low': 0, 'medium': 0, 'high': 0}
        for prob in probabilities:
            if prob <= 0.33:
                risk_categories['low'] += 1
            elif 0.33 < prob <= 0.66:
                risk_categories['medium'] += 1
            else:
                risk_categories['high'] += 1

        portfolio_value = data['loan_amount'].sum()

        return {
            'portfolioValue': int(portfolio_value),
            'riskDistribution': risk_categories,
            'predictions': predictions,
            'probabilities': probabilities,
            'rating': 'A' if data['income_level'].mean() > 50000 else 'B',
            'tokenValue': float(portfolio_value / 100),
            'numTokens': 100,
            'loans': data.to_dict('records'),
        }
    except Exception as e:
        return {'error': str(e)}


# Evaluate recovery statement
def evaluate_recovery_report(file_path, file_type="pdf"):
    try:
        if file_type.lower() == "pdf":
            data = preprocess_recovery_pdf(file_path)
        else:
            raise ValueError("Only PDF supported for recovery evaluation.")

        # Calculations
        total_recovered = data["Recovered Amount"].sum()
        target_amount = data["Target Amount"].sum()
        recovery_effort = data["Collection Effort"].mean()
        recovery_time = data["Time Taken"].mean()

        success_probability = 0.8 if total_recovered >= target_amount else 0.5

        return {
            "totalRecovered": float(total_recovered),
            "targetAmount": float(target_amount),
            "averageEffort": float(recovery_effort),
            "averageTime": float(recovery_time),
            "successProbability": success_probability,
            "recommendation": "Hold" if success_probability > 0.6 else "Sell",
        }
    except Exception as e:
        return {'error': str(e)}


# Main function to evaluate both types
if __name__ == "__main__":
    file_path = sys.argv[1]
    file_type = sys.argv[2] if len(sys.argv) > 2 else "csv"
    file_category = sys.argv[3] if len(sys.argv) > 3 else "portfolio"  # 'portfolio' or 'recovery'

    if file_category == "portfolio":
        result = evaluate_portfolio(file_path, file_type)
    elif file_category == "recovery":
        result = evaluate_recovery_report(file_path, file_type)
    else:
        result = {"error": "Invalid file category. Use 'portfolio' or 'recovery'."}

    print(json.dumps(result, indent=4))
