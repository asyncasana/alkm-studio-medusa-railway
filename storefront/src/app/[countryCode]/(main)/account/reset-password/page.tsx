"use client" // include with Next.js 13+

import { useMemo, useState } from "react"
import { sdk } from "@lib/sdk"

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  // for other than Next.js
  const searchParams = useMemo(() => {
    if (typeof window === "undefined") {
      return
    }

    return new URLSearchParams(window.location.search)
  }, [])
  const token = useMemo(() => {
    return searchParams?.get("token")
  }, [searchParams])
  const email = useMemo(() => {
    return searchParams?.get("email")
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!token) {
      return
    }
    if (!password) {
      alert("Password is required")
      return
    }
    setLoading(true)

    sdk.auth
      .updateProvider(
        "customer",
        "emailpass",
        {
          email,
          password,
        },
        token
      )
      .then(() => {
        alert("Password reset successfully!")
      })
      .catch((error) => {
        alert(`Couldn't reset password: ${error.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Password</label>
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Reset Password
      </button>
    </form>
  )
}
