import { Button, Card, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import type { Document } from "../types/document";

interface Props {
  onUploadSuccess: (data: Document) => void
}

export default function UploadFile({onUploadSuccess}: Props) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files?.[0] ?? null)
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const response = await fetch('/api/documents/upload', {
            method: 'POST',
            body: formData
            })
            const data = await response.json()
            onUploadSuccess(data)
            console.log('Upload successful:', data)
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Card>
            <TextField
                type="file"
                name="file"
                onChange={handleFileChange}
                fullWidth
            />

            <Button 
                variant="contained" 
                onClick={handleUpload} 
                disabled={!selectedFile || uploading}
                startIcon={uploading ? <CircularProgress size={18} color="inherit" /> : null}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </Button>
        </Card>
    )
}