import os
import json
from openai import OpenAI
from PyPDF2 import PdfReader

# Set up OpenAI client
client = OpenAI(api_key=os.getenv('API_KEY'))

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def analyze_pdf(pdf_path, prompt):
    pdf_text = extract_text_from_pdf(pdf_path)
    
    messages = [
        {"role": "system", "content": "You are a helpful assistant that analyzes PDF content."},
        {"role": "user", "content": f"{prompt}\n\nPDF Content:\n{pdf_text}"}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
        max_tokens=500,
        temperature=0.2,  # Lower temperature for more deterministic output
        response_format={"type": "json_object"}  # Request JSON output
    )
    
    return json.loads(response.choices[0].message.content)

def generate_quiz(skills):
    prompt = """
    Create exactly 9 questions based on the following 3 skills:
    1. {skills[0]}
    2. {skills[1]}
    3. {skills[2]}
    
    Generate 3 questions for each skill. Format your response as a JSON object with the following structure:
    {{
        "skill1": [
            {{"question": "Question 1", "answer": "Answer 1"}},
            {{"question": "Question 2", "answer": "Answer 2"}},
            {{"question": "Question 3", "answer": "Answer 3"}}
        ],
        "skill2": [
            {{"question": "Question 1", "answer": "Answer 1"}},
            {{"question": "Question 2", "answer": "Answer 2"}},
            {{"question": "Question 3", "answer": "Answer 3"}}
        ],
        "skill3": [
            {{"question": "Question 1", "answer": "Answer 1"}},
            {{"question": "Question 2", "answer": "Answer 2"}},
            {{"question": "Question 3", "answer": "Answer 3"}}
        ]
    }}
    """
    
    messages = [
        {"role": "system", "content": prompt.format(skills=skills)},
        {"role": "user", "content": "Generate the quiz as specified."}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
        max_tokens=1000,
        temperature=0.2,  # Lower temperature for more deterministic output
        response_format={"type": "json_object"}  # Request JSON output
    )
    
    return json.loads(response.choices[0].message.content)

# Example usage
pdf_path = "/Users/brentono/Binder/LLM/ExampleSyllabus.pdf"
analysis_prompt = """
Analyze this syllabus and identify exactly 3 distinct hard skills someone would need to succeed in this course.
Return your response as a JSON object with the following structure:
{
    "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
"""

result = analyze_pdf(pdf_path, analysis_prompt)
print("Identified skills:", result['skills'])

quiz = generate_quiz(result['skills'])
print(quiz)