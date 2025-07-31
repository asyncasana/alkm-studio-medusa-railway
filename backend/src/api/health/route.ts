import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
