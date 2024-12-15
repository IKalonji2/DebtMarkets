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

def preprocess_data(file_path):
    data = pd.read_csv(file_path)
    
    data = data.fillna(0)

    features = data[['loan_amount', 'repayment_rate', 'default_history', 'income_level', 'credit_score']]
    target = data['repayment_probability'] 
    return features, target

import json

def train_model(training_data_path):
    features, target = preprocess_data(training_data_path)
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)

    metrics = {
        "accuracy": accuracy,
        "model_version": "1.0",
    }
    with open("training_metrics.json", "w") as metrics_file:
        json.dump(metrics, metrics_file)

    joblib.dump(model, 'loan_evaluation_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')

    print("Model Accuracy:", accuracy)


def evaluate_portfolio(file_path):
    try:
        data = pd.read_csv(file_path)
        
        data.columns = data.columns.str.lower().str.replace(' ', '_')

        required_columns = ['loan_amount', 'repayment_rate', 'default_history', 'income_level', 'credit_score']
        for col in required_columns:
            if col not in data.columns:
                raise ValueError(f'Missing required column: {col}')
        
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
        
        total_predictions = len(probabilities)
        risk_distribution = {
            category: count / total_predictions if total_predictions > 0 else 0.0
            for category, count in risk_categories.items()
        }

        portfolio_value = data['loan_amount'].sum()

        income_mean = data['income_level'].mean()
        credit_mean = data['credit_score'].mean()
        
        if income_mean > 50000 and credit_mean > 750:
            rating = 'A'
        elif 30000 < income_mean <= 50000 and 650 < credit_mean <= 750:
            rating = 'B'
        else:
            rating = 'C'

        # Example tokenization logic
        num_tokens = 100  # Default number of tokens
        token_value = portfolio_value / num_tokens

        result = {
            'portfolioValue': int(portfolio_value),
            'riskDistribution': {k: float(v) for k, v in risk_distribution.items()},
            'predictions': predictions,
            'probabilities': probabilities,
            'rating': rating,
            'tokenValue': float(token_value),
            'numTokens': int(num_tokens),
            'loans': data.to_dict('records')
        }

        def convert_numpy_objects(obj):
            if isinstance(obj, (np.int64, np.float64)):
                return obj.item()
            if isinstance(obj, list):
                return [convert_numpy_objects(item) for item in obj]
            if isinstance(obj, dict):
                return {k: convert_numpy_objects(v) for k, v in obj.items()}
            return obj

        return convert_numpy_objects(result)

    except Exception as e:
        return {'error': str(e)}

if __name__ == "__main__":
    file_path = sys.argv[1]  
    result = evaluate_portfolio(file_path)
    print(json.dumps(result))
