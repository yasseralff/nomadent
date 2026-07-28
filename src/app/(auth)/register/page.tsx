import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

/**
 * Register page — kept intentionally minimal.
 * All form logic lives in RegisterForm, all card layout in AuthCard.
 */
export default function RegisterPage() {
  return (
    <AuthCard>
      <RegisterForm />
    </AuthCard>
  );
}
