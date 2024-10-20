import os
import json
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from openai import OpenAI
from PyPDF2 import PdfReader

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max-limit

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
        {"role": "system", "content": "You are a helpful assistant that analyzes PDF content and generates hints for homework questions."},
        {"role": "user", "content": f"{prompt}\n\nPDF Content:\n{pdf_text}"}
    ]
    
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
        max_tokens=1000,
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

@app.route('/analyze_pdf', methods=['POST'])
def analyze_pdf_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.lower().endswith('.pdf'):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Analyze for skills
        skills_prompt = """
        Analyze this syllabus and identify exactly 3 distinct hard skills someone would need to succeed in this course.
        Return your response as a JSON object with the following structure:
        {
            "skills": ["Skill 1", "Skill 2", "Skill 3"]
        }
        """
        skills_result = analyze_pdf(file_path, skills_prompt)

        # Generate quiz
        quiz_data = generate_quiz(skills_result['skills'])
        questions, options, answers = format_quiz(quiz_data)

        # Generate hints
        hints_prompt = """
        Analyze this homework PDF and generate a hint for each question. Return the hints as an array of strings.
        Format the response as a JSON object with a single key "hints" whose value is the array of hints.
        Example format:
        {
            "hints": ["Hint for question 1", "Hint for question 2", "Hint for question 3"]
        }
        """
        hints_result = analyze_pdf(file_path, hints_prompt)

        os.remove(file_path)  # Remove the uploaded file after processing

        return jsonify({
            'questions': questions,
            'options': options,
            'answers': answers,
            'hints': hints_result['hints']
        })
    else:
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, port=8080)