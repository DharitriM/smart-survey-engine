"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCurrentView } from "@/lib/store/slices/ui-slice"
import { SurveyRenderer } from "@/components/survey-taker/survey-renderer"

export function SurveyPreview() {
  const dispatch = useAppDispatch()
  const currentSurvey = useAppSelector((state) => state.surveyBuilder.currentSurvey)

  if (!currentSurvey) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No survey selected for preview</p>
        <Button onClick={() => dispatch(setCurrentView("dashboard"))}>Back to Dashboard</Button>
      </div>
    )
  }

  const handleTakeSurvey = () => {
    dispatch(setCurrentView("take-survey"))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => dispatch(setCurrentView("builder"))}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-muted-foreground">Survey Preview</h1>
            <p className="text-gray-600">Preview how your survey will look to respondents</p>
          </div>
        </div>

        <Button onClick={handleTakeSurvey}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Take Survey
        </Button>
      </div>

      {/* Preview Container */}
      <Card>
        <CardHeader>
          <div className="text-center">
            <CardTitle className="text-xl">{currentSurvey.title}</CardTitle>
            {currentSurvey.description && <p className="text-gray-600 mt-2">{currentSurvey.description}</p>}
          </div>
        </CardHeader>
        <CardContent>
          <SurveyRenderer survey={currentSurvey} isPreview={true} />
        </CardContent>
      </Card>
    </div>
  )
}
