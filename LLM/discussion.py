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

# Main execution
def main():
    pdf_path = "/Users/brentono/Binder/LLM/prob6.pdf"
    analysis_prompt = """
    Analyze this homework PDF and generate a hint for each question. Return the hints as an array of strings.
    Format the response as a JSON object with a single key "hints" whose value is the array of hints.
    Example format:
    {
        "hints": ["Hint for question 1", "Hint for question 2", "Hint for question 3"]
    }
    """

    print("Analyzing PDF...")
    result = analyze_pdf(pdf_path, analysis_prompt)
    
    if 'hints' in result:
        print("Generated hints:")
        for i, hint in enumerate(result['hints'], 1):
            print(f"Question {i}: {hint}")
    else:
        print("Error: Hints not found in the response")

if __name__ == "__main__":
    main()