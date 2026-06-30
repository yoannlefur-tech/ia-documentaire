from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from services.claude_service import summarize_document, ask_question
import PyPDF2
import io

router = APIRouter(prefix="/api/documents")

def extract_text_from_pdf(file_bytes: bytes) -> str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text

class AskRequest(BaseModel):
    question: str
    document_text: str

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Seuls les fichiers PDF sont acceptés")

    content = await file.read()
    text = extract_text_from_pdf(content)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Impossible d'extraire le texte du PDF")

    summary = summarize_document(text)

    return {
        "filename": file.filename,
        "text": text,
        "summary": summary,
        "pages": len(PyPDF2.PdfReader(io.BytesIO(content)).pages)
    }

@router.post("/ask")
async def ask_document_question(request: AskRequest):
    answer = ask_question(request.document_text, request.question)
    return {"answer": answer}