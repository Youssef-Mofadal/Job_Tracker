export interface UserSettings {
    id: string;
    userId: string;

    // Profile
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    portfolio?: string;
    profilePicture?: string;

    // Preferences
    desiredRoles: string[];
    desiredSalary?: string;
    preferredLocations: string[];
    workModePreference: 'remote' | 'hybrid' | 'on-site' | 'any';
    industries: string[];

    // Notifications
    emailNotifications: boolean;
    interviewReminders: boolean;
    reminderTiming: number; // days before
    weeklyDigest: boolean;

    // UI
    darkMode: boolean;
    language: string;
    dateFormat: string;

    updatedAt: Date;
}
