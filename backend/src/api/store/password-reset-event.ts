import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  type PasswordResetBody = { email?: string };
  const body = req.body as PasswordResetBody;
  const { email } = body;
  if (!email) {
    res.status(400).json({ error: "Missing email" });
    return;
  }

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
      },
    }));
  } catch (err) {
    console.error("Error generating password reset token via workflow:", err);
    res.status(500).json({ error: "Failed to generate password reset token" });
    return;
  }

  res.status(200).json({ status: "Password reset token generated", result });
}
