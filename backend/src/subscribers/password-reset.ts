import { Modules } from "@medusajs/framework/utils";
import { INotificationModuleService } from "@medusajs/framework/types";
import { PASSWORD_RESET } from "../modules/email-notifications/templates/password-reset";

// Listen for the correct event emitted by the workflow
const PASSWORD_RESET_EVENT = "auth.password_reset";

export default async function handlePasswordReset({
  event: {
    data: { entity_id, token, actor_type },
  },
  container,
}) {
  console.log("🔔 [PasswordResetSubscriber] called with:", {
    entity_id,
    token,
    actor_type,
  });
  if (!entity_id || !token) return;

  // Build the reset URL as per Medusa docs
  const reset_url = `${
    process.env.FRONTEND_URL || "http://localhost:8000"
  }/reset-password?token=${token}&email=${entity_id}`;

  const notificationModuleService: INotificationModuleService =
    container.resolve(Modules.NOTIFICATION);

  await notificationModuleService.createNotifications({
    to: entity_id,
    channel: "email",
    template: PASSWORD_RESET,
    data: {
      email: entity_id,
      reset_url,
      emailOptions: {
        subject: "Reset your password",
      },
    },
  });
}

// Medusa v2 subscriber registration
export const config = {
  event: PASSWORD_RESET_EVENT,
};
