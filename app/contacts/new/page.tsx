import { ContactForm } from "@/components/contacts/ContactForm"

export default function NewContactPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Add New Contact</h2>
            </div>
            <ContactForm />
        </div>
    )
}
