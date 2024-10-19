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
        temperature=0.2,
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)

def generate_quiz(skills):
    prompt = """
    Create exactly 9 MULTIPLE CHOICE questions based on the following 3 skills:
    1. {skills[0]}
    2. {skills[1]}
    3. {skills[2]}
    
    Generate 3 questions for each skill. Each question should have 4 options (A, B, C, D) with one correct answer.
    Format your response as a JSON object with the following structure:
    {{
        "skill1": [
            {{
                "question": "Question text",
                "options": {{
                    "A": "Option A",
                    "B": "Option B",
                    "C": "Option C",
                    "D": "Option D"
                }},
                "correct_answer": "Correct option letter (A, B, C, or D)"
            }},
            // Two more questions for skill1
        ],
        "skill2": [
            // Three questions for skill2
        ],
        "skill3": [
            // Three questions for skill3
        ]
    }}
    Ensure all questions are relevant to the given skills and are challenging but fair.
    """
    
    messages = [
        {"role": "system", "content": prompt.format(skills=skills)},
        {"role": "user", "content": "Generate the multiple-choice quiz as specified."}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
        max_tokens=2000,
        temperature=0.3,
        response_format={"type": "json_object"}
    )
    
    return json.loads(response.choices[0].message.content)

def format_quiz(quiz_data):
    questions = []
    options = []
    answers = []

    for skill in ['skill1', 'skill2', 'skill3']:
        for question_data in quiz_data[skill]:
            questions.append(question_data['question'])
            options.append([
                question_data['options']['A'],
                question_data['options']['B'],
                question_data['options']['C'],
                question_data['options']['D']
            ])
            answers.append(question_data['correct_answer'])

    return questions, options, answers

# Main execution
pdf_path = "/Users/brentono/Binder/LLM/prob6.pdf"
analysis_prompt = """
Analyze this syllabus and identify exactly 3 distinct hard skills someone would need to succeed in this course.
Return your response as a JSON object with the following structure:
{
    "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
"""

result = analyze_pdf(pdf_path, analysis_prompt)
print("Identified skills:", result['skills'])

quiz_data = generate_quiz(result['skills'])
questions, options, answers = format_quiz(quiz_data)

print("Questions:", questions)
print("Options:", options)
print("Answers:", answers)