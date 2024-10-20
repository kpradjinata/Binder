import pandas as pd
import numpy as np
from pyBKT.models import Model
from itertools import combinations
from flask import Flask, request, jsonify
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
    return student_mastery

def complementary_score(group, people):
    skills = np.array([people[name] for name in group])
    return np.std(skills, axis=0).sum()

@app.route('/group_students', methods=['POST'])
def group_students():
    if 'skill1' not in request.files or 'skill2' not in request.files or 'skill3' not in request.files:
        return jsonify({"error": "Missing one or more skill CSV files"}), 400

    skill_files = [request.files['skill1'], request.files['skill2'], request.files['skill3']]
    skills = [{} for _ in range(3)]

    for i, file in enumerate(skill_files):
        predictions = process_skill_csv(file)
        student_mastery = analyze_mastery(predictions)
        
        for student in predictions['user_id'].unique():
            skills[i][student] = student_mastery[student]

    people = {
        name: [skills[0][name], skills[1][name], skills[2][name]]
        for name in skills[0].keys()
    }

    all_groups = list(combinations(people.keys(), 4))
    sorted_groups = sorted(all_groups, key=lambda g: complementary_score(g, people), reverse=True)

    final_groups = []
    used_people = set()

    for group in sorted_groups:
        if not any(person in used_people for person in group):
            final_groups.append(list(group))
            used_people.update(group)
            if len(used_people) >= len(people) - 3:
                break

    remaining_people = list(set(people.keys()) - used_people)

    if len(remaining_people) == 1:
        best_group = max(final_groups, key=lambda g: complementary_score(g + remaining_people, people))
        best_group.extend(remaining_people)
    else:
        for person in remaining_people:
            best_group = max(final_groups, key=lambda g: complementary_score(g + [person], people))
            best_group.append(person)

    result = []
    for i, group in enumerate(final_groups, 1):
        group_data = {
            "group_number": i,
            "members": [{"name": person, "skills": people[person]} for person in group]
        }
        result.append(group_data)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port = 5001)