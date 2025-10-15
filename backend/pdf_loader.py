import fitz  # PyMuPDF
import re

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    doc = fitz.open(pdf_path)
    text = ""
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text += page.get_text()
    
    doc.close()
    return text

def chunk_text(text, chunk_size=500, overlap=50):
    """Split text into chunks for better retrieval"""
    # Clean text - remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    
    return chunks

def load_pdf_to_knowledge_base(pdf_path, kb, category="general", source="pdf"):
    """Load PDF content into knowledge base"""
    print(f"📄 Loading PDF: {pdf_path}")
    
    # Extract text
    text = extract_text_from_pdf(pdf_path)
    
    # Split into chunks
    chunks = chunk_text(text, chunk_size=500, overlap=50)
    
    print(f"📝 Created {len(chunks)} chunks from PDF")
    
    # Add to knowledge base
    for i, chunk in enumerate(chunks):
        doc_id = f"pdf_{category}_{i}"
        metadata = {
            "category": category,
            "type": "research",
            "source": source,
            "pdf_path": pdf_path
        }
        kb.add_document(chunk, metadata, doc_id)
    
    print(f"✅ Added {len(chunks)} chunks to knowledge base")
    return len(chunks)