import { Modules } from "@medusajs/framework/utils";
import { INotificationModuleService } from "@medusajs/framework/types";
import { PASSWORD_RESET } from "../modules/email-notifications/templates/password-reset";

// Listen for the correct event emitted by the workflow
const PASSWORD_RESET_EVENT = "auth.password_reset";
const countryCode = process.env.COUNTRY_CODE || "uk"; // Default to 'uk' if not set

export default async function handlePasswordReset({
  event: {
    data: { entity_id, token, actor_type, country_code },
  },
  container,
}) {
  console.log("🔔 [PasswordResetSubscriber] called with:", {
    entity_id,
    token,
    actor_type,
    country_code,
    "country_code type": typeof country_code,
    "country_code is undefined": country_code === undefined,
  });
  if (!entity_id || !token) return;

  // Use country_code from event data if present, else fallback to env or default
  const resolvedCountryCode = country_code || process.env.COUNTRY_CODE || "dk";

  // Debug: log what we're working with
  console.log("🔍 [Debug] Environment COUNTRY_CODE:", process.env.COUNTRY_CODE);
  console.log("🔍 [Debug] Input country_code:", country_code);
  console.log("🔍 [Debug] Resolved country_code:", resolvedCountryCode);

  const reset_url = `${
    process.env.FRONTEND_URL || "http://localhost:8000"
  }/${resolvedCountryCode}/account/reset-password?token=${token}&email=${entity_id}`;

  console.log("🔗 [PasswordResetSubscriber] Generated reset URL:", reset_url);
  console.log(
    "🌍 [PasswordResetSubscriber] Using country code:",
    resolvedCountryCode,
    "from input:",
    country_code
  );

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
