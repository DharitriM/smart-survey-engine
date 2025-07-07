export type QuestionType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "phone"
  | "single-choice"
  | "multiple-choice"
  | "dropdown"
  | "rating"
  | "scale"
  | "date"
  | "time"
  | "file-upload"
  | "matrix"
  | "ranking"

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  customMessage?: string
}

export interface ConditionalLogic {
  dependsOn: string // question ID
  condition: "equals" | "not-equals" | "contains" | "greater-than" | "less-than"
  value: any
  action: "show" | "hide" | "require"
}

export interface QuestionOption {
  id: string
  label: string
  value: string
  order: number
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options: QuestionOption[]
  validation: ValidationRule
  conditionalLogic?: ConditionalLogic
  order: number
  metadata?: Record<string, any>
}

export interface SurveySettings {
  allowAnonymous: boolean
  showProgressBar: boolean
  randomizeQuestions: boolean
  oneQuestionPerPage: boolean
  allowBackNavigation: boolean
  customTheme?: {
    primaryColor: string
    backgroundColor: string
    textColor: string
  }
}

export interface Survey {
  id: string
  title: string
  description: string
  questions: Question[]
  settings: SurveySettings
  createdAt: string
  updatedAt: string
  publishedAt?: string
  isPublished: boolean
  tags?: string[]
}

export interface QuestionResponse {
  questionId: string
  value: any
  answeredAt: string
}

export interface SurveyResponse {
  id: string
  surveyId: string
  respondentId: string
  answers: Record<string, QuestionResponse>
  startedAt: string
  completedAt?: string
  isComplete: boolean
  currentStep: number
  metadata?: Record<string, any>
}
