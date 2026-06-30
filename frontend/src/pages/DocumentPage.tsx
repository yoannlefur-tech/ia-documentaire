import { Container } from "@mui/material";
import UploadFile from "../components/UploadFile";
import AskQuestion from "../components/AskQuestion";
import { useState } from "react";
import type { Document } from "../types/document";
import DocumentSummary from "../components/DocumentSummary";

export default function DocumentPage() {

    const [document, setDocument] = useState<Document>()

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <UploadFile onUploadSuccess={setDocument} />
            {document && <DocumentSummary document={document} />}
            {document && <AskQuestion document_text={document.text} />}
        </Container>
    )
}
