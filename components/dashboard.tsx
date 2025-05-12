"use client"

import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import { Search, Plus, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Types for our buckets and insights
type Bucket = {
  id: string
  name: string
  letter: string
  color: string
  date?: string
}

type InsightCard = {
  id: string
  title: string
  description: string
  iconBg: string
  score: number
  maxScore: number
  conditional?: string
}

export function Dashboard() {
  const { analysisResult, setCurrentStep } = useAppContext()
  const [selectedBucket, setSelectedBucket] = useState<string>("idea1")

  // Sample data for recent and saved buckets with updated colors
  const recentBuckets: Bucket[] = [
    { id: "idea1", name: "Idea 1", letter: "I", color: "bg-[#9d7ad2]" }, // Purple
    { id: "idea2", name: "Idea 2", letter: "I", color: "bg-[#4cd964]" }, // Green
    { id: "idea3", name: "Idea 3", letter: "I", color: "bg-[#ff6b6b]" }, // Red
  ]

  const savedBuckets: Bucket[] = [
    { id: "idea1", name: "Idea 1", letter: "I", color: "bg-[#9d7ad2]", date: "(11/02/2024)" }, // Purple
    { id: "idea2", name: "Idea 2", letter: "I", color: "bg-[#4cd964]", date: "(07/09/2025)" }, // Green
    { id: "idea3", name: "Idea 3", letter: "I", color: "bg-[#ff6b6b]", date: "(23/24/2025)" }, // Red
  ]

  // Insight cards based on analysis result
  const insightCards: InsightCard[] = [
    {
      id: "market-fit",
      title: "Idea Vs. Market (Feasibility study)",
      description:
        "A feasibility study of how your idea stands against the industry and market overall. A different analysis run to see where you stand.",
      iconBg: "bg-[#ff9500]", // Orange
      score: 6.5,
      maxScore: 10,
      conditional: "Conditional Go",
    },
    {
      id: "ideal-customer",
      title: "Ideal Customer Profile (ICP)",
      description:
        "Because a business without customers it isn't a business. We run a deep analysis to get to your true ideal customer profiles right from the start.",
      iconBg: "bg-[#4cd964]", // Green
      score: 3,
      maxScore: 5,
    },
    {
      id: "product-market-fit",
      title: "Product Market Fit (PMF)",
      description:
        "Yep. This is how you know if your idea truly has legs. We analyze it against various research methodologies to get you the true Go / Pivot / Kill score.",
      iconBg: "bg-[#ff9500]", // Orange
      score: 6,
      maxScore: 10,
      conditional: "Conditional Go",
    },
  ]

  // Function to navigate to the report page
  const handleViewFullReport = (cardId: string) => {
    if (cardId === "market-fit") {
      setCurrentStep("report")
    } else if (cardId === "ideal-customer") {
      setCurrentStep("report")
      window.location.href = "/ideal-customer-profile"
    } else if (cardId === "product-market-fit") {
      setCurrentStep("report")
      window.location.href = "/product-market-fit"
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar with updated background color */}
      <div className="w-72 bg-[#333333] text-white flex flex-col">
        <div className="p-4 flex items-center">
          {/* Use the SVG logo */}
          <div className="relative w-32 h-10">
            <Image
              src="/images/kulkan-logo-text.svg"
              alt="Kulkan Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Your Buckets</h2>
            <Search className="h-4 w-4 text-gray-400" />
          </div>

          <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-600 rounded-md mb-6">
            <Plus className="h-4 w-4" />
            <span>Create New Bucket</span>
          </button>

          {/* Recent Buckets */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 border border-gray-500 mr-2"></div>
              <span className="text-xs text-gray-400">Recent Buckets</span>
            </div>

            <ul className="space-y-2">
              {recentBuckets.map((bucket) => (
                <li
                  key={bucket.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    selectedBucket === bucket.id ? "bg-opacity-20 bg-white" : "hover:bg-opacity-10 hover:bg-white"
                  }`}
                  onClick={() => setSelectedBucket(bucket.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-6 w-6 ${bucket.color} rounded-full flex items-center justify-center mr-2 text-xs font-medium`}
                    >
                      {bucket.letter}
                    </div>
                    <span>{bucket.name}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </li>
              ))}
            </ul>
          </div>

          {/* Saved Buckets */}
          <div>
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 border border-gray-500 mr-2"></div>
              <span className="text-xs text-gray-400">Saved Buckets // 3 of 8</span>
            </div>

            <ul className="space-y-2">
              {savedBuckets.map((bucket) => (
                <li
                  key={bucket.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    selectedBucket === bucket.id ? "bg-opacity-20 bg-white" : "hover:bg-opacity-10 hover:bg-white"
                  }`}
                  onClick={() => setSelectedBucket(bucket.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-6 w-6 ${bucket.color} rounded-full flex items-center justify-center mr-2 text-xs font-medium`}
                    >
                      {bucket.letter}
                    </div>
                    <span>
                      {bucket.name} <span className="text-xs text-gray-400">{bucket.date}</span>
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* User profile at bottom */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-[#ff6b6b] rounded-full mr-2"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-[#e6e6e6]">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Your insights // Idea #1</h1>
          <p className="text-gray-600 mb-8">
            Here is where your feasibility, ideal customer profiles and overall product market fit live, along with your
            follow up questions per study. As we progress, we will have other tools you can use to go, pivot or start
            anew, in your startup journey.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Dig deeper</h2>
            <p className="text-gray-600 mb-4">
              Choose any of the studies below to dig deeper by running follow up questions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insightCards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  {/* Card content with flex-grow to push rating to bottom */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start mb-4">
                      <div className={`p-3 rounded-md ${card.iconBg} mr-4`}>
                        {card.id === "market-fit" ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path
                              d="M3 3V21H21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 14L11 10L15 14L21 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : card.id === "ideal-customer" ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path
                              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path
                              d="M9.66347 17H14.3364"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 3V17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{card.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{card.description}</p>
                      </div>
                    </div>

                    {/* Push the button to the bottom of the content area */}
                    <div className="mt-auto">
                      <button
                        className="w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors mb-2"
                        onClick={() => handleViewFullReport(card.id)}
                      >
                        View Full Report
                      </button>
                      <Link
                        href={
                          card.id === "market-fit"
                            ? "/"
                            : card.id === "ideal-customer"
                              ? "/ideal-customer-profile"
                              : "/product-market-fit"
                        }
                        className="w-full block text-center py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        View Analysis
                      </Link>
                    </div>
                  </div>

                  {/* Rating bar always at the bottom */}
                  <div className="bg-[#ebfc72] px-4 py-2 text-[#212e21] flex items-center justify-between">
                    <span className="font-bold">
                      {card.score} / {card.maxScore}
                    </span>
                    {card.conditional && <span className="text-sm">{card.conditional}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
