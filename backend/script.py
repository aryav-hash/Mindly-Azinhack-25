import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# API Communication
def get_ai_response(user_message):
    try:
        prompt = f"""You are a supportive and empathetic mental health chatbot.
        
User: {user_message}

Respond with care and empathy."""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"[Error] {str(e)}"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message.strip():
        return jsonify({'error': 'Empty message'}), 400
    
    bot_response = get_ai_response(user_message)
    return jsonify({'response': bot_response})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)