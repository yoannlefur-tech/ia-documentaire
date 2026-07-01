import { Card, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import type { Document } from "../types/document";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

interface Props {
  document: Document
}

export default function DocumentSummary({document}: Props) {
    return(
        <Card>
            <Typography variant="h5">
                Résumé de {document.filename}
            </Typography>
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
                {document.summary}
            </ReactMarkdown>
        </Card>
    )
}