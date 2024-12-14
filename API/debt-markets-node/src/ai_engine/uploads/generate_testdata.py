import pandas as pd
import numpy as np

# Define dataset size
n_samples = 1000

# Generate synthetic data
data = {
    'loan_amount': np.random.randint(1000, 50000, n_samples),
    'repayment_rate': np.random.uniform(0.5, 1.0, n_samples),
    'default_history': np.random.randint(0, 5, n_samples),
    'income_level': np.random.randint(20000, 100000, n_samples),
    'credit_score': np.random.randint(300, 850, n_samples),
    'repayment_probability': np.random.choice([0, 1], n_samples, p=[0.3, 0.7])  # 30% default rate
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv('training_data.csv', index=False)
print("Training data generated successfully.")
