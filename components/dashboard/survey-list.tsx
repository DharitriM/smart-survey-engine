"use client"
import { MoreHorizontal, Eye, Edit, Copy, Trash2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loadSurvey, duplicateSurvey, createSurvey, deleteSurvey } from "@/lib/store/slices/survey-builder-slice"
import { setCurrentView } from "@/lib/store/slices/ui-slice"
import { addNotification } from "@/lib/store/slices/ui-slice"

export function SurveyList() {
  const dispatch = useAppDispatch()
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)
  const responses = useAppSelector((state) => state.surveyResponse.responses)

  const handleEditSurvey = (surveyId: string) => {
    dispatch(loadSurvey(surveyId))
    dispatch(setCurrentView("builder"))
  }

  const handlePreviewSurvey = (surveyId: string) => {
    dispatch(loadSurvey(surveyId))
    dispatch(setCurrentView("preview"))
  }

  const handleDuplicateSurvey = (surveyId: string) => {
    dispatch(duplicateSurvey(surveyId))
    dispatch(
      addNotification({
        type: "success",
        message: "Survey duplicated successfully!",
      }),
    )
  }

  const handleDeleteSurvey = (surveyId: string) => {
    dispatch(deleteSurvey(surveyId))
    dispatch(
      addNotification({
        type: "success",
        message: "Survey deleted successfully!",
      }),
    )
  }

  const handleViewAnalytics = (surveyId: string) => {
    dispatch(loadSurvey(surveyId))
    dispatch(setCurrentView("analytics"))
  }

  const getSurveyResponseCount = (surveyId: string) => {
    return responses.filter((r) => r.surveyId === surveyId).length
  }

  if (surveys.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Surveys</CardTitle>
          <CardDescription>
            You haven't created any surveys yet. Create your first survey to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">No surveys found</p>
            <Button
              onClick={() => {
                dispatch(createSurvey({ title: "New Survey" }))
                dispatch(setCurrentView("builder"))
              }}
            >
              Create Your First Survey
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Surveys</CardTitle>
        <CardDescription>Manage and track your survey performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-foreground">{survey.title}</h3>
                  <Badge variant={survey.isPublished ? "default" : "secondary"}>
                    {survey.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-1">{survey.description || "No description"}</p>

                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>{survey.questions.length} questions</span>
                  <span>{getSurveyResponseCount(survey.id)} responses</span>
                  <span>Updated {new Date(survey.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditSurvey(survey.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePreviewSurvey(survey.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicateSurvey(survey.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleViewAnalytics(survey.id)}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => handleDeleteSurvey(survey.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
