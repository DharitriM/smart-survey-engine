import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SurveyResponse } from "@/lib/types/survey"
import { generateId } from "@/lib/utils/id-generator"

interface SurveyResponseState {
  responses: SurveyResponse[]
  currentResponse: SurveyResponse | null
  currentStep: number
  isSubmitting: boolean
  validationErrors: Record<string, string>
}

const initialState: SurveyResponseState = {
  responses: [
    {
      id: "response-1",
      surveyId: "demo-survey-1",
      respondentId: "user-123",
      answers: {
        q1: {
          questionId: "q1",
          value: "satisfied",
          answeredAt: new Date(Date.now() - 3600000).toISOString(),
        },
        q2: {
          questionId: "q2",
          value: 4,
          answeredAt: new Date(Date.now() - 3500000).toISOString(),
        },
        q3: {
          questionId: "q3",
          value: "Great service, keep it up!",
          answeredAt: new Date(Date.now() - 3400000).toISOString(),
        },
      },
      startedAt: new Date(Date.now() - 3700000).toISOString(),
      completedAt: new Date(Date.now() - 3400000).toISOString(),
      isComplete: true,
      currentStep: 0,
    },
    {
      id: "response-2",
      surveyId: "demo-survey-1",
      respondentId: "user-456",
      answers: {
        q1: {
          questionId: "q1",
          value: "very-satisfied",
          answeredAt: new Date(Date.now() - 7200000).toISOString(),
        },
        q2: {
          questionId: "q2",
          value: 5,
          answeredAt: new Date(Date.now() - 7100000).toISOString(),
        },
      },
      startedAt: new Date(Date.now() - 7300000).toISOString(),
      isComplete: false,
      currentStep: 2,
    },
  ],
  currentResponse: null,
  currentStep: 0,
  isSubmitting: false,
  validationErrors: {},
}

export const surveyResponseSlice = createSlice({
  name: "surveyResponse",
  initialState,
  reducers: {
    startSurveyResponse: (state, action: PayloadAction<{ surveyId: string; respondentId?: string }>) => {
      state.currentResponse = {
        id: generateId(),
        surveyId: action.payload.surveyId,
        respondentId: action.payload.respondentId || "anonymous",
        answers: {},
        startedAt: new Date().toISOString(),
        isComplete: false,
        currentStep: 0,
      }
      state.currentStep = 0
      state.validationErrors = {}
    },

    updateAnswer: (state, action: PayloadAction<{ questionId: string; answer: any }>) => {
      if (state.currentResponse) {
        state.currentResponse.answers[action.payload.questionId] = {
          questionId: action.payload.questionId,
          value: action.payload.answer,
          answeredAt: new Date().toISOString(),
        }

        // Clear validation error for this question
        delete state.validationErrors[action.payload.questionId]
      }
    },

    nextStep: (state) => {
      state.currentStep += 1
      if (state.currentResponse) {
        state.currentResponse.currentStep = state.currentStep
      }
    },

    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1
        if (state.currentResponse) {
          state.currentResponse.currentStep = state.currentStep
        }
      }
    },

    setValidationErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.validationErrors = action.payload
    },

    submitSurveyResponse: (state) => {
      if (state.currentResponse) {
        state.isSubmitting = true
        state.currentResponse.isComplete = true
        state.currentResponse.completedAt = new Date().toISOString()
        state.responses.push(state.currentResponse)
      }
    },

    completeSurveySubmission: (state) => {
      state.isSubmitting = false
      state.currentResponse = null
      state.currentStep = 0
      state.validationErrors = {}
    },

    loadResponsesFromStorage: (state, action: PayloadAction<SurveyResponse[]>) => {
      state.responses = action.payload
    },
  },
})

export const {
  startSurveyResponse,
  updateAnswer,
  nextStep,
  previousStep,
  setValidationErrors,
  submitSurveyResponse,
  completeSurveySubmission,
  loadResponsesFromStorage,
} = surveyResponseSlice.actions
