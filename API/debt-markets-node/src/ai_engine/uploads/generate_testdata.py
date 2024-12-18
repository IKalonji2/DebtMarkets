import pandas as pd
import numpy as np
from reportlab.lib.pagesizes import letter # type: ignore
from reportlab.pdfgen import canvas # type: ignore

def generate_portfolio_data(n_samples=1000, output_file="training_data.csv"):
    data = {
        'loan_amount': np.random.randint(1000, 50000, n_samples),
        'repayment_rate': np.random.uniform(0.5, 1.0, n_samples),
        'default_history': np.random.randint(0, 5, n_samples),
        'income_level': np.random.randint(20000, 100000, n_samples),
        'credit_score': np.random.randint(300, 850, n_samples),
        'repayment_probability': np.random.choice([0, 1], n_samples, p=[0.3, 0.7])  # 30% default rate
    }
    df = pd.DataFrame(data)
    df.to_csv(output_file, index=False)
    print(f"Portfolio training data generated successfully: {output_file}")

def generate_recovery_data(n_samples=100, output_pdf="recovery_test_data.pdf"):
    recovery_data = {
        "Portfolio": [f"{i+1}" for i in range(n_samples)],
        "Recovered Amount": np.random.randint(1000, 50000, n_samples),
        "Target Amount": np.random.randint(2000, 60000, n_samples),
        "Collection Effort": np.random.randint(5, 30, n_samples),  # Number of efforts
        "Time Taken": np.random.randint(1, 12, n_samples),  # Months
        "Status": np.random.choice(["Recovered", "Partial", "Defaulted"], n_samples, p=[0.6, 0.3, 0.1])
    }

    df = pd.DataFrame(recovery_data)
    print("Recovery data generated successfully.")

    pdf = canvas.Canvas(output_pdf, pagesize=letter)
    pdf.setFont("Helvetica", 12)
    pdf.drawString(100, 750, "Recovery Test Data")
    
    col_widths = [35, 35, 35, 30, 30, 30]
    headers = list(recovery_data.keys())
    y_position = 730
    for i, header in enumerate(headers):
        pdf.drawString(100 + sum(col_widths[:i]), y_position, header)
    
    y_position -= 20
    for _, row in df.iterrows():
        for i, value in enumerate(row):
            pdf.drawString(100 + sum(col_widths[:i]), y_position, str(value))
        y_position -= 20

    pdf.save()
    print(f"Recovery test data saved successfully as PDF: {output_pdf}")


if __name__ == "__main__":
    generate_portfolio_data(n_samples=1000, output_file="training_data.csv")
    
    generate_recovery_data(n_samples=100, output_pdf="recovery_test_data.pdf")
