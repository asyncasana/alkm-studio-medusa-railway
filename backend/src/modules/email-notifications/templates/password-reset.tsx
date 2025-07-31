import { Text, Section, Button } from "@react-email/components";
import * as React from "react";
import { Base } from "./base";

export const PASSWORD_RESET = "password-reset";

export interface PasswordResetTemplateProps {
  resetLink: string;
  email: string;
  preview?: string;
}

export const isPasswordResetTemplateData = (
  data: any
): data is PasswordResetTemplateProps =>
  typeof data.resetLink === "string" && typeof data.email === "string";

export const PasswordResetTemplate: React.FC<PasswordResetTemplateProps> & {
  PreviewProps: PasswordResetTemplateProps;
} = ({ resetLink, email, preview = "Password reset request" }) => {
  return (
    <Base preview={preview}>
      <Section>
        <Text
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 0 30px",
          }}
        >
          Password Reset Request
        </Text>
        <Text style={{ margin: "0 0 15px" }}>Hi {email},</Text>
        <Text style={{ margin: "0 0 30px" }}>
          We received a request to reset your password. Click the button below
          to set a new password. If you did not request this, you can safely
          ignore this email.
        </Text>
        <Button
          href={resetLink}
          style={{
            background: "#222",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Reset Password
        </Button>
        <Text style={{ margin: "30px 0 0", fontSize: "12px", color: "#888" }}>
          If the button above does not work, copy and paste this link into your
          browser:
        </Text>
        <Text
          style={{ fontSize: "12px", color: "#888", wordBreak: "break-all" }}
        >
          {resetLink}
        </Text>
      </Section>
    </Base>
  );
};

PasswordResetTemplate.PreviewProps = {
  resetLink: "https://yourstore.com/reset-password?token=example",
  email: "customer@example.com",
} as PasswordResetTemplateProps;

export default PasswordResetTemplate;
