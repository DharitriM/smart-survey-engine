import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Survey, Question } from "@/lib/types/survey"
import { generateId } from "@/lib/utils/id-generator"

interface SurveyBuilderState {
  surveys: Survey[]
  currentSurvey: Survey | null
  isEditing: boolean
  previewMode: boolean
}

const initialState: SurveyBuilderState = {
  surveys: [],
  currentSurvey: null,
  isEditing: false,
  previewMode: false,
}

export const surveyBuilderSlice = createSlice({
  name: "surveyBuilder",
  initialState,
  reducers: {
    createSurvey: (state, action: PayloadAction<Partial<Survey>>) => {
      const newSurvey: Survey = {
        id: generateId(),
        title: action.payload.title || "Untitled Survey",
        description: action.payload.description || "",
        questions: [],
        settings: {
          allowAnonymous: true,
          showProgressBar: true,
          randomizeQuestions: false,
          oneQuestionPerPage: false,
          allowBackNavigation: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: false,
      }
      state.surveys.push(newSurvey)
      state.currentSurvey = newSurvey
      state.isEditing = true
    },

    updateSurvey: (state, action: PayloadAction<Partial<Survey>>) => {
      if (state.currentSurvey) {
        Object.assign(state.currentSurvey, {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        })

        const index = state.surveys.findIndex((s) => s.id === state.currentSurvey!.id)
        if (index !== -1) {
          state.surveys[index] = state.currentSurvey
        }
      }
    },

    addQuestion: (state, action: PayloadAction<Partial<Question>>) => {
      if (state.currentSurvey) {
        const newQuestion: Question = {
          id: generateId(),
          type: action.payload.type || "text",
          title: action.payload.title || "New Question",
          description: action.payload.description || "",
          required: action.payload.required || false,
          options: action.payload.options || [],
          validation: action.payload.validation || {},
          conditionalLogic: action.payload.conditionalLogic,
          order: state.currentSurvey.questions.length,
        }
        state.currentSurvey.questions.push(newQuestion)
      }
    },

    updateQuestion: (state, action: PayloadAction<{ id: string; updates: Partial<Question> }>) => {
      if (state.currentSurvey) {
        const questionIndex = state.currentSurvey.questions.findIndex((q) => q.id === action.payload.id)
        if (questionIndex !== -1) {
          Object.assign(state.currentSurvey.questions[questionIndex], action.payload.updates)
        }
      }
    },

    deleteQuestion: (state, action: PayloadAction<string>) => {
      if (state.currentSurvey) {
        state.currentSurvey.questions = state.currentSurvey.questions.filter((q) => q.id !== action.payload)
        // Update order for remaining questions
        state.currentSurvey.questions.forEach((question, index) => {
          question.order = index
        })
      }
    },

    reorderQuestions: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      if (state.currentSurvey) {
        const { fromIndex, toIndex } = action.payload
        const questions = [...state.currentSurvey.questions]
        const [removed] = questions.splice(fromIndex, 1)
        questions.splice(toIndex, 0, removed)

        // Update order property
        questions.forEach((question, index) => {
          question.order = index
        })

        state.currentSurvey.questions = questions
      }
    },

    loadSurvey: (state, action: PayloadAction<string>) => {
      const survey = state.surveys.find((s) => s.id === action.payload)
      if (survey) {
        state.currentSurvey = survey
        state.isEditing = true
      }
    },

    deleteSurvey: (state, action: PayloadAction<string>) => {
      state.surveys = state.surveys.filter((s) => s.id !== action.payload)
      if (state.currentSurvey?.id === action.payload) {
        state.currentSurvey = null
        state.isEditing = false
      }
    },

    togglePreviewMode: (state) => {
      state.previewMode = !state.previewMode
    },

    publishSurvey: (state) => {
      if (state.currentSurvey) {
        state.currentSurvey.isPublished = true
        state.currentSurvey.publishedAt = new Date().toISOString()

        // Update in surveys array
        const index = state.surveys.findIndex((s) => s.id === state.currentSurvey!.id)
        if (index !== -1) {
          state.surveys[index] = state.currentSurvey
        }
      }
    },

    duplicateSurvey: (state, action: PayloadAction<string>) => {
      const originalSurvey = state.surveys.find((s) => s.id === action.payload)
      if (originalSurvey) {
        const duplicatedSurvey: Survey = {
          ...originalSurvey,
          id: generateId(),
          title: `${originalSurvey.title} (Copy)`,
          isPublished: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: undefined,
          questions: originalSurvey.questions.map((q) => ({
            ...q,
            id: generateId(),
          })),
        }
        state.surveys.push(duplicatedSurvey)
      }
    },

    loadSurveysFromStorage: (state, action: PayloadAction<Survey[]>) => {
      state.surveys = action.payload
    },
  },
})

export const {
  createSurvey,
  updateSurvey,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
  loadSurvey,
  deleteSurvey,
  togglePreviewMode,
  publishSurvey,
  duplicateSurvey,
  loadSurveysFromStorage,
} = surveyBuilderSlice.actions
