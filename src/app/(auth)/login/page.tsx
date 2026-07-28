import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

/**
 * Login page — kept intentionally minimal.
 * All form logic lives in LoginForm, all card layout in AuthCard.
 */
export default function LoginPage() {
  return (
    <AuthCard>
      <LoginForm />
    </AuthCard>
  );
}
