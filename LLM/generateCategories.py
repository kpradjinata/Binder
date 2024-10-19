import os
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
    # Extract text from PDF
    pdf_text = extract_text_from_pdf(pdf_path)
    
    # Prepare messages for the API call
    messages = [
        {"role": "system", "content": "You are a helpful assistant that analyzes PDF content."},
        {"role": "user", "content": f"{prompt}\n\nPDF Content:\n{pdf_text}"} 
    ]
    
    # Call the OpenAI API
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",  # Using the latest model as of October 2024
        messages=messages,
        max_tokens=500
    )
    
    return response.choices[0].message.content
# Example usage
pdf_path = "/Users/brentono/Binder/LLM/ExampleSyllabus.pdf"
analysis_prompt = "Use this syllabus to generate 3 distinct hard skills someone would need to succeed in this course. Ex For software development: [Frontend, Backend, Databases]. Return the result as an array."

result = analyze_pdf(pdf_path, analysis_prompt)
print(result)
