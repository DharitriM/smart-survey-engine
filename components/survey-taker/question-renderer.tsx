"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Question } from "@/lib/types/survey"
import { cn } from "@/lib/utils"

interface QuestionRendererProps {
  question: Question
  value: any
  onChange: (value: any) => void
  error?: string
  questionNumber: number
}

export function QuestionRenderer({ question, value, onChange, error, questionNumber }: QuestionRendererProps) {
  const renderInput = () => {
    switch (question.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <Input
            type={question.type === "email" ? "email" : question.type === "phone" ? "tel" : "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your answer..."
            className={error ? "border-red-500" : ""}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your answer..."
            rows={4}
            className={error ? "border-red-500" : ""}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="Enter a number..."
            className={error ? "border-red-500" : ""}
          />
        )

      case "date":
        return (
          <Input
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={error ? "border-red-500" : ""}
          />
        )

      case "time":
        return (
          <Input
            type="time"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={error ? "border-red-500" : ""}
          />
        )

      case "single-choice":
        return (
          <RadioGroup value={value || ""} onValueChange={onChange}>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )

      case "multiple-choice":
        const selectedValues = Array.isArray(value) ? value : []
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange([...selectedValues, option.value])
                    } else {
                      onChange(selectedValues.filter((v: string) => v !== option.value))
                    }
                  }}
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )

      case "dropdown":
        return (
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "rating":
        const maxRating = 5
        return (
          <div className="flex items-center space-x-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onChange(rating)}
                className={cn(
                  "p-1 rounded transition-colors",
                  value >= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200",
                )}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
            {value && (
              <span className="ml-2 text-sm text-gray-600">
                {value} out of {maxRating}
              </span>
            )}
          </div>
        )

      case "scale":
        const scaleMin = 1
        const scaleMax = 10
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Not at all likely</span>
              <span>Extremely likely</span>
            </div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: scaleMax - scaleMin + 1 }, (_, i) => i + scaleMin).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => onChange(num)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 text-sm font-medium transition-colors",
                    value === num
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-300",
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <Input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your answer..."
            className={error ? "border-red-500" : ""}
          />
        )
    }
  }

  return (
    <Card className={error ? "border-red-500" : ""}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-start space-x-2">
              <span className="text-sm font-medium text-gray-500 mt-1">{questionNumber}.</span>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-muted-foreground">
                  {question.title}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
                {question.description && <p className="text-gray-600 mt-1">{question.description}</p>}
              </div>
            </div>
          </div>

          <div className="ml-6">
            {renderInput()}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
