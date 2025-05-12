"use client"

import type { ReactNode } from "react"
import { useAppContext } from "@/context/app-context"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { currentStep } = useAppContext()

  // Only add the black bars for the user-info step
  const showBars = currentStep === "user-info"

  // For dashboard and report, we want a full-width layout
  const isFullWidth = currentStep === "dashboard" || currentStep === "report"

  if (showBars) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="h-14 bg-black w-full"></div>
        <main className="flex-grow">{children}</main>
        <div className="h-14 bg-black w-full"></div>
      </div>
    )
  }

  if (isFullWidth) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
