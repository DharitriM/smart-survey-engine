import type { Survey, SurveyResponse } from "@/lib/types/survey"

const SURVEYS_KEY = "smart-survey-surveys"
const RESPONSES_KEY = "smart-survey-responses"

export const storage = {
  surveys: {
    save: (surveys: Survey[]) => {
      try {
        localStorage.setItem(SURVEYS_KEY, JSON.stringify(surveys))
      } catch (error) {
        console.error("Failed to save surveys to localStorage:", error)
      }
    },

    load: (): Survey[] => {
      try {
        const data = localStorage.getItem(SURVEYS_KEY)
        return data ? JSON.parse(data) : []
      } catch (error) {
        console.error("Failed to load surveys from localStorage:", error)
        return []
      }
    },
  },

  responses: {
    save: (responses: SurveyResponse[]) => {
      try {
        localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses))
      } catch (error) {
        console.error("Failed to save responses to localStorage:", error)
      }
    },

    load: (): SurveyResponse[] => {
      try {
        const data = localStorage.getItem(RESPONSES_KEY)
        return data ? JSON.parse(data) : []
      } catch (error) {
        console.error("Failed to load responses from localStorage:", error)
        return []
      }
    },
  },
}
