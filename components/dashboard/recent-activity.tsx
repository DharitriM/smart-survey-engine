"use client"

import { Clock, User, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

export function RecentActivity() {
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)
  const responses = useAppSelector((state) => state.surveyResponse.responses)

  // Generate recent activity items
  const recentActivity = [
    ...surveys.slice(0, 3).map((survey) => ({
      id: survey.id,
      type: "survey_created",
      title: `Survey "${survey.title}" created`,
      timestamp: survey.createdAt,
      icon: FileText,
    })),
    ...responses.slice(0, 3).map((response) => ({
      id: response.id,
      type: "response_received",
      title: "New survey response received",
      timestamp: response.startedAt,
      icon: User,
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and changes</CardDescription>
      </CardHeader>
      <CardContent>
        {recentActivity.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <activity.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">{activity.title}</p>
                  <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
