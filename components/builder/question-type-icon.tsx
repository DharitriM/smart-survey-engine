"use client"

import {
  Type,
  AlignLeft,
  Hash,
  Mail,
  Phone,
  CheckCircle,
  Square,
  ChevronDown,
  Star,
  BarChart3,
  Calendar,
  Clock,
  Upload,
  Grid3X3,
  List,
} from "lucide-react"
import type { QuestionType } from "@/lib/types/survey"

interface QuestionTypeIconProps {
  type: QuestionType
  className?: string
}

export function QuestionTypeIcon({ type, className = "h-4 w-4" }: QuestionTypeIconProps) {
  const iconMap = {
    text: Type,
    textarea: AlignLeft,
    number: Hash,
    email: Mail,
    phone: Phone,
    "single-choice": CheckCircle,
    "multiple-choice": Square,
    dropdown: ChevronDown,
    rating: Star,
    scale: BarChart3,
    date: Calendar,
    time: Clock,
    "file-upload": Upload,
    matrix: Grid3X3,
    ranking: List,
  }

  const Icon = iconMap[type] || Type

  return <Icon className={className} />
}
