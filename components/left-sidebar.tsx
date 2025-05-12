"use client"

import { useState } from "react"
import { Search, Plus, Settings, User, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/context/app-context"
import { useRouter } from "next/navigation"

type Bucket = {
  id: string
  name: string
  letter: string
  color: string
  date?: string
}

export function LeftSidebar() {
  const { setCurrentStep } = useAppContext()
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Sample data for recent and saved buckets
  const recentBuckets: Bucket[] = [
    { id: "idea1", name: "Idea 1", letter: "I", color: "bg-[#9d7ad2]" }, // Purple
    { id: "idea2", name: "Idea 2", letter: "B", color: "bg-[#4cd964]" }, // Green
    { id: "idea3", name: "Idea 3", letter: "R", color: "bg-[#ff6b6b]" }, // Red
  ]

  const savedBuckets: Bucket[] = [
    { id: "idea1", name: "Idea 1", letter: "I", color: "bg-[#9d7ad2]", date: "(11/02/2024)" }, // Purple
    { id: "idea2", name: "Idea 2", letter: "I", color: "bg-[#4cd964]", date: "(01/02/2025)" }, // Green
    { id: "idea3", name: "Idea 3", letter: "I", color: "bg-[#ff6b6b]", date: "(03/24/2025)" }, // Red
  ]

  // Function to handle bucket selection
  const handleBucketSelect = (bucketId: string) => {
    setSelectedBucket(bucketId)
    // Navigate to the report page for this bucket
    router.push("/")
  }

  // Function to start the new bucket creation flow
  const handleCreateNewBucket = () => {
    // Start the 12-question flow
    setCurrentStep("user-info")
    router.push("/")
  }

  // Filter buckets based on search query
  const filteredRecentBuckets = recentBuckets.filter((bucket) =>
    bucket.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSavedBuckets = savedBuckets.filter((bucket) =>
    bucket.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-64 bg-[#333333] text-white h-full flex flex-col">
      {/* Logo at the top */}
      <div className="p-4 flex justify-center">
        <div className="w-32 h-10 relative">
          <Image src="/images/kulkan-logo.svg" alt="Kulkan Logo" fill className="object-contain" priority />
        </div>
      </div>

      {/* Buckets header and search */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Your Buckets</h2>
          <div className="relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#444444] text-white text-xs rounded-md pl-8 pr-2 py-1 w-24 focus:outline-none focus:ring-1 focus:ring-[#ebfc72]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Create New Bucket button */}
        <button
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white text-[#333333] rounded-md mb-4 hover:bg-[#ebfc72] transition-colors"
          onClick={handleCreateNewBucket}
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">Create New Bucket</span>
        </button>
      </div>

      {/* Bucket lists - scrollable area */}
      <div className="flex-1 overflow-auto px-4">
        {/* Recent Buckets */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="h-4 w-4 border border-[#ebfc72] mr-2 flex items-center justify-center">
              <ChevronRight className="h-3 w-3 text-[#ebfc72]" />
            </div>
            <span className="text-xs text-gray-400">Recent Buckets</span>
          </div>

          <ul className="space-y-1">
            {filteredRecentBuckets.map((bucket) => (
              <li
                key={bucket.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  selectedBucket === bucket.id ? "bg-opacity-20 bg-white" : "hover:bg-opacity-10 hover:bg-white"
                }`}
                onClick={() => handleBucketSelect(bucket.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`h-6 w-6 ${bucket.color} rounded-full flex items-center justify-center mr-2 text-xs font-medium`}
                  >
                    {bucket.letter}
                  </div>
                  <span className="text-sm">{bucket.name}</span>
                </div>
                <div className="h-5 w-5 border border-gray-500 flex items-center justify-center">
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Saved Buckets */}
        <div>
          <div className="flex items-center mb-2">
            <div className="h-4 w-4 border border-[#ebfc72] mr-2 flex items-center justify-center">
              <ChevronRight className="h-3 w-3 text-[#ebfc72]" />
            </div>
            <span className="text-xs text-gray-400">Saved Buckets // 3 of 8</span>
          </div>

          <ul className="space-y-1">
            {filteredSavedBuckets.map((bucket) => (
              <li
                key={bucket.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  selectedBucket === bucket.id ? "bg-opacity-20 bg-white" : "hover:bg-opacity-10 hover:bg-white"
                }`}
                onClick={() => handleBucketSelect(bucket.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`h-6 w-6 ${bucket.color} rounded-full flex items-center justify-center mr-2 text-xs font-medium`}
                  >
                    {bucket.letter}
                  </div>
                  <span className="text-sm">
                    {bucket.name} <span className="text-xs text-gray-400">{bucket.date}</span>
                  </span>
                </div>
                <div className="h-5 w-5 border border-gray-500 flex items-center justify-center">
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Analysis links */}
      <div className="px-4 py-3 border-t border-gray-700">
        <h3 className="text-xs text-gray-400 mb-2">Analysis Tools</h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-10 hover:bg-white"
            >
              <span className="text-sm">Idea Vs. Market (Feasibility study)</span>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </Link>
          </li>
          <li>
            <Link
              href="/ideal-customer-profile"
              className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-10 hover:bg-white"
            >
              <span className="text-sm">Ideal Customer Profile (ICP)</span>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </Link>
          </li>
          <li>
            <Link
              href="/product-market-fit"
              className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-10 hover:bg-white"
            >
              <span className="text-sm">Product Market Fit (PMF)</span>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Settings and Profile at the bottom */}
      <div className="mt-auto border-t border-gray-700 p-4">
        <div className="flex flex-col space-y-3">
          <Link
            href="/settings"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#444444] transition-colors"
          >
            <Settings className="h-5 w-5 text-[#ebfc72]" />
            <span className="text-sm">Settings</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#444444] transition-colors"
          >
            <User className="h-5 w-5 text-[#ebfc72]" />
            <span className="text-sm">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
