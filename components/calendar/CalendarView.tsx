"use client"

import { useState } from "react"
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Application } from "@/types/application"

interface CalendarViewProps {
    applications: Application[]
}

export function CalendarView({ applications }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = "d"
    const rows = []
    const days = []
    const day = startDate
    const formattedDate = ""

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    })

    // Group apps by date (using dateApplied for now, ideally interviewDate)
    const eventsByDate = applications.reduce((acc, app) => {
        // Use dateApplied. In a real scenario we'd check for separate interviewDate or deadlines
        if (!app.dateApplied) return acc;

        const dateStr = new Date(app.dateApplied).toDateString();
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push({
            id: app.id,
            title: `${app.companyName} (${app.status})`,
            type: 'application'
        });
        return acc;
    }, {} as Record<string, any[]>)

    return (
        <div className="bg-card rounded-md border shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 mb-2 text-center text-sm text-muted-foreground font-medium">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-muted/20 border rounded-md overflow-hidden">
                {calendarDays.map((day, idx) => {
                    const dateStr = day.toDateString();
                    const dayEvents = eventsByDate[dateStr] || [];

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "min-h-[100px] p-2 bg-background hover:bg-muted/5 transition-colors border-b border-r",
                                !isSameMonth(day, monthStart) && "text-muted-foreground bg-muted/10",
                                isSameDay(day, new Date()) && "bg-blue-50/50 dark:bg-blue-950/10"
                            )}
                        >
                            <div className="text-right text-sm mb-1">
                                {format(day, dateFormat)}
                            </div>
                            <div className="space-y-1">
                                {dayEvents.map((event: any) => (
                                    <Badge
                                        key={event.id}
                                        variant="secondary"
                                        className="w-full justify-start text-[10px] px-1 py-0 h-auto font-normal truncate"
                                    >
                                        {event.title}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
