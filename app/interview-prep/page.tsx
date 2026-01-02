import { PrepChecklist } from "@/components/interview-prep/PrepChecklist"
import { QuestionBank } from "@/components/interview-prep/QuestionBank"

export default function InterviewPrepPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Interview Prep</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <PrepChecklist />
                <QuestionBank />
            </div>
        </div>
    )
}
