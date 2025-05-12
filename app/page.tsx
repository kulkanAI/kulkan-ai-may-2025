"use client"

import { AppProvider, useAppContext } from "@/context/app-context"
import { WelcomeModal } from "@/components/welcome-modal"
import { UserInfoForm } from "@/components/user-info-form"
import { QuestionInterface } from "@/components/question-interface"
import { Dashboard } from "@/components/dashboard"
import { ReportPage } from "@/components/report-page"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

function AppContent() {
  const { currentStep, skipToReportPage } = useAppContext()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a 'page' parameter set to 'report'
    const page = searchParams?.get("page")
    if (page === "report") {
      skipToReportPage()
    }
  }, [searchParams, skipToReportPage])

  // Render content directly without using Layout
  return (
    <div className="min-h-screen">
      {currentStep === "welcome" && <WelcomeModal />}
      {currentStep === "user-info" && (
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <div className="h-14 bg-black w-full"></div>
          <main className="flex-grow">
            <UserInfoForm />
          </main>
          <div className="h-14 bg-black w-full"></div>
        </div>
      )}
      {currentStep === "chat" && (
        <div className="min-h-screen bg-white">
          <main className="container mx-auto px-4 py-8">
            <QuestionInterface />
          </main>
        </div>
      )}
      {currentStep === "dashboard" && <Dashboard />}
      {currentStep === "report" && <ReportPage />}
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
