"use client"

import { ChevronUp, ChevronDown, Edit, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { reorderQuestions, deleteQuestion } from "@/lib/store/slices/survey-builder-slice"
import { QuestionTypeIcon } from "./question-type-icon"

export function QuestionList() {
  const dispatch = useAppDispatch()
  const currentSurvey = useAppSelector((state) => state.surveyBuilder.currentSurvey)

  if (!currentSurvey || currentSurvey.questions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 mb-4">No questions added yet</p>
          <p className="text-sm text-gray-400">Add your first question using the question builder below</p>
        </CardContent>
      </Card>
    )
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      dispatch(reorderQuestions({ fromIndex: index, toIndex: index - 1 }))
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < currentSurvey.questions.length - 1) {
      dispatch(reorderQuestions({ fromIndex: index, toIndex: index + 1 }))
    }
  }

  const handleDeleteQuestion = (questionId: string) => {
    dispatch(deleteQuestion(questionId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions ({currentSurvey.questions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentSurvey.questions.map((question, index) => (
            <div key={question.id} className=" border border-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === currentSurvey.questions.length - 1}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <QuestionTypeIcon type={question.type} />
                    <Badge variant="outline" className="text-xs">
                      {question.type.replace("-", " ")}
                    </Badge>
                    {question.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>

                  <h4 className="font-medium text-muted-foreground mb-1">{question.title}</h4>

                  {question.description && <p className="text-sm text-gray-600 mb-2">{question.description}</p>}

                  {question.options.length > 0 && (
                    <div className="text-xs text-gray-500">{question.options.length} options</div>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
