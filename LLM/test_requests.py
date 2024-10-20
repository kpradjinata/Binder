import requests
import json

# URL of your Flask application
url = 'http://localhost:8080/analyze_text'

# The text you want to analyze
text_to_analyze = """
Linear Algebra Homework Assignment
Problem 1: Matrix Operations
Given matrices A and B:
A = [2 -1 3]
[0 4 1]
[1 -2 5]
B = [1 0 -1]
[3 2 4]
[2 -1 0]
Calculate:
a) A + B
b) 3A - 2B
c) AB
Problem 2: Determinants
Find the determinant of the following matrix:
[3 1 -2]
[4 -2 5]
[1 6 3]
Problem 3: Inverse Matrix
Find the inverse of the following matrix, if it exists:
[2 1]
[3 -1]
Problem 4: Linear Transformations
Describe the geometric effect of the following linear transformation:
T(x, y) = (2x - y, x + y)
Problem 5: Eigenvalues and Eigenvectors
Find the eigenvalues and corresponding eigenvectors of the matrix:
[3 1]
[1 3]
Problem 6: Vector Spaces
Determine if the following set of vectors forms a basis for R³:
v₁ = (1, 0, 1)
v₂ = (0, 1, 1)
v₃ = (1, 1, 0)
Problem 7: Systems of Linear Equations
Solve the following system of linear equations using Gaussian elimination:
2x + y - z = 4
x - 3y + 2z = -1
3x + 2y + z = 5
Remember to show all your work and explain your reasoning for each problem.
"""

# Prepare the JSON payload
payload = {
    'text': text_to_analyze
}

# Send the POST request with JSON data
response = requests.post(url, json=payload)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    result = response.json()
    
    # Print the questions, options, and answers
    for i, (question, options, answer) in enumerate(zip(result['questions'], result['options'], result['answers']), 1):
        print(f"Question {i}: {question}")
        for j, option in enumerate(['A', 'B', 'C', 'D']):
            print(f"  {option}. {options[j]}")
        print(f"Correct Answer: {answer}\n")
    
    # Print the hints separately
    print("Hints:")
    for i, hint in enumerate(result['hints'], 1):
        print(f"Hint {i}: {hint}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)