"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Contact } from "@/types/contact"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company is required"),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    relationshipType: z.enum(['recruiter', 'hiring-manager', 'employee', 'referral', 'other']),
    notes: z.string().optional(),
    lastContactDate: z.string().or(z.date()).optional(),
})

interface ContactFormProps {
    initialData?: Contact
}

export function ContactForm({ initialData }: ContactFormProps) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            role: initialData?.role || "",
            company: initialData?.company || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            relationshipType: initialData?.relationshipType || "recruiter",
            notes: initialData?.notes || "",
            lastContactDate: initialData?.lastContactDate ? new Date(initialData.lastContactDate).toISOString().split('T')[0] : "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = initialData
                ? `/api/contacts/${initialData.id}`
                : `/api/contacts`

            const method = initialData ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    lastContactDate: values.lastContactDate ? new Date(values.lastContactDate) : undefined
                }),
            })

            const newContact = await res.json()

            // Optimistic Client-Side Update for Demo Persistence
            try {
                const stored = localStorage.getItem('job_tracker_local_contacts')
                const localContacts = stored ? JSON.parse(stored) : []
                // If it's an update, remove the old one first
                const filtered = localContacts.filter((c: Contact) => c.id !== newContact.id)
                filtered.push(newContact)
                localStorage.setItem('job_tracker_local_contacts', JSON.stringify(filtered))
            } catch (e) {
                console.error("Failed to save to local storage", e)
            }

            if (!res.ok) throw new Error("Failed to save")

            router.push("/contacts")
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
                    <label className="text-sm font-medium">Full Name</label>
                    <Input {...form.register("name")} placeholder="e.g. John Doe" />
                    {form.formState.errors.name && (
                        <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Role/Title</label>
                        <Input {...form.register("role")} placeholder="e.g. Technical Recruiter" />
                        {form.formState.errors.role && (
                            <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input {...form.register("company")} placeholder="e.g. Google" />
                        {form.formState.errors.company && (
                            <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input {...form.register("email")} placeholder="john@example.com" type="email" />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input {...form.register("phone")} placeholder="+1 234 567 890" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Relationship</label>
                    <select
                        {...form.register("relationshipType")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="recruiter">Recruiter</option>
                        <option value="hiring-manager">Hiring Manager</option>
                        <option value="employee">Employee</option>
                        <option value="referral">Referral</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Last Contact Date</label>
                    <Input type="date" {...form.register("lastContactDate")} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
                        {...form.register("notes")}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Met on LinkedIn..."
                    />
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {initialData ? "Update Contact" : "Add Contact"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
