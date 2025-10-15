from kb import MentalHealthKnowledgeBase
from pdf_loader import load_pdf_to_knowledge_base
import os

def load_all_pdfs():
    """Load all PDFs from the data directory"""
    kb = MentalHealthKnowledgeBase()
    
    pdf_files = [
        {
            "path": "data/stress_management.pdf",
            "category": "stress",
            "source": "research_paper"
        },
        {
            "path": "data/anxiety_guide.pdf",
            "category": "anxiety",
            "source": "clinical_guide"
        },
        {
            "path": "data/student_mental_health.pdf",
            "category": "academic",
            "source": "university_research"
        },
        {
            "path": "data/sleep_hygiene.pdf",
            "category": "sleep",
            "source": "health_guide"
        },
        {
            "path": "data/nutrition_mental_health.pdf",
            "category": "nutrition",
            "source": "research_paper"
        },
    ]
    
    total_chunks = 0
    successful = 0
    failed = 0
    
    for pdf_info in pdf_files:
        if os.path.exists(pdf_info["path"]):
            try:
                chunks = load_pdf_to_knowledge_base(
                    pdf_info["path"],
                    kb,
                    category=pdf_info["category"],
                    source=pdf_info["source"]
                )
                total_chunks += chunks
                successful += 1
            except Exception as e:
                print(f"Error loading {pdf_info['path']}: {e}")
                failed += 1
        else:
            print(f"PDF not found: {pdf_info['path']}")
            failed += 1
    
    print(f"\n{'='*50}")
    print(f"Successfully loaded: {successful} PDFs")
    print(f"Failed: {failed} PDFs")
    print(f"Total chunks created: {total_chunks}")
    print(f"Total documents in knowledge base: {kb.collection.count()}")
    print(f"{'='*50}")

if __name__ == "__main__":
    load_all_pdfs()