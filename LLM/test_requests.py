import requests
import json

# URL of your Flask application
url = 'http://localhost:8080/analyze_pdf'

# Path to the PDF file you want to analyze
pdf_file_path = 'prob6.pdf'

# Open the PDF file
with open(pdf_file_path, 'rb') as pdf_file:
    # Create a dictionary of files to send
    files = {'file': ('prob6.pdf', pdf_file, 'application/pdf')}
    
    # Send the POST request
    response = requests.post(url, files=files)

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
else:
    print(f"Error: {response.status_code}")
    print(response.text)