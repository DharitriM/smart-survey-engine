import { configureStore } from "@reduxjs/toolkit"
import { surveyBuilderSlice } from "./slices/survey-builder-slice"
import { surveyResponseSlice } from "./slices/survey-response-slice"
import { uiSlice } from "./slices/ui-slice"
import { analyticsSlice } from "./slices/analytics-slice"
import { authSlice } from "./slices/auth-slice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    surveyBuilder: surveyBuilderSlice.reducer,
    surveyResponse: surveyResponseSlice.reducer,
    ui: uiSlice.reducer,
    analytics: analyticsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
