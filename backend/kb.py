import chromadb
from chromadb.utils import embedding_functions
import os

class MentalHealthKnowledgeBase:
    def __init__(self):
        # Initialize ChromaDB client with persistent storage
        self.client = chromadb.Client()
        
        # Use sentence transformers for embeddings
        self.embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        
        # Delete existing collection and create fresh one
        try:
            self.client.delete_collection(name="mental_health_resources")
            print("🗑️  Deleted existing collection")
        except:
            pass
        
        # Create collection
        self.collection = self.client.create_collection(
            name="mental_health_resources",
            embedding_function=self.embedding_function
        )
        
        # Always populate on initialization
        self.populate_knowledge_base()
    
    def populate_knowledge_base(self):
        """Add mental health resources and coping strategies to the database"""
        
        documents = [
            # Stress Management
            "Stress Management: Deep breathing activates the parasympathetic nervous system. Try 4-7-8 breathing: inhale for 4 counts, hold for 7, exhale for 8. Progressive muscle relaxation reduces cortisol levels. The 20-20-20 rule for screen time: every 20 minutes, look at something 20 feet away for 20 seconds. Regular breaks during study sessions prevent burnout.",
            
            # Anxiety
            "Anxiety Coping: The 5-4-3-2-1 grounding technique interrupts anxiety loops. Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Box breathing helps: inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 5 times. Practice mindfulness meditation for 10 minutes daily to reduce overall anxiety levels.",
            
            # Academic Pressure
            "Academic Pressure Management: Break large assignments into smaller, manageable tasks using backward planning. Use the Pomodoro technique - 25 minutes focused work, 5 minute breaks. Create a realistic study schedule and stick to it. Prioritize tasks using the Eisenhower Matrix: urgent-important, important-not urgent, urgent-not important, neither urgent nor important.",
            
            # Loneliness
            "Dealing with Loneliness: Join student clubs or study groups related to your interests. Reach out to classmates for group projects or study sessions. Schedule regular video calls with friends and family members. Volunteer in community activities to meet like-minded people. Quality of connections matters more than quantity.",
            
            # Motivation
            "Boosting Motivation: Set SMART goals - Specific, Measurable, Achievable, Relevant, Time-bound. Break large goals into micro-steps. Reward yourself immediately after completing tasks. Keep a success journal to track progress and celebrate wins. Find an accountability partner or study buddy to maintain motivation.",
            
            # Financial Stress
            "Managing Financial Stress: Create a monthly budget using the 50-30-20 rule: 50% needs, 30% wants, 20% savings. Track all expenses for one month to identify spending patterns. Look for student discounts on everything. Apply for scholarships, grants, and part-time work opportunities. Seek financial counseling from campus services if needed.",
            
            # Sleep Hygiene
            "Sleep Optimization: Maintain consistent sleep-wake times even on weekends. Keep bedroom cool (60-67°F or 15-19°C) and dark. Avoid screens 1 hour before bed as blue light suppresses melatonin. No caffeine after 2pm, avoid alcohol near bedtime. If can't sleep after 20 minutes, get up and do a calming activity. Try 4-7-8 breathing in bed.",
            
            # Exercise
            "Physical Activity for Mental Health: Exercise releases endorphins that naturally improve mood. Aim for 30 minutes of moderate activity daily - walking, yoga, dancing all count. Even 10-minute walks significantly reduce stress. Start small and build gradually. Exercise also improves sleep quality and boosts energy levels throughout the day.",
            
            # Nutrition
            "Nutrition and Mental Health: Eat regular balanced meals with omega-3 fatty acids (fish, walnuts, flaxseed) that support brain function. Complex carbs (whole grains, vegetables) stabilize mood. Stay hydrated - drink 8 glasses of water daily. Limit caffeine and sugar to avoid energy crashes. Don't skip breakfast as it impacts concentration and mood.",
            
            # Time Management
            "Time Management Strategies: Use a planner or digital calendar to organize tasks. Prioritize using the Eisenhower Matrix - focus on important tasks first. Learn to say no to non-essential commitments. Schedule buffer time between activities to prevent feeling rushed. Break large projects into smaller milestones with specific deadlines.",
            
            # Social Connection
            "Building Social Connections: Join online communities with shared interests or hobbies. Attend campus events even when feeling anxious - start with smaller gatherings. Practice active listening - focus fully on others, don't interrupt, ask follow-up questions. Be genuine and authentic in interactions. Remember quality connections matter more than quantity of friends.",
            
            # Crisis Resources
            "Mental Health Crisis Resources in India: AASRA suicide prevention helpline 91-9820466726 available 24/7. iCall psychosocial helpline +91 9152987821 (Monday-Saturday 8am-10pm). Vandrevala Foundation +91 9999666555 (24/7). NIMHANS helpline 080-46110007. Always reach out for professional help when experiencing severe distress, self-harm thoughts, or feeling overwhelmed.",
            
            # Study Techniques
            "Effective Study Techniques: Use active recall instead of passive reading - test yourself regularly. Create mind maps for visual learning and connecting concepts. Teach concepts to others to solidify your understanding. Use spaced repetition: review after 1 day, 3 days, 7 days, 14 days. Interleave different subjects instead of blocking one subject for hours.",
            
            # Procrastination
            "Overcoming Procrastination: Identify the emotion causing avoidance - often fear, overwhelm, or perfectionism. Break tasks into 5-minute chunks to reduce intimidation. Use the 2-minute rule: if it takes less than 2 minutes, do it immediately. Remove distractions: phone in another room, use website blockers. Start before you feel ready - action creates motivation, not the other way around.",
            
            # Self-Care
            "Self-Care Practices: Self-care isn't selfish - it prevents burnout. Take regular breaks for hobbies and activities you enjoy. Practice gratitude journaling daily - write 3 things you're grateful for. Spend time in nature weekly, even just 20 minutes helps. Disconnect from social media periodically. Be kind to yourself - practice self-compassion instead of self-criticism.",
        ]
        
        # Add metadata for better filtering
        metadatas = [
            {"category": "stress", "type": "technique"},
            {"category": "anxiety", "type": "technique"},
            {"category": "academic", "type": "strategy"},
            {"category": "loneliness", "type": "strategy"},
            {"category": "motivation", "type": "strategy"},
            {"category": "financial", "type": "strategy"},
            {"category": "sleep", "type": "health"},
            {"category": "exercise", "type": "health"},
            {"category": "nutrition", "type": "health"},
            {"category": "time_management", "type": "strategy"},
            {"category": "social", "type": "strategy"},
            {"category": "crisis", "type": "resource"},
            {"category": "academic", "type": "technique"},
            {"category": "procrastination", "type": "strategy"},
            {"category": "self_care", "type": "practice"},
        ]
        
        ids = [f"doc_{i}" for i in range(len(documents))]
        
        # Ensure we have data before adding
        if documents and metadatas and ids:
            self.collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
            print(f"✅ Added {len(documents)} documents to knowledge base")
        else:
            print("⚠️  No documents to add")
    
    def query_knowledge(self, query_text, n_results=3):
        """Query the knowledge base for relevant information"""
        try:
            results = self.collection.query(
                query_texts=[query_text],
                n_results=n_results
            )
            return results['documents'][0] if results['documents'] else []
        except Exception as e:
            print(f"Error querying knowledge base: {e}")
            return []
    
    def add_document(self, document, metadata, doc_id):
        """Add a new document to the knowledge base"""
        try:
            self.collection.add(
                documents=[document],
                metadatas=[metadata],
                ids=[doc_id]
            )
            print(f"✅ Added document: {doc_id}")
        except Exception as e:
            print(f"Error adding document: {e}")
    
    def add_documents_batch(self, documents, metadatas, ids):
        """Add multiple documents at once (more efficient)"""
        try:
            self.collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
            print(f"✅ Added {len(documents)} documents in batch")
        except Exception as e:
            print(f"Error adding documents in batch: {e}")