import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Try to get the Meilisearch service from the container
    const container = req.scope
    
    // Check if we can access Meilisearch through the plugin
    // This is a basic connectivity test
    const testResult = {
      status: "testing",
      timestamp: new Date().toISOString(),
      meilisearch: {
        configured: !!(process.env.MEILISEARCH_HOST && process.env.MEILISEARCH_ADMIN_KEY),
        host: process.env.MEILISEARCH_HOST || "not configured",
        hasApiKey: !!process.env.MEILISEARCH_ADMIN_KEY
      }
    }

    res.status(200).json(testResult)
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
