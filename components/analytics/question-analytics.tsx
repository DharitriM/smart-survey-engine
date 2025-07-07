"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Survey, SurveyResponse } from "@/lib/types/survey"

interface QuestionAnalyticsProps {
  survey: Survey
  responses: SurveyResponse[]
}

export function QuestionAnalytics({ survey, responses }: QuestionAnalyticsProps) {
  const getQuestionStats = (questionId: string) => {
    const answeredResponses = responses.filter((r) => r.answers[questionId])
    const responseRate = responses.length > 0 ? (answeredResponses.length / responses.length) * 100 : 0

    return {
      totalResponses: answeredResponses.length,
      responseRate,
      answers: answeredResponses.map((r) => r.answers[questionId]?.value).filter(Boolean),
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Performance</CardTitle>
        <CardDescription>Response rates and engagement by question</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {survey.questions.map((question, index) => {
            const stats = getQuestionStats(question.id)

            return (
              <div key={question.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-muted-foreground">
                      {index + 1}. {question.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {question.type.replace("-", " ")} • {stats.totalResponses} responses
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-muted-foreground">{stats.responseRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">response rate</div>
                  </div>
                </div>

                <Progress value={stats.responseRate} className="h-2" />

                {/* Show sample answers for text questions */}
                {["text", "textarea"].includes(question.type) && stats.answers.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Sample responses:</p>
                    <div className="space-y-1">
                      {stats.answers.slice(0, 3).map((answer, i) => (
                        <p key={i} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          "{String(answer).substring(0, 100)}
                          {String(answer).length > 100 ? "..." : ""}"
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
