"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { sampleAnalysis } from "@/lib/mock-openai-responses"

type Step = "welcome" | "user-info" | "chat" | "dashboard" | "report"

type User = {
  name: string
  email: string
}

type Message = {
  role: "user" | "assistant"
  content: string
}

type AnalysisResult = {
  marketFit: {
    score: number
    analysis: string
    conditional: string
  }
  idealCustomer: {
    score: number
    analysis: string
  }
  productMarketFit: {
    score: number
    analysis: string
    conditional: string
  }
}

interface AppContextType {
  currentStep: Step
  setCurrentStep: (step: Step) => void
  user: User
  setUser: (user: User) => void
  messages: Message[]
  addMessage: (message: Message) => void
  currentQuestion: number
  setCurrentQuestion: (question: number) => void
  analysisResult: AnalysisResult | null
  setAnalysisResult: (result: AnalysisResult) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  assistantId: string | null
  threadId: string | null
  setAssistantId: (id: string) => void
  setThreadId: (id: string) => void
  skipToReportPage: () => void // New function to skip to report page
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>("welcome")
  const [user, setUser] = useState<User>({ name: "", email: "" })
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [assistantId, setAssistantId] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  // New function to skip directly to the report page
  const skipToReportPage = () => {
    // Set mock user data
    setUser({ name: "Demo User", email: "demo@example.com" })

    // Set mock assistant and thread IDs
    setAssistantId("mock-assistant-id")
    setThreadId("mock-thread-id")

    // Set mock analysis result
    setAnalysisResult(sampleAnalysis)

    // Set completed questions
    setCurrentQuestion(12)

    // Navigate directly to report page
    setCurrentStep("report")
  }

  return (
    <AppContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        user,
        setUser,
        messages,
        addMessage,
        currentQuestion,
        setCurrentQuestion,
        analysisResult,
        setAnalysisResult,
        isLoading,
        setIsLoading,
        assistantId,
        threadId,
        setAssistantId,
        setThreadId,
        skipToReportPage, // Add the new function to the context
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
