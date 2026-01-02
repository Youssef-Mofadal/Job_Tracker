import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const QUESTIONS = [
    {
        category: "Behavioral",
        items: [
            "Tell me about a time you faced a challenge.",
            "Describe a situation where you had a conflict with a coworker.",
            "What is your greatest weakness?",
            "Why do you want to work here?"
        ]
    },
    {
        category: "Technical (General)",
        items: [
            "Explain the concept of REST APIs.",
            "What is the difference between TCP and UDP?",
            "How does the browser rendering engine work?",
            "Explain Big O notation."
        ]
    },
    {
        category: "React/Frontend",
        items: [
            "What are hooks in React?",
            "Explain the Virtual DOM.",
            "What is Prop Drilling and how to avoid it?",
            "Difference between server-side and client-side rendering."
        ]
    }
]

export function QuestionBank() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Common Interview Questions</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {QUESTIONS.map((section, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger>{section.category}</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-4 space-y-2">
                                    {section.items.map((q, i) => (
                                        <li key={i} className="text-sm text-muted-foreground">{q}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
