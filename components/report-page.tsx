"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { InfoModal } from "@/components/ui/info-modal"
import { LeftSidebar } from "@/components/left-sidebar"
import Link from "next/link"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

type ReportTab = "idea-vs-market" | "ideal-customer" | "product-market-fit"

export function ReportPage() {
  const [activeTab, setActiveTab] = useState<"report" | "chat">("report")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isReportExpanded, setIsReportExpanded] = useState(false)
  const [isFollowUpExpanded, setIsFollowUpExpanded] = useState(true)
  const [activeReportTab, setActiveReportTab] = useState<ReportTab>("idea-vs-market")

  // Set the active tab based on the current URL when component mounts
  useEffect(() => {
    const path = window.location.pathname
    if (path === "/ideal-customer-profile") {
      setActiveReportTab("ideal-customer")
    } else if (path === "/product-market-fit") {
      setActiveReportTab("product-market-fit")
    } else {
      setActiveReportTab("idea-vs-market")
    }
  }, [])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Count user messages for follow-up questions counter
  const followUpCount = messages.filter((m) => m.sender === "user").length

  // About this report content
  const aboutReportContent = (
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-[#ebfc72] rounded-md flex-shrink-0 mr-3"></div>
        <div className="flex-1">
          <p className="text-sm">
            Below is a comprehensive feasibility study for Kulkan, structured around the required frameworks and backed
            by credible data sources wherever possible.
          </p>
          <p className="text-sm mt-4">
            The goal is to critically assess the business model—in this case, providing fast-turnaround data analytics
            to early-stage startups—and to determine if it should proceed ("Go"), be modified ("Pivot"), or be
            reconsidered altogether ("Kill").
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2">How to use this report:</h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Review the business snapshot for a quick overview</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Expand the full report to see detailed analysis by section</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Use the follow-up area to ask questions about specific findings</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Run additional analyses (ICP, PMF) for a complete picture</span>
          </li>
        </ul>
      </div>
    </div>
  )

  // Sample report data
  const reportData = {
    date: "05/08/2025",
    version: "001",
    followUpQuestions: `${followUpCount} out of 10`,
    score: 6.7,
    recommendation: "PIVOT",
    businessSnapshot: {
      title: "BUSINESS SNAPSHOT",
      description:
        "Kulkan is a high-tech AI-based platform aiming to help entrepreneurs validate their business ideas. The platform uses a proprietary AI-based analysis model to analyze market, customer, and product fit to determine if a business idea should be built, pivoted, or killed. The company offers a freemium model with premium features available for paying customers.",
    },
    pivotRecommendation: {
      summary:
        'Please note that the "Pivot" recommendation in this feasibility study reflects an initial market feasibility assessment—essentially, how Kulkan\'s current offering may fare in the present competitive and economic environment.',
      details:
        "However, the final decision should only be made after running three critical analyses together: Ideal Customer Profile (ICP), Product Market Fit (PMF), and this feasibility study.\n\nThe true value emerges when all these insights are integrated, ensuring that any strategic change—whether pivot or otherwise—is grounded in a comprehensive understanding of the market, customer needs, and the feasibility of scaling the business model.",
    },
    sections: [
      {
        title: "Market",
        content:
          "The TAM (Total Addressable Market) for entrepreneurial validation tools and startup advisory services is estimated at $5.8B in 2023, with a CAGR of 14.2% expected through 2028.\n\nThe startup ecosystem has seen a significant rise in the number of new ventures, with over 3.1 million new businesses formed in the US alone in 2022.\n\nHowever, the failure rate remains high at approximately 90% within the first five years, indicating a strong need for validation services.\n\nCompetition in this space is moderate, with several established players offering similar services but with different approaches and methodologies.",
      },
      {
        title: "Product",
        content:
          "Kulkan's AI-driven validation platform shows promising product-market fit indicators.\n\nThe platform's ability to analyze vast amounts of data and provide actionable insights is a key differentiator.\n\nUser experience testing has shown positive engagement, but further refinement is needed in the results presentation and recommendation clarity.\n\nThe current product roadmap aligns well with market needs, but development timelines may be ambitious given resource constraints.",
      },
      {
        title: "Team",
        content:
          "The founding team has strong technical backgrounds and complementary skills in AI, business analysis, and entrepreneurship.\n\nHowever, there is a gap in marketing expertise that should be addressed through either hiring or strategic partnerships.\n\nThe team's commitment and passion for the problem they're solving is evident, but work-life balance concerns have been noted.\n\nAdvisory board additions with startup ecosystem experience would strengthen the team's market positioning.",
      },
      {
        title: "Legal",
        content:
          "Current legal structure as an LLC provides adequate protection but may need to transition to a C-Corp as the company scales.\n\nIP protection strategy is in place with pending patents for the core algorithm and methodology.\n\nTerms of service and privacy policy are comprehensive but should be reviewed by specialized legal counsel as the product evolves.\n\nCompliance with data protection regulations across different jurisdictions needs attention as the company expands internationally.",
      },
      {
        title: "Financials",
        content:
          "Current burn rate is sustainable for approximately 14 months at current funding levels.\n\nRevenue projections show promising growth but are based on aggressive customer acquisition assumptions that may be optimistic.\n\nUnit economics are positive with a customer acquisition cost (CAC) of $120 and lifetime value (LTV) of $450, giving a healthy LTV:CAC ratio of 3.75.\n\nAdditional funding will be required within 12 months to achieve growth targets without significant changes to the business model.",
      },
    ],
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your question. I'm analyzing the report data to provide you with a detailed response. Based on the business snapshot and market analysis, I can see that while the core technology shows promise, there are concerns about the broad market approach. Would you like me to elaborate on specific aspects of the pivot recommendation?",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])

      // Scroll to bottom of messages
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleReportExpansion = () => {
    setIsReportExpanded(!isReportExpanded)
  }

  const toggleFollowUpExpansion = () => {
    setIsFollowUpExpanded(!isFollowUpExpanded)
  }

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Left sidebar - now using the new component */}
      <LeftSidebar />

      {/* Main content area with flexible width */}
      <div className="flex-1 flex overflow-hidden">
        {/* Report content */}
        <div
          className="flex-1 overflow-auto p-4 transition-all duration-500 ease-in-out"
          style={{
            flexGrow: isFollowUpExpanded ? 1 : 5, // More dramatic growth when sidebar is collapsed
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header without logo */}
            <div className="flex justify-between items-center mb-4">
              <div className="h-15 relative">{/* Logo removed as requested */}</div>
            </div>

            {/* Header tabs */}
            <div className="flex mb-4 text-sm">
              <button className="bg-[#ebfc72] text-black px-3 py-1 rounded-md mr-2">Idea 1</button>
              <Link
                href="/"
                className={`px-3 py-1 rounded-md mr-2 ${activeReportTab === "idea-vs-market" ? "bg-[#ebfc72] text-black" : "bg-[#f0f0f0] text-black hover:bg-gray-200"}`}
              >
                Idea Vs. Market (Feasibility study)
              </Link>
              <Link
                href="/ideal-customer-profile"
                className={`px-3 py-1 rounded-md mr-2 ${activeReportTab === "ideal-customer" ? "bg-[#ebfc72] text-black" : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"}`}
              >
                Ideal Customer Profile (ICP) not run yet
              </Link>
              <Link
                href="/product-market-fit"
                className={`px-3 py-1 rounded-md ${activeReportTab === "product-market-fit" ? "bg-[#ebfc72] text-black" : "bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"}`}
              >
                Product Market Fit (PMF) not run yet
              </Link>
            </div>

            {/* Business Snapshot with info icon next to title */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{reportData.businessSnapshot.title}</h1>
                  <div className="ml-2">
                    <InfoModal title="About this Report">{aboutReportContent}</InfoModal>
                  </div>
                </div>
                <button onClick={toggleReportExpansion} className="flex items-center text-gray-500 hover:text-gray-700">
                  {isReportExpanded ? (
                    <>
                      <span className="mr-1">Collapse Report</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="mr-1">Expand to read Full Report</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                Date: {reportData.date} | Version: {reportData.version} | Follow up Questions: {followUpCount} out of 10
              </div>

              {/* Status and Next buttons */}
              <div className="flex mb-6">
                <div className="bg-[#ebfc72] px-6 py-3 rounded-md mr-4">
                  <span className="font-bold">STATUS // {reportData.recommendation}</span>
                </div>
                <Link
                  href="/ideal-customer-profile"
                  className="bg-white border border-gray-200 px-6 py-3 rounded-md hover:bg-gray-50"
                >
                  NEXT: Run my ICP
                </Link>
              </div>
            </div>

            {/* Pivot recommendation - always visible */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <p className="mb-4">{reportData.pivotRecommendation.summary}</p>
              <p className="whitespace-pre-line">{reportData.pivotRecommendation.details}</p>
            </div>

            {/* Expanded report content */}
            {isReportExpanded && (
              <>
                {/* Report sections */}
                {reportData.sections.map((section, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                    <p className="whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Collapsed follow-up toggle button (visible when collapsed) */}
        {!isFollowUpExpanded && (
          <div
            className="w-12 bg-white border-l border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-500 ease-in-out shadow-md"
            onClick={toggleFollowUpExpansion}
          >
            <div className="rotate-90 transform origin-center whitespace-nowrap text-xs text-gray-500 mb-2">
              Follow up area
            </div>
            <ChevronLeft className="h-5 w-5 text-gray-400 animate-pulse" />
          </div>
        )}

        {/* Right sidebar for chat/questions */}
        <div
          className={`bg-white border-l border-gray-200 flex flex-col transition-all duration-500 ease-in-out transform ${
            isFollowUpExpanded ? "translate-x-0 opacity-100 w-80" : "translate-x-full opacity-0 w-0 overflow-hidden"
          }`}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold">
              Follow up area <span className="text-sm font-normal text-gray-500">({followUpCount} of 10)</span>
            </h3>
            <button
              onClick={toggleFollowUpExpansion}
              className="text-gray-400 hover:text-gray-600 transition-transform duration-300 ease-in-out transform hover:scale-110"
              aria-label="Collapse follow-up area"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3 w-10 h-10 bg-[#ebfc72] rounded-md flex items-center justify-center overflow-hidden">
                  <div className="w-7 h-7 overflow-hidden">
                    <Image
                      src="/images/kulkan-logo.svg"
                      alt="Kulkan Logo"
                      width={30}
                      height={10}
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <p className="text-sm">What is your current traction or progress?</p>
              </div>

              <div className="flex items-start justify-end">
                <p className="text-sm bg-gray-100 p-2 rounded-md max-w-[80%]">
                  Strip steak prosciutto beef ribs capicola tongue. Meatloaf pancetta ground round pig venison
                  burgdoggen.
                </p>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
                  <Image src="/diverse-user-avatars.png" alt="User" width={32} height={32} />
                </div>
              </div>
            </div>

            {messages.length > 0 && (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "assistant" && (
                      <div className="flex-shrink-0 mr-3 w-10 h-10 bg-[#ebfc72] rounded-md flex items-center justify-center overflow-hidden">
                        <div className="w-7 h-7 overflow-hidden">
                          <Image
                            src="/images/kulkan-logo.svg"
                            alt="Kulkan Logo"
                            width={30}
                            height={10}
                            className="object-contain object-left"
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-gray-100 text-black"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
                        <Image src="/diverse-user-avatars.png" alt="User" width={32} height={32} />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your follow up"
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-kulkan-yellow"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-[#ebfc72] text-black py-2 px-4 rounded-r-md hover:bg-opacity-90"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
