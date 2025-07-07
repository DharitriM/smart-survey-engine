"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAppDispatch } from "@/lib/hooks"
import { addQuestion } from "@/lib/store/slices/survey-builder-slice"
import type { QuestionType, QuestionOption } from "@/lib/types/survey"
import { generateId } from "@/lib/utils/id-generator"

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "single-choice", label: "Single Choice" },
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "dropdown", label: "Dropdown" },
  { value: "rating", label: "Rating" },
  { value: "scale", label: "Scale" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
]

export function QuestionBuilder() {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [questionData, setQuestionData] = useState({
    type: "text" as QuestionType,
    title: "",
    description: "",
    required: false,
    options: [] as QuestionOption[],
  })

  const handleAddOption = () => {
    const newOption: QuestionOption = {
      id: generateId(),
      label: "",
      value: "",
      order: questionData.options.length,
    }
    setQuestionData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }))
  }

  const handleUpdateOption = (index: number, field: keyof QuestionOption, value: string) => {
    setQuestionData((prev) => ({
      ...prev,
      options: prev.options.map((option, i) =>
        i === index
          ? {
              ...option,
              [field]: value,
              // Auto-set value to match label if updating label
              ...(field === "label" ? { value: value.toLowerCase().replace(/\s+/g, "-") } : {}),
            }
          : option,
      ),
    }))
  }

  const handleRemoveOption = (index: number) => {
    setQuestionData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
  }

  const handleAddQuestion = () => {
    if (!questionData.title.trim()) return

    dispatch(addQuestion(questionData))

    // Reset form
    setQuestionData({
      type: "text",
      title: "",
      description: "",
      required: false,
      options: [],
    })
    setIsOpen(false)
  }

  const needsOptions = ["single-choice", "multiple-choice", "dropdown"].includes(questionData.type)

  if (!isOpen) {
    return (
      <Card className="border-none">
        <CardContent className="text-center py-8">
          <Button onClick={() => setIsOpen(true)} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Add Question
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Add New Question</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="question-type">Question Type</Label>
            <Select
              value={questionData.type}
              onValueChange={(value: QuestionType) =>
                setQuestionData((prev) => ({ ...prev, type: value, options: [] }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="required"
              checked={questionData.required}
              onCheckedChange={(checked) => setQuestionData((prev) => ({ ...prev, required: checked }))}
            />
            <Label htmlFor="required">Required</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="question-title">Question Title</Label>
          <Input
            id="question-title"
            value={questionData.title}
            onChange={(e) => setQuestionData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your question..."
          />
        </div>

        <div>
          <Label htmlFor="question-description">Description (Optional)</Label>
          <Textarea
            id="question-description"
            value={questionData.description}
            onChange={(e) => setQuestionData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Add additional context or instructions..."
            rows={2}
          />
        </div>

        {needsOptions && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Options</Label>
              <Button variant="outline" size="sm" onClick={handleAddOption}>
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>

            <div className="space-y-2">
              {questionData.options.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Input
                    value={option.label}
                    onChange={(e) => handleUpdateOption(index, "label", e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {questionData.options.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No options added yet. Click "Add Option" to get started.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddQuestion} disabled={!questionData.title.trim()}>
            Add Question
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
