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
        metrics_text = response.text.strip()
        if "```json" in metrics_text:
            metrics_text = metrics_text.split("```json")[1].split("```")[0].strip()
        elif "```" in metrics_text:
            metrics_text = metrics_text.split("```")[1].split("```")[0].strip()
        
        metrics = json.loads(metrics_text)
        return metrics
    except Exception as e:
        print(f"Error extracting metrics: {e}")
        return {
            "stress": 5,
            "anxiety": 5,
            "loneliness": 5,
            "motivation": 5,
            "financial_burden": 5,
            "academic_pressure": 5
        }

def get_ai_response(user_message, conversation_history="", questionnaire_context=""):
    try:
        context_section = ""
        if questionnaire_context:
            context_section = f"""
### User's Assessment Results:
{questionnaire_context}

Based on this assessment, provide targeted support and coping strategies for their specific concerns. Focus on practical, actionable advice.
"""
        
        prompt = f"""You are Mindly, a supportive mental health assistant for students. Be warm, empathetic, and helpful.

Guidelines:
- Listen without judgment and acknowledge their feelings
- Provide practical coping strategies and gentle guidance
- Keep responses concise and conversational
- Focus on actionable advice they can try
- If they need professional help, suggest reaching out to a counselor

{context_section}
        
Previous conversation: {conversation_history}
Current message: {user_message}

Respond with care and practical guidance."""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"[Error] {str(e)}"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    session_id = data.get('session_id', 'default')
    user_id = data.get('user_id')

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
        for i, msg in enumerate(session['history'][-6:])
    ])

    questionnaire_context = get_questionnaire_context(user_id) if user_id else ""

    metrics = extract_metrics(user_message, conversation_history)
    
    bot_response = get_ai_response(user_message, conversation_history, questionnaire_context)
    
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
    if session_id not in user_sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    metrics_history = user_sessions[session_id]['metrics_history']
    
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

questionnaire_data = {}

@app.route('/api/questionnaire/latest', methods=['POST'])
def save_questionnaire():
    try:
        data = request.json
        user_id = data.get('userId')
        timestamp = data.get('timestamp')
        responses = data.get('responses', {})
        
        print(f"DEBUG: Saving questionnaire data for user {user_id}")
        print(f"DEBUG: Responses: {responses}")
        
        questionnaire_data[user_id] = {
            'timestamp': timestamp,
            'responses': responses
        }
        
        print(f"DEBUG: Total users stored: {len(questionnaire_data)}")
        
        return jsonify({'saved': True, 'message': 'Questionnaire data saved'})
    except Exception as e:
        print(f"DEBUG: Error saving questionnaire: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/questionnaire/latest', methods=['GET'])
def get_questionnaire():
    try:
        user_id = request.args.get('userId')
        print(f"DEBUG: Fetching questionnaire data for user {user_id}")
        print(f"DEBUG: Available users: {list(questionnaire_data.keys())}")
        
        if user_id and user_id in questionnaire_data:
            print(f"DEBUG: Found data for user {user_id}")
            return jsonify(questionnaire_data[user_id])
        print(f"DEBUG: No data found for user {user_id}")
        return jsonify({'error': 'No questionnaire data found'}), 404
    except Exception as e:
        print(f"DEBUG: Error fetching questionnaire: {str(e)}")
        return jsonify({'error': str(e)}), 500

def get_questionnaire_context(user_id):
    print(f"DEBUG: Getting questionnaire context for user {user_id}")
    print(f"DEBUG: Available users: {list(questionnaire_data.keys())}")
    
    if user_id and user_id in questionnaire_data:
        data = questionnaire_data[user_id]
        responses = data.get('responses', {})
        print(f"DEBUG: Found questionnaire data with {len(responses)} responses")
        
        context_parts = []
        phq_responses = {k: v for k, v in responses.items() if k.startswith('phq')}
        if phq_responses:
            avg_phq = sum(phq_responses.values()) / len(phq_responses) if phq_responses else 0
            if avg_phq >= 2:
                context_parts.append(f"Depression concerns (PHQ: {avg_phq:.1f}/3)")
        
        ghq_responses = {k: v for k, v in responses.items() if k.startswith('ghq')}
        if ghq_responses:
            avg_ghq = sum(ghq_responses.values()) / len(ghq_responses) if ghq_responses else 0
            if avg_ghq >= 2:
                context_parts.append(f"Anxiety concerns (GHQ: {avg_ghq:.1f}/3)")
        
        pss_responses = {k: v for k, v in responses.items() if k.startswith('pss')}
        if pss_responses:
            avg_pss = sum(pss_responses.values()) / len(pss_responses) if pss_responses else 0
            if avg_pss >= 2:
                context_parts.append(f"Stress concerns (PSS: {avg_pss:.1f}/3)")
        
        ucla_responses = {k: v for k, v in responses.items() if k.startswith('ucla')}
        if ucla_responses:
            avg_ucla = sum(ucla_responses.values()) / len(ucla_responses) if ucla_responses else 0
            if avg_ucla >= 3:
                context_parts.append(f"Social isolation concerns (UCLA: {avg_ucla:.1f}/4)")
        
        fin_responses = {k: v for k, v in responses.items() if k.startswith('fin')}
        if fin_responses:
            avg_fin = sum(fin_responses.values()) / len(fin_responses) if fin_responses else 0
            if avg_fin >= 3:
                context_parts.append(f"Financial stress concerns (Score: {avg_fin:.1f}/4)")
        
        acad_responses = {k: v for k, v in responses.items() if k.startswith('acad')}
        if acad_responses:
            avg_acad = sum(acad_responses.values()) / len(acad_responses) if acad_responses else 0
            if avg_acad <= 2:
                context_parts.append(f"Low academic motivation (Score: {avg_acad:.1f}/4)")
        
        return " | ".join(context_parts) if context_parts else "No significant concerns identified"
    
    return ""

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/api/questionnaire/debug', methods=['GET'])
def debug_questionnaire():
    return jsonify({
        'total_users': len(questionnaire_data),
        'user_ids': list(questionnaire_data.keys()),
        'data': questionnaire_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)