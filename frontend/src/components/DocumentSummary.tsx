import { Card, Typography } from "@mui/material";
import type { Document } from "../types/document";

interface Props {
  document: Document
}

export default function DocumentSummary({document}: Props) {
    return(
        <Card>
            <Typography variant="h5">
                Résumé de {document.filename}
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
                {document.summary}
            </Typography>
        </Card>
    )
}