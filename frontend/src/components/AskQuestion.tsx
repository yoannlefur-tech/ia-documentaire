import { Alert, Box, Button, Card, CircularProgress, TextField, Typography } from "@mui/material"
import { useState } from "react"

interface Props {
  document_text: string | undefined
}

export default function AskQuestion({document_text}: Props) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const askQuestion = async () => {
        if (!question.trim()) return;
        
        setLoading(true);
        setError("");
        setAnswer("");

        try {

            const response = await fetch('/api/documents/ask', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    document_text,
                    question,
                }),
            })

            if (!response.ok) {
                throw new Error("Erreur lors de l'appel à l'API.");
            }

            const data = await response.json();

            setAnswer(data.answer);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Une erreur est survenue."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <Typography variant="h5">
                Poser une question
            </Typography>
            
            <TextField
                label="Saisissez votre question..."
                type="text"
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                fullWidth
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={askQuestion}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            >
                {loading ? "Analyse en cours..." : "Poser la question"}
            </Button>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {answer && (
                <Box>
                    <Typography variant="h6">
                        Réponse de Claude
                    </Typography>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                        {answer}
                    </Typography>
                </Box>
            )}
        </Card>
    )
}