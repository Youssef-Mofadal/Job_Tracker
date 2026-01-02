import Link from "next/link"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ContactList } from "@/components/contacts/ContactList"

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
    const contacts = await db.contacts.getAll();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
                <Link href="/contacts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Contact
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ContactList initialContacts={contacts} />
            </div>
        </div>
    )
}
