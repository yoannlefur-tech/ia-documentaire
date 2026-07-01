import { Alert, Box, Button, Card, CircularProgress, Divider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  document_text: string | undefined
}

export default function AskQuestion({document_text}: Props) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false)
    const [error, setError] = useState("");
    
    
    const askQuestion = async () => {
        if (!question.trim()) return;
        
        setAnswer("");
        setLoading(true);
        setIsStreaming(true)
        setError("");

        let buffer = ""

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

            const reader = response.body!.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const lines = decoder.decode(value, { stream: true }).split('\n')

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue
                    const data = line.slice(6)
                    
                    if (data === '[DONE]') {
                        setAnswer(buffer.trim())
                        setIsStreaming(false)
                        setLoading(false)
                        return
                    }

                    if (data) {
                        buffer += data
                        setAnswer(buffer) // affiche en temps réel
                    }
                }
            }

            setAnswer(buffer)
            setLoading(false)
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
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6">
                        Réponse de Claude
                    </Typography>
                    {isStreaming ? (
                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{answer}</Typography>
                    ) : (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>{children}</Typography>,
                                h2: ({ children }) => <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>{children}</Typography>,
                                h3: ({ children }) => <Typography variant="h6" gutterBottom>{children}</Typography>,
                                p:  ({ children }) => <Typography variant="body1">{children}</Typography>,
                                strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
                                hr: () => <Divider sx={{ my: 2 }} />,
                                table: ({ children }) => <Table size="small" sx={{ mb: 2 }}>{children}</Table>,
                                thead: ({ children }) => <TableHead>{children}</TableHead>,
                                tbody: ({ children }) => <TableBody>{children}</TableBody>,
                                tr: ({ children }) => <TableRow>{children}</TableRow>,
                                th: ({ children }) => <TableCell sx={{ fontWeight: 600 }}>{children}</TableCell>,
                                td: ({ children }) => <TableCell>{children}</TableCell>,
                            }}
                        >
                            {answer}
                        </ReactMarkdown>
                    )}
                </Box>
            )}
        </Card>
    )
}