import { db } from "@/lib/db"
import { CalendarView } from "@/components/calendar/CalendarView"

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
    const applications = await db.applications.getAll();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
            </div>
            <CalendarView applications={applications} />
        </div>
    )
}
