"use client"

import { FileText, Users, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

export function StatsCards() {
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)
  const responses = useAppSelector((state) => state.surveyResponse.responses)

  const publishedSurveys = surveys.filter((s) => s.isPublished).length
  const totalResponses = responses.length
  const completedResponses = responses.filter((r) => r.isComplete).length
  const completionRate = totalResponses > 0 ? (completedResponses / totalResponses) * 100 : 0

  // Calculate average completion time (mock calculation)
  const avgCompletionTime = responses.length > 0 ? "4.2 min" : "0 min"

  // Calculate trends (mock calculation based on recent activity)
  const recentSurveys = surveys.filter(
    (s) => new Date(s.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).length
  const surveyTrend = recentSurveys > 0 ? "+12%" : "0%"

  const recentResponses = responses.filter(
    (r) => new Date(r.startedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).length
  const responseTrend = recentResponses > 0 ? "+23%" : "0%"

  const stats = [
    {
      title: "Total Surveys",
      value: surveys.length,
      icon: FileText,
      description: `${publishedSurveys} published`,
      trend: surveyTrend,
    },
    {
      title: "Total Responses",
      value: totalResponses,
      icon: Users,
      description: `${completedResponses} completed`,
      trend: responseTrend,
    },
    {
      title: "Completion Rate",
      value: `${completionRate.toFixed(1)}%`,
      icon: TrendingUp,
      description: "Average across all surveys",
      trend: completionRate > 50 ? "+5%" : "-2%",
    },
    // {
    //   title: "Avg. Time",
    //   value: avgCompletionTime,
    //   icon: Clock,
    //   description: "Average completion time",
    //   trend: "-8%",
    // },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
