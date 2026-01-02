"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ApplicationStatus } from "@/types/application" 

// Define colors for statuses
const COLORS = {
    applied: '#3b82f6', // blue-500
    screening: '#eab308', // yellow-500
    interview: '#a855f7', // purple-500
    offer: '#22c55e', // green-500
    rejected: '#ef4444', // red-500
    accepted: '#15803d', // green-700
    withdrawn: '#6b7280', // gray-500
};

interface StatusChartProps {
    data: { name: string; value: number }[]
}

export function StatusChart({ data }: StatusChartProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
