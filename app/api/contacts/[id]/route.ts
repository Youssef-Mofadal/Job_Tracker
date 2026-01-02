import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const contacts = await db.contacts.getAll();
        const contact = contacts.find((c) => c.id === params.id);

        if (!contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }

        return NextResponse.json(contact);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const updatedContact = await db.contacts.update(params.id, body);

        if (!updatedContact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }

        return NextResponse.json(updatedContact);
    } catch {
        return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const success = await db.contacts.delete(params.id);

        if (!success) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }
}
