import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SurveyAnalytics } from "@/lib/types/analytics"

interface AnalyticsState {
  surveyAnalytics: Record<string, SurveyAnalytics>
  isLoading: boolean
}

const initialState: AnalyticsState = {
  surveyAnalytics: {},
  isLoading: false,
}

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    calculateAnalytics: (state, action: PayloadAction<{ surveyId: string; analytics: SurveyAnalytics }>) => {
      state.surveyAnalytics[action.payload.surveyId] = action.payload.analytics
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { calculateAnalytics, setLoading } = analyticsSlice.actions
