"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      })

      if (res.status === 200) {
        window.location.href = "/dashboard"
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg border bg-white shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            required
          />
          <button
            type="button"
            className="absolute top-9 right-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button className="w-full mt-2" disabled={isLoading} type="submit">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  )
}
