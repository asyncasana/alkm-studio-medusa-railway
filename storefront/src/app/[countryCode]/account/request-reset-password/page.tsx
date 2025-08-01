"use client" // include with Next.js 13+

import { useState } from "react"
import { sdk } from "@lib/sdk"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

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

      // Trigger backend notification event with just the email
      await fetch("/store/password-reset-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
