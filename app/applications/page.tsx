import Link from "next/link"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
    const applications = await db.applications.getAll();

    // Sort by date applied desc
    const sortedApps = [...applications].sort((a, b) => {
        const dateA = a.dateApplied ? new Date(a.dateApplied).getTime() : 0;
        const dateB = b.dateApplied ? new Date(b.dateApplied).getTime() : 0;
        return dateB - dateA;
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
                <Link href="/applications/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Application
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedApps.map((app) => (
                    <Card key={app.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{app.position}</h3>
                                    <p className="text-sm text-muted-foreground">{app.companyName}</p>
                                </div>
                                <Badge variant={
                                    app.status === 'offer' || app.status === 'accepted' ? 'default' :
                                        app.status === 'rejected' ? 'destructive' : 'secondary'
                                }>
                                    {app.status}
                                </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground gap-4">
                                <span>{app.type}</span>
                                <span>•</span>
                                <span>{app.location || 'Remote'}</span>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2">
                                Applied {app.dateApplied ? formatDistanceToNow(new Date(app.dateApplied), { addSuffix: true }) : 'No date'}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {sortedApps.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No applications found. Start by adding one!
                    </div>
                )}
            </div>
        </div>
    )
}
