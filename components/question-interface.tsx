"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { mockQuestions, mockResponses } from "@/lib/mock-openai-responses"
import { Button } from "@/components/ui/button"

export function QuestionInterface() {
  const {
    messages,
    addMessage,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
    setIsLoading,
    analysisResult,
    setAnalysisResult,
    setCurrentStep,
  } = useAppContext()
  const [userResponse, setUserResponse] = useState("")

  useEffect(() => {
    if (messages.length === 0) {
      addMessage({ role: "assistant", content: mockResponses.greeting })
    }
  }, [messages.length, addMessage])

  const handleNextQuestion = async () => {
    setIsLoading(true)
    addMessage({ role: "user", content: userResponse })

    // Simulate AI response and analysis
    setTimeout(() => {
      if (currentQuestion < mockQuestions.length - 1) {
        addMessage({ role: "assistant", content: mockResponses.followUp })
        setCurrentQuestion(currentQuestion + 1)
      } else {
        addMessage({ role: "assistant", content: mockResponses.completion })
        // Simulate analysis result
        // setAnalysisResult(sampleAnalysis)
        setCurrentStep("dashboard") // Navigate to dashboard after questions
      }
      setIsLoading(false)
      setUserResponse("") // Clear input after sending
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Question and Input Area */}
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <div className="max-w-2xl w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg ${
                message.role === "user" ? "bg-gray-200 text-gray-800 self-end" : "bg-blue-100 text-blue-800 self-start"
              }`}
            >
              {message.content}
            </div>
          ))}

          {currentQuestion < mockQuestions.length && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{mockQuestions[currentQuestion]}</h2>
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your answer here..."
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 flex justify-center">
        {currentQuestion < mockQuestions.length && (
          <Button onClick={handleNextQuestion} disabled={isLoading} className="bg-black text-white">
            {isLoading ? "Loading..." : "Next Question"}
          </Button>
        )}
      </div>
    </div>
  )
}
