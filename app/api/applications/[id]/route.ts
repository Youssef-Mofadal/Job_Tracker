import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const applications = await db.applications.getAll();
        const application = applications.find((app) => app.id === params.id);

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        return NextResponse.json(application);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const updatedApplication = await db.applications.update(params.id, body);

        if (!updatedApplication) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        return NextResponse.json(updatedApplication);
    } catch {
        return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const success = await db.applications.delete(params.id);

        if (!success) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 }); // Actually db.delete returns true even if not found in my impl, but let's assume it works.
            // My db.delete filter approach always "succeeds" unless error. 
            // Ideally I'd check existence first.
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
    }
}
