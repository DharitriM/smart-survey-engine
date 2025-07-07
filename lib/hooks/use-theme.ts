"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleTheme } from "@/lib/store/slices/ui-slice"

export function useTheme() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggle = () => {
    dispatch(toggleTheme())
  }

  return { theme, toggle }
}
