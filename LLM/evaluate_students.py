from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from pyBKT.models import Model
from itertools import combinations
import io

app = Flask(__name__)

def process_skill_csv(file):
    data = pd.read_csv(file)
    model = Model()
    model.fit(data=data)
    predictions = model.predict(data=data)
    return predictions

def analyze_mastery(predictions, mastery_threshold=0.8):
    latest_predictions = predictions.groupby(['user_id', 'skill_name']).last().reset_index()
    latest_predictions['mastered'] = latest_predictions['correct'] >= mastery_threshold
    student_mastery = latest_predictions.groupby('user_id')['correct'].mean()
    skill_mastery = latest_predictions.groupby('skill_name')['mastered'].mean()
    return student_mastery, skill_mastery

@app.route('/process_skills', methods=['POST'])
def process_skills():
    if 'files' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    files = request.files.getlist('files')
    if len(files) != 3:
        return jsonify({'error': 'Exactly 3 files are required'}), 400

    skills = {}
    for i, file in enumerate(files, 1):
        if file.filename == '':
            return jsonify({'error': f'No selected file for skill {i}'}), 400

        predictions = process_skill_csv(file)
        student_mastery, _ = analyze_mastery(predictions)
        skills[f'skills{i}'] = student_mastery.to_dict()

    return jsonify(skills)

if __name__ == '__main__':
    app.run(debug=True, port = 8100)