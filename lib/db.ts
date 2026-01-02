import fs from 'fs/promises';
import path from 'path';
import { Application } from '@/types/application';
import { Contact } from '@/types/contact';

import os from 'os';

const DATA_DIR = process.env.NODE_ENV === 'production'
    ? path.join(os.tmpdir(), 'job-tracker-data')
    : path.join(process.cwd(), 'data');

// In-memory cache to store data during runtime (for Vercel serverless where fs is readonly)
// Ideally this would be a real database.
const globalCache: {
    applications: Application[] | null;
    contacts: Contact[] | null;
} = {
    applications: null,
    contacts: null
};

async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        // Ignore mkdir error if we can't write (read-only system)
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
        } catch {
            console.warn("Could not create data directory, likely running in read-only environment.");
        }
    }
}

async function readJsonFile<T>(filename: string, cacheKey: 'applications' | 'contacts'): Promise<T[]> {
    // Return from cache if available
    if (globalCache[cacheKey]) {
        return globalCache[cacheKey] as T[];
    }

    // Otherwise try to read from file
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const parsed = JSON.parse(data, (key, value) => {
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
                return new Date(value);
            }
            return value;
        });

        // Populate cache
        globalCache[cacheKey] = parsed;
        return parsed;
    } catch (error: unknown) {
        // If file doesn't exist, return empty array and initialize cache
        if ((error as { code?: string }).code === 'ENOENT') {
            globalCache[cacheKey] = [];
            return [] as T[];
        }
        // If read fails for other reasons, return empty array safely
        console.warn(`Failed to read ${filename}, defaulting to empty array.`, error);
        globalCache[cacheKey] = [];
        return [] as T[];
    }
}

async function writeJsonFile<T>(filename: string, data: T[], cacheKey: 'applications' | 'contacts'): Promise<void> {
    // Always update cache first
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalCache[cacheKey] = data as any;

    // Try to write to disk, but don't fail if it doesn't work (Vercel)
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch {
        console.warn(`Failed to write to ${filename}. This is expected in read-only environments (e.g. Vercel). Data updated in memory only.`);
    }
}

export const db = {
    applications: {
        getAll: () => readJsonFile<Application>('applications.json', 'applications'),
        add: async (app: Application) => {
            const apps = await readJsonFile<Application>('applications.json', 'applications');
            apps.push(app);
            await writeJsonFile('applications.json', apps, 'applications');
            return app;
        },
        update: async (id: string, updates: Partial<Application>) => {
            const apps = await readJsonFile<Application>('applications.json', 'applications');
            const index = apps.findIndex(a => a.id === id);
            if (index === -1) return null;
            apps[index] = { ...apps[index], ...updates, updatedAt: new Date() };
            await writeJsonFile('applications.json', apps, 'applications');
            return apps[index];
        },
        delete: async (id: string) => {
            const apps = await readJsonFile<Application>('applications.json', 'applications');
            const newApps = apps.filter(a => a.id !== id);
            await writeJsonFile('applications.json', newApps, 'applications');
            return true;
        }
    },
    contacts: {
        getAll: () => readJsonFile<Contact>('contacts.json', 'contacts'),
        add: async (contact: Contact) => {
            const contacts = await readJsonFile<Contact>('contacts.json', 'contacts');
            contacts.push(contact);
            await writeJsonFile('contacts.json', contacts, 'contacts');
            return contact;
        },
        update: async (id: string, updates: Partial<Contact>) => {
            const contacts = await readJsonFile<Contact>('contacts.json', 'contacts');
            const index = contacts.findIndex(c => c.id === id);
            if (index === -1) return null;
            contacts[index] = { ...contacts[index], ...updates, updatedAt: new Date() };
            await writeJsonFile('contacts.json', contacts, 'contacts');
            return contacts[index];
        },
        delete: async (id: string) => {
            const contacts = await readJsonFile<Contact>('contacts.json', 'contacts');
            const newContacts = contacts.filter(c => c.id !== id);
            await writeJsonFile('contacts.json', newContacts, 'contacts');
            return true;
        }
    },
};
