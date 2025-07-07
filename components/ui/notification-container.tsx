"use client"

import { useEffect } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { removeNotification } from "@/lib/store/slices/ui-slice"
import { cn } from "@/lib/utils"

export function NotificationContainer() {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.ui.notifications)

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id))
      }, 5000)

      return () => clearTimeout(timer)
    })
  }, [notifications, dispatch])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle
      case "error":
        return AlertCircle
      case "warning":
        return AlertTriangle
      case "info":
        return Info
      default:
        return Info
    }
  }

  const getStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const Icon = getIcon(notification.type)

        return (
          <div
            key={notification.id}
            className={cn(
              "flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-sm",
              getStyles(notification.type),
            )}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{notification.message}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(removeNotification(notification.id))}
              className="h-6 w-6 p-0 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
