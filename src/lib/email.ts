import { Resend } from "resend";

/**
 * Resend client instance.
 *
 * RESEND_API_KEY must be set in .env.local.
 * Sign up at https://resend.com — the free tier is enough for development.
 *
 * RESEND_FROM_EMAIL should be a verified sender in your Resend account,
 * e.g. "noreply@nomadent.app". During dev you can use Resend's test address.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const APP_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

interface VerificationEmailParams {
  to: string;
  name: string;
  token: string;
}

/**
 * Sends a verification email to a newly registered user.
 *
 * The verification link contains the raw token as a query parameter.
 * When the user clicks it, the verify-email API route validates the token,
 * marks the account as verified, and redirects to /dashboard.
 *
 * Token expires after 24 hours.
 */
export async function sendVerificationEmail({ to, name, token }: VerificationEmailParams) {
  const verificationUrl = `${APP_URL}/api/auth/verify-email?token=${token}`;

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Verify your Nomadent email address",
    html: buildVerificationEmailHtml({ name, verificationUrl }),
  });
}

/**
 * Builds the verification email HTML.
 * Kept inline (no template engine) to keep dependencies minimal.
 * The design matches the Nomadent "Ethereal Moss" dark aesthetic.
 */
function buildVerificationEmailHtml({
  name,
  verificationUrl,
}: {
  name: string;
  verificationUrl: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify your email — Nomadent</title>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      background-color: #111413;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #e1e3e1;
    ">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 48px 24px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="
              max-width: 480px;
              background-color: #1d201f;
              border: 1px solid #424845;
              border-radius: 24px;
              padding: 40px;
            ">
              <!-- Wordmark -->
              <tr>
                <td align="center" style="padding-bottom: 32px;">
                  <span style="
                    font-size: 20px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #9db4a9;
                  ">Nomadent</span>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding-bottom: 16px;">
                  <p style="margin: 0; font-size: 16px; color: #c2c8c3;">Hi ${name},</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 32px;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #c2c8c3;">
                    Thanks for signing up for Nomadent. Please verify your email address to 
                    activate your account and start managing your student life abroad.
                  </p>
                </td>
              </tr>

              <!-- CTA Button -->
              <tr>
                <td align="center" style="padding-bottom: 32px;">
                  <a
                    href="${verificationUrl}"
                    style="
                      display: inline-block;
                      background-color: #9db4a9;
                      color: #20342d;
                      font-weight: 600;
                      font-size: 15px;
                      padding: 14px 32px;
                      border-radius: 9999px;
                      text-decoration: none;
                    "
                  >
                    Verify Email Address
                  </a>
                </td>
              </tr>

              <!-- Expiry note -->
              <tr>
                <td style="padding-bottom: 24px;">
                  <p style="margin: 0; font-size: 13px; color: #8c928e; text-align: center;">
                    This link expires in 24 hours. If you didn&apos;t create an account, 
                    you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Fallback URL -->
              <tr>
                <td style="border-top: 1px solid #424845; padding-top: 24px;">
                  <p style="margin: 0 0 8px; font-size: 12px; color: #8c928e;">
                    If the button doesn&apos;t work, copy this link into your browser:
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #9db4a9; word-break: break-all;">
                    ${verificationUrl}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
