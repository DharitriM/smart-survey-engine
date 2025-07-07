import type { Question } from "@/lib/types/survey"

export function validateAnswer(question: Question, answer: any): string | null {
  const { validation, required } = question

  // Check if required
  if (required && (answer === undefined || answer === null || answer === "")) {
    return validation.customMessage || "This field is required"
  }

  // If not required and empty, skip other validations
  if (!answer && !required) {
    return null
  }

  // String validations
  if (typeof answer === "string") {
    if (validation.minLength && answer.length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`
    }

    if (validation.maxLength && answer.length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`
    }

    if (validation.pattern) {
      const regex = new RegExp(validation.pattern)
      if (!regex.test(answer)) {
        return validation.customMessage || "Invalid format"
      }
    }
  }

  // Number validations
  if (typeof answer === "number" || (typeof answer === "string" && !isNaN(Number(answer)))) {
    const numValue = Number(answer)

    if (validation.min !== undefined && numValue < validation.min) {
      return `Minimum value is ${validation.min}`
    }

    if (validation.max !== undefined && numValue > validation.max) {
      return `Maximum value is ${validation.max}`
    }
  }

  // Email validation
  if (question.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(answer)) {
      return "Please enter a valid email address"
    }
  }

  // Phone validation
  if (question.type === "phone") {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(answer.replace(/\s/g, ""))) {
      return "Please enter a valid phone number"
    }
  }

  return null
}

export function validateStep(questions: Question[], answers: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {}

  questions.forEach((question) => {
    const answer = answers[question.id]?.value
    const error = validateAnswer(question, answer)

    if (error) {
      errors[question.id] = error
    }
  })

  return errors
}
