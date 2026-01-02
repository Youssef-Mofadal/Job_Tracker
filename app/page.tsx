import { db } from "@/lib/db"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { RecentApplications } from "@/components/dashboard/RecentApplications"
import { StatusChart } from "@/components/dashboard/StatusChart"
import { Briefcase, Calendar, CheckCircle2, XCircle } from "lucide-react"

export const dynamic = 'force-dynamic'; // Force dynamic for local JSON updates to show

export default async function Home() {
  const applications = await db.applications.getAll();

  // Calculate Stats
  const totalApps = applications.length;
  const interviews = applications.filter(a => a.status === 'interview').length;
  const offers = applications.filter(a => a.status === 'offer' || a.status === 'accepted').length;
  const rejected = applications.filter(a => a.status === 'rejected').length;

  // Chart Data
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Recent 5
  const recentApps = [...applications].sort((a, b) => {
    const dateA = a.dateApplied ? new Date(a.dateApplied).getTime() : 0;
    const dateB = b.dateApplied ? new Date(b.dateApplied).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 5);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Applications"
          value={totalApps}
          icon={Briefcase}
          description="All time applications"
        />
        <StatsCard
          title="Interviews"
          value={interviews}
          icon={Calendar}
          description="Scheduled interviews"
        />
        <StatsCard
          title="Offers"
          value={offers}
          icon={CheckCircle2}
          description="Offers received"
        />
        <StatsCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          description="Applications rejected"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <StatusChart data={chartData} />
        <RecentApplications applications={recentApps} />
      </div>
    </div>
  );
}
