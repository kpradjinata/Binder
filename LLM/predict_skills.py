import pandas as pd
from pyBKT.models import Model

# Load your existing CSV file
data_path = 'student_data.csv'
data = pd.read_csv(data_path)
print(f"Data loaded from '{data_path}'")

print("\nFirst few rows of the data:")
print(data.head())
print("\nColumn names:")
print(data.columns)

# Initialize and fit the model
model = Model()
model.fit(data=data)
print("Model fitted to data successfully")

# Make predictions
predictions = model.predict(data=data)
print("Predictions made successfully")

# Function to analyze mastery
def analyze_mastery(predictions, mastery_threshold=0.8):
    latest_predictions = predictions.groupby(['user_id', 'skill_name']).last().reset_index()
    latest_predictions['mastered'] = latest_predictions['correct'] >= mastery_threshold
    student_mastery = latest_predictions.groupby('user_id')['mastered'].mean()
    skill_mastery = latest_predictions.groupby('skill_name')['mastered'].mean()
    return student_mastery, skill_mastery

# Analyze mastery
student_mastery, skill_mastery = analyze_mastery(predictions)

print("\nAverage mastery probability by student:")
print(student_mastery)

print("\nProportion of students who mastered each skill:")
print(skill_mastery)

# Function to get skills a specific student needs to work on
def skills_to_improve(student_id, predictions, mastery_threshold=0.8):
    student_preds = predictions[predictions['user_id'] == student_id]
    latest_preds = student_preds.groupby('skill_name').last()
    return latest_preds[latest_preds['correct'] < mastery_threshold].index.tolist()

# Example: Get skills to improve for a specific student
student_id = data['user_id'].iloc[0]  # Use the first student ID in the data
skills_needed = skills_to_improve(student_id, predictions)
print(f"\nSkills student {student_id} needs to improve:")
print(skills_needed)

# Optional: Perform cross-validation
try:
    cv_results = model.crossvalidate(data=data, folds=5)
    print("\nCross-validation results:")
    print(cv_results)
except Exception as e:
    print(f"Error performing cross-validation: {e}")
