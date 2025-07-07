"use client"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { SurveyApp } from "@/components/survey-app"
import { AuthPage } from "@/components/auth/auth-page"
import { useAuth } from "@/lib/hooks/use-auth"

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-background">
      <SurveyApp />
    </div>
  )
}

export default function Home() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
