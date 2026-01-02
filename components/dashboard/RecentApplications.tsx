import Link from "next/link"
import { Application } from "@/types/application"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ArrowUpRight } from "lucide-react"

interface RecentApplicationsProps {
    applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {applications.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No applications yet.</p>
                    ) : (
                        applications.map((app) => (
                            <div key={app.id} className="flex items-center">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{app.companyName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {app.position}
                                    </p>
                                </div>
                                <div className="ml-auto flex items-center gap-4">
                                    <Badge variant="outline">{app.status}</Badge>
                                    <div className="text-sm text-muted-foreground">
                                        {app.dateApplied ? formatDistanceToNow(new Date(app.dateApplied), { addSuffix: true }) : 'No date'}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {applications.length > 0 && (
                        <div className="pt-4 flex justify-end">
                            <Link href="/applications" className="text-sm text-primary flex items-center hover:underline">
                                View all <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
