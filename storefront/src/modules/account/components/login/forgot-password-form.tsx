import React, { useState } from "react"

interface ForgotPasswordFormProps {
  onSuccess?: () => void
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccess,
}) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("https://backend-production-7e2f.up.railway.app/store/customers/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Could not send reset email")
      setSuccess(true)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-green-600 text-center py-4">
        If an account exists for this email, a reset link has been sent.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-2 mt-4">
      <label htmlFor="reset-email" className="text-sm font-medium">
        Enter your email address
      </label>
      <input
        id="reset-email"
        type="email"
        required
        className="border rounded px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        autoComplete="email"
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-black text-white rounded px-4 py-2 mt-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  )
}

export default ForgotPasswordForm
