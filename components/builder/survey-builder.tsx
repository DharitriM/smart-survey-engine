"use client"

import { useState } from "react"
import { Save, Eye, Settings, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateSurvey, publishSurvey } from "@/lib/store/slices/survey-builder-slice"
import { setCurrentView, addNotification } from "@/lib/store/slices/ui-slice"
import { QuestionBuilder } from "./question-builder"
import { QuestionList } from "./question-list"
import { SurveySettings } from "./survey-settings"

export function SurveyBuilder() {
  const dispatch = useAppDispatch()
  const currentSurvey = useAppSelector((state) => state.surveyBuilder.currentSurvey)
  const [showSettings, setShowSettings] = useState(false)

  if (!currentSurvey) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No survey selected</p>
        <Button onClick={() => dispatch(setCurrentView("dashboard"))}>Back to Dashboard</Button>
      </div>
    )
  }

  const handleSurveyUpdate = (field: string, value: any) => {
    dispatch(updateSurvey({ [field]: value }))
  }

  const handleSave = () => {
    dispatch(
      addNotification({
        type: "success",
        message: "Survey saved successfully!",
      }),
    )
  }

  const handlePreview = () => {
    dispatch(setCurrentView("preview"))
  }

  const handlePublish = () => {
    dispatch(publishSurvey())
    dispatch(
      addNotification({
        type: "success",
        message: "Survey published successfully!",
      }),
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => dispatch(setCurrentView("dashboard"))}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-muted-foreground">Survey Builder</h1>
            <p className="text-gray-600">
              {currentSurvey.isPublished ? "Published" : "Draft"} • {currentSurvey.questions.length} questions
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>

          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          {!currentSurvey.isPublished && (
            <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
              Publish
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Survey Details */}
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Survey Title</label>
                <Input
                  value={currentSurvey.title}
                  onChange={(e) => handleSurveyUpdate("title", e.target.value)}
                  placeholder="Enter survey title..."
                  className="text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                <Textarea
                  value={currentSurvey.description}
                  onChange={(e) => handleSurveyUpdate("description", e.target.value)}
                  placeholder="Describe your survey..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <QuestionList />

          {/* Add Question */}
          <QuestionBuilder />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">{showSettings && <SurveySettings />}</div>
      </div>
    </div>
  )
}
