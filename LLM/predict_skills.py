import pandas as pd
from pyBKT.models import Model

def process_skill_csv(file_path):
    data = pd.read_csv(file_path)
    print(f"\nData loaded from '{file_path}'")

    model = Model()
    model.fit(data=data)
    print(f"Model fitted to data from {file_path}")

    predictions = model.predict(data=data)
    print(f"Predictions made for {file_path}")

    return predictions

def analyze_mastery(predictions, mastery_threshold=0.8):
    latest_predictions = predictions.groupby(['user_id', 'skill_name']).last().reset_index()
    latest_predictions['mastered'] = latest_predictions['correct'] >= mastery_threshold
    student_mastery = latest_predictions.groupby('user_id')['correct'].mean()
    skill_mastery = latest_predictions.groupby('skill_name')['mastered'].mean()
    return student_mastery, skill_mastery

def skills_to_improve(student_id, predictions, mastery_threshold=0.6):
    student_preds = predictions[predictions['user_id'] == student_id]
    latest_preds = student_preds.groupby('skill_name').last()
    return latest_preds[latest_preds['correct'] < mastery_threshold].index.tolist()

# Process each skill CSV
skill_files = ['skill1.csv', 'skill2.csv', 'skill3.csv']
skill1 = {'Brenton' : 0, 'David': 0, 'Kevin' : 0, 'Ryan': 0} 
skill2 = {'Brenton' : 0, 'David': 0, 'Kevin' : 0, 'Ryan': 0} 
skill3 = {'Brenton' : 0, 'David': 0, 'Kevin' : 0, 'Ryan': 0} 

skills = {1: skill1, 2: skill2, 3: skill3}

for i, file in enumerate(skill_files, 1):
    predictions = process_skill_csv(file)
    
    # Analyze mastery for this skill
    student_mastery, skill_mastery = analyze_mastery(predictions)

    print(f"\nResults for Skill {i}:")
    print("\nAverage mastery probability by student:")
    print(student_mastery)

    students = predictions['user_id'].unique()
    for student in students:
      skills[i][student] = student_mastery[student]
    '''
    print(f"\nProportion of students who mastered Skill {i}:")
    print(skill_mastery)
    '''
    # Get skills to improve for each student
    '''
    students = predictions['user_id'].unique()
    for student in students:
        if student_mastery[student] < 0.6:
            print(f"\nStudent {student} needs to improve in Skill {i}")
        else:
            print(f"\nStudent {student} has mastered Skill {i}")

    # Optional: Perform cross-validation for this skill
    '''
    '''
    try:
        cv_results = model.crossvalidate(data=predictions, folds=5)
        print(f"\nCross-validation results for Skill {i}:")
        print(cv_results)
    except Exception as e:
        print(f"Error performing cross-validation for Skill {i}: {e}")
    '''

#match highest and lowest, second highest lowest, etc. 
#add 1 count for this pair

#do for all three skills
#return pairings that produce the highest counts
print(skill1)
print(skill2)
print(skill3)



# The following sections can be implemented as needed:
'''
# fetch user id through api
# format skills as list
# push list to convex database
# perform vector search for similar users
'''