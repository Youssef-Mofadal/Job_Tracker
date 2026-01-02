"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const INITIAL_CHECKLIST = [
    { id: "1", label: "Research the company mission and values", checked: false },
    { id: "2", label: "Review the job description thoroughly", checked: false },
    { id: "3", label: "Prepare 3-5 STAR method stories", checked: false },
    { id: "4", label: "Practice coding problems (LeetCode/HackerRank)", checked: false },
    { id: "5", label: "Prepare questions for the interviewer", checked: false },
    { id: "6", label: "Check audio/video setup", checked: false },
    { id: "7", label: "Review resume and portfolio", checked: false },
]

export function PrepChecklist() {
    const [items, setItems] = useState(INITIAL_CHECKLIST)

    const toggleItem = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Preparation Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                        />
                        <label
                            htmlFor={item.id}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
