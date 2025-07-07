export interface QuestionAnalytics {
  questionId: string
  questionTitle: string
  questionType: string
  totalResponses: number
  responseRate: number
  averageTime?: number
  responses: Array<{
    value: any
    count: number
    percentage: number
  }>
  textResponses?: string[]
  numericStats?: {
    mean: number
    median: number
    mode: number
    min: number
    max: number
    standardDeviation: number
  }
}

export interface SurveyAnalytics {
  surveyId: string
  totalResponses: number
  completionRate: number
  averageCompletionTime: number
  dropOffPoints: Array<{
    questionId: string
    dropOffRate: number
  }>
  questionAnalytics: QuestionAnalytics[]
  responsesByDate: Array<{
    date: string
    count: number
  }>
  demographics?: Record<string, any>
}
