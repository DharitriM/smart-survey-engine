"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  loadUserFromStorage,
} from "@/lib/store/slices/auth-slice"
import type { LoginCredentials, RegisterCredentials, User } from "@/lib/types/auth"
import { generateId } from "@/lib/utils/id-generator"

const USERS_STORAGE_KEY = "smart-survey-users"
const CURRENT_USER_KEY = "smart-survey-current-user"

export function useAuth() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth)

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY)
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          dispatch(loadUserFromStorage(user))
        } catch (error) {
          console.error("Failed to load user from storage:", error)
        }
      }
    }
  }, [dispatch])

  const getStoredUsers = (): User[] => {
    if (typeof window === "undefined") return []
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY)
      return users ? JSON.parse(users) : []
    } catch {
      return []
    }
  }

  const saveUser = (user: User) => {
    if (typeof window === "undefined") return
    const users = getStoredUsers()
    const existingIndex = users.findIndex((u) => u.id === user.id)

    if (existingIndex >= 0) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  }

  const login = async (credentials: LoginCredentials) => {
    dispatch(loginStart())

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const users = getStoredUsers()
      const user = users.find((u) => u.email === credentials.email)

      if (!user) {
        throw new Error("User not found")
      }

      // In a real app, you'd verify the password hash
      // For demo purposes, we'll accept any password

      const updatedUser = {
        ...user,
        lastLoginAt: new Date().toISOString(),
      }

      saveUser(updatedUser)
      dispatch(loginSuccess(updatedUser))
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : "Login failed"))
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    dispatch(registerStart())

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const users = getStoredUsers()
      const existingUser = users.find((u) => u.email === credentials.email)

      if (existingUser) {
        throw new Error("User already exists")
      }

      const newUser: User = {
        id: generateId(),
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        preferences: {
          theme: "system",
          emailNotifications: true,
          language: "en",
        },
      }

      saveUser(newUser)
      dispatch(registerSuccess(newUser))
    } catch (error) {
      dispatch(registerFailure(error instanceof Error ? error.message : "Registration failed"))
    }
  }

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
    dispatch(logout())
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: signOut,
  }
}
