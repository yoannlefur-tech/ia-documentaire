import anthropic
import os

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def summarize_document(text: str) -> str:
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""Voici le contenu d'un document technique. 
Fais-en un résumé clair et structuré en français.

Document :
{text}"""
            }
        ]
    )
    return message.content[0].text

def ask_question(text: str, question: str) -> str:
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""Voici le contenu d'un document technique :

{text}

Question : {question}

Réponds en français de façon précise et concise."""
            }
        ]
    )
    return message.content[0].text