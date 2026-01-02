export type DocumentType = 'resume' | 'cover-letter' | 'portfolio' | 'certificate' | 'other';

export interface Document {
    id: string;
    name: string;
    type: DocumentType;
    url: string; // Storage URL or file path
    fileSize?: number;
    mimeType?: string;
    uploadDate: Date;
    associatedApplications?: string[]; // IDs
    version?: number;
    tags?: string[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
