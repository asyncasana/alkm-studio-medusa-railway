import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  type PasswordResetBody = { email?: string; country_code?: string };
  const body = req.body as PasswordResetBody;
  const { email, country_code } = body;
  if (!email) {
    res.status(400).json({ error: "Missing email" });
    return;
  }

  console.log("🔔 [API] Password reset requested for:", {
    email,
    country_code,
  });

  // Generate password reset token using Medusa workflow
  const {
    generateResetPasswordTokenWorkflow,
  } = require("@medusajs/medusa/core-flows");
  let result;
  try {
    ({ result } = await generateResetPasswordTokenWorkflow(req.scope).run({
      input: {
        entityId: email,
        actorType: "customer",
        provider: "emailpass",
        // Pass country_code as additional data
        ...(country_code && { country_code }),
      },
    }));

    console.log("🎯 [API] Token generation result:", result);
  } catch (err) {
    console.error("Error generating password reset token via workflow:", err);
    res.status(500).json({ error: "Failed to generate password reset token" });
    return;
  }

  res.status(200).json({ status: "Password reset token generated", result });
}
