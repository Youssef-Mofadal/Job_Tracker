import fs from 'fs/promises';
import path from 'path';
import { Application } from '@/types/application';
import { Contact } from '@/types/contact';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

async function readJsonFile<T>(filename: string): Promise<T[]> {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data, (key, value) => {
            // Revive dates
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
                return new Date(value);
            }
            return value;
        });
    } catch (error: unknown) {
        if ((error as { code?: string }).code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export const db = {
    applications: {
        getAll: () => readJsonFile<Application>('applications.json'),
        add: async (app: Application) => {
            const apps = await readJsonFile<Application>('applications.json');
            apps.push(app);
            await writeJsonFile('applications.json', apps);
            return app;
        },
        update: async (id: string, updates: Partial<Application>) => {
            const apps = await readJsonFile<Application>('applications.json');
            const index = apps.findIndex(a => a.id === id);
            if (index === -1) return null;
            apps[index] = { ...apps[index], ...updates, updatedAt: new Date() };
            await writeJsonFile('applications.json', apps);
            return apps[index];
        },
        delete: async (id: string) => {
            const apps = await readJsonFile<Application>('applications.json');
            const newApps = apps.filter(a => a.id !== id);
            await writeJsonFile('applications.json', newApps);
            return true;
        }
    },
    contacts: {
        getAll: () => readJsonFile<Contact>('contacts.json'),
        add: async (contact: Contact) => {
            const contacts = await readJsonFile<Contact>('contacts.json');
            contacts.push(contact);
            await writeJsonFile('contacts.json', contacts);
            return contact;
        },
        update: async (id: string, updates: Partial<Contact>) => {
            const contacts = await readJsonFile<Contact>('contacts.json');
            const index = contacts.findIndex(c => c.id === id);
            if (index === -1) return null;
            contacts[index] = { ...contacts[index], ...updates, updatedAt: new Date() };
            await writeJsonFile('contacts.json', contacts);
            return contacts[index];
        },
        delete: async (id: string) => {
            const contacts = await readJsonFile<Contact>('contacts.json');
            const newContacts = contacts.filter(c => c.id !== id);
            await writeJsonFile('contacts.json', newContacts);
            return true;
        }
    },
    // Add other entities as needed
};
