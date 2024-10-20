import pandas as pd
import numpy as np
from pyBKT.models import Model
from itertools import combinations
from flask import Flask, request, jsonify
from flask_cors import CORS
import io

app = Flask(__name__)

CORS(app)

# def process_skill_csv(file):
#     data = pd.read_csv(file)
#     model = Model()
#     model.fit(data=data)
#     predictions = model.predict(data=data)
#     return predictions

# def analyze_mastery(predictions, mastery_threshold=0.8):
#     latest_predictions = predictions.groupby(['user_id', 'skill_name']).last().reset_index()
#     latest_predictions['mastered'] = latest_predictions['correct'] >= mastery_threshold
#     student_mastery = latest_predictions.groupby('user_id')['correct'].mean()
#     return student_mastery

# def complementary_score(group, people):
#     skills = np.array([people[name] for name in group])
#     return np.std(skills, axis=0).sum()

# @app.route('/group_students', methods=['POST'])
# def group_students():
#     if 'skill1' not in request.files or 'skill2' not in request.files or 'skill3' not in request.files:
#         return jsonify({"error": "Missing one or more skill CSV files"}), 400

#     skill_files = [request.files['skill1'], request.files['skill2'], request.files['skill3']]
#     skills = [{} for _ in range(3)]

#     for i, file in enumerate(skill_files):
#         predictions = process_skill_csv(file)
#         student_mastery = analyze_mastery(predictions)
        
#         for student in predictions['user_id'].unique():
#             skills[i][student] = student_mastery[student]

#     people = {
#         name: [skills[0][name], skills[1][name], skills[2][name]]
#         for name in skills[0].keys()
#     }

#     all_groups = list(combinations(people.keys(), 4))
#     sorted_groups = sorted(all_groups, key=lambda g: complementary_score(g, people), reverse=True)

#     final_groups = []
#     used_people = set()

#     for group in sorted_groups:
#         if not any(person in used_people for person in group):
#             final_groups.append(list(group))
#             used_people.update(group)
#             if len(used_people) >= len(people) - 3:
#                 break

#     remaining_people = list(set(people.keys()) - used_people)

#     if len(remaining_people) == 1:
#         best_group = max(final_groups, key=lambda g: complementary_score(g + remaining_people, people))
#         best_group.extend(remaining_people)
#     else:
#         for person in remaining_people:
#             best_group = max(final_groups, key=lambda g: complementary_score(g + [person], people))
#             best_group.append(person)

#     result = []
#     for i, group in enumerate(final_groups, 1):
#         group_data = {
#             "group_number": i,
#             "members": [{"name": person, "skills": people[person]} for person in group]
#         }
#         result.append(group_data)

#     return jsonify(result)


# @app.route('/group_students', methods=['POST'])
# def group_students():
#     # Expect JSON data in the request with three lists of lists
#     data = request.json
#     if not data or len(data) != 3:
#         return jsonify({"error": "Invalid JSON data. Expected three lists of lists."}), 400

#     skills = [{} for _ in range(3)]

#     for skill_index, skill_data in enumerate(data):
#         # Convert JSON data to DataFrame
#         df = pd.DataFrame(skill_data)
#         df.columns = ['user_id', 'correct']  # Rename columns to match pyBKT expectations
        
#         # Process skill data using pyBKT
#         model = Model()
#         model.fit(data=df)
#         predictions = model.predict(data=df)
        
#         # Analyze mastery
#         student_mastery = analyze_mastery(predictions)
        
#         for student_id, mastery in student_mastery.items():
#             if student_id not in skills[skill_index]:
#                 skills[skill_index][student_id] = mastery

#     people = {}
#     for student_id in skills[0].keys():
#         people[student_id] = [skills[0].get(student_id, 0),
#                               skills[1].get(student_id, 0),
#                               skills[2].get(student_id, 0)]

#     # The rest of the grouping logic remains the same
#     all_groups = list(combinations(people.keys(), 4))
#     sorted_groups = sorted(all_groups, key=lambda g: complementary_score(g, people), reverse=True)

#     final_groups = []
#     used_people = set()

#     for group in sorted_groups:
#         if not any(person in used_people for person in group):
#             final_groups.append(list(group))
#             used_people.update(group)
#             if len(used_people) >= len(people) - 3:
#                 break

#     remaining_people = list(set(people.keys()) - used_people)

#     if len(remaining_people) == 1:
#         best_group = max(final_groups, key=lambda g: complementary_score(g + remaining_people, people))
#         best_group.extend(remaining_people)
#     else:
#         for person in remaining_people:
#             best_group = max(final_groups, key=lambda g: complementary_score(g + [person], people))
#             best_group.append(person)

#     result = []
#     for i, group in enumerate(final_groups, 1):
#         group_data = {
#             "group_number": i,
#             "members": [{"name": person, "skills": people[person]} for person in group]
#         }
#         result.append(group_data)

#     return jsonify(result)


def process_skill_data(skill_data):
    df = pd.DataFrame(skill_data)
    
    required_columns = ['studentId', 'questionIndex', 'isCorrect']
    if not all(col in df.columns for col in required_columns):
        raise ValueError(f"Input data must contain these columns: {required_columns}")
    
    df = df.rename(columns={
        'studentId': 'user_id',
        'questionIndex': 'skill_name',
        'isCorrect': 'correct'
    })
    df['correct'] = pd.to_numeric(df['correct'])
    df['skill_name'] = df['skill_name'].astype(str)
    
    model = Model()
    model.fit(data=df)
    predictions = model.predict(data=df)
    
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
    data = request.json
    if not isinstance(data, list) or len(data) != 3:
        return jsonify({"error": "Invalid JSON data. Expected a list of three elements."}), 400

    skills = [{} for _ in range(3)]

    for i, skill_data in enumerate(data):
        try:
            predictions = process_skill_data(skill_data)
            student_mastery = analyze_mastery(predictions)
            
            for student in predictions['user_id'].unique():
                skills[i][student] = student_mastery[student]
        except Exception as e:
            return jsonify({"error": f"Error processing skill {i + 1}: {str(e)}"}), 400

    people = {
        name: [skills[0].get(name, 0), skills[1].get(name, 0), skills[2].get(name, 0)]
        for name in set(skills[0].keys()) | set(skills[1].keys()) | set(skills[2].keys())
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