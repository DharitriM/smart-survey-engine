"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

interface ResponseChartProps {
  surveyId: string | null
}

export function ResponseChart({ surveyId }: ResponseChartProps) {
  const responses = useAppSelector((state) =>
    surveyId ? state.surveyResponse.responses.filter((r) => r.surveyId === surveyId) : [],
  )

  const completedResponses = responses.filter((r) => r.isComplete).length
  const incompleteResponses = responses.length - completedResponses

  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Status</CardTitle>
        <CardDescription>Completed vs incomplete responses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Completed</span>
            <span className="text-sm text-muted-foreground">{completedResponses}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: responses.length > 0 ? `${(completedResponses / responses.length) * 100}%` : "0%",
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Incomplete</span>
            <span className="text-sm text-muted-foreground">{incompleteResponses}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: responses.length > 0 ? `${(incompleteResponses / responses.length) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
