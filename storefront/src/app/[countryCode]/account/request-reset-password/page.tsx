"use client" // include with Next.js 13+

import { useState } from "react"
import { sdk } from "@lib/sdk"

import { useParams } from "next/navigation"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const params = useParams()
  const countryCode = params?.countryCode || "uk"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }
    setLoading(true)

    try {
      // Call Medusa SDK to request password reset
      const response = await sdk.auth.resetPassword("customer", "emailpass", {
        identifier: email,
      })

      // Trigger backend notification event with email and country code
      await fetch("/store/password-reset-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, country_code: countryCode }),
      })

      alert(
        "If an account exists with the specified email, it'll receive instructions to reset the password."
      )
    } catch (error: any) {
      alert(error.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Request Password Reset
      </button>
    </form>
  )
}
