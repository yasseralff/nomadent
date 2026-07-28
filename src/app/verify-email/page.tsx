"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Mail, RefreshCw, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import api from "@/lib/api";

/**
 * VerifyEmailPage
 *
 * This page is shown in two scenarios:
 *
 *  1. Right after registration — the user sees "Check your inbox" and a
 *     "Resend email" button in case the email didn't arrive.
 *
 *  2. When the middleware redirects an authenticated-but-unverified user who
 *     tries to access a protected route.
 *
 * Error states (from the verify-email API route via query param):
 *  - ?error=invalid-token — token not found, already used, or expired
 *  - ?error=missing-token — no token in the URL
 *  - ?error=server-error  — unexpected server error during verification
 *
 * Success state (redirect from here):
 *  - The verify-email API redirects to /dashboard?verified=true on success,
 *    so this page only appears when there's a problem or for the initial nudge.
 */
export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorParam = searchParams.get("error");

  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [resendErrorMsg, setResendErrorMsg] = useState<string | null>(null);

  const handleResendVerification = async () => {
    setResendStatus("sending");
    setResendErrorMsg(null);

    try {
      await api.post("/auth/send-verification");
      setResendStatus("sent");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      const msg = axiosError.response?.data?.error ?? "Failed to resend. Please try again.";
      setResendErrorMsg(msg);
      setResendStatus("error");
    }
  };

  const errorMessages: Record<string, string> = {
    "invalid-token": "This verification link is invalid or has expired. Request a new one below.",
    "missing-token": "No verification token found in the link. Request a new one below.",
    "server-error": "Something went wrong on our end. Please try again in a moment.",
  };

  const errorMessage = errorParam ? (errorMessages[errorParam] ?? errorMessages["server-error"]) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Wordmark */}
        <span className="text-2xl font-semibold tracking-widest uppercase text-primary font-sora">
          Nomadent
        </span>

        {/* Card */}
        <div className="w-full rounded-3xl border border-outline-variant p-8 flex flex-col gap-6 sidebar-glass">
          {/* Icon + heading */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail size={28} className="text-primary" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl font-semibold text-foreground font-sora">
                Check your inbox
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We&apos;ve sent a verification link to your email address.
                Click the link to activate your account.
              </p>
            </div>
          </div>

          {/* Error banner — shown when the verify-email API redirects back with an error */}
          {errorMessage && (
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-error/10 border border-error/20">
              <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {/* Resend status */}
          {resendStatus === "sent" && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-success/10 border border-success/20">
              <CheckCircle size={16} className="text-success shrink-0" />
              <p className="text-sm text-success">Verification email sent. Check your inbox.</p>
            </div>
          )}
          {resendStatus === "error" && resendErrorMsg && (
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-error/10 border border-error/20">
              <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error">{resendErrorMsg}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              fullWidth
              onClick={handleResendVerification}
              disabled={resendStatus === "sending" || resendStatus === "sent"}
            >
              <RefreshCw
                size={16}
                className={resendStatus === "sending" ? "animate-spin" : ""}
              />
              {resendStatus === "sending" ? "Sending..." : "Resend verification email"}
            </Button>

            <Link href="/login" className="w-full">
              <Button type="button" variant="ghost" fullWidth>
                <ArrowLeft size={16} />
                Back to sign in
              </Button>
            </Link>
          </div>

          {/* Help note */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            The link expires in 24 hours. Check your spam folder if you don&apos;t
            see it in your inbox.
          </p>
        </div>
      </div>
    </div>
  );
}
