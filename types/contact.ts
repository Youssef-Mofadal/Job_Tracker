export type RelationshipType = 'recruiter' | 'hiring-manager' | 'employee' | 'referral' | 'other';

export interface Contact {
    id: string;
    name: string;
    role: string;
    company: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
    notes?: string;
    relationshipType: RelationshipType;
    howMet?: string;
    lastContactDate?: Date;
    nextFollowUp?: Date;
    associatedApplications?: string[]; // IDs
    createdAt: Date;
    updatedAt: Date;
}
