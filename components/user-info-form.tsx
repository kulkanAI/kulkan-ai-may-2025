"use client"

import type React from "react"

import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FadeIn } from "@/components/transitions"

export function UserInfoForm() {
  const { setUser, setCurrentStep } = useAppContext()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({ name: "", email: "" })

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "" }

    if (!name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setUser({ name, email })
      setCurrentStep("chat")
    }
  }

  return (
    <FadeIn>
      <div className="flex items-center justify-center min-h-[calc(100vh-7rem)]">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-opacity-90 text-white">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </FadeIn>
  )
}
