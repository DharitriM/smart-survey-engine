"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  updateAnswer,
  nextStep,
  previousStep,
  submitSurveyResponse,
  completeSurveySubmission,
  setValidationErrors,
} from "@/lib/store/slices/survey-response-slice"
import { addNotification } from "@/lib/store/slices/ui-slice"
import type { Survey } from "@/lib/types/survey"
import { validateStep } from "@/lib/utils/validation"
import { QuestionRenderer } from "./question-renderer"

interface SurveyRendererProps {
  survey: Survey
  isPreview: boolean
}

export function SurveyRenderer({ survey, isPreview }: SurveyRendererProps) {
  const dispatch = useAppDispatch()
  const currentResponse = useAppSelector((state) => state.surveyResponse.currentResponse)
  const currentStep = useAppSelector((state) => state.surveyResponse.currentStep)
  const validationErrors = useAppSelector((state) => state.surveyResponse.validationErrors)
  const isSubmitting = useAppSelector((state) => state.surveyResponse.isSubmitting)

  const [isComplete, setIsComplete] = useState(false)

  const { questions, settings } = survey
  const totalSteps = settings.oneQuestionPerPage ? questions.length : 1
  const currentQuestions = settings.oneQuestionPerPage ? [questions[currentStep]] : questions

  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleAnswerChange = (questionId: string, answer: any) => {
    if (!isPreview) {
      dispatch(updateAnswer({ questionId, answer }))
    }
  }

  const handleNext = () => {
    if (isPreview) {
      if (currentStep < totalSteps - 1) {
        dispatch(nextStep())
      }
      return
    }

    // Validate current step
    const errors = validateStep(currentQuestions, currentResponse?.answers || {})

    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors))
      return
    }

    dispatch(setValidationErrors({}))

    if (currentStep < totalSteps - 1) {
      dispatch(nextStep())
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch(previousStep())
    }
  }

  const handleSubmit = () => {
    if (isPreview) return

    // Final validation
    const errors = validateStep(questions, currentResponse?.answers || {})

    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors))
      return
    }

    dispatch(submitSurveyResponse())
    setIsComplete(true)

    dispatch(
      addNotification({
        type: "success",
        message: "Survey submitted successfully!",
      }),
    )

    // Complete submission after a delay
    setTimeout(() => {
      dispatch(completeSurveySubmission())
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-muted-foreground mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">Your response has been submitted successfully.</p>
        {isSubmitting && <p className="text-sm text-gray-500">Saving your response...</p>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Survey Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-muted-foreground mb-2">{survey.title}</h1>
        {survey.description && <p className="text-gray-600">{survey.description}</p>}
      </div>

      {/* Progress Bar */}
      {settings.showProgressBar && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((question, index) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            value={currentResponse?.answers[question.id]?.value}
            onChange={(answer) => handleAnswerChange(question.id, answer)}
            error={validationErrors[question.id]}
            questionNumber={settings.oneQuestionPerPage ? currentStep + 1 : index + 1}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || !settings.allowBackNavigation}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button onClick={handleNext}>
          {currentStep === totalSteps - 1 ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              {isPreview ? "Finish Preview" : "Submit"}
            </>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
