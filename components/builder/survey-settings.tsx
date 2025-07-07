"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateSurvey } from "@/lib/store/slices/survey-builder-slice"

export function SurveySettings() {
  const dispatch = useAppDispatch()
  const currentSurvey = useAppSelector((state) => state.surveyBuilder.currentSurvey)

  if (!currentSurvey) return null

  const handleSettingChange = (setting: string, value: boolean) => {
    dispatch(
      updateSurvey({
        settings: {
          ...currentSurvey.settings,
          [setting]: value,
        },
      }),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="allow-anonymous">Allow Anonymous Responses</Label>
          <Switch
            id="allow-anonymous"
            checked={currentSurvey.settings.allowAnonymous}
            onCheckedChange={(checked) => handleSettingChange("allowAnonymous", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-progress">Show Progress Bar</Label>
          <Switch
            id="show-progress"
            checked={currentSurvey.settings.showProgressBar}
            onCheckedChange={(checked) => handleSettingChange("showProgressBar", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="randomize-questions">Randomize Questions</Label>
          <Switch
            id="randomize-questions"
            checked={currentSurvey.settings.randomizeQuestions}
            onCheckedChange={(checked) => handleSettingChange("randomizeQuestions", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="one-per-page">One Question Per Page</Label>
          <Switch
            id="one-per-page"
            checked={currentSurvey.settings.oneQuestionPerPage}
            onCheckedChange={(checked) => handleSettingChange("oneQuestionPerPage", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="allow-back">Allow Back Navigation</Label>
          <Switch
            id="allow-back"
            checked={currentSurvey.settings.allowBackNavigation}
            onCheckedChange={(checked) => handleSettingChange("allowBackNavigation", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
