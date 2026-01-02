import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Contact } from '@/types/contact';

export async function GET() {
    try {
        const contacts = await db.contacts.getAll();
        return NextResponse.json(contacts);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newContact: Contact = {
            ...body,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.contacts.add(newContact);

        return NextResponse.json(newContact, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }
}
