"use client"

import { BarChart3, FileText, Plus, Home, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCurrentView } from "@/lib/store/slices/ui-slice"
import { createSurvey, loadSurvey } from "@/lib/store/slices/survey-builder-slice"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const dispatch = useAppDispatch()
  const { currentView, sidebarOpen } = useAppSelector((state) => state.ui)
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)

  const handleCreateSurvey = () => {
    dispatch(createSurvey({ title: "New Survey" }))
    dispatch(setCurrentView("builder"))
  }

  const handleViewChange = (view: any) => {
    dispatch(setCurrentView(view))
  }

  const handleSurveySelect = (surveyId: string) => {
    dispatch(loadSurvey(surveyId))
    dispatch(setCurrentView("builder"))
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
        sidebarOpen ? "w-64" : "w-16",
      )}
    >
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          {sidebarOpen && <span className="font-bold text-lg text-foreground">Survey Engine</span>}
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <Button
            variant={currentView === "dashboard" ? "default" : "ghost"}
            className={cn("w-full justify-start", !sidebarOpen && "px-2")}
            onClick={() => handleViewChange("dashboard")}
          >
            <Home className="h-5 w-5" />
            {sidebarOpen && <span className="ml-2">Dashboard</span>}
          </Button>

          <Button
            variant="outline"
            className={cn("w-full justify-start", !sidebarOpen && "px-2")}
            onClick={handleCreateSurvey}
          >
            <Plus className="h-5 w-5" />
            {sidebarOpen && <span className="ml-2">New Survey</span>}
          </Button>

          <Button
            variant={currentView === "analytics" ? "default" : "ghost"}
            className={cn("w-full justify-start", !sidebarOpen && "px-2")}
            onClick={() => handleViewChange("analytics")}
          >
            <BarChart3 className="h-5 w-5" />
            {sidebarOpen && <span className="ml-2">Analytics</span>}
          </Button>
        </div>

        {sidebarOpen && surveys.length > 0 && (
          <div className="mt-8 px-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Recent Surveys</h3>
            <div className="space-y-1">
              {surveys.slice(0, 5).map((survey) => (
                <Button
                  key={survey.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleSurveySelect(survey.id)}
                >
                  <div className="flex items-center space-x-2">
                    <PenTool className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{survey.title}</p>
                      <p className="text-xs text-muted-foreground">{survey.questions.length} questions</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </aside>
  )
}
