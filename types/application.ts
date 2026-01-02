export type ApplicationStatus = 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'accepted' | 'withdrawn';
export type ApplicationType = 'internship' | 'job' | 'part-time';
export type WorkMode = 'remote' | 'hybrid' | 'on-site';
export type Priority = 'low' | 'medium' | 'high';

export interface Application {
    id: string;
    companyName: string;
    companyLogo?: string;
    position: string;
    type: ApplicationType;
    status: ApplicationStatus;
    dateApplied: Date; // ISO string in JSON
    salary?: string;
    location: string;
    workMode: WorkMode;
    jobUrl?: string;
    contactPerson?: string;
    contactEmail?: string;
    contactPhone?: string;
    notes?: string;
    documents?: string[]; // IDs of linked documents
    interviewDate?: Date;
    offerDeadline?: Date;
    rejectionReason?: string;
    followUpDate?: Date;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}
