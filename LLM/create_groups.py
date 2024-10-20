from flask import Flask, jsonify, request
import numpy as np
from itertools import combinations

app = Flask(__name__)

def complementary_score(group, people):
    skills = np.array([people[name] for name in group])
    return np.std(skills, axis=0).sum()

@app.route('/group_students', methods=['POST'])
def group_students():
    data = request.json
    people = data['people']

    # Generate all possible groups of 4
    all_groups = list(combinations(people.keys(), 4))

    # Sort groups by their complementary score (higher is better)
    sorted_groups = sorted(all_groups, key=lambda g: complementary_score(g, people), reverse=True)

    # Select the top non-overlapping groups
    final_groups = []
    used_people = set()

    for group in sorted_groups:
        if not any(person in used_people for person in group):
            final_groups.append(list(group))
            used_people.update(group)
            if len(used_people) >= len(people) - 3:
                break

    # Distribute remaining people
    remaining_people = list(set(people.keys()) - used_people)

    if len(remaining_people) == 1:
        best_group = max(final_groups, key=lambda g: complementary_score(g + remaining_people, people))
        best_group.extend(remaining_people)
    else:
        for person in remaining_people:
            best_group = max(final_groups, key=lambda g: complementary_score(g + [person], people))
            best_group.append(person)

    # Format the groups for JSON response
    formatted_groups = [
        {
            "group_number": i,
            "members": [{"name": person, "skills": people[person]} for person in group]
        }
        for i, group in enumerate(final_groups, 1)
    ]

    return jsonify({"groups": formatted_groups})

if __name__ == '__main__':
    app.run(debug=True, port=8080)