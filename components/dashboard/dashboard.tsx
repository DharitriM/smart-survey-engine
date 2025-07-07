"use client"

import { Plus, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { createSurvey } from "@/lib/store/slices/survey-builder-slice"
import { setCurrentView } from "@/lib/store/slices/ui-slice"
import { SurveyList } from "./survey-list"
import { StatsCards } from "./stats-cards"
import { RecentActivity } from "./recent-activity"

export function Dashboard() {
  const dispatch = useAppDispatch()
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)
  const responses = useAppSelector((state) => state.surveyResponse.responses)

  const handleCreateSurvey = () => {
    dispatch(createSurvey({ title: "New Survey" }))
    dispatch(setCurrentView("builder"))
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-muted-foreground">Welcome 😉</h1>
          <p className="text-gray-600 mt-2">Manage your surveys and analyze responses from your dashboard.</p>
        </div>

        <Button onClick={handleCreateSurvey} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create Survey
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Survey List */}
        <div className="lg:col-span-2">
          <SurveyList />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={handleCreateSurvey}>
              <Plus className="h-6 w-6 mb-2" />
              Create New Survey
            </Button>

            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => dispatch(setCurrentView("analytics"))}
            >
              <BarChart3 className="h-6 w-6 mb-2" />
              View Analytics
            </Button>

            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Manage Respondents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
