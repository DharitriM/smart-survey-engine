"use client"

import { useEffect, useState } from "react"
import { BarChart3, Users, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { calculateAnalytics } from "@/lib/store/slices/analytics-slice"
import { ResponseChart } from "./response-chart"
import { QuestionAnalytics } from "./question-analytics"

export function Analytics() {
  const dispatch = useAppDispatch()
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)
  const responses = useAppSelector((state) => state.surveyResponse.responses)
  const analytics = useAppSelector((state) => state.analytics.surveyAnalytics)

  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null)

  // Set initial survey selection
  useEffect(() => {
    if (surveys.length > 0 && !selectedSurveyId) {
      setSelectedSurveyId(surveys[0].id)
    }
  }, [surveys, selectedSurveyId])

  const selectedSurvey = selectedSurveyId ? surveys.find((s) => s.id === selectedSurveyId) : null
  const surveyResponses = selectedSurveyId ? responses.filter((r) => r.surveyId === selectedSurveyId) : []

  // Calculate analytics only when survey changes or responses change
  useEffect(() => {
    if (selectedSurvey && selectedSurveyId) {
      const existingAnalytics = analytics[selectedSurveyId]

      // Only recalculate if we don't have analytics or response count changed
      if (!existingAnalytics || existingAnalytics.totalResponses !== surveyResponses.length) {
        const surveyAnalytics = {
          surveyId: selectedSurvey.id,
          totalResponses: surveyResponses.length,
          completionRate:
            surveyResponses.length > 0
              ? (surveyResponses.filter((r) => r.isComplete).length / surveyResponses.length) * 100
              : 0,
          averageCompletionTime: 0,
          dropOffPoints: [],
          questionAnalytics: selectedSurvey.questions.map((question) => ({
            questionId: question.id,
            questionTitle: question.title,
            questionType: question.type,
            totalResponses: surveyResponses.filter((r) => r.answers[question.id]).length,
            responseRate:
              surveyResponses.length > 0
                ? (surveyResponses.filter((r) => r.answers[question.id]).length / surveyResponses.length) * 100
                : 0,
            responses: [],
          })),
          responsesByDate: [],
        }

        dispatch(calculateAnalytics({ surveyId: selectedSurvey.id, analytics: surveyAnalytics }))
      }
    }
  }, [selectedSurveyId, surveyResponses.length, dispatch, analytics, selectedSurvey])

  if (surveys.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">No Analytics Available</h2>
        <p className="text-muted-foreground">Create and publish surveys to see analytics data.</p>
      </div>
    )
  }

  const currentAnalytics = selectedSurveyId ? analytics[selectedSurveyId] : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Analyze survey performance and responses</p>
        </div>

        {surveys.length > 1 && (
          <Select value={selectedSurveyId || ""} onValueChange={setSelectedSurveyId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a survey" />
            </SelectTrigger>
            <SelectContent>
              {surveys.map((survey) => (
                <SelectItem key={survey.id} value={survey.id}>
                  {survey.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Overview Stats */}
      {currentAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentAnalytics.totalResponses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentAnalytics.completionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2 min</div>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedSurvey?.questions.length || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseChart surveyId={selectedSurveyId} />
        <Card>
          <CardHeader>
            <CardTitle>Response Distribution</CardTitle>
            <CardDescription>Responses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">Chart visualization would go here</div>
          </CardContent>
        </Card>
      </div>

      {/* Question Analytics */}
      {selectedSurvey && <QuestionAnalytics survey={selectedSurvey} responses={surveyResponses} />}
    </div>
  )
}
