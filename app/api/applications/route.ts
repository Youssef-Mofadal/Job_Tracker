import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Application } from '@/types/application';

export async function GET() {
    try {
        const applications = await db.applications.getAll();
        return NextResponse.json(applications);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation could go here
        const newApplication: Application = {
            ...body,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.applications.add(newApplication);

        return NextResponse.json(newApplication, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
    }
}
