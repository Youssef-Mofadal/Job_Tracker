"use client"

import { useEffect, useState } from "react"
import { Contact } from "@/types/contact"
import { ContactCard } from "@/components/contacts/ContactCard"

interface ContactListProps {
    initialContacts: Contact[]
}

export function ContactList({ initialContacts }: ContactListProps) {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts)

    useEffect(() => {
        // Load local contacts from localStorage
        const stored = localStorage.getItem('job_tracker_local_contacts')
        if (stored) {
            try {
                const localContacts = JSON.parse(stored)
                // Merge local contacts with server contacts (avoiding duplicates by ID)
                const serverIds = new Set(initialContacts.map(c => c.id))
                const uniqueLocal = localContacts.filter((c: Contact) => !serverIds.has(c.id))

                if (uniqueLocal.length > 0) {
                    setContacts(prev => [...prev, ...uniqueLocal])
                }
            } catch (e) {
                console.error("Failed to parse local contacts", e)
            }
        }
    }, [initialContacts])

    if (contacts.length === 0) {
        return (
            <div className="col-span-full text-center py-10 text-muted-foreground">
                No contacts found. Build your network!
            </div>
        )
    }

    return (
        <>
            {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </>
    )
}
