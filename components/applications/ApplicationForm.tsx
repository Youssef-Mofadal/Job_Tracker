"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Application } from "@/types/application"

const formSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    status: z.enum(['applied', 'screening', 'interview', 'offer', 'rejected', 'accepted', 'withdrawn']),
    type: z.enum(['internship', 'job', 'part-time']),
    location: z.string().optional(),
    salary: z.string().optional(),
    dateApplied: z.string().or(z.date()),
})

interface ApplicationFormProps {
    initialData?: Application
}

export function ApplicationForm({ initialData }: ApplicationFormProps) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: initialData?.companyName || "",
            position: initialData?.position || "",
            status: initialData?.status || "applied",
            type: initialData?.type || "job",
            location: initialData?.location || "",
            salary: initialData?.salary || "",
            dateApplied: initialData?.dateApplied ? new Date(initialData.dateApplied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        },
    })

    // ... custom onSubmit to handle date conversion if needed, or rely on API to parse string

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = initialData
                ? `/api/applications/${initialData.id}`
                : `/api/applications`

            const method = initialData ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    dateApplied: new Date(values.dateApplied as string)
                }),
            })

            if (!res.ok) throw new Error("Failed to save")

            router.push("/applications")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        }
    }

    return (
        <div className="max-w-xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input {...form.register("companyName")} placeholder="e.g. Google" />
                    {form.formState.errors.companyName && (
                        <p className="text-sm text-red-500">{form.formState.errors.companyName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input {...form.register("position")} placeholder="e.g. Frontend Engineer" />
                    {form.formState.errors.position && (
                        <p className="text-sm text-red-500">{form.formState.errors.position.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Date Applied</label>
                    <Input type="date" {...form.register("dateApplied")} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select
                            {...form.register("status")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="applied">Applied</option>
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="accepted">Accepted</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <select
                            {...form.register("type")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="job">Full-time Job</option>
                            <option value="internship">Internship</option>
                            <option value="part-time">Part-time</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input {...form.register("location")} placeholder="e.g. Remote" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Salary</label>
                        <Input {...form.register("salary")} placeholder="e.g. $120k" />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {initialData ? "Update Application" : "Add Application"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
