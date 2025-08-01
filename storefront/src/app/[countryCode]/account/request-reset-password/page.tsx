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

    sdk.auth
      .resetPassword("customer", "emailpass", {
        identifier: email,
      })
      .then(() => {
        alert(
          "If an account exists with the specified email, it'll receive instructions to reset the password."
        )
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
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
