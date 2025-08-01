import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUSHABLE_KEY,
})