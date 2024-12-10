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

    features = data[['outstandingAmount', 'borrowersCount', 'defaultHistory', 'loanDuration']]
    target = data['riskCategory']
    
    return features, target

def train_model(training_data_path):
    features, target = preprocess_data(training_data_path)
    
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    print("Model Accuracy:", accuracy_score(y_test, y_pred))

    joblib.dump(model, 'loan_evaluation_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')

def evaluate_portfolio(file_path):
    model = joblib.load('loan_evaluation_model.pkl')
    scaler = joblib.load('scaler.pkl')

    features, _ = preprocess_data(file_path)
    features_scaled = scaler.transform(features)

    predictions = model.predict(features_scaled)
    probabilities = model.predict_proba(features_scaled)
    
    portfolio_value = features['outstandingAmount'].sum()
    risk_distribution = pd.Series(predictions).value_counts(normalize=True).to_dict()

    evaluation = {
        'portfolioValue': portfolio_value,
        'riskDistribution': risk_distribution,
        'predictions': predictions.tolist(),
        'probabilities': probabilities.tolist(),
    }
    
    return evaluation

if __name__ == "__main__":
    result = evaluate_portfolio('loan_portfolio.csv')
    print(result)
