"use client"

import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCurrentView } from "@/lib/store/slices/ui-slice"
import { startSurveyResponse } from "@/lib/store/slices/survey-response-slice"
import { SurveyRenderer } from "./survey-renderer"

export function SurveyTaker() {
  const dispatch = useAppDispatch()
  const currentSurvey = useAppSelector((state) => state.surveyBuilder.currentSurvey)
  const currentResponse = useAppSelector((state) => state.surveyResponse.currentResponse)

  useEffect(() => {
    if (currentSurvey && !currentResponse) {
      dispatch(startSurveyResponse({ surveyId: currentSurvey.id }))
    }
  }, [currentSurvey, currentResponse, dispatch])

  if (!currentSurvey) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No survey selected</p>
        <Button onClick={() => dispatch(setCurrentView("dashboard"))}>Back to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => dispatch(setCurrentView("preview"))}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Preview
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-muted-foreground">Take Survey</h1>
          <p className="text-gray-600">Experience the survey as a respondent</p>
        </div>
      </div>

      {/* Survey Container */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <SurveyRenderer survey={currentSurvey} isPreview={false} />
      </div>
    </div>
  )
}
