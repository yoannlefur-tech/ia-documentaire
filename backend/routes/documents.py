from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services.claude_service import summarize_document, stream_question
import pdfplumber
import io

router = APIRouter(prefix="/api/documents")

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
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
        "pages": len(pdfplumber.PDF(io.BytesIO(content)).pages)
    }

@router.post("/ask")
async def ask_document_question(request: AskRequest):
    def generate():
        for chunk in stream_question(request.document_text, request.question):
            yield f"data: {chunk}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(), 
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # désactive le buffer nginx
        }
    )