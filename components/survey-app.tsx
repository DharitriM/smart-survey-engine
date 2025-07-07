"use client"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { Dashboard } from "@/components/dashboard/dashboard"
import { SurveyBuilder } from "@/components/builder/survey-builder"
import { SurveyPreview } from "@/components/preview/survey-preview"
import { SurveyTaker } from "@/components/survey-taker/survey-taker"
import { Analytics } from "@/components/analytics/analytics"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { NotificationContainer } from "@/components/ui/notification-container"

export function SurveyApp() {
  const currentView = useAppSelector((state) => state.ui.currentView)
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  // Initialize localStorage integration
  useLocalStorage()

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />
      case "builder":
        return <SurveyBuilder />
      case "preview":
        return <SurveyPreview />
      case "take-survey":
        return <SurveyTaker />
      case "analytics":
        return <Analytics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <Header />

        <main className="flex-1 overflow-auto p-6 animate-fade-in">{renderCurrentView()}</main>
      </div>

      <NotificationContainer />
    </div>
  )
}
