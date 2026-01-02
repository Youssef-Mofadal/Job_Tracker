export type InterviewType = 'phone' | 'video' | 'in-person' | 'technical' | 'behavioral';
export type QuestionCategory = 'behavioral' | 'technical' | 'situational' | 'company-specific';

export interface InterviewQuestion {
    id: string;
    question: string;
    answer?: string;
    category: QuestionCategory;
    practiced: boolean;
}

export interface ChecklistItem {
    id: string;
    task: string;
    completed: boolean;
}

export interface InterviewPrep {
    id: string;
    applicationId: string;
    company: string;
    position: string;
    interviewDate: Date;
    interviewType: InterviewType;
    interviewers?: string[];
    prepared: boolean;
    companyResearch?: string;
    questions: InterviewQuestion[];
    checklist: ChecklistItem[];
    postInterviewNotes?: string;
    thankYouSent?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
