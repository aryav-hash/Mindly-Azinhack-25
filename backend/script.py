import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

app = Flask(__name__)
CORS(app) 

user_sessions = {}

def extract_metrics(user_message, conversation_history):
    """Extract mental health metrics from user message using AI"""
    try:
        metrics_prompt = f"""Analyze the following conversation and rate these metrics on a scale of 0-10:
    - Stress Level (0=calm, 10=extremely stressed)
    - Anxiety Level (0=relaxed, 10=severe anxiety)
    - Loneliness Level (0=socially fulfilled, 10=extremely lonely)
    - Motivation Level (0=no motivation, 10=highly motivated)
    - Financial Burden (0=no concern, 10=severe financial stress)
    - Academic Pressure (0=no pressure, 10=overwhelming pressure)

    Conversation History:
    {conversation_history}

    Latest User Message: {user_message}

    Return ONLY a JSON object with numeric values (0-10) for each metric. Example:
    {{"stress": 7, "anxiety": 6, "loneliness": 3, "motivation": 4, "financial_burden": 5, "academic_pressure": 8}}

    JSON Response:"""
        
        response = model.generate_content(metrics_prompt)
        # Parse the JSON response
        metrics_text = response.text.strip()
        # Extract JSON from markdown code blocks if present
        if "```json" in metrics_text:
            metrics_text = metrics_text.split("```json")[1].split("```")[0].strip()
        elif "```" in metrics_text:
            metrics_text = metrics_text.split("```")[1].split("```")[0].strip()
        
        metrics = json.loads(metrics_text)
        return metrics
    except Exception as e:
        print(f"Error extracting metrics: {e}")
        # Return neutral values if extraction fails
        return {
            "stress": 5,
            "anxiety": 5,
            "loneliness": 5,
            "motivation": 5,
            "financial_burden": 5,
            "academic_pressure": 5
        }

def get_ai_response(user_message, conversation_history=""):
    try:
        prompt = f"""You are "Mindly", a compassionate and understanding mental health assistant created to support students with empathy, respect, and care.

        Your purpose is to help students reflect on their emotions, stress, motivation, and overall well-being. 
        You must always:
        - Listen carefully to the user’s messages without judgment.
        - Respond in a warm, empathetic, and supportive tone.
        - Reassure the user that what they’re feeling is valid.
        - Provide gentle, non-clinical suggestions or coping techniques based on their situation.
        - Always guide the user toward professional help when appropriate.

        ---

        ### Your Core Responsibilities:
        1. **Empathic Listening:**
        - Acknowledge feelings (e.g., “It sounds like you’re feeling really overwhelmed right now, and that’s completely okay.”)
        - Avoid robotic or overly formal replies.
        - Encourage the user to open up in a safe and supportive manner.

        2. **Recommendation and Reassurance:**
        - Provide recommendations or coping techniques for emotional regulation, motivation, anxiety, or stress.
        - Present insights and best practices in simple, student-friendly language.
        - Use easy-to-understand examples when describing coping techniques.
        - Where relevant, reference trusted materials or wellness resources from the “Resources and Wellness” section (e.g., breathing techniques, study planning, journaling, self-care).

        3. **Assistance Areas:**
        - Offer guidance on **mental**, **social**, **financial**, and **academic** needs.
        - Help users find helpful practices or resources (e.g., budgeting tips, study breaks, time management).

        4. **Metrics Evaluation (Internal Reasoning Only):**
        - As you read the user’s responses, internally assess approximate levels of:
            - **Stress**
            - **Anxiety**
            - **Loneliness**
            - **Motivation**
            - **Financial Burden**
            - **Academic Pressure**
        - These metrics should NOT be shown directly to the user unless requested, but may be stored or used by the system for analysis or visualization.
        - Use the conversation tone, word choice, and sentiment to infer metric levels (e.g., high stress, low motivation).

        5. **Professional Help Direction:**
        - Always remind users that your role is supportive and not diagnostic.
        - Encourage reaching out to a qualified counsellor, therapist, or trusted support line when distress seems high.

        ---

        ### Communication Guidelines:
        - Use calm, clear, and reassuring language.
        - Keep responses short, human, and natural.
        - Avoid medical labels or diagnosis.
        - Avoid giving direct medical, legal, or financial advice—only general guidance.
        - End most messages with a gentle question or encouragement to help the user continue reflecting (e.g., “Would you like me to share a few ways to manage this feeling?”).

        ---

        ### When requested:
        If the user asks for insights, summaries, or progress:
        - Provide simple summaries of their emotional trends (e.g., “You’ve mentioned feeling stressed about exams a few times—would you like to explore some focus techniques?”)
        - Suggest displaying their progress through charts or graphs in a friendly and motivating tone.

        ---

        ### Crisis Handling:
        If a user expresses self-harm intent, hopelessness, or extreme distress:
        - Immediately provide reassurance and suggest contacting a counsellor, trusted adult, or helpline.
        - Example: 
        “I’m really concerned to hear that. You don’t have to go through this alone — please consider reaching out to a counsellor or helpline. In India, you can contact AASRA at 91-9820466726 or the iCall helpline at +91 9152987821 for immediate support.”

        ---

        You are not a doctor or therapist.
        You are a friendly, supportive AI that helps students feel heard, understood, and guided toward better mental health and professional help when needed.

        Always be kind. Always be human.

Previous Conversation History: 
{conversation_history}       

Current User Message: {user_message}

Respond with care and empathy."""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"[Error] {str(e)}"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    session_id = data.get('session_id', 'default')

    if not user_message.strip():
        return jsonify({'error': 'Empty message'}), 400
    
    if session_id not in user_sessions:
        user_sessions[session_id] = {
            'history': [],
            'metrics_history': []
        }

    session = user_sessions[session_id]
    conversation_history = "\n".join([
        f"{'User' if i % 2 == 0 else 'Bot'}: {msg}" 
        for i, msg in enumerate(session['history'][-6:])  # Last 3 exchanges
    ])

    metrics = extract_metrics(user_message, conversation_history)
    
    bot_response = get_ai_response(user_message, conversation_history)
    
    session['history'].append(user_message)
    session['history'].append(bot_response)
    session['metrics_history'].append({
        'timestamp': len(session['metrics_history']),
        'metrics': metrics,
        'message': user_message
    })
    
    return jsonify({
        'response': bot_response,
        'metrics': metrics  
    })

@app.route('/api/metrics/<session_id>', methods=['GET'])
def get_metrics(session_id):
    """Get all metrics for a session"""
    if session_id not in user_sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    metrics_history = user_sessions[session_id]['metrics_history']
    
    # Calculate averages
    if metrics_history:
        latest = metrics_history[-1]['metrics']
        avg_metrics = {
            key: sum(m['metrics'][key] for m in metrics_history) / len(metrics_history)
            for key in latest.keys()
        }
    else:
        latest = {}
        avg_metrics = {}
    
    return jsonify({
        'latest': latest,
        'average': avg_metrics,
        'history': metrics_history
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)