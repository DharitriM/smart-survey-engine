"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loadSurveysFromStorage } from "@/lib/store/slices/survey-builder-slice"
import { loadResponsesFromStorage } from "@/lib/store/slices/survey-response-slice"
import { storage } from "@/lib/utils/storage"

export function useLocalStorage() {
  const dispatch = useAppDispatch()
  const surveys = useAppSelector((state) => state.surveyBuilder.surveys)
  const responses = useAppSelector((state) => state.surveyResponse.responses)
  const user = useAppSelector((state) => state.auth.user)

  // Load data on mount
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const savedSurveys = storage.surveys.load()
      const savedResponses = storage.responses.load()

      dispatch(loadSurveysFromStorage(savedSurveys))
      dispatch(loadResponsesFromStorage(savedResponses))
    }
  }, [dispatch, user])

  // Save surveys when they change
  useEffect(() => {
    if (typeof window !== "undefined" && user && surveys.length >= 0) {
      storage.surveys.save(surveys)
    }
  }, [surveys, user])

  // Save responses when they change
  useEffect(() => {
    if (typeof window !== "undefined" && user && responses.length >= 0) {
      storage.responses.save(responses)
    }
  }, [responses, user])
}
