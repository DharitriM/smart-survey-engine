import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ViewMode = "dashboard" | "builder" | "preview" | "analytics" | "take-survey"

interface UIState {
  currentView: ViewMode
  sidebarOpen: boolean
  selectedSurveyId: string | null
  theme: "light" | "dark"
  notifications: Array<{
    id: string
    type: "success" | "error" | "warning" | "info"
    message: string
    timestamp: string
  }>
}

const initialState: UIState = {
  currentView: "dashboard",
  sidebarOpen: true,
  selectedSurveyId: null,
  theme: "light",
  notifications: [],
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<ViewMode>) => {
      state.currentView = action.payload
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },

    setSelectedSurvey: (state, action: PayloadAction<string | null>) => {
      state.selectedSurveyId = action.payload
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"
    },

    addNotification: (state, action: PayloadAction<Omit<UIState["notifications"][0], "id" | "timestamp">>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      state.notifications.push(notification)
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { setCurrentView, toggleSidebar, setSelectedSurvey, toggleTheme, addNotification, removeNotification } =
  uiSlice.actions
